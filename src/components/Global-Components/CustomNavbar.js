import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import '../../CSS/Global/Nav.css';

export default function CustomNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when opening mobile menu
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Dropdown toggled, current state:', isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLinkClick = () => {
    closeAllMenus();
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

  // Debug dropdown state
  useEffect(() => {
    console.log('Dropdown state:', isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <nav className="custom-navbar" ref={navRef}>
      <div className="nav-container">
        {/* Brand/Logo */}
        <Link to="/" className="nav-brand" onClick={handleLinkClick}>
          Nethan Nagendran
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link to="/" className="nav-item" onClick={handleLinkClick}>
            Home
          </Link>
          
          {/* Projects Dropdown */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button 
              className="nav-item dropdown-button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Projects 
              <FaChevronDown 
                className={`chevron-icon ${isDropdownOpen ? 'rotated' : ''}`}
              />
            </button>
            
            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/projects" className="dropdown-link" onClick={handleLinkClick}>
                Computer Science
              </Link>
              <Link to="/music" className="dropdown-link" onClick={handleLinkClick}>
                Music
              </Link>
              <Link to="/photography" className="dropdown-link" onClick={handleLinkClick}>
                Photography
              </Link>
              <Link to="/gameDevelopment" className="dropdown-link" onClick={handleLinkClick}>
                Game Dev
              </Link>
            </div>
          </div>
          
          <Link to="/contact" className="nav-item" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-item" onClick={handleLinkClick}>
            Home
          </Link>
          
          {/* Mobile Projects Section */}
          <div className="mobile-dropdown">
            <button 
              className="mobile-item dropdown-button"
              onClick={toggleDropdown}
            >
              Projects 
              <FaChevronDown 
                className={`chevron-icon ${isDropdownOpen ? 'rotated' : ''}`}
              />
            </button>
            
            <div className={`mobile-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/projects" className="mobile-dropdown-link" onClick={handleLinkClick}>
                Computer Science
              </Link>
              <Link to="/music" className="mobile-dropdown-link" onClick={handleLinkClick}>
                Music
              </Link>
              <Link to="/photography" className="mobile-dropdown-link" onClick={handleLinkClick}>
                Photography
              </Link>
              <Link to="/gameDevelopment" className="mobile-dropdown-link" onClick={handleLinkClick}>
                Game Dev
              </Link>
            </div>
          </div>
          
          <Link to="/contact" className="mobile-item" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}