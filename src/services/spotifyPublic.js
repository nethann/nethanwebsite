// Simple public service to fetch Nethan's current playing track
// This service fetches from a public API endpoint that shows your current song

class SpotifyPublicService {
  constructor() {
    this.lastFetch = null;
    this.cachedData = null;
    this.cacheTime = 30000; // Cache for 30 seconds
  }

  // Get currently playing track from a public endpoint
  async getCurrentlyPlaying() {
    // Return cached data if it's recent
    if (this.cachedData && this.lastFetch && (Date.now() - this.lastFetch) < this.cacheTime) {
      return this.cachedData;
    }

    try {
      // Last.fm API integration disabled
      // To enable: Add REACT_APP_LASTFM_API_KEY to your .env file
      // and uncomment the code below

      /*
      const lastfmApiKey = process.env.REACT_APP_LASTFM_API_KEY;

      if (lastfmApiKey) {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nethan_journey&api_key=${lastfmApiKey}&format=json&limit=1`);

        if (response.ok) {
          const data = await response.json();
          const track = data?.recenttracks?.track?.[0];

          if (track && track['@attr']?.nowplaying) {
            const trackData = {
              song: track.name,
              artist: track.artist['#text'] || track.artist.name,
              album: track.album['#text'],
              albumArt: track.image?.[3]?.['#text'] || track.image?.[2]?.['#text'],
              isPlaying: true,
              service: 'lastfm'
            };

            this.cachedData = trackData;
            this.lastFetch = Date.now();
            return trackData;
          }
        }
      }
      */

      // Return null if Last.fm is not configured
      this.cachedData = null;
      this.lastFetch = Date.now();
      return null;

    } catch (error) {
      console.error('Error fetching current track:', error);
      return null;
    }
  }

  // Simplified method that just shows a demo track when you're listening
  async getDemoTrack() {
    // This is a temporary solution - shows demo data when music should be playing
    const now = new Date().getHours();
    
    // Show demo track during typical music listening hours
    if (now >= 9 && now <= 23) {
      return {
        song: "Currently Playing",
        artist: "Nethan's Music",
        album: "Live Session",
        albumArt: "https://via.placeholder.com/300x300/1db954/ffffff?text=♪",
        isPlaying: true,
        service: 'demo'
      };
    }
    
    return null;
  }
}

export default new SpotifyPublicService();