import React, { useState, useEffect } from 'react';
import { FaCode, FaMusic, FaClock, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, FaSpotify } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { MdNotifications, MdCheck } from 'react-icons/md';
import nethanSpotify from '../../services/nethanSpotify';
import '../../CSS/Global/DynamicIsland.css';

export default function DynamicIsland() {
  // Social links configuration - moved to top to avoid hoisting issues
  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/nethan_journey/', label: 'Instagram', platform: 'instagram' },
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/nethan-nagendran/', label: 'LinkedIn', platform: 'linkedin' },
    { icon: AiFillGithub, url: 'https://github.com/nethann', label: 'GitHub', platform: 'github' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@nethan_journey', label: 'YouTube', platform: 'youtube' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@nethan_journey', label: 'TikTok', platform: 'tiktok' }
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [showFloatingTooltip, setShowFloatingTooltip] = useState(false);
  const [previewIconIndex, setPreviewIconIndex] = useState(0);

  // Fetch Nethan's Spotify data
  useEffect(() => {
    // Nethan's Spotify data fetching
    const fetchNethanSpotify = async () => {
      try {
        const currentTrack = await nethanSpotify.getCurrentOrRecent();
        console.log('Nethan\'s current track:', currentTrack);
        setSpotifyData(currentTrack);
      } catch (error) {
        console.error('Error fetching Nethan\'s Spotify data:', error);
        setSpotifyData(null);
      }
    };

    // Initial fetch
    fetchNethanSpotify();

    // Set up interval
    const spotifyInterval = setInterval(fetchNethanSpotify, 10000); // Every 10 seconds

    return () => {
      clearInterval(spotifyInterval);
    };
  }, []);

  // Time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);


  // Rotate preview social icon every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewIconIndex((prev) => (prev + 1) % socialLinks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show floating tooltip periodically
  useEffect(() => {
    const hasSeenFloatingTooltip = localStorage.getItem('dynamicIslandFloatingTooltipSeen');
    if (!hasSeenFloatingTooltip) {
      // Show floating tooltip after 10 seconds, then every 30 seconds
      const initialTimer = setTimeout(() => {
        setShowFloatingTooltip(true);
        setTimeout(() => {
          setShowFloatingTooltip(false);
        }, 4000); // Show for 4 seconds

        // Set up periodic reminders every 30 seconds (max 3 times)
        let reminderCount = 0;
        const reminderInterval = setInterval(() => {
          reminderCount++;
          if (reminderCount <= 2) { // Show max 3 times total
            setShowFloatingTooltip(true);
            setTimeout(() => {
              setShowFloatingTooltip(false);
            }, 4000);
          } else {
            clearInterval(reminderInterval);
            localStorage.setItem('dynamicIslandFloatingTooltipSeen', 'true');
          }
        }, 30000);

        return () => clearInterval(reminderInterval);
      }, 10000);

      return () => clearTimeout(initialTimer);
    }
  }, []);

  // Show notification function (can be called from other components)
  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Expose notification function globally
  useEffect(() => {
    window.showDynamicIslandNotification = showNotification;
    return () => {
      delete window.showDynamicIslandNotification;
    };
  }, []);


  const getMinimalContent = () => {
    if (notification) {
      return (
        <div className="dynamic-island-content notification">
          {notification?.type === 'success' ? <MdCheck /> : <MdNotifications />}
          <span>{notification?.message}</span>
        </div>
      );
    }
    
    // Show current playing song with album art
    if (spotifyData && spotifyData.isPlaying) {
      return (
        <div className="dynamic-island-content spotify-minimal-with-art">
          <img 
            src={spotifyData.albumArt} 
            alt="Album Art" 
            className="spotify-minimal-album-art" 
          />
          <FaSpotify className="spotify-icon" />
          <div className="spotify-minimal-info">
            <span className="song-title">{spotifyData.song}</span>
            <span className="artist-name">{spotifyData.artist}</span>
          </div>
        </div>
      );
    }

    // Show recently played song
    if (spotifyData && spotifyData.wasRecentlyPlayed) {
      return (
        <div className="dynamic-island-content spotify-minimal recent">
          <FaSpotify className="spotify-icon" />
          <div className="spotify-minimal-info">
            <span className="song-title">{spotifyData.song}</span>
            <span className="artist-name">Recently played</span>
          </div>
        </div>
      );
    }
    
    // Show rotating social icon preview
    const currentSocial = socialLinks[previewIconIndex];
    const IconComponent = currentSocial.icon;

    return (
      <div className="dynamic-island-content minimal">
        <div className="minimal-social-preview" data-platform={currentSocial.platform}>
          <IconComponent className="preview-social-icon" />
        </div>
      </div>
    );
  };

  const getExpandedContent = () => {
    return (
      <div className="dynamic-island-expanded">
        <div className="expanded-section">
          {spotifyData && spotifyData.isPlaying && (
            <div className="spotify-row">
              <div className="spotify-info">
                <img src={spotifyData.albumArt} alt="Album Art" className="album-art" />
                <div className="track-info">
                  <div className="track-title">{spotifyData.song}</div>
                  <div className="track-artist">{spotifyData.artist}</div>
                  <div className="track-album">{spotifyData.album}</div>
                </div>
                <FaSpotify className="spotify-icon-large" />
              </div>
            </div>
          )}

          {spotifyData && spotifyData.wasRecentlyPlayed && (
            <div className="spotify-row spotify-recent">
              <div className="spotify-info">
                <img src={spotifyData.albumArt} alt="Album Art" className="album-art" />
                <div className="track-info">
                  <div className="track-title">{spotifyData.song}</div>
                  <div className="track-artist">{spotifyData.artist}</div>
                  <div className="track-album">Recently played</div>
                </div>
                <FaSpotify className="spotify-icon-large spotify-recent-icon" />
              </div>
            </div>
          )}

          {!spotifyData && (
            <div className="spotify-row spotify-idle">
              <div className="spotify-info">
                <FaSpotify className="spotify-icon-large" />
                <div className="track-info">
                  <div className="track-title">No music detected</div>
                  <div className="track-artist">Nethan's not currently listening</div>
                </div>
              </div>
            </div>
          )}

          <div className="status-row">
            <div className="status-item">
              <FaClock />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="socials-row">
            <div className="socials-label">
              <span>Connect with me:</span>
            </div>
            <div className="socials-icons">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="activity-row">
            <div className="activity-item">
              <FaCode />
              <span>Full-stack Developer</span>
            </div>
            <div className="activity-item">
              <FaMusic />
              <span>Music Producer</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleFloatingTooltipDismiss = () => {
    setShowFloatingTooltip(false);
    localStorage.setItem('dynamicIslandFloatingTooltipSeen', 'true');
  };

  return (
    <div className="dynamic-island-container">
      <div
        className={`dynamic-island ${notification ? 'notification' : 'minimal'} ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => !notification && setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {isExpanded && !notification ? getExpandedContent() : getMinimalContent()}
      </div>

      {showFloatingTooltip && (
        <div className="floating-tooltip" onClick={handleFloatingTooltipDismiss}>
          <div className="floating-tooltip-content">
            View my socials
          </div>
        </div>
      )}
    </div>
  );
}