import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok, FaEnvelope } from 'react-icons/fa';
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

