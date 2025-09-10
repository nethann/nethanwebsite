// Service to fetch Nethan's currently playing Spotify track for public display
class NethanSpotifyService {
  constructor() {
    this.accessToken = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN;
    this.lastFetch = null;
    this.cachedData = null;
    this.cacheTime = 5000; // Cache for 5 seconds to avoid rate limiting
  }

  // Get Nethan's currently playing track
  async getCurrentlyPlaying() {
    // Return cached data if it's recent
    if (this.cachedData && this.lastFetch && (Date.now() - this.lastFetch) < this.cacheTime) {
      console.log('🎵 Returning cached data:', this.cachedData);
      return this.cachedData;
    }

    if (!this.accessToken) {
      console.error('No Spotify access token found');
      return null;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      // No content means no track is currently playing
      if (response.status === 204) {
        this.cachedData = null;
        this.lastFetch = Date.now();
        return null;
      }

      // Token might be expired or invalid
      if (response.status === 401) {
        console.error('Spotify token expired or invalid');
        this.cachedData = null;
        this.lastFetch = Date.now();
        return null;
      }

      if (!response.ok) {
        console.error('Spotify API error:', response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      console.log('Spotify API Response:', data);

      if (data && data.item && data.is_playing) {
        const trackData = {
          song: data.item.name,
          artist: data.item.artists.map(artist => artist.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url,
          isPlaying: data.is_playing,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
          external_url: data.item.external_urls?.spotify
        };

        this.cachedData = trackData;
        this.lastFetch = Date.now();
        return trackData;
      }

      // Track exists but not playing
      this.cachedData = null;
      this.lastFetch = Date.now();
      return null;

    } catch (error) {
      console.error('Error fetching Nethan\'s current track:', error);
      return null;
    }
  }

  // Get recently played tracks if nothing is currently playing
  async getRecentlyPlayed() {
    if (!this.accessToken) {
      return null;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        return {
          song: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url,
          isPlaying: false,
          wasRecentlyPlayed: true,
          playedAt: data.items[0].played_at
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching recently played:', error);
      return null;
    }
  }

  // Get current or recently played track
  async getCurrentOrRecent() {
    console.log('🎵 Fetching current or recent Spotify data...');
    const current = await this.getCurrentlyPlaying();
    console.log('🎵 Current playing result:', current);
    
    if (current) {
      console.log('🎵 Returning current playing track:', current.song, 'by', current.artist);
      return current;
    }

    // If nothing is currently playing, show recently played
    console.log('🎵 No current track, fetching recently played...');
    const recent = await this.getRecentlyPlayed();
    console.log('🎵 Recent track result:', recent);
    return recent;
  }
}

export default new NethanSpotifyService();