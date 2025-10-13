import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaMusic, FaClock, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, FaStar, FaTimes, FaEnvelope } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { MdNotifications, MdCheck, MdError } from 'react-icons/md';
import { addReview } from '../../services/reviewService';
import emailjs from '@emailjs/browser';
import ContactModal from './ContactModal';
import '../../CSS/Global/DynamicIsland.css';

export default function DynamicIsland() {
  // Social links configuration - moved to top to avoid hoisting issues
  const socialLinks = [
    { icon: FaEnvelope, url: null, label: 'Contact', platform: 'contact', isContact: true },
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

  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewCategory, setReviewCategory] = useState(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewErrors, setReviewErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact form states
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactService, setContactService] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState({});
  const contactFormRef = useRef();

  // Contact modal states (for mobile)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalService, setContactModalService] = useState('');

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

  // Handle opening review form (only on desktop)
  const openReviewForm = (category) => {
    // Check if we're on desktop (>= 768px)
    if (window.innerWidth >= 768) {
      setReviewCategory(category);
      setShowReviewForm(true);
      setIsExpanded(false); // Close normal expansion

      // Reset form
      setReviewName('');
      setReviewRating(0);
      setHoverRating(0);
      setReviewComment('');
      setReviewErrors({});

      // Check if user can submit
      const lastReviewKey = `lastReview_${category}`;
      const lastReviewTime = localStorage.getItem(lastReviewKey);

      if (lastReviewTime) {
        const hoursSinceLastReview = (Date.now() - parseInt(lastReviewTime)) / (1000 * 60 * 60);

        if (hoursSinceLastReview < 24) {
          const hoursRemaining = Math.ceil(24 - hoursSinceLastReview);
          setReviewErrors({
            submit: `You can only submit one review per day. Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review.`
          });
        }
      }
    } else {
      // On mobile, fall back to modal
      if (window.openReviewModal) {
        window.openReviewModal(category);
      }
    }
  };

  // Expose review form function globally
  useEffect(() => {
    window.openDynamicIslandReview = openReviewForm;
    return () => {
      delete window.openDynamicIslandReview;
    };
  }, []);

  // Validate review form
  const validateReviewForm = () => {
    const newErrors = {};

    if (!reviewName.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (reviewRating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!reviewComment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (reviewComment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }

    setReviewErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Check rate limit
    const lastReviewKey = `lastReview_${reviewCategory}`;
    const lastReviewTime = localStorage.getItem(lastReviewKey);

    if (lastReviewTime) {
      const hoursSinceLastReview = (Date.now() - parseInt(lastReviewTime)) / (1000 * 60 * 60);

      if (hoursSinceLastReview < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastReview);
        setReviewErrors({
          submit: `You can only submit one review per day. Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review.`
        });
        return;
      }
    }

    if (!validateReviewForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addReview(reviewCategory, {
        name: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim()
      });

      localStorage.setItem(lastReviewKey, Date.now().toString());

      // Close form
      setShowReviewForm(false);

      // Show success notification
      showNotification('success', 'Review submitted! Thank you!');

      // Refresh page after delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setReviewErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close review form
  const closeReviewForm = () => {
    setShowReviewForm(false);
    setReviewCategory(null);
  };

  // Handle opening contact form (desktop) or modal (mobile)
  const openContactForm = (service) => {
    // Check if we're on desktop (>= 768px)
    if (window.innerWidth >= 768) {
      setContactService(service);
      setShowContactForm(true);
      setIsExpanded(false); // Close normal expansion
      setShowReviewForm(false); // Close review form if open

      // Reset form
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactErrors({});
    } else {
      // On mobile, show modal
      setIsContactModalOpen(true);
      setContactModalService(service);
    }
  };

  // Expose contact form function globally
  useEffect(() => {
    window.openDynamicIslandContact = openContactForm;
    return () => {
      delete window.openDynamicIslandContact;
    };
  }, []);

  // Validate contact form
  const validateContactForm = () => {
    const newErrors = {};

    if (!contactService) {
      newErrors.service = 'Please select a service';
    }

    if (!contactName.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!contactEmail.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!contactMessage.trim()) {
      newErrors.message = 'Please enter a message';
    } else if (contactMessage.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    setIsSubmitting(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      contactFormRef.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        // Close form
        setShowContactForm(false);

        // Show success notification
        showNotification('success', 'Message sent successfully!');

        // Reset form
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setContactService('');
      }, (error) => {
        setContactErrors({ submit: 'Failed to send message. Please try again.' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Close contact form
  const closeContactForm = () => {
    setShowContactForm(false);
    setContactService('');
  };


  const getMinimalContent = () => {
    if (notification) {
      const getNotificationIcon = () => {
        if (notification?.type === 'success') return <MdCheck />;
        if (notification?.type === 'error') return <MdError />;
        return <MdNotifications />;
      };

      return (
        <div className="dynamic-island-content notification">
          {getNotificationIcon()}
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

          {/* Social Links */}
          <div className="social-links-row">
            {socialLinks.filter(social => !social.isContact).map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item"
                  data-platform={social.platform}
                  aria-label={social.label}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>

          {/* Contact Button */}
          <button
            className="contact-button-island"
            onClick={() => openContactForm('general')}
          >
            <FaEnvelope />
            <span>Contact Me</span>
          </button>

          <div className="tech-row">
            <span className="tech-badge">Programmed with React by Nethan</span>
          </div>
        </div>
      </div>
    );
  };

  const handleFloatingTooltipDismiss = () => {
    setShowFloatingTooltip(false);
    localStorage.setItem('dynamicIslandFloatingTooltipSeen', 'true');
  };

  // Get review form content
  const getReviewFormContent = () => {
    return (
      <div className="review-form-container">
        <div className="review-form-header">
          <h3>Leave a Review</h3>
          <p className="review-category-label">
            {reviewCategory === 'photography' ? '📸 Photography' : '🎵 Music'}
          </p>
          <button className="review-form-close" onClick={closeReviewForm}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleReviewSubmit} className="review-form-island">
          {/* Name Input */}
          <div className="form-group-island">
            <label htmlFor="review-name">Your Name *</label>
            <input
              type="text"
              id="review-name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Enter your name"
              className={reviewErrors.name ? 'error' : ''}
              disabled={isSubmitting}
            />
            {reviewErrors.name && <span className="error-message">{reviewErrors.name}</span>}
          </div>

          {/* Star Rating */}
          <div className="form-group-island">
            <label>Rating *</label>
            <div className="star-rating-island">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= (hoverRating || reviewRating) ? 'filled' : ''}`}
                  onClick={() => setReviewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {reviewErrors.rating && <span className="error-message">{reviewErrors.rating}</span>}
          </div>

          {/* Comment Textarea */}
          <div className="form-group-island">
            <label htmlFor="review-comment">Your Review *</label>
            <textarea
              id="review-comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder={`Share your experience with Nethan's ${reviewCategory}...`}
              rows="4"
              className={reviewErrors.comment ? 'error' : ''}
              disabled={isSubmitting}
            />
            <span className="character-count">{reviewComment.length} characters</span>
            {reviewErrors.comment && <span className="error-message">{reviewErrors.comment}</span>}
          </div>

          {/* Submit Error */}
          {reviewErrors.submit && (
            <div className="error-message submit-error">{reviewErrors.submit}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="review-submit-button-island"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    );
  };

  // Get contact form content
  const getContactFormContent = () => {
    const serviceLabels = {
      'photography': 'Photography Session',
      'music': 'Music Gig/Performance',
      'development': 'Development Project',
      'general': 'General Inquiry'
    };

    return (
      <div className="review-form-container">
        <div className="review-form-header">
          <h3>Contact Me</h3>
          <button className="review-form-close" onClick={closeContactForm}>
            <FaTimes />
          </button>
        </div>

        <form ref={contactFormRef} onSubmit={handleContactSubmit} className="review-form-island">
          {/* Hidden service field for EmailJS */}
          <input type="hidden" name="service_type" value={serviceLabels[contactService] || 'General Inquiry'} />

          {/* Service Selector */}
          <div className="form-group-island">
            <label htmlFor="contact-service">I'm interested in *</label>
            <select
              id="contact-service"
              value={contactService}
              onChange={(e) => setContactService(e.target.value)}
              className={contactErrors.service ? 'error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select a service...</option>
              <option value="photography">📸 Photography Session</option>
              <option value="music">🎵 Music Gig/Performance</option>
              <option value="development">💻 Development Project</option>
              <option value="general">💬 General Inquiry</option>
            </select>
            {contactErrors.service && <span className="error-message">{contactErrors.service}</span>}
          </div>

          {/* Name Input */}
          <div className="form-group-island">
            <label htmlFor="contact-name">Your Name *</label>
            <input
              type="text"
              id="contact-name"
              name="from_name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="John Doe"
              className={contactErrors.name ? 'error' : ''}
              disabled={isSubmitting}
            />
            {contactErrors.name && <span className="error-message">{contactErrors.name}</span>}
          </div>

          {/* Email Input */}
          <div className="form-group-island">
            <label htmlFor="contact-email">Email Address *</label>
            <input
              type="email"
              id="contact-email"
              name="from_email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="john@example.com"
              className={contactErrors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {contactErrors.email && <span className="error-message">{contactErrors.email}</span>}
          </div>

          {/* Message Textarea */}
          <div className="form-group-island">
            <label htmlFor="contact-message">Your Message *</label>
            <textarea
              id="contact-message"
              name="message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows="4"
              className={contactErrors.message ? 'error' : ''}
              disabled={isSubmitting}
            />
            <span className="character-count">{contactMessage.length} characters</span>
            {contactErrors.message && <span className="error-message">{contactErrors.message}</span>}
          </div>

          {/* Submit Error */}
          {contactErrors.submit && (
            <div className="error-message submit-error">{contactErrors.submit}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="review-submit-button-island"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="dynamic-island-container">
      <div
        className={`dynamic-island ${notification ? `notification notification-${notification.type}` : 'minimal'} ${isExpanded ? 'expanded' : ''} ${showReviewForm ? 'review-form-expanded' : ''} ${showContactForm ? 'review-form-expanded' : ''} ${isNotificationHiding ? 'hiding' : ''}`}
        onMouseEnter={() => !notification && !showReviewForm && !showContactForm && setIsExpanded(true)}
        onMouseLeave={() => !showReviewForm && !showContactForm && setIsExpanded(false)}
      >
        {showContactForm ? getContactFormContent() : (showReviewForm ? getReviewFormContent() : (isExpanded && !notification ? getExpandedContent() : getMinimalContent()))}
      </div>

      {showFloatingTooltip && (
        <div className="floating-tooltip" onClick={handleFloatingTooltipDismiss}>
          <div className="floating-tooltip-content">
            View my socials
          </div>
        </div>
      )}

      {/* Contact Modal for mobile */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        service={contactModalService}
      />
    </div>
  );
}