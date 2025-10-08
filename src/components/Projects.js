import React, { useEffect } from 'react'

import "../CSS/Global/Global.css"

import Technologies from './Projects-Components/computer-science/Technologies'
import GithubProjects from './Projects-Components/computer-science/GithubProjects'
import CompletedProjects from './Projects-Components/computer-science/CompletedProjects'

import Aos from 'aos';
import "aos/dist/aos.css"

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        {/* PC Equipment Section */}
        <section className="equipment-section" data-aos="fade-up" data-aos-delay="200">
          <h2>My Setup</h2>
          <div className="equipment-grid">
            <div className="equipment-category">
              <h3>💻 Computer</h3>
              <ul>
                <li>Custom Built PC</li>
                <li>AMD Ryzen 9 5900X</li>
                <li>NVIDIA RTX 3080</li>
                <li>32GB DDR4 RAM</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🖥️ Displays</h3>
              <ul>
                <li>27" 4K Monitor</li>
                <li>24" 1080p Secondary</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>⌨️ Peripherals</h3>
              <ul>
                <li>Mechanical Keyboard</li>
                <li>Wireless Mouse</li>
                <li>USB Microphone</li>
                <li>Webcam</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🎧 Audio</h3>
              <ul>
                <li>Studio Headphones</li>
                <li>Desktop Speakers</li>
              </ul>
            </div>
          </div>
        </section>

        <div data-aos="fade-up" data-aos-delay="300">
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
