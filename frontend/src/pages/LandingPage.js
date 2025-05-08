import React from 'react';
import './LandingPage.css';
import icon from '../assets/git_png.png'
import icon1 from '../assets/google_png.png'


const LandingPage = () => {
  const heroImage = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDhjZG1tMmc3cjZ3bHQ4N3ZzZjBhZmJpeGNidWNnamdzbnM2bjRncCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HsgjWtY85LhXmcSFtZ/giphy.gif";

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="headline">Get 5× More Interviews With AI-Optimized Resumes</h1>
          <p className="subheader">Upload your resume and let our AI tailor it for any job in minutes</p>
          <button className="cta-button">Start Free Trial</button>
          
          {/* Trust Badges */}
          <div className="trust-badges">
            <span>Featured in:</span>
            <img src={icon} alt="TechCrunch" />
            <img src={icon1} alt="Forbes" />
          </div>
        </div>
        
        <div className="hero-visual">
          <img src={heroImage} alt="Profile Edge Demo" />
        </div>
      </section>

      {/* We'll add other sections here later */}
    </div>
  );
};

export default LandingPage;