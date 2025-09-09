import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//React Icons
import { FaDiscord, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai"


// importing CSS
import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"
import "../CSS/Global/Stickers.css"


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
          <div className="ios-grid ios-grid-2">
            <form className='ios-card ios-scale-in' ref={form} onSubmit={sendEmail} data-aos="fade-right">
              <h2 className='ios-title-medium' style={{marginBottom: '2rem'}}>Get in touch</h2>

              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <input className='ios-glass-regular' style={{padding: '1rem', borderRadius: '12px', border: '1px solid var(--ios-border-regular)', background: 'var(--ios-glass-regular)', color: 'white', fontSize: '16px'}} type="text" name="from_name" placeholder='Name' autoComplete='off' required={true} />
                <input className='ios-glass-regular' style={{padding: '1rem', borderRadius: '12px', border: '1px solid var(--ios-border-regular)', background: 'var(--ios-glass-regular)', color: 'white', fontSize: '16px'}} type="email" name="from_email" placeholder='Email' autoComplete='off' required={true} />
                <textarea className='ios-glass-regular' style={{padding: '1rem', borderRadius: '12px', border: '1px solid var(--ios-border-regular)', background: 'var(--ios-glass-regular)', color: 'white', fontSize: '16px', minHeight: '120px', resize: 'vertical'}} name="message" placeholder='Message' required={true} />
                <button className='ios-btn-primary' type="submit">Send Message</button>
              </div>
            </form>

            <div className='ios-card ios-scale-in ios-interactive' style={{animationDelay: '0.2s', textAlign: 'center'}}>
              <div style={{marginBottom: '2rem'}}>
                <img src={Astra} alt='Discord Profile' style={{width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem'}} />
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <div className={`circle pulse ${discordPulse}`} style={{display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', marginLeft: '8px'}}></div>
                </OverlayTrigger>
                <h3 className='ios-title-medium' style={{marginBottom: '0.5rem'}}>Astra<span style={{opacity: 0.6}}>180</span></h3>
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
                <a href='https://www.instagram.com/nethan_journey/' target='_blank' rel='noreferrer' className='ios-dynamic-pill' style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <FaInstagram style={{fontSize: '20px'}} />
                </a>

                <a href='https://www.linkedin.com/in/nethan-nagendran/' rel='noreferrer' target='_blank' className='ios-dynamic-pill' style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <FaLinkedinIn style={{fontSize: '20px'}} />
                </a>

                <a href='https://github.com/nethann' target='_blank' rel='noreferrer' className='ios-dynamic-pill' style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <AiFillGithub style={{fontSize: '20px'}} />
                </a>

                <a href='https://www.youtube.com/@nethan_journey' target='_blank' rel='noreferrer' className='ios-dynamic-pill' style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <FaYoutube style={{fontSize: '20px'}} />
                </a>

                <a href='https://www.tiktok.com/@nethan_journey' target='_blank' rel='noreferrer' className='ios-dynamic-pill' style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <FaTiktok style={{fontSize: '20px'}} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

