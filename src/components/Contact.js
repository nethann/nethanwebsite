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
        <section className='ios-section'>
          <div className="contact-hero-section" style={{textAlign: 'center', marginBottom: 'var(--ios-space-3xl)'}}>
            <h1 className='ios-title-large' style={{marginBottom: 'var(--ios-space-lg)'}}>
              Let's Connect
            </h1>
            <p className='ios-body' style={{maxWidth: '600px', margin: '0 auto', opacity: 0.8}}>
              Ready to start something amazing together? Drop me a message and let's make it happen.
            </p>
          </div>

          <div className="ios-grid" style={{gap: 'var(--ios-space-xl)', justifyContent: 'center'}}>
            {/* Contact Form */}
            <div className='glass-card glass-ripple' style={{minHeight: '500px', maxWidth: '600px', width: '100%'}}>
              <h2 className='ios-title-medium' style={{marginBottom: 'var(--ios-space-xl)', textAlign: 'center'}}>Send a Message</h2>
              
              <form ref={form} onSubmit={sendEmail} style={{display: 'flex', flexDirection: 'column', gap: 'var(--ios-space-lg)'}}>
                <div className="input-group">
                  <input 
                    className='glass-input glass-dynamic' 
                    type="text" 
                    name="from_name" 
                    placeholder='Your Name' 
                    autoComplete='off' 
                    required={true}
                    style={{
                      fontSize: '16px',
                      fontFamily: 'var(--ios-font-system)',
                      transition: 'var(--ios-transition-smooth)'
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <input 
                    className='glass-input glass-dynamic' 
                    type="email" 
                    name="from_email" 
                    placeholder='Your Email' 
                    autoComplete='off' 
                    required={true}
                    style={{
                      fontSize: '16px',
                      fontFamily: 'var(--ios-font-system)',
                      transition: 'var(--ios-transition-smooth)'
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <textarea 
                    className='glass-input glass-dynamic' 
                    name="message" 
                    placeholder='Tell me about your project...' 
                    required={true}
                    style={{
                      fontSize: '16px',
                      fontFamily: 'var(--ios-font-system)',
                      minHeight: '140px',
                      resize: 'vertical',
                      transition: 'var(--ios-transition-smooth)'
                    }}
                  />
                </div>
                
                <button className='glass-btn' type="submit" style={{
                  marginTop: 'var(--ios-space-md)',
                  padding: 'var(--ios-space-lg) var(--ios-space-xl)',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, var(--glass-bg-primary), var(--glass-tint-blue))',
                  border: '1px solid var(--glass-border-strong)',
                  borderRadius: 'var(--ios-radius-medium)'
                }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

