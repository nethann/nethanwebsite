import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import '../../CSS/Global/ContactModal.css';

export default function ContactModal({ isOpen, onClose, service = '' }) {
  const [selectedService, setSelectedService] = useState(service);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const serviceLabels = {
    'photography': 'Photography Session',
    'music': 'Music Gig/Performance',
    'development': 'Development Project',
    'general': 'General Inquiry'
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedService(service || '');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  }, [isOpen, service]);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedService) {
      newErrors.service = 'Please select a service';
    }

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter a message';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Rate limiting: Check if user sent a message recently
    const lastMessageTime = localStorage.getItem('lastContactMessageTime');
    const now = Date.now();

    if (lastMessageTime) {
      const timeSinceLastMessage = now - parseInt(lastMessageTime);
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes

      if (timeSinceLastMessage < cooldownPeriod) {
        const minutesRemaining = Math.ceil((cooldownPeriod - timeSinceLastMessage) / 60000);
        setErrors({ submit: `Please wait ${minutesRemaining} minute(s) before sending another message` });
        return;
      }
    }

    setIsSubmitting(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        localStorage.setItem('lastContactMessageTime', now.toString());
        // Show success notification in Dynamic Island
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('success', 'Message sent successfully!');
        }

        // Close modal after short delay
        setTimeout(() => {
          onClose();
        }, 800);
      }, (error) => {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="contact-modal-header">
          <h2>Contact Me</h2>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          {/* Hidden service field for EmailJS */}
          <input type="hidden" name="service_type" value={serviceLabels[selectedService] || 'General Inquiry'} />

          {/* Service Selector */}
          <div className="form-group">
            <label htmlFor="service">I'm interested in *</label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={errors.service ? 'error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select a service...</option>
              <option value="photography">📸 Photography Session</option>
              <option value="music">🎵 Music Gig/Performance</option>
              <option value="development">💻 Development Project</option>
              <option value="general">💬 General Inquiry</option>
            </select>
            {errors.service && <span className="error-message">{errors.service}</span>}
          </div>

          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={errors.name ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="from_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Message Textarea */}
          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows="5"
              className={errors.message ? 'error' : ''}
              disabled={isSubmitting}
            />
            <span className="character-count">
              {message.length} characters
            </span>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="contact-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
