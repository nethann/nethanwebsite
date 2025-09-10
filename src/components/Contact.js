import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

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
        </section>
      </div>
    </div>
  )
}

