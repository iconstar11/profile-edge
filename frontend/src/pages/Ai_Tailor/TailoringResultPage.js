import React, { useEffect, useState } from "react";
import "./tailorResume.css";

export default function TailoringResultPage() {
  const [loading, setLoading] = useState(true);
  const [tailoredText, setTailoredText] = useState("");

  useEffect(() => {
    // Simulate loading AI result
    const timer = setTimeout(() => {
      setTailoredText(`
John Doe
Email: johndoe@email.com | LinkedIn: linkedin.com/in/johndoe

SUMMARY
Results-driven marketing professional with 5+ years of experience
in digital campaigns, SEO optimization, and content strategy.
Strong alignment with job requirements emphasizing analytics,
cross-team collaboration, and data storytelling.

EXPERIENCE
Marketing Specialist — Acme Corp (2019–Present)
- Increased social engagement by 45% through data-backed campaigns.
- Collaborated with cross-functional teams to refine messaging.
- Implemented A/B testing resulting in a 25% higher conversion rate.

SKILLS
SEO Optimization | Campaign Analytics | CRM Tools | Copywriting
      `);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([tailoredText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Tailored_Resume.txt";
    link.click();
  };

  return (
    <div className="result-page">
      <div className="result-header">
        <h1>{loading ? "Tailoring Your Resume..." : "Tailored Resume Ready!"}</h1>
        <p className="section-subtitle">
          {loading
            ? "Analyzing job description and customizing your CV..."
            : "Here’s your tailored version based on the job description you provided."}
        </p>
      </div>

      <div className="result-content">
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
          </div>
        ) : (
          <pre className="resume-preview">{tailoredText}</pre>
        )}
      </div>

      <div className="result-actions">
        <button
          className="secondary"
          onClick={() => (window.location.href = "/")}
        >
          ← Back to Tailor Page
        </button>
        <button className="primary" onClick={handleDownload} disabled={loading}>
          ⬇ Download Tailored Resume
        </button>
      </div>
    </div>
  );
}
