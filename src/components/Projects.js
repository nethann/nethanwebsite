import React from 'react'

import "../CSS/Global/Global.css"

import Technologies from './Projects-Components/computer-science/Technologies'
import GithubProjects from './Projects-Components/computer-science/GithubProjects'
import CompletedProjects from './Projects-Components/computer-science/CompletedProjects'

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Projects() {

  Aos.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  return (
    <div className='Home-container ios-background'>
      <div className="ios-container">
        <div data-aos="fade-up">
          <Technologies />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <GithubProjects />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <CompletedProjects />
        </div>
      </div>
    </div>
  )
}
