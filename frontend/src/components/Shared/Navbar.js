import React, { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthContext';
import ThemeToggle from '../../utils/ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logos/p_logo.png';

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation(); // ✅ Get current route path

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
        <Link
          to="/input"
          className={`auth-link ${location.pathname === '/input' ? 'active' : ''}`}
        >
          Cv Tailor
        </Link>
        <Link
          to="/jobs"
          className={`auth-link ${location.pathname === '/jobs' ? 'active' : ''}`}
        >
          Jobs
        </Link>

        {!currentUser ? (
          <div className="auth-buttons">
            <Link
              to="/signin"
              className={`auth-link ${location.pathname === '/signin' ? 'active' : ''}`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`auth-link primary ${location.pathname === '/signup' ? 'active' : ''}`}
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link
              to="/dashboard"
              className={`auth-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/createCv"
              className={`auth-link ${location.pathname === '/createCv' ? 'active' : ''}`}
            >
              Create CV
            </Link>
            <Link
              to="/upload"
              className={`auth-link ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              Upload
            </Link>
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
