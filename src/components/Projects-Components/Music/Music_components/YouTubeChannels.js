import React, { useState, useEffect } from 'react';
import './YouTubeChannels.css';

const YouTubeChannels = () => {
  const [activeTab, setActiveTab] = useState('nethan_journey');
  const [channelData, setChannelData] = useState({
    nethan_journey: { videos: [], shorts: [] },
    worship_avenue: { videos: [], shorts: [] }
  });
  const [loading, setLoading] = useState(false);

  // YouTube API Key
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  // YouTube channel configurations - descriptions will be fetched from API
  const [channels, setChannels] = useState({
    nethan_journey: {
      name: 'Nethan Journey',
      channelId: 'UCcjyzmhL8hoJEQhjNin3wdw',
      description: 'Loading...'
    },
    worship_avenue: {
      name: 'Worship Avenue',
      channelId: 'UCzhoMRmdkQLjr7O3PoddKPw',
      description: 'Loading...'
    }
  });

  // Fetch channel info including description
  const fetchChannelInfo = async (channelId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return {
          title: data.items[0].snippet.title,
          description: data.items[0].snippet.description
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return null;
    }
  };

  // Fetch videos from YouTube API
  const fetchChannelVideos = async (channelId) => {
    try {
      setLoading(true);
      console.log(`[YouTube API] Fetching videos for channel: ${channelId}`);
      console.log(`[YouTube API] API Key present: ${!!YOUTUBE_API_KEY}`);

      // Get channel's uploads playlist ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );
      const channelData = await channelResponse.json();

      // Check for API errors
      if (channelData.error) {
        console.error('[YouTube API] API Error:', channelData.error);
        console.error('[YouTube API] Error Code:', channelData.error.code);
        console.error('[YouTube API] Error Message:', channelData.error.message);
        if (channelData.error.code === 403) {
          console.error('[YouTube API] This is likely due to:');
          console.error('  - Invalid or expired API key');
          console.error('  - YouTube Data API v3 not enabled in Google Cloud Console');
          console.error('  - API quota exceeded');
          console.error('  - Domain restrictions blocking the request');
        }
        throw new Error(`YouTube API Error: ${channelData.error.message}`);
      }

      console.log('[YouTube API] Channel data received:', channelData);
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from uploads playlist
      console.log(`[YouTube API] Fetching playlist items for: ${uploadsPlaylistId}`);
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
      );
      const videosData = await videosResponse.json();

      // Check for API errors on playlist fetch
      if (videosData.error) {
        console.error('[YouTube API] Playlist API Error:', videosData.error.message);
        throw new Error(`YouTube API Error: ${videosData.error.message}`);
      }

      console.log(`[YouTube API] Found ${videosData.items?.length || 0} videos`);
      
      if (!videosData.items) {
        throw new Error('No videos found');
      }
      
      // Separate shorts and regular videos
      const videos = [];
      const shorts = [];
      
      // Get video details to check duration (shorts are under 60 seconds)
      const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      const detailsData = await detailsResponse.json();
      
      videosData.items.forEach((item, index) => {
        const videoDetails = detailsData.items.find(detail => detail.id === item.snippet.resourceId.videoId);
        const duration = videoDetails?.contentDetails?.duration || '';
        const statistics = videoDetails?.statistics || {};
        
        // Parse ISO 8601 duration to check if it's a short
        const durationInSeconds = parseDuration(duration);
        
        // Multiple methods to detect shorts:
        // 1. Duration <= 90 seconds (extended from YouTube's 60s limit to catch close videos)
        // 2. Title contains "#shorts" or short-form keywords
        // 3. Description contains "#shorts" or "shorts"
        const titleLower = item.snippet.title.toLowerCase();
        const descriptionLower = (item.snippet.description || '').toLowerCase();
        
        const isDurationShort = durationInSeconds > 0 && durationInSeconds <= 90;
        const isTitleShort = titleLower.includes('#shorts') || titleLower.includes('short') || titleLower.includes('improv');
        const isDescriptionShort = descriptionLower.includes('#shorts') || descriptionLower.includes('youtube shorts');
        
        const isShort = isDurationShort || isTitleShort || isDescriptionShort;
        
        // Debug logging (can be removed later)
        // console.log(`Video: ${item.snippet.title} - isShort: ${isShort}`);
        
        const videoData = {
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: formatViewCount(statistics.viewCount || '0'),
          description: item.snippet.description
        };
        
        if (isShort) {
          shorts.push(videoData);
        } else {
          videos.push(videoData);
        }
      });

      console.log(`[YouTube API] ✅ Successfully fetched: ${videos.length} videos, ${shorts.length} shorts`);
      return { videos, shorts };

    } catch (error) {
      console.error('[YouTube API] ❌ Error fetching YouTube data:', error);
      console.error('[YouTube API] Falling back to mock data');
      // Return fallback mock data if API fails
      return getFallbackData(channelId);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to parse ISO 8601 duration to seconds
  const parseDuration = (duration) => {
    if (!duration) return 0;
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Helper function to format view count
  const formatViewCount = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Fallback data function
  const getFallbackData = (channelId) => {
    console.log('[YouTube API] ⚠️ Using fallback/mock data for channel:', channelId);
    if (channelId === 'UCcjyzmhL8hoJEQhjNin3wdw') {
      console.log('[YouTube API] Returning Nethan Journey mock data (1 video, 1 short)');
      return mockData.nethan_journey;
    }
    if (channelId === 'UCzhoMRmdkQLjr7O3PoddKPw') {
      console.log('[YouTube API] Returning Worship Avenue mock data (2 videos, 0 shorts)');
      return mockData.worship_avenue;
    }
    return { videos: [], shorts: [] };
  };

  // Mock/Fallback data with actual video IDs
  const mockData = {
    nethan_journey: {
      videos: [
        {
          id: 'AjZG2xYZmAs',
          title: '',
          thumbnail: 'https://img.youtube.com/vi/AjZG2xYZmAs/maxresdefault.jpg',
          publishedAt: '',
          viewCount: ''
        }
      ],
      shorts: [
        {
          id: 'Wc6ca8W3Pes',
          title: '',
          thumbnail: 'https://img.youtube.com/vi/Wc6ca8W3Pes/maxresdefault.jpg',
          publishedAt: '',
          viewCount: ''
        }
      ]
    },
    worship_avenue: {
      videos: [
        {
          id: 'n7SdCOlSHu0',
          title: '',
          thumbnail: 'https://img.youtube.com/vi/n7SdCOlSHu0/maxresdefault.jpg',
          publishedAt: '',
          viewCount: ''
        },
        {
          id: 'wHqjtpqaKV4',
          title: '',
          thumbnail: 'https://img.youtube.com/vi/wHqjtpqaKV4/maxresdefault.jpg',
          publishedAt: '',
          viewCount: ''
        }
      ],
      shorts: []
    }
  };

  useEffect(() => {
    const loadChannelData = async () => {
      const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const CACHE_KEY_PREFIX = 'youtube_channel_data_';
      const CACHE_TIMESTAMP_KEY = 'youtube_data_timestamp';

      // Helper to get cached data
      const getCachedData = (key) => {
        try {
          const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
          return cached ? JSON.parse(cached) : null;
        } catch (error) {
          console.error('Error reading cache:', error);
          return null;
        }
      };

      // Helper to set cached data
      const setCachedData = (key, data) => {
        try {
          localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(data));
        } catch (error) {
          console.error('Error setting cache:', error);
        }
      };

      // Check if cache is still valid
      const isCacheValid = () => {
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (!timestamp) return false;
        const age = Date.now() - parseInt(timestamp);
        return age < CACHE_DURATION;
      };

      try {
        setLoading(true);
        const newChannelData = { ...channelData };
        const updatedChannels = { ...channels };

        // Check cache first
        if (isCacheValid()) {
          console.log('[YouTube Cache] ✅ Using cached YouTube data (cache is valid)');
          const cachedNethanData = getCachedData('nethan_journey');
          const cachedNethanInfo = getCachedData('nethan_journey_info');
          const cachedWorshipData = getCachedData('worship_avenue');
          const cachedWorshipInfo = getCachedData('worship_avenue_info');

          if (cachedNethanData && cachedNethanInfo) {
            newChannelData.nethan_journey = cachedNethanData;
            updatedChannels.nethan_journey = { ...updatedChannels.nethan_journey, ...cachedNethanInfo };
          } else {
            // If cache is missing, use mock data
            newChannelData.nethan_journey = mockData.nethan_journey;
          }

          if (cachedWorshipData && cachedWorshipInfo) {
            newChannelData.worship_avenue = cachedWorshipData;
            updatedChannels.worship_avenue = { ...updatedChannels.worship_avenue, ...cachedWorshipInfo };
          } else {
            // If cache is missing, use mock data
            newChannelData.worship_avenue = mockData.worship_avenue;
          }

          setChannels(updatedChannels);
          setChannelData(newChannelData);
          setLoading(false);
          return;
        }

        // Cache is invalid or doesn't exist, fetch fresh data
        console.log('[YouTube Cache] ⚠️ Cache expired or missing, fetching fresh YouTube data from API');

        // Load Nethan Journey data and info
        try {
          if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY') {
            const nethanInfo = await fetchChannelInfo(channels.nethan_journey.channelId);
            if (nethanInfo) {
              updatedChannels.nethan_journey.name = nethanInfo.title;
              updatedChannels.nethan_journey.description = nethanInfo.description;
              setCachedData('nethan_journey_info', nethanInfo);
            }

            const nethanData = await fetchChannelVideos(channels.nethan_journey.channelId);
            // Only cache if we got valid data (not fallback)
            if (nethanData && (nethanData.videos?.length > 0 || nethanData.shorts?.length > 0)) {
              newChannelData.nethan_journey = nethanData;
              setCachedData('nethan_journey', nethanData);
            } else {
              // Use mock data if fetch returned empty
              newChannelData.nethan_journey = mockData.nethan_journey;
            }
          } else {
            // Use fallback data if no API key
            newChannelData.nethan_journey = mockData.nethan_journey;
          }
        } catch (error) {
          console.error('Error loading Nethan Journey data, using mock data:', error);
          newChannelData.nethan_journey = mockData.nethan_journey;
        }

        // Load Worship Avenue data and info
        try {
          if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY') {
            const worshipInfo = await fetchChannelInfo(channels.worship_avenue.channelId);
            if (worshipInfo) {
              updatedChannels.worship_avenue.name = worshipInfo.title;
              updatedChannels.worship_avenue.description = worshipInfo.description;
              setCachedData('worship_avenue_info', worshipInfo);
            }

            const worshipData = await fetchChannelVideos(channels.worship_avenue.channelId);
            // Only cache if we got valid data (not fallback)
            if (worshipData && (worshipData.videos?.length > 0 || worshipData.shorts?.length > 0)) {
              newChannelData.worship_avenue = worshipData;
              setCachedData('worship_avenue', worshipData);
            } else {
              // Use mock data if fetch returned empty
              newChannelData.worship_avenue = mockData.worship_avenue;
            }
          } else {
            newChannelData.worship_avenue = mockData.worship_avenue;
          }
        } catch (error) {
          console.error('Error loading Worship Avenue data, using mock data:', error);
          newChannelData.worship_avenue = mockData.worship_avenue;
        }

        // Update timestamp after successful fetch
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

        setChannels(updatedChannels);
        setChannelData(newChannelData);
      } catch (error) {
        console.error('Fatal error loading channel data:', error);
        // Use mock data as absolute fallback
        setChannelData({
          nethan_journey: mockData.nethan_journey,
          worship_avenue: mockData.worship_avenue
        });
      } finally {
        setLoading(false);
      }
    };

    loadChannelData();
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderVideoCard = (video, isShort = false) => (
    <div key={video.id} className="youtube-video-card">
      <div className="video-thumbnail">
        <iframe
          width={isShort ? "240" : "560"}
          height={isShort ? "426" : "315"}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?modestbranding=1&showinfo=0&rel=0&controls=1&iv_load_policy=3&disablekb=0`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={isShort ? 'short-iframe' : 'video-iframe'}
        />
      </div>
      {(video.title || video.viewCount || video.publishedAt) && (
        <div className="video-info">
          {video.title && <h4 className="video-title">{video.title}</h4>}
          {(video.viewCount || video.publishedAt) && (
            <div className="video-meta">
              {video.viewCount && <span className="view-count">{video.viewCount} views</span>}
              {video.publishedAt && <span className="publish-date">{new Date(video.publishedAt).toLocaleDateString()}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const currentChannel = channelData[activeTab];

  return (
    <div className="youtube-channels-container">
      <div className="channels-header">
        <h2 className="section-title">My YouTube Channels</h2>
        <p className="section-description">Explore my musical journey across different platforms</p>
      </div>

      {/* Channel Tabs */}
      <div className="channel-tabs">
        {Object.entries(channels).map(([key, channel]) => (
          <button
            key={key}
            className={`tab-button ${activeTab === key ? 'active' : ''}`}
            onClick={() => handleTabChange(key)}
          >
            <span className="tab-name">{channel.name}</span>
          </button>
        ))}
      </div>

      {/* Channel Content */}
      <div className="channel-content">
        <div className="channel-info">
          <h3 className="channel-name">{channels[activeTab].name}</h3>
          <p className="channel-description">{channels[activeTab].description}</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading videos...</p>
          </div>
        ) : (
          <>
            {/* YouTube Shorts Section */}
            <div className="content-section">
              <h4 className="content-section-title">
                <span className="section-icon">🎬</span>
                YouTube Shorts
                <span className="video-count">({currentChannel.shorts?.length || 0})</span>
              </h4>
              {currentChannel.shorts?.length > 0 ? (
                <div className="shorts-grid">
                  {currentChannel.shorts.map(short => renderVideoCard(short, true))}
                </div>
              ) : (
                <div className="no-content">
                  <p>No shorts available yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* YouTube Videos Section */}
            <div className="content-section">
              <h4 className="content-section-title">
                <span className="section-icon">📹</span>
                Full Videos
                <span className="video-count">({currentChannel.videos?.length || 0})</span>
              </h4>
              {currentChannel.videos?.length > 0 ? (
                <div className="videos-grid">
                  {currentChannel.videos.map(video => renderVideoCard(video, false))}
                </div>
              ) : (
                <div className="no-content">
                  <p>No videos available yet. Check back soon!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YouTubeChannels;