import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';

// importing CSS
import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Contact() {
  const location = useLocation();
  const form = useRef();
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setSelectedService(service);
    }
  }, [location]);

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaInstagram, url: 'https://instagram.com/yourusername', label: 'Instagram' },
    { icon: FaYoutube, url: 'https://youtube.com/@yourusername', label: 'YouTube' }
  ];

  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cce2tzg', 'template_i3gb2es', form.current, 'CIjfNKb1UjuFlNTVl')
      .then((result) => {
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('success', 'Message sent successfully!');
        }
        form.current.reset();
        setSelectedService('');
      }, (error) => {
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('error', 'Failed to send message');
        }
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-hero" data-aos="fade-up">
          <h1>Let's Work Together</h1>
          <p>Ready to start something amazing? Get in touch and let's make it happen.</p>
          <p className="location">📍 Atlanta, Georgia, United States</p>
        </div>

        <div className="contact-form-wrapper" data-aos="fade-up" data-aos-delay="100">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="service">I'm interested in</label>
              <select
                id="service"
                name="service"
                className="service-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="">Select a service...</option>
                <option value="photography">Photography Session</option>
                <option value="music">Music Gig/Performance</option>
                <option value="development">Development Project</option>
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

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-social" data-aos="fade-up" data-aos-delay="200">
          <p className="social-heading">Or connect with me on</p>
          <div className="social-links">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

