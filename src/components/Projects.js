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
              <h3>💻 Computer Spex</h3>
              <ul>
                <li>GeForce RTX 4070 Ti</li>
                <li>13th Gen Intel(R) i9-13900k</li>
                <li>32.0GB RAM</li>
                <li>2TB SSD</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🖥️ Displays</h3>
              <ul>
                <li>27" Alienware AW2723DF Monitor (280hz)</li>
                <li>29" LG UltraWide FHD Monitor (60hz)</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>⌨️ Peripherals</h3>
              <ul>
                <li>Logitech G PRO Wireless</li>
                <li>Satechi Slim X1 Keyboard</li>
                <li>XVX Coral Sea Keyboard</li>
                <li>BOYI 68 Keyboard</li>
                <li>Keychron K8 Keyboard</li>
                <li>Logitech C920 Webcam</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🎧 Audio</h3>
              <ul>
                <li>Razer BlackShark V2 PRO Headset</li>
                <li>SteelSeries Arctic Nova 5p Headset</li>
                <li>Sanyum SW208 Speaker</li>
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
