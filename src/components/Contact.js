import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


//React Icons
import { FaDiscord, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {AiFillGithub} from "react-icons/ai"


import "../CSS/Contact/Contact.css"
import "../CSS/Global/Global.css"




export default function Contact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cce2tzg', 'template_i3gb2es', form.current, 'CIjfNKb1UjuFlNTVl')
      .then((result) => {
        alert("Email Sent")
      }, (error) => {
        alert(error.text)
      })

  }









  return (
    <div className='Home-container'>

      <section className='Contact-Section'>

        {<form className='Contact-Form' ref={form} onSubmit={sendEmail}>

          <div className='ContactSection-1'>
            <p className='Contact-Title'>Get in touch</p>
          </div>

          <div className='ContactSection-2'>
            <div className='mail-section'>
              <input className='Contact-Inputs' type="text" name="from_name" placeholder='Name' autoComplete='off' required={true} />
              <input className='Contact-Inputs' type="email" name="from_email" placeholder='Email' autoComplete='off' required={true} />
              <textarea className='Contact-Inputs Contact-textarea' name="message" placeholder='Message' required={true} />
              <input className='Contact-Submit' type="submit" value="Send" />
            </div>

          </div>

        </form>}


        <div className='Contact-Icons-Section'>
          <a href='https://discord.gg/wZdCddU6zz' target='_blank' className='contact-icon-tag discord-icon'>
            <FaDiscord className='Contact-Icon' />
          </a>

          <a href='https://www.instagram.com/xneoryx/' target='_blank' className='contact-icon-tag instagram-icon'>
            <FaInstagram className='Contact-Icon' />
          </a>

          <a href='https://www.linkedin.com/in/nethan-nagendran/' target='_blank' className='contact-icon-tag linkedin-icon'>
            <FaLinkedinIn className='Contact-Icon' />
          </a>

          <a href='https://github.com/nethann' target='_blank' className='contact-icon-tag git-icon'>
            <AiFillGithub className='Contact-Icon' />
          </a>
        </div>


      </section>





    </div>
  )
}

