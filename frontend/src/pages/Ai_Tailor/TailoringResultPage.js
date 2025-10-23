import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./tailorResume.css";
import { jsPDF } from "jspdf";

export default function TailoringResultPage() {
  const [loading, setLoading] = useState(true);
  const [tailoredText, setTailoredText] = useState("");
  const [structuredResume, setStructuredResume] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.tailoredResume) {
      const rawText = location.state.tailoredResume;
      setTailoredText(rawText);
      parseResumeContent(rawText);
      setLoading(false);
    } else {
      console.warn("No tailored resume data found. Redirecting...");
      navigate("/tailor-resume");
    }
  }, [location.state, navigate]);

  // Parse the resume content into structured data
  const parseResumeContent = (text) => {
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
    
    // Extract name and contact info (usually first few lines)
    const lines = cleanText.split('\n').filter(line => line.trim());
    
    const structuredData = {
      name: "",
      contact: [],
      summary: "",
      education: [],
      experience: [],
      skills: [],
      certifications: [],
      languages: []
    };

    let currentSection = "";
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Detect section headers
      if (trimmedLine.match(/^(PROFESSIONAL SUMMARY|SUMMARY|PROFILE)/i)) {
        currentSection = "summary";
      } else if (trimmedLine.match(/^(EDUCATION)/i)) {
        currentSection = "education";
      } else if (trimmedLine.match(/^(EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE)/i)) {
        currentSection = "experience";
      } else if (trimmedLine.match(/^(SKILLS|TECHNICAL SKILLS)/i)) {
        currentSection = "skills";
      } else if (trimmedLine.match(/^(CERTIFICATIONS|CERTIFICATES)/i)) {
        currentSection = "certifications";
      } else if (trimmedLine.match(/^(LANGUAGES)/i)) {
        currentSection = "languages";
      } else {
        // Process content based on current section
        if (currentSection === "" && !structuredData.name) {
          // First line is usually the name
          if (!trimmedLine.includes('@') && !trimmedLine.includes('github') && !trimmedLine.includes('http')) {
            structuredData.name = trimmedLine;
          } else {
            structuredData.contact.push(trimmedLine);
          }
        } else if (currentSection === "" && structuredData.name) {
          // Contact information
          if (trimmedLine.includes('@') || trimmedLine.includes('github') || trimmedLine.includes('http') || trimmedLine.includes('+')) {
            structuredData.contact.push(trimmedLine);
          }
        } else if (currentSection === "summary") {
          structuredData.summary += (structuredData.summary ? " " : "") + trimmedLine;
        } else if (currentSection === "education") {
          if (trimmedLine.includes('|') || trimmedLine.includes('–') || trimmedLine.match(/\d{4}/)) {
            structuredData.education.push(trimmedLine);
          }
        } else if (currentSection === "experience") {
          if (trimmedLine.includes('•') || trimmedLine.includes('-')) {
            // This is a bullet point
            if (structuredData.experience.length > 0) {
              const lastExp = structuredData.experience[structuredData.experience.length - 1];
              if (Array.isArray(lastExp.points)) {
                lastExp.points.push(trimmedLine.replace(/[•\-]\s*/, '').trim());
              }
            }
          } else if (trimmedLine.includes('|') || trimmedLine.match(/\d{4}/)) {
            // This is a job title/company line
            structuredData.experience.push({
              title: trimmedLine,
              points: []
            });
          }
        } else if (currentSection === "skills") {
          if (trimmedLine.includes('•') || trimmedLine.includes('-') || trimmedLine.includes(':')) {
            structuredData.skills.push(trimmedLine.replace(/[•\-]\s*/, '').trim());
          }
        } else if (currentSection === "certifications") {
          if (trimmedLine.includes('•') || trimmedLine.includes('-')) {
            structuredData.certifications.push(trimmedLine.replace(/[•\-]\s*/, '').trim());
          }
        } else if (currentSection === "languages") {
          if (trimmedLine.includes(':')) {
            structuredData.languages.push(trimmedLine);
          }
        }
      }
    });

    setStructuredResume(structuredData);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setProperties({
      title: 'Tailored Resume',
      subject: 'AI-Tailored Resume',
      author: 'Resume Tailor App'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;
    const margin = 20;

    // Add name
    doc.setFont(undefined, 'bold');
    doc.setFontSize(18);
    doc.text(structuredResume.name || "Resume", margin, yPosition);
    yPosition += 10;

    // Add contact info
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    structuredResume.contact.forEach(contactLine => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(contactLine, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 5;

    // Add summary
    if (structuredResume.summary) {
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text("PROFESSIONAL SUMMARY", margin, yPosition);
      yPosition += 8;
      
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      const summaryLines = doc.splitTextToSize(structuredResume.summary, pageWidth - 2 * margin);
      summaryLines.forEach(line => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    }

    // Add education
    if (structuredResume.education.length > 0) {
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text("EDUCATION", margin, yPosition);
      yPosition += 8;
      
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      structuredResume.education.forEach(edu => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(edu, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    }

    // Add experience
    if (structuredResume.experience.length > 0) {
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text("EXPERIENCE", margin, yPosition);
      yPosition += 8;
      
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      structuredResume.experience.forEach(exp => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(exp.title, margin, yPosition);
        yPosition += 5;
        
        exp.points.forEach(point => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          const pointLines = doc.splitTextToSize(`• ${point}`, pageWidth - 2 * margin);
          pointLines.forEach(line => {
            doc.text(line, margin + 5, yPosition);
            yPosition += 5;
          });
        });
        yPosition += 3;
      });
    }

    doc.save('Tailored_Resume.pdf');
  };

  const handleBackToTailor = () => {
    if (location.state?.jobDescription) {
      navigate("/input", { 
        state: { 
          previousJobDescription: location.state.jobDescription 
        } 
      });
    } else {
      navigate("/input");
    }
  };

  const renderStructuredResume = () => {
    if (!structuredResume) return null;

    return (
      <div className="professional-resume">
        {/* Header with Name and Contact */}
        <div className="resume-header">
          <h1 className="resume-name">{structuredResume.name || "Professional Resume"}</h1>
          <div className="contact-info">
            {structuredResume.contact.map((contact, index) => (
              <span key={index} className="contact-item">{contact}</span>
            ))}
          </div>
        </div>

        {/* Professional Summary */}
        {structuredResume.summary && (
          <div className="resume-section">
            <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
            <div className="section-content">
              <p className="summary-text">{structuredResume.summary}</p>
            </div>
          </div>
        )}

        {/* Education */}
        {structuredResume.education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">EDUCATION</h2>
            <div className="section-content">
              {structuredResume.education.map((edu, index) => (
                <div key={index} className="education-item">
                  {edu}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {structuredResume.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">EXPERIENCE</h2>
            <div className="section-content">
              {structuredResume.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="job-title">{exp.title}</div>
                  <ul className="job-points">
                    {exp.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {structuredResume.skills.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">SKILLS</h2>
            <div className="section-content">
              <div className="skills-grid">
                {structuredResume.skills.map((skill, index) => (
                  <div key={index} className="skill-item">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications */}
        {structuredResume.certifications.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">CERTIFICATIONS</h2>
            <div className="section-content">
              {structuredResume.certifications.map((cert, index) => (
                <div key={index} className="certification-item">{cert}</div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {structuredResume.languages.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">LANGUAGES</h2>
            <div className="section-content">
              {structuredResume.languages.map((lang, index) => (
                <div key={index} className="language-item">{lang}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="result-page">
      <div className="result-header">
        <h1>{loading ? "Tailoring Your Resume..." : "Tailored Resume Ready!"}</h1>
        <p className="section-subtitle">
          {loading
            ? "Analyzing job description and customizing your CV..."
            : "Here's your tailored version based on the job description you provided."}
        </p>
        {!loading && location.state?.originalResumeName && (
          <p className="resume-source">
            Based on: <strong>{location.state.originalResumeName}</strong>
          </p>
        )}
      </div>

      <div className="result-content">
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
            <div className="loading-line"></div>
          </div>
        ) : (
          <div className="resume-preview-container">
            {renderStructuredResume()}
          </div>
        )}
      </div>

      <div className="result-actions">
        <button className="secondary" onClick={handleBackToTailor}>
          ← Back to Tailor Page
        </button>
        {!loading && (
          <button className="primary" onClick={handleDownloadPDF}>
            ⬇ Download as PDF
          </button>
        )}
      </div>
    </div>
  );
}