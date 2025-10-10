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
              <h3>1 Hour Session</h3>
              <div className="price">$60</div>
            </div>
            <ul className="pricing-features">
              <li>1-hour photography</li>
              <li>Camera & drone available</li>
              <li>Portraits, scenic, or product shots</li>
              <li>15 edited photos</li>
              <li>Online gallery</li>
            </ul>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>2 Hour Session</h3>
              <div className="price">$100</div>
            </div>
            <ul className="pricing-features">
              <li>2-hour photography</li>
              <li>Camera & drone available</li>
              <li>Multiple locations or setups</li>
              <li>20 edited photos</li>
              <li>Online gallery</li>
            </ul>
            <a href="/contact?service=photography" className="pricing-button">Book Now</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>3 Hour Session</h3>
              <div className="price">$135</div>
            </div>
            <ul className="pricing-features">
              <li>3-hour photography</li>
              <li>Camera & drone available</li>
              <li>Multiple locations & variety</li>
              <li>30 edited photos</li>
              <li>Online gallery</li>
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
        onAddReviewClick={() => setIsReviewModalOpen(true)}
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
