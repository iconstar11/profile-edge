import React from "react";
import { CheckCircle } from "lucide-react";
import "./LandingPage.css";
import Image from "../assets/pic_8.jpeg";

const LandingPage = () => {
  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Build Smarter <br /> <span className="highlight">CVs with AI</span>
          </h1>
          <p>
            AI-powered CV builder, tailored for your dream job.
            Create professional, ATS-friendly resumes in minutes.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Build My CV Now →</button>
            <button className="secondary-btn">See Examples</button>
          </div>

          <div className="badges">
            <span><CheckCircle className="icon ai" /> AI-Powered</span>
            <span><CheckCircle className="icon ats" /> ATS-Friendly</span>
            <span><CheckCircle className="icon free" /> Free to Start</span>
          </div>
        </div>

        <div className="hero-image">
          <img src={Image} alt="AI CV Builder" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Why Choose Profile Edge?</h2>
        <p>
          Everything you need to create a professional CV that gets you noticed by employers.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="emoji">🤖</span>
            <h3>AI-Powered Suggestions</h3>
            <p>
              Get intelligent recommendations for content, keywords, 
              and formatting to make your CV stand out.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji">🎨</span>
            <h3>Template Customization</h3>
            <p>
              Choose from professional templates and customize them 
              to match your industry and personal style.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji">✅</span>
            <h3>ATS-Friendly Formatting</h3>
            <p>
              Ensure your CV passes Applicant Tracking Systems 
              with optimized formatting and keyword placement.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji">📑</span>
            <h3>One-Click Export</h3>
            <p>
              Download your CV in multiple formats (PDF, Word) 
              or share it directly with potential employers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
