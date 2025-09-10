const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'http://localhost:3000';

class SpotifyService {
  constructor() {
    this.accessToken = localStorage.getItem('spotify_access_token');
    this.refreshToken = localStorage.getItem('spotify_refresh_token');
    this.tokenExpiry = localStorage.getItem('spotify_token_expiry');
  }

  // Generate a random string for PKCE
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  // Create code challenge for PKCE
  async generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Start OAuth flow with PKCE (doesn't require client secret)
  async startAuth() {
    const codeVerifier = this.generateRandomString(64);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    
    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: 'user-read-currently-playing user-read-playback-state user-read-recently-played',
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // Handle OAuth callback
  async handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Spotify auth error:', error);
      return false;
    }

    if (!code) {
      return false;
    }

    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) {
      console.error('No code verifier found');
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        
        const expiryTime = Date.now() + (data.expires_in * 1000);
        this.tokenExpiry = expiryTime;

        localStorage.setItem('spotify_access_token', this.accessToken);
        localStorage.setItem('spotify_refresh_token', this.refreshToken);
        localStorage.setItem('spotify_token_expiry', expiryTime);
        localStorage.removeItem('spotify_code_verifier');

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        return true;
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }

    return false;
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        this.accessToken = data.access_token;
        const expiryTime = Date.now() + (data.expires_in * 1000);
        this.tokenExpiry = expiryTime;

        localStorage.setItem('spotify_access_token', this.accessToken);
        localStorage.setItem('spotify_token_expiry', expiryTime);

        if (data.refresh_token) {
          this.refreshToken = data.refresh_token;
          localStorage.setItem('spotify_refresh_token', this.refreshToken);
        }

        return true;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    return false;
  }

  // Check if token needs refresh
  async ensureValidToken() {
    if (!this.accessToken) {
      return false;
    }

    if (this.tokenExpiry && Date.now() >= this.tokenExpiry) {
      return await this.refreshAccessToken();
    }

    return true;
  }

  // Get currently playing track
  async getCurrentlyPlaying() {
    if (!await this.ensureValidToken()) {
      return null;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (response.status === 204) {
        // No track currently playing
        return null;
      }

      if (response.status === 401) {
        // Token expired, try refresh
        if (await this.refreshAccessToken()) {
          return this.getCurrentlyPlaying();
        }
        return null;
      }

      if (!response.ok) {
        console.error('Spotify API error:', response.status);
        return null;
      }

      const data = await response.json();

      if (data && data.item) {
        return {
          song: data.item.name,
          artist: data.item.artists.map(artist => artist.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url,
          isPlaying: data.is_playing,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
          uri: data.item.uri,
          external_url: data.item.external_urls?.spotify
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching currently playing:', error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.accessToken;
  }

  // Logout
  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('spotify_code_verifier');
  }
}

export default new SpotifyService();