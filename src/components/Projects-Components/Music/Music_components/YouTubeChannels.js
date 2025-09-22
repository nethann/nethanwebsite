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
  const YOUTUBE_API_KEY = 'AIzaSyB1RMivMQohGsZOhPudzSLGHurf9bZDYRA';

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
      console.log(`Fetching videos for channel: ${channelId}`);
      
      // Get channel's uploads playlist ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );
      const channelData = await channelResponse.json();
      console.log('Channel data:', channelData);
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      
      // Get videos from uploads playlist
      console.log(`Fetching playlist items for: ${uploadsPlaylistId}`);
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
      );
      const videosData = await videosResponse.json();
      console.log(`Found ${videosData.items?.length || 0} videos`);
      
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
      
      console.log(`Final results: ${videos.length} videos, ${shorts.length} shorts`);
      return { videos, shorts };
      
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
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
    if (channelId === 'UCcjyzmhL8hoJEQhjNin3wdw') {
      return mockData.nethan_journey;
    }
    return mockData.worship_avenue || { videos: [], shorts: [] };
  };

  // Mock data - Replace with actual YouTube API calls
  const mockData = {
    nethan_journey: {
      videos: [
        {
          id: 'dQw4w9WgXcQ',
          title: 'Acoustic Guitar Cover - Amazing Grace',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2024-01-15',
          viewCount: '12,540'
        },
        {
          id: 'abc123xyz',
          title: 'Piano Worship Medley',
          thumbnail: 'https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg',
          publishedAt: '2024-01-10',
          viewCount: '8,320'
        }
      ],
      shorts: [
        {
          id: 'Wc6ca8W3Pes',
          title: 'Quick Guitar Riff',
          thumbnail: 'https://img.youtube.com/vi/Wc6ca8W3Pes/maxresdefault.jpg',
          publishedAt: '2024-01-20',
          viewCount: '25,100'
        },
        {
          id: 'short123',
          title: 'Worship Chord Progression',
          thumbnail: 'https://img.youtube.com/vi/short123/maxresdefault.jpg',
          publishedAt: '2024-01-18',
          viewCount: '15,400'
        }
      ]
    },
    worship_avenue: {
      videos: [
        {
          id: 'worship_vid1',
          title: 'Amazing Grace - Worship Cover',
          thumbnail: 'https://img.youtube.com/vi/worship_vid1/maxresdefault.jpg',
          publishedAt: '2024-01-12',
          viewCount: '18,750'
        },
        {
          id: 'worship_vid2',
          title: 'How Great Is Our God - Piano Worship',
          thumbnail: 'https://img.youtube.com/vi/worship_vid2/maxresdefault.jpg',
          publishedAt: '2024-01-08',
          viewCount: '22,160'
        }
      ],
      shorts: [
        {
          id: 'worship_short1',
          title: 'Worship Chord Progressions',
          thumbnail: 'https://img.youtube.com/vi/worship_short1/maxresdefault.jpg',
          publishedAt: '2024-01-16',
          viewCount: '31,200'
        },
        {
          id: 'worship_short2',
          title: 'Contemporary Worship Tips',
          thumbnail: 'https://img.youtube.com/vi/worship_short2/maxresdefault.jpg',
          publishedAt: '2024-01-14',
          viewCount: '19,800'
        }
      ]
    }
  };

  useEffect(() => {
    const loadChannelData = async () => {
      const newChannelData = { ...channelData };
      const updatedChannels = { ...channels };

      // Load Nethan Journey data and info
      if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY') {
        const nethanInfo = await fetchChannelInfo(channels.nethan_journey.channelId);
        if (nethanInfo) {
          updatedChannels.nethan_journey.name = nethanInfo.title;
          updatedChannels.nethan_journey.description = nethanInfo.description;
        }

        const nethanData = await fetchChannelVideos(channels.nethan_journey.channelId);
        newChannelData.nethan_journey = nethanData;
      } else {
        // Use fallback data if no API key
        newChannelData.nethan_journey = mockData.nethan_journey;
      }

      // Load Worship Avenue data and info
      if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY') {
        const worshipInfo = await fetchChannelInfo(channels.worship_avenue.channelId);
        if (worshipInfo) {
          updatedChannels.worship_avenue.name = worshipInfo.title;
          updatedChannels.worship_avenue.description = worshipInfo.description;
        }

        const worshipData = await fetchChannelVideos(channels.worship_avenue.channelId);
        newChannelData.worship_avenue = worshipData;
      } else {
        newChannelData.worship_avenue = mockData.worship_avenue;
      }

      setChannels(updatedChannels);
      setChannelData(newChannelData);
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
      <div className="video-info">
        <h4 className="video-title">{video.title}</h4>
        <div className="video-meta">
          <span className="view-count">{video.viewCount} views</span>
          <span className="publish-date">{new Date(video.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
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