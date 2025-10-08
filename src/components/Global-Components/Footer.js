import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../CSS/Global/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Nethan Nagendran</h3>
                    <p>Developer, Musician, and Photographer</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/projects/computer-science">Development</Link>
                    <Link to="/projects/music">Music</Link>
                    <Link to="/projects/photography">Photography</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://youtube.com/@yourusername" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Nethan Nagendran. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
