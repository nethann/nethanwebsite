import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../CSS/Global/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
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
        </footer>
    );
};

export default Footer;
