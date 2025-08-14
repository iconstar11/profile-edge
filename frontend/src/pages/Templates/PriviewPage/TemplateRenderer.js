// src/components/preview/TemplateRenderer.js
import React from 'react';
import styles from './previewPage.module.css';

const TemplateRenderer = ({ 
  template, 
  onEditStart, 
  isEditing, 
  activeSection,
  onContentUpdate 
}) => {
  // Debug logging
  console.log('TemplateRenderer Received Template:', template);

  if (!template || !template.sections) {
    console.log('Missing template or sections');
    return <div>Loading template data...</div>;
  }

  return (
    <div className={styles.templateRenderer}>
      {/* Header */}
      <div className={styles.resumeHeader}>
        <div className={styles.headerContent}>
          <h1>{template.sections.find(s => s.type === 'personal')?.content?.name}</h1>
          <p className={styles.title}>
            {template.sections.find(s => s.type === 'personal')?.content?.title}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.resumeContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Education Section */}
          {template.sections.map((section, index) => {
            console.log('Rendering section:', section); // Debug log for each section
            
            switch(section.type) {
              case 'education':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2>Education</h2>
                    <div className={styles.underline}></div>
                    {section.content.items.map((edu, idx) => (
                      <div key={idx} className={styles.educationItem}>
                        <div className={styles.period}>{edu.period}</div>
                        <div className={styles.degree}>{edu.degree}</div>
                        <div className={styles.university}>{edu.university}</div>
                      </div>
                    ))}
                  </div>
                );

              case 'profile':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2>Profile</h2>
                    <div className={styles.underline}></div>
                    <p className={styles.profileText}>{section.content.text}</p>
                  </div>
                );

              case 'experience':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2>Experience</h2>
                    <div className={styles.underline}></div>
                    {section.content.items.map((exp, idx) => (
                      <div key={idx} className={styles.experienceItem}>
                        <div className={styles.period}>{exp.period}</div>
                        <div className={styles.jobTitle}>{exp.title}</div>
                        <div className={styles.company}>{exp.company}</div>
                        <p className={styles.description}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                );

              case 'contact':
                return (
                  <div key={section.id} className={styles.section}>
                    <h2>Contact</h2>
                    <div className={styles.underline}></div>
                    <div className={styles.contactInfo}>
                      <p>Phone: {section.content.phone}</p>
                      <p>Email: {section.content.email}</p>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplateRenderer;