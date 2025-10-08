import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-icon">❓</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        <div className="notfound-buttons">
          <Link to="/">
            <button className="primary">🏠 Back to Home</button>
          </Link>
          <Link to="/input">
            <button className="secondary">📄 CV Tailor </button>
          </Link>
        </div>

        <div className="notfound-links">
          <h4>Quick Links</h4>
          <div className="notfound-quicklinks">
            <Link to="/jobs">🔍 Jobs</Link>
            <Link to="/signin">🔑 Sign In</Link>
            <Link to="/signup">📝 Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
