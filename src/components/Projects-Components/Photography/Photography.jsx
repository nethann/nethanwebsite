import React, { useMemo, useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
import "../../../CSS/Projects/Photography/Photography.css";

import Aos from 'aos';
import "aos/dist/aos.css";

// Review components
import ReviewModal from '../../Global-Components/ReviewModal';
import ReviewDisplay from '../../Global-Components/ReviewDisplay';
import { getReviewsByCategory } from '../../../services/reviewService';

// Import all images from category subfolders
const importAll = (r) =>
  r.keys().map((key) => ({
    src: r(key),
    alt: key.replace('./', '').replace(/\.[^/.]+$/, ''),
    category: key.split('/')[1] // Extract category from path like "./Portraits/image.jpg"
  }));

// Import from all category subfolders
const importFromCategories = () => {
  const categories = ['Portraits', 'Events', 'Nature', 'Wildlife', 'Architecture', 'Creative'];
  let allImages = [];

  categories.forEach(category => {
    try {
      const categoryImages = importAll(
        require.context("./Photograph_Images", true, /\.(jpe?g|png|webp)$/)
      ).filter(img => img.category === category);
      allImages = [...allImages, ...categoryImages];
    } catch (error) {
      console.log(`No images found in ${category} folder`);
    }
  });

  return allImages;
};

const originalImages = importFromCategories();

const categories = ['All', 'Portraits', 'Events', 'Nature', 'Wildlife', 'Architecture', 'Creative'];

export default function Photography() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Load reviews asynchronously
    const loadReviews = async () => {
      const photographyReviews = await getReviewsByCategory('photography');
      setReviews(photographyReviews);
    };
    loadReviews();

    // Expose function for Dynamic Island to open review modal
    window.openReviewModal = (category) => {
      if (category === 'photography') {
        setIsReviewModalOpen(true);
      }
    };

    Aos.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });

    return () => {
      delete window.openReviewModal;
    };
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
    return shuffledImages.filter(img => img.category === selectedCategory);
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
              <h3>Mini Portrait Session</h3>
              <div className="price">$75</div>
            </div>
            <p className="pricing-description">Quick, simple, and personal. Perfect for headshots, creative portraits, or social content.</p>
            <ul className="pricing-features">
              <li>30-minute session</li>
              <li>1 outfit / 1 location</li>
              <li>10–15 edited photos</li>
              <li>Online gallery delivery</li>
            </ul>
            <p className="pricing-addons">Add-ons: extra photo $5 each, extra outfit +$15</p>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Full Portrait / Family Session</h3>
              <div className="price">$150</div>
            </div>
            <p className="pricing-description">A relaxed session built for stories — families, couples, or anyone who wants variety and depth.</p>
            <ul className="pricing-features">
              <li>1-hour session</li>
              <li>Up to 2 locations</li>
              <li>20–25 edited photos</li>
              <li>Online gallery with full-resolution downloads</li>
            </ul>
            <p className="pricing-addons">Add-ons: drone shots +$20, extra 10 photos +$15</p>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Business / Venue & Lifestyle Shoot</h3>
              <div className="price">$200</div>
            </div>
            <p className="pricing-description">Capture the essence of your brand — restaurants, local venues, or creative spaces brought to life through clean visuals.</p>
            <ul className="pricing-features">
              <li>1–2 hour shoot</li>
              <li>Camera + drone coverage</li>
              <li>25–35 edited photos</li>
              <li>Commercial usage rights</li>
              <li>Online gallery for easy sharing</li>
            </ul>
            <p className="pricing-addons">Add-ons: video clips +$40, extended coverage available</p>
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
            <LazyLoad key={index} height={300} offset={100} placeholder={<div className="image-placeholder">Loading...</div>}>
              <img src={img.src} alt={img.alt} className="photo" loading="lazy" />
            </LazyLoad>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewDisplay
        reviews={reviews}
        category="photography"
        onAddReviewClick={() => {
          // Try dynamic island first (desktop only)
          if (window.openDynamicIslandReview) {
            window.openDynamicIslandReview('photography');
          } else {
            // Fallback to modal
            setIsReviewModalOpen(true);
          }
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        category="photography"
      />

      </div>
    </div>
  );
}
