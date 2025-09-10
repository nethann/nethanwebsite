import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import '../../CSS/Global/Nav.css';

export default function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setExpanded(!expanded);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Dropdown clicked, current state:', dropdownOpen);
    setDropdownOpen(!dropdownOpen);
  };

  const closeAllMenus = () => {
    setExpanded(false);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={closeAllMenus}>
          Nethan Nagendran
        </Link>
        
        <button 
          className="navbar-toggler" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`navbar-collapse ${expanded ? 'show' : ''}`}>
          <div className="navbar-nav">
            <Link 
              to="/" 
              className="nav-link" 
              id="nav-link"
              onClick={closeAllMenus}
            >
              Home
            </Link>
            
            <div className="dropdown" ref={dropdownRef}>
              <button 
                className="dropdown-toggle nav-link" 
                id="basic-nav-dropdown"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                Projects <FaChevronDown style={{ marginLeft: '4px', fontSize: '12px' }} />
              </button>
              
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{display: dropdownOpen ? 'block' : 'none'}}>
                <Link 
                  to="/projects" 
                  className="dropdown-item" 
                  id="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Computer Science
                </Link>
                <Link 
                  to="/music" 
                  className="dropdown-item" 
                  id="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Music
                </Link>
                <Link 
                  to="/photography" 
                  className="dropdown-item" 
                  id="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Photography
                </Link>
                <Link 
                  to="/gameDevelopment" 
                  className="dropdown-item" 
                  id="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Game Dev
                </Link>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="nav-link" 
              id="nav-link"
              onClick={closeAllMenus}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}