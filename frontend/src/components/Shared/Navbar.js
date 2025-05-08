import React from 'react';
import ThemeToggle from '../../utils/ThemeToggle';
import './Navbar.css'; // Import the CSS file
import LogoLight from '../../assets/p_logo.png'; // Light theme logo
import LogoDark from '../../assets/p_logo.png'; // Dark theme logo

function Navbar() {
  // Determine which logo to use based on theme
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const logo = isDarkMode ? LogoDark : LogoLight;

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-image-wrapper"> {/* New wrapper for logo only */}
          <img src={logo} alt="Profile Edge Logo" className="logo" />
        </div>
        <h1 className="logo-text">PROFILE EDGE</h1>
      </div>
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;