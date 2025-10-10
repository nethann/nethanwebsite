// Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import '../CSS/Global/Global.css';
import '../CSS/Home/Home.css';

import Aos from 'aos';
import "aos/dist/aos.css";

// Review service
import { getLatestReviews } from '../services/reviewService';
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

        // Load latest reviews asynchronously
        const loadReviews = async () => {
            const reviews = await getLatestReviews(4);
            setLatestReviews(reviews);
        };
        loadReviews();

        // Fetch latest YouTube video from all your channels
        const fetchLatestVideo = async () => {
            try {
                const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

                console.log('🔑 API Key Status:', {
                    hasApiKey: !!YOUTUBE_API_KEY,
                    apiKeyLength: YOUTUBE_API_KEY ? YOUTUBE_API_KEY.length : 0,
                    apiKeyFirst10: YOUTUBE_API_KEY ? YOUTUBE_API_KEY.substring(0, 10) + '...' : 'none'
                });

                // Check cache first
                const CACHE_KEY = 'youtube_latest_video';
                const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    try {
                        const { videoId, timestamp } = JSON.parse(cached);
                        const isExpired = Date.now() - timestamp > CACHE_DURATION;

                        if (!isExpired) {
                            console.log('📦 Using cached video:', videoId);
                            console.log('🎯 Setting video from cache - this should be final');
                            setLatestVideo(videoId);
                            return;
                        } else {
                            console.log('🗑️ Cache expired, fetching new video');
                            localStorage.removeItem(CACHE_KEY);
                        }
                    } catch (cacheError) {
                        console.warn('⚠️ Cache parse error:', cacheError);
                        localStorage.removeItem(CACHE_KEY);
                    }
                }

                if (!YOUTUBE_API_KEY) {
                    console.error('❌ YouTube API key not found in environment variables');
                    console.log('Please check your .env file for REACT_APP_YOUTUBE_API_KEY');
                    setLatestVideo('dQw4w9WgXcQ');
                    return;
                }

                // Temporary: Check quota status first
                console.log('🔍 Testing API quota with a simple request...');
                const testResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=UCcjyzmhL8hoJEQhjNin3wdw&part=id`);

                if (!testResponse.ok) {
                    const errorData = await testResponse.json();
                    if (errorData.error?.errors?.[0]?.reason === 'quotaExceeded') {
                        console.warn('📊 YouTube API quota exceeded. Using your latest video.');
                        console.log('🎯 Setting your video due to quota - this should be final');
                        // Using your latest video: https://youtu.be/AjZG2xYZmAs
                        setLatestVideo('AjZG2xYZmAs');
                        return;
                    }
                }

                // Your YouTube channels
                const channels = [
                    { name: 'Nethan Journey', id: 'UCcjyzmhL8hoJEQhjNin3wdw' },
                    { name: 'Worship Avenue', id: 'UCzhoMRmdkQLjr7O3PoddKPw' }
                ];

                console.log('🎬 Fetching from channels:', channels.map(c => c.name));

                const allVideos = [];

                // Try different approach - use channel uploads playlist
                for (const channel of channels) {
                    try {
                        console.log(`📡 Fetching from ${channel.name}...`);

                        // First get the channel info to find uploads playlist
                        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channel.id}&part=contentDetails`;
                        console.log(`🔍 Channel URL: ${channelUrl}`);

                        const channelResponse = await fetch(channelUrl);

                        if (!channelResponse.ok) {
                            const errorText = await channelResponse.text();
                            console.error(`❌ Channel API Error for ${channel.name}:`, channelResponse.status, errorText);

                            // Fallback to search API
                            console.log(`🔄 Trying search API for ${channel.name}...`);
                            const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channel.id}&part=snippet,id&order=date&maxResults=1&type=video`;
                            const searchResponse = await fetch(searchUrl);

                            if (!searchResponse.ok) {
                                const searchErrorText = await searchResponse.text();
                                console.error(`❌ Search API Error for ${channel.name}:`, searchResponse.status, searchErrorText);
                                continue;
                            }

                            const searchData = await searchResponse.json();
                            if (searchData.items && searchData.items.length > 0) {
                                const video = searchData.items[0];
                                allVideos.push({
                                    ...video,
                                    channelName: channel.name,
                                    publishedAt: video.snippet.publishedAt
                                });
                                console.log(`📹 Found video via search from ${channel.name}:`, video.snippet.title);
                            }
                            continue;
                        }

                        const channelData = await channelResponse.json();
                        console.log(`✅ Channel response from ${channel.name}:`, channelData);

                        if (channelData.items && channelData.items.length > 0) {
                            const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
                            console.log(`📂 Uploads playlist for ${channel.name}: ${uploadsPlaylistId}`);

                            // Get latest video from uploads playlist
                            const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=1&order=date`;
                            const playlistResponse = await fetch(playlistUrl);

                            if (playlistResponse.ok) {
                                const playlistData = await playlistResponse.json();
                                if (playlistData.items && playlistData.items.length > 0) {
                                    const video = playlistData.items[0];
                                    allVideos.push({
                                        id: { videoId: video.snippet.resourceId.videoId },
                                        snippet: video.snippet,
                                        channelName: channel.name,
                                        publishedAt: video.snippet.publishedAt
                                    });
                                    console.log(`📹 Found video via playlist from ${channel.name}:`, video.snippet.title);
                                }
                            }
                        } else {
                            console.warn(`⚠️ No channel data found for ${channel.name}`);
                        }
                    } catch (channelError) {
                        console.error(`❌ Error fetching from ${channel.name}:`, channelError);
                    }
                }

                if (allVideos.length > 0) {
                    // Sort by publication date (newest first)
                    allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

                    const latestVideo = allVideos[0];
                    console.log(`🎯 Latest video selected:`, {
                        title: latestVideo.snippet.title,
                        channel: latestVideo.channelName,
                        publishedAt: latestVideo.publishedAt,
                        videoId: latestVideo.id.videoId
                    });

                    const videoId = latestVideo.id.videoId;
                    setLatestVideo(videoId);

                    // Cache the result
                    const cacheData = {
                        videoId: videoId,
                        timestamp: Date.now(),
                        title: latestVideo.snippet.title,
                        channel: latestVideo.channelName
                    };
                    localStorage.setItem('youtube_latest_video', JSON.stringify(cacheData));
                    console.log('💾 Video cached for 24 hours');
                } else {
                    console.warn('⚠️ No videos found from any channel, using your latest video');
                    setLatestVideo('AjZG2xYZmAs'); // Your latest video
                }

            } catch (error) {
                console.error('❌ Critical error fetching YouTube videos:', error);
                setLatestVideo('AjZG2xYZmAs'); // Your latest video
            }
        };

        fetchLatestVideo();
    }, []); // Empty dependency array - only run once on mount

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

                <div className="cta-buttons">
                    <Link to="/contact?service=photography" className="cta-button cta-primary">
                        Book Me for Photography
                    </Link>
                    <Link to="/contact?service=music" className="cta-button cta-secondary">
                        Hire Me for Gigs
                    </Link>
                </div>
            </div>

            {/* What I Offer Section - Moved higher for better visibility */}
            <section className="what-i-offer-section" data-aos="fade-up">
                <h2 className="section-title">What I Offer</h2>
                <div className="offer-grid">
                    <div className="offer-card photography-card" data-aos="fade-right">
                        <div className="offer-icon">📸</div>
                        <h3>Photography</h3>
                        <p className="offer-description">
                            Specializing in portraits, events, and creative sessions. I bring a fresh eye and technical skills to capture authentic moments that reflect your unique story.
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
                            Acoustic performances, worship music, and custom arrangements. I'm ready to bring heartfelt music to your events with dedication and skill.
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

            <section className="about-section" data-aos="fade-up">
                <div className="about-card">
                    <img src={NethanPC} alt="Nethan Nagendran" className="about-profile-pic" />
                    <div className="about-content">
                        <h2>About Me</h2>
                        <p>
                            I'm a passionate creator who sees the world through multiple lenses — as a developer crafting digital experiences,
                            a photographer capturing authentic moments, and a musician bringing emotion to life through sound.
                        </p>
                        <p>
                            Currently based in Atlanta, I'm building my portfolio while collaborating with clients who value fresh perspectives
                            and dedicated craftsmanship. Let's create something meaningful together.
                        </p>
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
                                <LazyLoad height={200} offset={100}>
                                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                                </LazyLoad>
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
