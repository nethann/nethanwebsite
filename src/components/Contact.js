import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// importing CSS
import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Contact() {
  const location = useLocation();
  const form = useRef();
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      // Map URL parameter to dropdown value
      const serviceMap = {
        'photography': 'Photography Session',
        'music': 'Music Gig/Performance',
        'development': 'Development Project'
      };
      setSelectedService(serviceMap[service] || service);
    }
  }, [location]);


  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Rate limiting: Check if user sent a message recently
    const lastMessageTime = localStorage.getItem('lastContactMessageTime');
    const now = Date.now();

    if (lastMessageTime) {
      const timeSinceLastMessage = now - parseInt(lastMessageTime);
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes

      if (timeSinceLastMessage < cooldownPeriod) {
        const minutesRemaining = Math.ceil((cooldownPeriod - timeSinceLastMessage) / 60000);
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('error', `Please wait ${minutesRemaining} minute(s) before sending another message`);
        }
        return;
      }
    }

    setIsSubmitting(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        localStorage.setItem('lastContactMessageTime', now.toString());
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('success', 'Message sent successfully!');
        }
        form.current.reset();
        setSelectedService('');
      }, (error) => {
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('error', 'Failed to send message');
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-hero" data-aos="fade-up">
          <h1>Let's Work Together</h1>
          <p>Ready to start something amazing? Get in touch and let's make it happen.</p>
        </div>

        <div className="contact-form-wrapper" data-aos="fade-up" data-aos-delay="100">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="service">I'm interested in</label>
              <select
                id="service"
                name="service_type"
                className="service-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="">Select a service...</option>
                <option value="Photography Session">Photography Session</option>
                <option value="Music Gig/Performance">Music Gig/Performance</option>
                <option value="Development Project">Development Project</option>
              </select>
            </div>

            <div className="form-row-double">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="from_name"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="from_email"
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell me about your project</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Share details about what you're looking for..."
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

