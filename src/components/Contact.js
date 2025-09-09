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
    <div className='Home-container'>

      <section className='Contact-Section'>


        {<form className='Contact-Form glass-card glass-purple' ref={form} onSubmit={sendEmail} data-aos="fade-right">

          <div className='ContactSection-1'>
            <p className='Contact-Title'>Get in touch</p>
          </div>

          <div className='ContactSection-2'>
            <div className='mail-section'>
              <input className='Contact-Inputs glass-input' type="text" name="from_name" placeholder='Name' autoComplete='off' required={true} />
              <input className='Contact-Inputs glass-input' type="email" name="from_email" placeholder='Email' autoComplete='off' required={true} />
              <textarea className='Contact-Inputs Contact-textarea glass-input' name="message" placeholder='Message' required={true} />
              <input className='Contact-Submit glass-btn glass-warm' type="submit" value="Send" />
            </div>

          </div>

        </form>}

        <div className='Discord-section glass glass-cyan'>
          <div className='discord-pfp'>
            <img src={Astra} alt='Logo' className='Astra-Discord-Img' />
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <div className={`circle pulse ${discordPulse}`}></div>
            </OverlayTrigger>
          </div>

          <div className='discord-tag'>
            <p className='discord-tag-user'>Astra<span>180</span></p>
          </div>
        </div>


        <div className='Contact-Icons-Section'>

          <a href='https://www.instagram.com/nethan_journey/' target='_blank' rel='noreferrer' className='contact-icon-tag instagram-icon'>
            <FaInstagram className='Contact-Icon' />
          </a>

          <a href='https://www.linkedin.com/in/nethan-nagendran/' rel='noreferrer' target='_blank' className='contact-icon-tag linkedin-icon'>
            <FaLinkedinIn className='Contact-Icon' />
          </a>

          <a href='https://github.com/nethann' target='_blank' rel='noreferrer' className='contact-icon-tag git-icon'>
            <AiFillGithub className='Contact-Icon' />
          </a>

          <a href='https://www.youtube.com/@nethan_journey' target='_blank' rel='noreferrer' className='contact-icon-tag git-icon'>
            <FaYoutube className='Contact-Icon' />
          </a>

          <a href='https://www.tiktok.com/@nethan_journey' target='_blank' rel='noreferrer' className='contact-icon-tag git-icon'>
            <FaTiktok className='Contact-Icon' />
          </a>
        </div>


      </section>

    </div>
  )
}

