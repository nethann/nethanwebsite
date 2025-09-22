import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok, FaEnvelope, FaHeart, FaCoffee, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

// importing CSS
import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"
import "../CSS/Global/Stickers.css"
import "../CSS/Global/iOS26DesignSystem.css"
import "../CSS/Global/LiquidGlass.css"

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Contact() {
  const form = useRef();
  const [paymentType, setPaymentType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/nethan_journey/', label: 'Instagram', color: '#E4405F' },
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/nethan-nagendran/', label: 'LinkedIn', color: '#0077B5' },
    { icon: AiFillGithub, url: 'https://github.com/nethann', label: 'GitHub', color: '#333' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@nethan_journey', label: 'YouTube', color: '#FF0000' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@nethan_journey', label: 'TikTok', color: '#000000' }
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cce2tzg', 'template_i3gb2es', form.current, 'CIjfNKb1UjuFlNTVl')
      .then((result) => {
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('success', 'Message sent successfully!');
        }
        form.current.reset();
      }, (error) => {
        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('error', 'Failed to send message');
        }
      })

  }

  const handleDonation = (amount) => {
    // For now, using a simple approach - you'll need to create these payment links in your Stripe dashboard
    // Go to Stripe Dashboard > Payment Links to create these

    const paymentLinks = {
      5: 'https://buy.stripe.com/14AeVe7OU6Qn4c1fqgc7u02',
      10: 'https://buy.stripe.com/aFadRa6KQa2z0ZPdi8c7u03',
      25: 'https://buy.stripe.com/cNidRa0ms4IffUJ5PGc7u04',
      50: 'https://buy.stripe.com/aFa7sMb16eiP37Xgukc7u05',
      100: 'https://buy.stripe.com/5kQ4gA6KQ3Eb6k9di8c7u06'
    };

    window.open(paymentLinks[amount], '_blank');

    if (window.showDynamicIslandNotification) {
      window.showDynamicIslandNotification('success', `Opening payment for $${amount}`);
    }
  };


  Aos.init({
    duration: 500,
    once: true
  });

  return (
    <div className='Home-container ios-background'>
      <div className="ios-container">
        <section className='ios-section' style={{paddingTop: '8rem'}}>
          <div className="contact-hero-section" style={{textAlign: 'center', marginBottom: 'var(--ios-space-3xl)'}}>
            <h1 className='ios-title-large' style={{marginBottom: 'var(--ios-space-lg)'}}>
              Let's Connect
            </h1>
            <p className='ios-body' style={{maxWidth: '600px', margin: '0 auto', opacity: 0.8}}>
              Ready to start something amazing together? Drop me a message and let's make it happen.
            </p>
          </div>

          {/* Contact and Donation Grid */}
          <div className="contact-donation-grid">
            <div className="contact-form-container">
              <div className="modern-contact-form">
                <div className="form-header">
                  <h2 className="form-title">Let's work together</h2>
                  <p className="form-subtitle">Tell me about your project and I'll get back to you within 24 hours</p>
                </div>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                  <div className="form-row">
                    <div className="input-wrapper">
                      <input
                        className="modern-input"
                        type="text"
                        name="from_name"
                        placeholder=" "
                        autoComplete="off"
                        required={true}
                      />
                      <label className="modern-label">Your Name</label>
                      <div className="input-line"></div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-wrapper">
                      <input
                        className="modern-input"
                        type="email"
                        name="from_email"
                        placeholder=" "
                        autoComplete="off"
                        required={true}
                      />
                      <label className="modern-label">Email Address</label>
                      <div className="input-line"></div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-wrapper textarea-wrapper">
                      <textarea
                        className="modern-input modern-textarea"
                        name="message"
                        placeholder=" "
                        required={true}
                        rows="1"
                      ></textarea>
                      <label className="modern-label">Project Details</label>
                      <div className="input-line"></div>
                    </div>
                  </div>

                  <div className="form-row">
                    <button className="modern-submit-btn" type="submit">
                      <span className="btn-text">Send Message</span>
                      <div className="btn-bg"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Support My Work Section */}
            <div className="donation-section">
              <div className="donation-card">
                <div className="donation-header">
                  <div className="donation-icon">
                    <FaHeart className="heart-icon" />
                  </div>
                  <h3 className="donation-title">Support My Work</h3>
                  <p className="donation-subtitle">
                    Love what I do? Your support helps me create more amazing content and continue building cool projects!
                  </p>
                </div>

                <div className="donation-options">

                  <div className="donation-amounts">
                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(5)}
                    >
                      <FaCoffee className="donation-btn-icon" />
                      <span className="donation-amount">$5</span>
                      <span className="donation-label">Buy me a coffee</span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(10)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$10</span>
                      <span className="donation-label">Show some love</span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(25)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$25</span>
                      <span className="donation-label">Super supporter</span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(50)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$50</span>
                      <span className="donation-label">Amazing supporter</span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(100)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$100</span>
                      <span className="donation-label">Ultimate supporter</span>
                    </button>
                  </div>

                  <div className="donation-secure">
                    <span className="secure-text">🔒 Secure payment powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <section className="contact-social-section" style={{marginTop: 'var(--ios-space-3xl)', textAlign: 'center'}}>
            <div className="social-divider">
              <span className="divider-text">Or connect with me on</span>
            </div>

            <div className="contact-social-links">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    title={social.label}
                    style={{'--social-color': social.color}}
                  >
                    <div className="contact-social-icon">
                      <IconComponent />
                    </div>
                    <span className="contact-social-label">{social.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="contact-footer-note">
              <p className="ios-body-small" style={{opacity: 0.6}}>
                I typically respond within 24 hours. Looking forward to hearing from you!
              </p>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

