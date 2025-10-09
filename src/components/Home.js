// Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Global/Global.css';
import '../CSS/Home/Home.css';

import Aos from 'aos';
import "aos/dist/aos.css";

// Review service
import { getLatestReviews, formatDate } from '../services/reviewService';
import { FaStar } from 'react-icons/fa';

// Profile photo
import NethanPC from './Projects-Components/Photography/Photograph_Images/Portraits/nethan1.jpg';

// Import all images from photography folder (including subfolders)
const importAll = (r) => r.keys().map((key) => ({
    src: r(key),
    alt: key.replace('./', '').replace(/\.[^/.]+$/, '')
}));

const allPhotos = importAll(
    require.context('./Projects-Components/Photography/Photograph_Images', true, /\.(jpe?g|png|webp)$/)
);

const Home = () => {
    const [featuredPhotos, setFeaturedPhotos] = useState([]);
    const [latestVideo, setLatestVideo] = useState(null);
    const [latestReviews, setLatestReviews] = useState([]);

    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true
        });

        // Randomize 6 photos from portfolio
        const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
        setFeaturedPhotos(shuffled.slice(0, 6));

        // Load latest reviews
        const reviews = getLatestReviews(4);
        setLatestReviews(reviews);

        // Fetch latest YouTube video from both channels
        const fetchLatestVideo = async () => {
            try {
                const YOUTUBE_API_KEY = 'AIzaSyB1RMivMQohGsZOhPudzSLGHurf9bZDYRA';
                const NETHAN_JOURNEY_ID = 'UCcjyzmhL8hoJEQhjNin3wdw';
                const WORSHIP_AVENUE_ID = 'UCzhoMRmdkQLjr7O3PoddKPw';

                // Fetch from both channels
                const channel1Response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${NETHAN_JOURNEY_ID}&part=snippet,id&order=date&maxResults=1&type=video`
                );
                const channel2Response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${WORSHIP_AVENUE_ID}&part=snippet,id&order=date&maxResults=1&type=video`
                );

                const channel1Data = await channel1Response.json();
                const channel2Data = await channel2Response.json();

                // Get the latest video from both channels by comparing dates
                const video1 = channel1Data.items?.[0];
                const video2 = channel2Data.items?.[0];

                let latestVideoId = null;

                if (video1 && video2) {
                    const date1 = new Date(video1.snippet.publishedAt);
                    const date2 = new Date(video2.snippet.publishedAt);
                    latestVideoId = date1 > date2 ? video1.id.videoId : video2.id.videoId;
                } else if (video1) {
                    latestVideoId = video1.id.videoId;
                } else if (video2) {
                    latestVideoId = video2.id.videoId;
                }

                if (latestVideoId) {
                    setLatestVideo(latestVideoId);
                }
            } catch (error) {
                console.error('Error fetching YouTube video:', error);
                // Fallback to a default video if API fails
                setLatestVideo('dQw4w9WgXcQ');
            }
        };

        fetchLatestVideo();
    }, []);

    return (
        <div className="homepage">
            <div className="hero-section">
                <header className="hero">
                    <h1 data-aos="fade-up">Nethan Nagendran</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Photographer • Musician • Developer
                    </p>
                    <p className="location" data-aos="fade-up" data-aos-delay="150">
                        📍 Atlanta, Georgia, United States
                    </p>
                </header>

                <section className="intro">
                    <Link to="/photography" className="card" data-aos="fade-up" data-aos-delay="200">
                        <h3>Photography</h3>
                        <p>Capturing moments and telling stories through the lens</p>
                    </Link>
                    <Link to="/music" className="card" data-aos="fade-up" data-aos-delay="100">
                        <h3>Music</h3>
                        <p>Creating and performing music across multiple instruments</p>
                    </Link>


                </section>

                <div className="cta-buttons" data-aos="fade-up" data-aos-delay="300">
                    <Link to="/contact?service=photography" className="cta-button cta-primary">
                        Book Me for Photography
                    </Link>
                    <Link to="/contact?service=music" className="cta-button cta-secondary">
                        Hire Me for Gigs
                    </Link>
                </div>
            </div>

            <section className="about-section" data-aos="fade-up">
                <div className="about-card">
                    <img src={NethanPC} alt="Nethan Nagendran" className="about-profile-pic" />
                    <div className="about-content">
                        <h2>About Me</h2>
                        <p>
                            I'm a creator at heart — a developer, photographer, and musician exploring how technology and art can amplify each other.
                            I believe great stories can be told through many mediums, whether it's a line of code, a melody, or a photo that freezes time.
                        </p>
                        <p>
                            I'm currently based in Atlanta, always experimenting, learning, and building.
                        </p>
                    </div>
                </div>
            </section>

            {/* What I Offer Section */}
            <section className="what-i-offer-section" data-aos="fade-up">
                <h2 className="section-title">What I Offer</h2>
                <div className="offer-grid">
                    <div className="offer-card photography-card" data-aos="fade-right">
                        <div className="offer-icon">📸</div>
                        <h3>Photography</h3>
                        <p className="offer-description">
                            Portraits, events, creative shots, brand sessions. I capture moments that tell your story with authenticity and style.
                        </p>
                        {latestReviews.filter(r => r.category === 'photography')[0] ? (
                            <div className="testimonial">
                                <div className="testimonial-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={star <= latestReviews.filter(r => r.category === 'photography')[0].rating ? 'star-filled' : 'star-empty'}
                                        />
                                    ))}
                                </div>
                                <p>"{latestReviews.filter(r => r.category === 'photography')[0].comment}"</p>
                                <span>— {latestReviews.filter(r => r.category === 'photography')[0].name}</span>
                            </div>
                        ) : (
                            <div className="testimonial no-review">
                                <p>Be the first to leave a review!</p>
                            </div>
                        )}
                        <Link to="/photography" className="offer-button">
                            View Photography Portfolio →
                        </Link>
                    </div>

                    <div className="offer-card music-card" data-aos="fade-left">
                        <div className="offer-icon">🎵</div>
                        <h3>Music</h3>
                        <p className="offer-description">
                            Live gigs, production, custom beats, sound design. From performance to production, I bring your sound to life.
                        </p>
                        {latestReviews.filter(r => r.category === 'music')[0] ? (
                            <div className="testimonial">
                                <div className="testimonial-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={star <= latestReviews.filter(r => r.category === 'music')[0].rating ? 'star-filled' : 'star-empty'}
                                        />
                                    ))}
                                </div>
                                <p>"{latestReviews.filter(r => r.category === 'music')[0].comment}"</p>
                                <span>— {latestReviews.filter(r => r.category === 'music')[0].name}</span>
                            </div>
                        ) : (
                            <div className="testimonial no-review">
                                <p>Be the first to leave a review!</p>
                            </div>
                        )}
                        <Link to="/music" className="offer-button">
                            Listen & Book →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Work Section */}
            <section className="featured-work-section" data-aos="fade-up">
                <h2 className="section-title">Featured Work</h2>

                {/* Photography Gallery */}
                <div className="featured-subsection">
                    <h3 className="subsection-title">📸 Photography</h3>
                    <div className="photo-gallery">
                        {featuredPhotos.map((photo, index) => (
                            <div
                                key={index}
                                className="gallery-item"
                                data-aos="zoom-in"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <img src={photo.src} alt={photo.alt} />
                            </div>
                        ))}
                    </div>
                    <Link to="/photography" className="view-all-link">
                        View Full Portfolio →
                    </Link>
                </div>

                {/* Music Section */}
                <div className="featured-subsection" data-aos="fade-up">
                    <h3 className="subsection-title">🎵 Music</h3>
                    <div className="music-featured">
                        {latestVideo ? (
                            <div className="youtube-embed">
                                <iframe
                                    src={`https://www.youtube.com/embed/${latestVideo}`}
                                    title="Latest Music Performance"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className="loading-text">Loading latest video...</p>
                        )}
                    </div>
                    <Link to="/music" className="view-all-link">
                        Explore More Music →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
