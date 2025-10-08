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
                    <img src={NethanPC} alt="Nethan Nagendran" className="profile-pic" data-aos="fade-up" />
                    <h1 data-aos="fade-up" data-aos-delay="100">Nethan Nagendran</h1>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Developer • Photographer • Musician
                    </p>
                </header>

                <section className="intro">
                    <Link to="/projects/computer-science" className="card" data-aos="fade-up" data-aos-delay="100">
                        <h3>Development</h3>
                        <p>Building modern web applications and software solutions</p>
                    </Link>

                    <Link to="/projects/music" className="card" data-aos="fade-up" data-aos-delay="200">
                        <h3>Music</h3>
                        <p>Creating and performing music across multiple instruments</p>
                    </Link>

                    <Link to="/projects/photography" className="card" data-aos="fade-up" data-aos-delay="300">
                        <h3>Photography</h3>
                        <p>Capturing moments and telling stories through the lens</p>
                    </Link>
                </section>
            </div>

            <section className="about-section" data-aos="fade-up">
                <h2>About Me</h2>
                <p>
                    I'm a computer science student who believes in creating at the intersection of technology and art.
                    Whether I'm writing code, capturing moments through a lens, or producing music, I'm driven by curiosity
                    and the desire to tell stories in different mediums.
                </p>
                <p>
                    Currently based in [Your City], exploring how different forms of creativity can complement and enhance each other.
                </p>
            </section>
        </div>
    );
};

export default Home;
