import React, { useMemo, useEffect } from "react";
import "../../../CSS/Projects/Photography/Photography.css";

import Aos from 'aos';
import "aos/dist/aos.css";

// Automatically require all images from folder
const importAll = (r) =>
  r.keys().map((key) => ({
    src: r(key),
    alt: key.replace('./', '').replace(/\.[^/.]+$/, '') // remove './' and file extension
  }));

const originalImages = importAll(
  require.context("./Photograph_Images", false, /\.(jpe?g|png|webp)$/)
);

export default function Photography() {
  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // Shuffle once on first render
  const shuffledImages = useMemo(() => {
    const shuffled = [...originalImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  return (
    <div className="photography-wrapper">
      <div className="photography-page">
        <section className="photograph-intro" style={{paddingTop: '8rem'}} data-aos="fade-up">
        <h1>Photography</h1>
        <p>Moments in time, framed through my lens</p>
        <p className="location">📍 Atlanta, Georgia, United States</p>
      </section>

      {/* Pricing Packages Section */}
      <section className="pricing-section" data-aos="fade-up" data-aos-delay="100">
        <h2>Pricing Packages</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Portrait Session</h3>
              <div className="price">$150</div>
            </div>
            <ul className="pricing-features">
              <li>1-hour session</li>
              <li>1 location</li>
              <li>20 edited photos</li>
              <li>Online gallery</li>
              <li>Personal use rights</li>
            </ul>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Event Coverage</h3>
              <div className="price">$350</div>
            </div>
            <ul className="pricing-features">
              <li>3-hour coverage</li>
              <li>Multiple locations</li>
              <li>75+ edited photos</li>
              <li>Online gallery</li>
              <li>Commercial use rights</li>
              <li>Same-day highlights</li>
            </ul>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Full Day</h3>
              <div className="price">$600</div>
            </div>
            <ul className="pricing-features">
              <li>8-hour coverage</li>
              <li>Unlimited locations</li>
              <li>150+ edited photos</li>
              <li>Online gallery</li>
              <li>Full commercial rights</li>
              <li>Prints included</li>
            </ul>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="equipment-section" data-aos="fade-up" data-aos-delay="200">
        <h2>My Equipment</h2>
        <div className="equipment-grid">
          <div className="equipment-category">
            <h3>📷 Cameras</h3>
            <ul>
              <li>Canon EOS R5</li>
              <li>Sony A7 IV</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>🔍 Lenses</h3>
            <ul>
              <li>Canon RF 24-70mm f/2.8</li>
              <li>Canon RF 70-200mm f/2.8</li>
              <li>Canon RF 50mm f/1.2</li>
              <li>Sony FE 85mm f/1.4</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>💡 Lighting</h3>
            <ul>
              <li>Godox AD200 Pro</li>
              <li>Profoto B10</li>
              <li>LED Panel Kit</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>🎥 Accessories</h3>
            <ul>
              <li>DJI Ronin RS3</li>
              <li>Peak Design Tripod</li>
              <li>Reflectors & Diffusers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="photograph-gallery" data-aos="fade-up" data-aos-delay="300">
        <h2>Portfolio</h2>
        <div className="photo-grid">
          {shuffledImages.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className="photo" />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
