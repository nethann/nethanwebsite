// Home.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Global/Global.css';
import '../CSS/Home/Home.css';

import Aos from 'aos';
import "aos/dist/aos.css";

// Profile photo
import NethanPC from './Projects-Components/Photography/Photograph_Images/nethan1.jpg';

const Home = () => {

    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true
        });
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
                            I’m a creator at heart — a developer, photographer, and musician exploring how technology and art can amplify each other.
                            I believe great stories can be told through many mediums, whether it’s a line of code, a melody, or a photo that freezes time.
                        </p>
                        <p>
                            I’m currently based in Atlanta, always experimenting, learning, and building.                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
