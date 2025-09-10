import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//React Icons
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai"


// importing CSS
import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"
import "../CSS/Global/Stickers.css"
import "../CSS/Global/iOS26DesignSystem.css"
import "../CSS/Global/LiquidGlass.css"


import Aos from 'aos';
import "aos/dist/aos.css"
import axios from 'axios';

import Astra from "./Images/AstraPfp.png"

export default function Contact() {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Discord Status
    </Tooltip>
  );

  const discordUrl = 'https://api.lanyard.rest/v1/users/743601359697477713';

  const [discordPulse, setDiscordPulse] = useState('')

  useEffect(() => {
    axios.get(discordUrl).then((discordResponse) => {
      const disVar = discordResponse.data.data.discord_status;


      if (disVar === 'online') {
        setDiscordPulse('discord-pulse-online')
      }

      else if (disVar === 'idle') {
        setDiscordPulse('discord-pulse-idle')
      }

      else if (disVar === 'dnd') {
        setDiscordPulse('discord-pulse-dnd')
      }

      else if (disVar === 'offline') {
        setDiscordPulse('discord-pulse-offline')
      }

    })
  })

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cce2tzg', 'template_i3gb2es', form.current, 'CIjfNKb1UjuFlNTVl')
      .then((result) => {
        alert("Email Sent")
        form.current.reset();
      }, (error) => {
        alert(error.text)
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

          <div className="ios-grid" style={{gap: 'var(--ios-space-xl)', gridTemplateColumns: '2fr 1fr', alignItems: 'start'}}>
            {/* Contact Form */}
            <div className='glass-card glass-ripple' style={{minHeight: '500px'}}>
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

            {/* Profile Card */}
            <div className='glass-card glass-ripple' style={{textAlign: 'center', maxWidth: '320px', justifySelf: 'center'}}>
              <div className="profile-section" style={{marginBottom: 'var(--ios-space-xl)'}}>
                <div className="profile-image-container" style={{position: 'relative', display: 'inline-block', marginBottom: 'var(--ios-space-lg)'}}>
                  <img 
                    src={Astra} 
                    alt='Discord Profile' 
                    className=''
                    style={{
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%',
                      border: '2px solid var(--glass-border)',
                      boxShadow: 'var(--glass-shadow-md)'
                    }} 
                  />
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <div 
                      className={`circle pulse ${discordPulse}`} 
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%',
                        border: '2px solid var(--ios-bg-primary)',
                        cursor: 'pointer'
                      }}
                    ></div>
                  </OverlayTrigger>
                </div>
                
                <h3 className='ios-title-medium' style={{marginBottom: 'var(--ios-space-sm)'}}>
                  Astra<span style={{opacity: 0.6}}>180</span>
                </h3>
                
                <p className='ios-caption' style={{marginBottom: 'var(--ios-space-xl)'}}>
                  Always online • Ready to chat
                </p>
              </div>

              <div className="social-links" style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center'}}>
                <a href='https://www.instagram.com/nethan_journey/' target='_blank' rel='noreferrer' className='glass-btn' style={{
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}>
                  <FaInstagram />
                </a>

                <a href='https://www.linkedin.com/in/nethan-nagendran/' rel='noreferrer' target='_blank' className='glass-btn' style={{
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}>
                  <FaLinkedinIn />
                </a>

                <a href='https://github.com/nethann' target='_blank' rel='noreferrer' className='glass-btn' style={{
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}>
                  <AiFillGithub />
                </a>

                <a href='https://www.youtube.com/@nethan_journey' target='_blank' rel='noreferrer' className='glass-btn' style={{
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}>
                  <FaYoutube />
                </a>

                <a href='https://www.tiktok.com/@nethan_journey' target='_blank' rel='noreferrer' className='glass-btn' style={{
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '18px'
                }}>
                  <FaTiktok />
                </a>
              </div>
              
              <div className="contact-info" style={{marginTop: 'var(--ios-space-xl)', padding: 'var(--ios-space-lg)', background: 'var(--glass-bg-secondary)', borderRadius: 'var(--ios-radius-medium)', border: '1px solid var(--glass-border)'}}>
                <p className='ios-caption' style={{margin: '0', color: 'rgba(255, 255, 255, 0.7)'}}>
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

