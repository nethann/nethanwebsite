import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import '../../CSS/Global/iOS26Nav.css';

export default function IOS26Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLinkClick = () => {
    closeAllMenus();
  };

  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/nethan_journey/', label: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/nethan-nagendran/', label: 'LinkedIn' },
    { icon: AiFillGithub, url: 'https://github.com/nethann', label: 'GitHub' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@nethan_journey', label: 'YouTube' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@nethan_journey', label: 'TikTok' }
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`ios26-navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="ios26-nav-container">
        {/* Brand/Logo */}
        <Link to="/" className="ios26-nav-brand" onClick={handleLinkClick}>
          Nethan Nagendran
        </Link>

        {/* Desktop Navigation */}
        <div className="ios26-nav-menu">
          <Link to="/" className="ios26-nav-item" onClick={handleLinkClick}>
            Home
          </Link>
          
          {/* Projects Dropdown */}
          <div className="ios26-nav-dropdown" ref={dropdownRef}>
            <button 
              className="ios26-nav-item ios26-dropdown-button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Projects 
              <FaChevronDown 
                className={`ios26-chevron-icon ${isDropdownOpen ? 'rotated' : ''}`}
              />
            </button>
            
            <div className={`ios26-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/projects" className="ios26-dropdown-link" onClick={handleLinkClick}>
                Computer Science
              </Link>
              <Link to="/music" className="ios26-dropdown-link" onClick={handleLinkClick}>
                Music
              </Link>
              <Link to="/photography" className="ios26-dropdown-link" onClick={handleLinkClick}>
                Photography
              </Link>
              <Link to="/gameDevelopment" className="ios26-dropdown-link" onClick={handleLinkClick}>
                Game Dev
              </Link>
            </div>
          </div>
          
          <Link to="/contact" className="ios26-nav-item" onClick={handleLinkClick}>
            Contact
          </Link>

          {/* Social Links */}
          <div className="ios26-nav-socials">
            {socialLinks.slice(0, 3).map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ios26-nav-social"
                  title={social.label}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="ios26-mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <div className={`ios26-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="ios26-mobile-item" onClick={handleLinkClick}>
            Home
          </Link>
          
          {/* Mobile Projects Section */}
          <div className="ios26-mobile-dropdown">
            <button 
              className="ios26-mobile-item ios26-dropdown-button"
              onClick={toggleDropdown}
            >
              Projects 
              <FaChevronDown 
                className={`ios26-chevron-icon ${isDropdownOpen ? 'rotated' : ''}`}
              />
            </button>
            
            <div className={`ios26-mobile-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/projects" className="ios26-mobile-dropdown-link" onClick={handleLinkClick}>
                Computer Science
              </Link>
              <Link to="/music" className="ios26-mobile-dropdown-link" onClick={handleLinkClick}>
                Music
              </Link>
              <Link to="/photography" className="ios26-mobile-dropdown-link" onClick={handleLinkClick}>
                Photography
              </Link>
              <Link to="/gameDevelopment" className="ios26-mobile-dropdown-link" onClick={handleLinkClick}>
                Game Dev
              </Link>
            </div>
          </div>
          
          <Link to="/contact" className="ios26-mobile-item" onClick={handleLinkClick}>
            Contact
          </Link>

          {/* Mobile Social Links */}
          <div className="ios26-mobile-socials">
            <span className="ios26-mobile-socials-label">Connect:</span>
            <div className="ios26-mobile-socials-icons">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios26-mobile-social"
                    title={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}