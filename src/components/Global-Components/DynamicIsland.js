import React, { useState, useEffect } from 'react';
import { FaDiscord, FaCode, FaMusic, FaClock, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { MdNotifications, MdCheck } from 'react-icons/md';
import axios from 'axios';
import '../../CSS/Global/DynamicIsland.css';

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [discordStatus, setDiscordStatus] = useState('offline');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState(null);

  // Discord status fetching
  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await axios.get('https://api.lanyard.rest/v1/users/743601359697477713');
        const data = response.data.data;
        setDiscordStatus(data.discord_status);
      } catch (error) {
        setDiscordStatus('offline');
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 30000);
    return () => clearInterval(interval);
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