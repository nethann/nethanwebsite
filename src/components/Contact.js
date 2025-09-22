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
  const [paymentType, setPaymentType] = useState('one-time'); // 'one-time' or 'monthly'
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
      oneTime: {
        5: 'https://buy.stripe.com/test_3cs8zK0T41Bm9xK000', // Replace with your actual links
        10: 'https://buy.stripe.com/test_14kaHSd78f77axO001',
        25: 'https://buy.stripe.com/test_5kA8zK77P67TbCo002',
        custom: 'https://buy.stripe.com/test_dR6bLW0X8bZj9xK003'
      },
      monthly: {
        5: 'https://buy.stripe.com/test_4gw8zK1Xc37F5xi004', // Replace with your actual subscription links
        10: 'https://buy.stripe.com/test_14k7uJb1cbtb5xi005',
        25: 'https://buy.stripe.com/test_8wMaHSdZfexr1l6006',
        custom: 'https://buy.stripe.com/test_9AQ4iB77P9Vf3t6007'
      }
    };

    const isMonthly = paymentType === 'monthly';
    const links = isMonthly ? paymentLinks.monthly : paymentLinks.oneTime;

    if (amount === 'custom') {
      // For custom amounts, you can either:
      // 1. Use Stripe's Payment Element with custom amounts (requires backend)
      // 2. Redirect to a custom payment link that allows variable amounts
      // 3. Use a simple prompt for now and redirect to a general payment link

      const customAmount = prompt(`Enter your ${isMonthly ? 'monthly ' : ''}donation amount (USD):`);
      if (customAmount && !isNaN(customAmount) && parseFloat(customAmount) > 0) {
        // For now, redirect to the custom payment link
        // You should create a payment link in Stripe that allows custom amounts
        window.open(links.custom, '_blank');

        if (window.showDynamicIslandNotification) {
          window.showDynamicIslandNotification('success', `Opening ${isMonthly ? 'monthly ' : ''}payment for $${customAmount}`);
        }
      }
    } else {
      // Open the predefined payment link
      window.open(links[amount], '_blank');

      if (window.showDynamicIslandNotification) {
        window.showDynamicIslandNotification('success', `Opening ${isMonthly ? 'monthly ' : ''}payment for $${amount}`);
      }
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
                  {/* Payment Type Selection */}
                  <div className="payment-type-selector">
                    <button
                      className={`payment-type-btn ${paymentType === 'one-time' ? 'active' : ''}`}
                      onClick={() => setPaymentType('one-time')}
                    >
                      <FaCreditCard className="payment-type-icon" />
                      <span>One-time</span>
                    </button>
                    <button
                      className={`payment-type-btn ${paymentType === 'monthly' ? 'active' : ''}`}
                      onClick={() => setPaymentType('monthly')}
                    >
                      <FaCalendarAlt className="payment-type-icon" />
                      <span>Monthly</span>
                    </button>
                  </div>

                  <div className="donation-amounts">
                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(5)}
                    >
                      <FaCoffee className="donation-btn-icon" />
                      <span className="donation-amount">$5</span>
                      <span className="donation-label">
                        {paymentType === 'monthly' ? 'Monthly coffee' : 'Buy me a coffee'}
                      </span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(10)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$10</span>
                      <span className="donation-label">
                        {paymentType === 'monthly' ? 'Monthly support' : 'Show some love'}
                      </span>
                    </button>

                    <button
                      className="donation-btn"
                      onClick={() => handleDonation(25)}
                    >
                      <FaHeart className="donation-btn-icon" />
                      <span className="donation-amount">$25</span>
                      <span className="donation-label">
                        {paymentType === 'monthly' ? 'Monthly sponsor' : 'Super supporter'}
                      </span>
                    </button>

                    <button
                      className="donation-btn custom-amount"
                      onClick={() => handleDonation('custom')}
                    >
                      <span className="donation-amount">Custom</span>
                      <span className="donation-label">
                        {paymentType === 'monthly' ? 'Custom monthly' : 'Choose your amount'}
                      </span>
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

