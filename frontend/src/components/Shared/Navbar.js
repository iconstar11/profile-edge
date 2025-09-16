import React, { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthContext';
import ThemeToggle from '../../utils/ThemeToggle';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logos/p_logo.png';

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-image-wrapper">
          <img src={logo} alt="Profile Edge Logo" className="logo" />
        </div>
        <h1 className="logo-text">PROFILE EDGE</h1>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        {!currentUser ? (
          // Guest Users
          <div className="auth-buttons">
            <Link to="/signin" className="auth-link">
              Log in
            </Link>
            <Link to="/signup" className="auth-link primary">
              Sign up
            </Link>
          </div>
        ) : (
          // Logged-in Users
          <div className="nav-links">
            <Link to="/dashboard" className="auth-link">Dashboard</Link>
            <Link to="/createCv" className="auth-link">Create CV</Link>
            <Link to="/resumetemplates" className="auth-link">Templates</Link>
            <Link to="/upload" className="auth-link">Upload</Link>
            <Link to="/response" className="auth-link">Response</Link>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
