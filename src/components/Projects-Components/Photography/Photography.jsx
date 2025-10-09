import React, { useMemo, useEffect, useState } from "react";
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

// Category mapping for each photo
const photoCategories = {
  // Portraits
  'nethan1.jpg': 'Portraits',
  '2Z7A3908.jpg': 'Portraits',
  '2Z7A3933.jpg': 'Portraits',
  '2Z7A3942.jpg': 'Portraits',
  '2Z7A3946.jpg': 'Portraits',
  '2Z7A3967.jpg': 'Portraits',

  // Events
  'birthday_cake.jpg': 'Events',
  '2Z7A4131.jpg': 'Events',
  '2Z7A4168.jpg': 'Events',
  '2Z7A4245.jpg': 'Events',
  '2Z7A4284-2.jpg': 'Events',
  '2Z7A4386.jpg': 'Events',
  '2Z7A4428.jpg': 'Events',
  '2Z7A4502.jpg': 'Events',

  // Nature & Landscapes
  'forest_1.jpg': 'Nature',
  'forest_2.jpg': 'Nature',
  'grass.jpg': 'Nature',
  'duck.jpg': 'Nature',
  '2Z7A1330.jpg': 'Nature',
  '2Z7A1687.jpg': 'Nature',

  // Architecture
  'colongue.jpg': 'Architecture',
  '2Z7A1243.jpg': 'Architecture',

  // Creative & Artistic
  '2Z7A1520.jpg': 'Creative',
  '2Z7A1506.jpg': 'Creative',
  '2Z7A1388_1.jpg': 'Creative',
  '2Z7A1496.jpg': 'Creative',
};

const categories = ['All', 'Portraits', 'Events', 'Nature', 'Architecture', 'Creative'];

export default function Photography() {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return shuffledImages;
    }
    return shuffledImages.filter(img => {
      const filename = img.alt + '.jpg'; // Reconstruct filename
      return photoCategories[filename] === selectedCategory;
    });
  }, [selectedCategory, shuffledImages]);

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
              <li>Canon EOS R7</li>
              <li>GoPro HERO13</li>
              <li>DJI Mini 4k Drone</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>🔍 Lenses</h3>
            <ul>
              <li>Canon RF 18-150 f/3.5-6.3</li>
              <li>Canon RF 50mm f/1.8</li>
              <li>Canon RF 100-400 f/5.6-8</li>
              <li>ND Filter</li>
              <li>CPL Circular Polarizer</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>💡 Lighting</h3>
            <ul>
              <li>Aputure amaran 100x S</li>
              <li>Key lights</li>
              <li>Godox TT600</li>
            </ul>
          </div>

          <div className="equipment-category">
            <h3>🎥 Accessories</h3>
            <ul>
              <li>DJI Osmo Mobile</li>
              <li>Tripods</li>
              <li>NEEWER Octagonal Softbox</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="photograph-gallery" data-aos="fade-up" data-aos-delay="300">
        <h2>Portfolio</h2>

        {/* Category Filter */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="photo-grid">
          {filteredImages.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className="photo" />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
