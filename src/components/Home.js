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
                        Developer • Photographer • Musician
                    </p>
                    <p className="location" data-aos="fade-up" data-aos-delay="150">
                        📍 Atlanta, Georgia, United States
                    </p>
                </header>

                <section className="intro">
                    <Link to="/projects/music" className="card" data-aos="fade-up" data-aos-delay="100">
                        <h3>Music</h3>
                        <p>Creating and performing music across multiple instruments</p>
                    </Link>

                    <Link to="/projects/photography" className="card" data-aos="fade-up" data-aos-delay="200">
                        <h3>Photography</h3>
                        <p>Capturing moments and telling stories through the lens</p>
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
                            I'm a computer science student who believes in creating at the intersection of technology and art.
                            Whether I'm writing code, capturing moments through a lens, or producing music, I'm driven by curiosity
                            and the desire to tell stories in different mediums.
                        </p>
                        <p>
                            Currently based in Atlanta, Georgia, exploring how different forms of creativity can complement and enhance each other.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
