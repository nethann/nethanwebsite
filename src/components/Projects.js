import React from 'react'

import "../CSS/Global/Global.css"

import Technologies from './Projects-Components/computer-science/Technologies'
import GithubProjects from './Projects-Components/computer-science/GithubProjects'
import CompletedProjects from './Projects-Components/computer-science/CompletedProjects'

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Projects() {

  Aos.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true
  });

  return (
    <div className='Home-container ios-background'>
      <div className="ios-container" style={{paddingTop: '8rem'}}>
        <div className="dev-intro" data-aos="fade-up">
          <h1>Development</h1>
          <p>Building modern web applications and software solutions</p>
          <p className="location">📍 Atlanta, Georgia, United States</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <Technologies />
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <GithubProjects />
        </div>
        <div data-aos="fade-up" data-aos-delay="500">
          <CompletedProjects />
        </div>
      </div>
    </div>
  )
}
