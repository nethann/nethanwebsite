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

        {/* Pricing Packages Section */}
        <section className="pricing-section" data-aos="fade-up" data-aos-delay="100">
          <h2>Project Rates</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Small Project</h3>
                <div className="price">$500</div>
              </div>
              <ul className="pricing-features">
                <li>Landing page or simple website</li>
                <li>Responsive design</li>
                <li>Up to 5 pages</li>
                <li>Basic SEO optimization</li>
                <li>2 weeks delivery</li>
              </ul>
              <a href="/contact?service=development" className="pricing-button">Get Started</a>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Full Application</h3>
                <div className="price">$2,000</div>
              </div>
              <ul className="pricing-features">
                <li>Custom web application</li>
                <li>Database integration</li>
                <li>User authentication</li>
                <li>API development</li>
                <li>Hosting setup included</li>
                <li>4-6 weeks delivery</li>
              </ul>
              <a href="/contact?service=development" className="pricing-button">Get Started</a>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise Solution</h3>
                <div className="price">Custom</div>
              </div>
              <ul className="pricing-features">
                <li>Large-scale application</li>
                <li>Complex backend systems</li>
                <li>Microservices architecture</li>
                <li>Cloud deployment</li>
                <li>Ongoing support</li>
                <li>Timeline varies</li>
              </ul>
              <a href="/contact?service=development" className="pricing-button">Contact Me</a>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="equipment-section" data-aos="fade-up" data-aos-delay="200">
          <h2>Tech Stack</h2>
          <div className="equipment-grid">
            <div className="equipment-category">
              <h3>💻 Frontend</h3>
              <ul>
                <li>React & Next.js</li>
                <li>JavaScript/TypeScript</li>
                <li>HTML5 & CSS3</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>⚙️ Backend</h3>
              <ul>
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>RESTful APIs</li>
                <li>GraphQL</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🗄️ Database</h3>
              <ul>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>Firebase</li>
                <li>Redis</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>☁️ DevOps</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>Docker</li>
                <li>AWS & Vercel</li>
                <li>CI/CD Pipelines</li>
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
