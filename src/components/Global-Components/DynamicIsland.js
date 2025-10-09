import React, { useState, useEffect } from 'react';
import { FaCode, FaMusic, FaClock, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { MdNotifications, MdCheck } from 'react-icons/md';
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
  const [isNotificationHiding, setIsNotificationHiding] = useState(false);
  const [showFloatingTooltip, setShowFloatingTooltip] = useState(false);
  const [previewIconIndex, setPreviewIconIndex] = useState(0);
  const [currentActivity, setCurrentActivity] = useState('Building cool things');
  const [latestCommit, setLatestCommit] = useState(null);
  const [siteLastUpdated, setSiteLastUpdated] = useState(null);

  // Fetch latest GitHub commit from any repository
  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        // Check cache first to avoid rate limiting
        const cachedData = localStorage.getItem('githubCommitCache');
        const cacheTime = localStorage.getItem('githubCommitCacheTime');
        const now = Date.now();

        // Use cache if it's less than 15 minutes old
        if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 900000) {
          const cached = JSON.parse(cachedData);
          console.log('Using cached GitHub data:', cached);
          if (cached.latestCommit) {
            setLatestCommit(cached.latestCommit);
          }
          if (cached.siteLastUpdated) {
            setSiteLastUpdated(cached.siteLastUpdated);
          }
          return;
        }

        console.log('Fetching fresh GitHub data...');

        let newLatestCommit = null;
        let newSiteLastUpdated = null;

        // Get all public events
        const response = await fetch(
          'https://api.github.com/users/nethann/events/public?per_page=30'
        );

        if (response.ok) {
          const events = await response.json();
          console.log('GitHub events fetched:', events.length);

          // Find the most recent PushEvent from any repository
          const pushEvent = events.find(event => event.type === 'PushEvent');

          if (pushEvent && pushEvent.payload.commits.length > 0) {
            // Get the most recent commit from that push
            const commit = pushEvent.payload.commits[pushEvent.payload.commits.length - 1];
            const repoName = pushEvent.repo.name.split('/')[1];

            console.log('Latest commit found:', commit.message, 'from', repoName);

            newLatestCommit = {
              message: commit.message,
              repo: repoName,
              time: pushEvent.created_at,
              fullRepoName: pushEvent.repo.name
            };

            setLatestCommit(newLatestCommit);
          }
        } else if (response.status === 403) {
          console.warn('GitHub API rate limit hit. Using cached data if available.');
          // Try to load from cache even if expired
          if (cachedData) {
            const cached = JSON.parse(cachedData);
            if (cached.latestCommit) {
              setLatestCommit(cached.latestCommit);
              newLatestCommit = cached.latestCommit;
            }
          }
        }

        // Get the last commit specifically for this website repository
        const repoResponse = await fetch(
          'https://api.github.com/repos/nethann/nethanwebsite/commits?per_page=1'
        );

        if (repoResponse.ok) {
          const commits = await repoResponse.json();
          if (commits.length > 0) {
            const lastCommit = commits[0];
            console.log('Site last updated:', lastCommit.commit.message);

            newSiteLastUpdated = {
              message: lastCommit.commit.message,
              time: lastCommit.commit.author.date,
              sha: lastCommit.sha.substring(0, 7)
            };

            setSiteLastUpdated(newSiteLastUpdated);

            // Cache the data with the newly fetched values
            localStorage.setItem('githubCommitCache', JSON.stringify({
              latestCommit: newLatestCommit,
              siteLastUpdated: newSiteLastUpdated
            }));
            localStorage.setItem('githubCommitCacheTime', now.toString());
          }
        } else if (repoResponse.status === 403) {
          console.warn('GitHub API rate limit hit for repo commits.');
          // Try to load from cache even if expired
          if (cachedData) {
            const cached = JSON.parse(cachedData);
            if (cached.siteLastUpdated) {
              setSiteLastUpdated(cached.siteLastUpdated);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub commits:', error);
      }
    };

    fetchLatestCommit();
    const commitInterval = setInterval(fetchLatestCommit, 900000); // Every 15 minutes instead of 5

    return () => clearInterval(commitInterval);
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
      setIsNotificationHiding(false);

      // Play a subtle notification sound (using Web Audio API)
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (e) {
        // Silent fail if audio not supported
        console.log('Audio notification not supported');
      }

      // Vibration for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      // Start hiding animation before removing notification
      const hideTimer = setTimeout(() => {
        setIsNotificationHiding(true);
      }, 3200); // Start hiding at 3.2 seconds

      // Remove notification after hide animation completes
      const removeTimer = setTimeout(() => {
        setNotification(null);
        setIsNotificationHiding(false);
      }, 4000); // Remove at 4 seconds (3.2s + 0.8s animation)

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
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

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = Math.abs(now - date); // Use absolute value to handle future dates
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears}y ago`;
  };

  const getExpandedContent = () => {
    return (
      <div className="dynamic-island-expanded">
        <div className="expanded-section">
          {/* Current Activity Status */}
          <div className="activity-status-row">
            <div className="status-indicator"></div>
            <span className="current-activity">{currentActivity}</span>
          </div>

          {/* Latest GitHub Commit */}
          {latestCommit && (
            <div className="github-commit-row">
              <AiFillGithub className="commit-icon" />
              <div className="commit-info">
                <div className="commit-message">{latestCommit.message}</div>
                <div className="commit-repo">{latestCommit.repo} • {getTimeAgo(latestCommit.time)}</div>
              </div>
            </div>
          )}

          {/* Site Last Updated */}
          {siteLastUpdated && (
            <div className="site-updated-row">
              <FaCode className="update-icon" />
              <div className="update-info">
                <div className="update-label">Site last updated</div>
                <div className="update-time">{getTimeAgo(siteLastUpdated.time)}</div>
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
        className={`dynamic-island ${notification ? 'notification' : 'minimal'} ${isExpanded ? 'expanded' : ''} ${isNotificationHiding ? 'hiding' : ''}`}
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