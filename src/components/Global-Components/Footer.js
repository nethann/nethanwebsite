import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import '../../CSS/Global/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://github.com/nethann" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/nethan-nagendran/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/nethan_journey/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@nethan_journey" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <FaYoutube />
                </a>
                <a href="https://www.tiktok.com/@nethan_journey" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <FaTiktok />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
