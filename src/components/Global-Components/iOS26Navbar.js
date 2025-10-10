import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

          <Link to="/photography" className="ios26-nav-item" onClick={handleLinkClick}>
            Photography
          </Link>

          <Link to="/music" className="ios26-nav-item" onClick={handleLinkClick}>
            Music
          </Link>

          <Link to="/dev" className="ios26-nav-item" onClick={handleLinkClick}>
            Code
          </Link>

          <Link to="/contact" className="ios26-nav-item" onClick={handleLinkClick}>
            Contact
          </Link>
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

          <Link to="/photography" className="ios26-mobile-item" onClick={handleLinkClick}>
            Photography
          </Link>

          <Link to="/music" className="ios26-mobile-item" onClick={handleLinkClick}>
            Music
          </Link>

          <Link to="/dev" className="ios26-mobile-item" onClick={handleLinkClick}>
            Code
          </Link>

          <Link to="/contact" className="ios26-mobile-item" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}