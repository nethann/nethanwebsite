import React, { useState, useEffect } from 'react';
import { FaDiscord, FaCode, FaMusic, FaClock, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, FaSpotify } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { MdNotifications, MdCheck } from 'react-icons/md';
import axios from 'axios';
import nethanSpotify from '../../services/nethanSpotify';
import '../../CSS/Global/DynamicIsland.css';

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [discordStatus, setDiscordStatus] = useState('offline');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);

  // Fetch Discord status and Nethan's Spotify data
  useEffect(() => {
    // Discord status fetching
    const fetchDiscordStatus = async () => {
      try {
        const response = await axios.get('https://api.lanyard.rest/v1/users/743601359697477713');
        const data = response.data.data;
        setDiscordStatus(data.discord_status);
      } catch (error) {
        console.error('Error fetching Discord status:', error);
        setDiscordStatus('offline');
      }
    };

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
    fetchDiscordStatus();
    fetchNethanSpotify();

    // Set up intervals
    const discordInterval = setInterval(fetchDiscordStatus, 30000); // Every 30 seconds
    const spotifyInterval = setInterval(fetchNethanSpotify, 10000); // Every 10 seconds

    return () => {
      clearInterval(discordInterval);
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

  const getDiscordStatusColor = () => {
    switch (discordStatus) {
      case 'online': return '#3ba55d';
      case 'idle': return '#faa61a';
      case 'dnd': return '#ed4245';
      default: return '#747f8d';
    }
  };

  const getMinimalContent = () => {
    if (notification) {
      return (
        <div className="dynamic-island-content notification">
          {notification?.type === 'success' ? <MdCheck /> : <MdNotifications />}
          <span>{notification?.message}</span>
        </div>
      );
    }
    
    // Show current playing song
    if (spotifyData && spotifyData.isPlaying) {
      return (
        <div className="dynamic-island-content spotify-minimal">
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
    
    return (
      <div className="dynamic-island-content minimal">
        <div className="minimal-dot"></div>
      </div>
    );
  };

  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/nethan_journey/', label: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/nethan-nagendran/', label: 'LinkedIn' },
    { icon: AiFillGithub, url: 'https://github.com/nethann', label: 'GitHub' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@nethan_journey', label: 'YouTube' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@nethan_journey', label: 'TikTok' }
  ];

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
              <div className="discord-status">
                <FaDiscord />
                <div className="status-indicator" style={{ backgroundColor: getDiscordStatusColor() }}></div>
                <span>{discordStatus}</span>
              </div>
            </div>
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

  return (
    <div 
      className={`dynamic-island ${notification ? 'notification' : 'minimal'} ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => !notification && setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded && !notification ? getExpandedContent() : getMinimalContent()}
    </div>
  );
}