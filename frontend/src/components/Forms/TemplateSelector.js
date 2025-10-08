import React, { useState } from "react";
import "./TemplateSelector.css";

function TemplateSelector({ selectedTemplate, onChange }) {
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    {
      id: "modern",
      name: "Modern Developer",
      category: "Tech",
      description: "Clean, professional design perfect for software developers and engineers.",
      previewText: "Modern Developer Preview"
    },
    {
    id: "classic",
    name: "Classic Template",
    category: "Professional",
    description:
      "A timeless layout with clear sectioning and traditional formatting suitable for corporate or formal roles.",
    previewText: "Classic Template Preview",
  },
  {
    id: "elegant",
    name: "Elegant Template",
    category: "Modern",
    description:
      "Stylish and sleek, designed with subtle color accents and a balanced layout — great for creative professionals.",
    previewText: "Elegant Template Preview",
  },
  {
    id: "minimalist",
    name: "Minimalist Template",
    category: "ATS-Friendly",
    description:
      "Clean, simple, and content-focused — optimized for Applicant Tracking Systems and easy readability.",
    previewText: "Minimalist Template Preview",
  }
    
  ];



  const handleUseTemplate = (templateId) => {
    onChange(templateId);
  };

  const handlePreview = (template, e) => {
    e.stopPropagation();
    setPreviewTemplate(template);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  // Default dummy data for preview
  const dummyData = {
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    experiences: [
      {
        id: 1,
        jobTitle: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "Present",
        description: "Led development of cloud-native applications using React, Node.js, and AWS. Improved application performance by 40% through optimization techniques."
      },
      {
        id: 2,
        jobTitle: "Full Stack Developer",
        company: "Digital Innovations LLC",
        location: "Austin, TX",
        startDate: "2018-01",
        endDate: "2020-02",
        description: "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with design team to implement responsive UI components."
      }
    ],
    educationList: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        location: "Boston, MA",
        startDate: "2014-09",
        endDate: "2018-05",
        description: "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems."
      }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", 
      "Git", "MongoDB", "TypeScript", "REST APIs", "Agile Methodologies"
    ]
  };

  return (
    <div className="template-selector">
      <h2 className="template-selector-title">Choose a Template</h2>
      <div className="template-grid">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onChange(template.id)}
          >
            <div className="template-preview">
              {template.previewText}
            </div>
            <div className="template-content">
              <div className="template-header">
                <h3 className="template-name">{template.name}</h3>
                <span className="template-category">{template.category}</span>
              </div>
              <p className="template-description">{template.description}</p>
              <div className="template-actions">
                <button 
                  className="btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseTemplate(template.id);
                  }}
                >
                  Use Template
                </button>
                <button 
                  className="btn secondary"
                  onClick={(e) => handlePreview(template, e)}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="preview-modal-overlay" onClick={closePreview}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <h2>{previewTemplate.name} - Preview</h2>
              <button className="close-button" onClick={closePreview}>×</button>
            </div>
            <div className="preview-modal-body">
              <div className="template-full-preview">
                {previewTemplate.id === "modern" ? (
                  <ModernTemplatePreview data={dummyData} />
                ) : (
                  <ClassicTemplatePreview data={dummyData} />
                )}
              </div>
              <div className="preview-modal-actions">
                <button 
                  className="btn primary"
                  onClick={() => {
                    handleUseTemplate(previewTemplate.id);
                    closePreview();
                  }}
                >
                  Use This Template
                </button>
                <button 
                  className="btn secondary"
                  onClick={closePreview}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modern Template Preview Component
const ModernTemplatePreview = ({ data }) => {
  return (
    <div className="template-preview-modern">
      <div className="preview-header">
        <h1>{data.personalInfo.fullName}</h1>
        <div className="contact-info">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>
      
      <div className="preview-section">
        <h2>Professional Experience</h2>
        {data.experiences.map(exp => (
          <div key={exp.id} className="preview-item">
            <div className="item-header">
              <h3>{exp.jobTitle}</h3>
              <span className="date">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="company-location">
              <strong>{exp.company}</strong> | {exp.location}
            </div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="preview-section">
        <h2>Education</h2>
        {data.educationList.map(edu => (
          <div key={edu.id} className="preview-item">
            <div className="item-header">
              <h3>{edu.degree}</h3>
              <span className="date">{edu.startDate} - {edu.endDate}</span>
            </div>
            <div className="company-location">
              <strong>{edu.institution}</strong> | {edu.location}
            </div>
          </div>
        ))}
      </div>

      <div className="preview-section">
        <h2>Skills</h2>
        <div className="skills-preview">
          {data.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Classic Template Preview Component
const ClassicTemplatePreview = ({ data }) => {
  return (
    <div className="template-preview-classic">
      <div className="preview-header-classic">
        <h1>{data.personalInfo.fullName}</h1>
        <p className="professional-title">Senior Software Engineer</p>
        <div className="contact-info-classic">
          <span>{data.personalInfo.email}</span> | 
          <span>{data.personalInfo.phone}</span> | 
          <span>{data.personalInfo.location}</span>
        </div>
      </div>
      
      <div className="preview-section-classic">
        <h2>EXPERIENCE</h2>
        {data.experiences.map(exp => (
          <div key={exp.id} className="preview-item-classic">
            <div className="item-header-classic">
              <div>
                <h3>{exp.jobTitle}</h3>
                <div className="company-classic">{exp.company}, {exp.location}</div>
              </div>
              <span className="date-classic">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="preview-section-classic">
        <h2>EDUCATION</h2>
        {data.educationList.map(edu => (
          <div key={edu.id} className="preview-item-classic">
            <div className="item-header-classic">
              <div>
                <h3>{edu.degree}</h3>
                <div className="company-classic">{edu.institution}, {edu.location}</div>
              </div>
              <span className="date-classic">{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="preview-section-classic">
        <h2>SKILLS</h2>
        <div className="skills-preview-classic">
          {data.skills.map((skill, index) => (
            <span key={index} className="skill-tag-classic">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;