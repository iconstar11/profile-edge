import React, {useEffect, useState} from "react";
// import { CheckCircle } from "lucide-react";
import { Shield, Zap, Download, BarChart, Target, FileText, Palette, Cpu, CheckCircle } from "lucide-react";
import "./LandingPage.css";
import Image from "../../assets/images/landing_page.png";
import darkImage from "../../assets/images/landing_dark.png";

const LandingPage = () => {

  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);
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
          <img src={theme === 'dark'? darkImage : Image} alt="AI CV Builder" className="hero-png"/>
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
      {/* Advanced Features Section */}
      <section className="advanced-features" id="how-it-works">
        <span className="tag">Features</span>
        <h2>
          Everything You Need to <span className="highlight">Stand Out</span>
        </h2>
        <p>
          Our comprehensive suite of tools helps you create, optimize, and track
          professional CVs that get results.
        </p>

        <div className="feature-grid advanced">
          <div className="feature-card">
            <div className="icon-box"><Cpu /></div>
            <h3>AI-Powered Content</h3>
            <p>
              Intelligent suggestions for improving your CV content, keywords,
              and formatting based on industry best practices.
            </p>
            <span className="badge">Smart AI</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><FileText /></div>
            <h3>ATS Optimization</h3>
            <p>
              Ensure your CV passes Applicant Tracking Systems with our advanced
              compatibility checker and optimization tools.
            </p>
            <span className="badge">98% Success</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Palette /></div>
            <h3>Professional Templates</h3>
            <p>
              Choose from hundreds of industry-specific templates designed by
              career experts and hiring managers.
            </p>
            <span className="badge">200+ Templates</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Target /></div>
            <h3>Job Targeting</h3>
            <p>
              Customize your CV for specific job roles with targeted keywords
              and tailored content suggestions.
            </p>
            <span className="badge">Targeted</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><BarChart /></div>
            <h3>Performance Analytics</h3>
            <p>
              Track your CV’s performance with detailed insights on views,
              downloads, and compatibility scores.
            </p>
            <span className="badge">Analytics</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Download /></div>
            <h3>Multiple Formats</h3>
            <p>
              Export your CV in PDF, DOCX, or share with a direct link. Perfect
              formatting guaranteed across all platforms.
            </p>
            <span className="badge">All Formats</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Zap /></div>
            <h3>Quick Builder</h3>
            <p>
              Create professional CVs in minutes with our streamlined interface
              and intelligent auto-completion.
            </p>
            <span className="badge">Fast</span>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Shield /></div>
            <h3>Privacy Protected</h3>
            <p>
              Your data is encrypted and secure. We never share your information
              with third parties or recruiters.
            </p>
            <span className="badge">Secure</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="how-it-works">
  <div className="how-it-works-header">
    <h2>How It Works</h2>
    <p>Get your professional CV ready in just 4 simple steps.</p>
  </div>

  <div className="steps-container">
    <div className="step">
      <div className="step-number">1</div>
      <h3>Sign Up</h3>
      <p>Create your free account to get started.</p>
    </div>

    <div className="step">
      <div className="step-number">2</div>
      <h3>Upload CV</h3>
      <p>Upload your current CV or fill in the form.</p>
    </div>

    <div className="step">
      <div className="step-number">3</div>
      <h3>AI Tailoring</h3>
      <p>Our AI customizes your CV to match the job.</p>
    </div>

    <div className="step">
      <div className="step-number">4</div>
      <h3>Download</h3>
      <p>Get your polished CV in Word or PDF format.</p>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Profile <span>Edge</span></h3>
            <p>AI-powered CV builder to help you land your dream job faster.</p>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
            <a href="#blog">Blog</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Profile Edge. All rights reserved.</p>
          <div className="socials">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
