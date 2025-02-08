// TemplateRenderer.js
import React from 'react';
import styles from './previewPage.module.css';

const TemplateRenderer = ({ template }) => {
  // Add proper checks and default values
  const content = template?.content || {};

  return (
    <div className={styles.templateRenderer}>
      <div className={styles.resumeHeader}>
        <div className={styles.headerContent}>
          <h1>{content?.name || 'Default Name'}</h1>
          <p className={styles.title}>{content?.title || 'Default Title'}</p>
        </div>
      </div>

      <div className={styles.resumeContent}>
        <div className={styles.leftColumn}>
          <section className={styles.section}>
            <h2>Education</h2>
            <div className={styles.underline}></div>
            {content?.education?.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.period}>{edu.period}</div>
                <div className={styles.degree}>{edu.degree}</div>
                <div className={styles.university}>{edu.university}</div>
              </div>
            )) || <p>No education information available</p>}
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <div className={styles.underline}></div>
            <div className={styles.contactInfo}>
              <p>Phone: {content?.contact?.phone || 'N/A'}</p>
              <p>Email: {content?.contact?.email || 'N/A'}</p>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.section}>
            <h2>Profile</h2>
            <div className={styles.underline}></div>
            <p>{content?.profile || 'No profile information available.'}</p>
          </section>

          <section className={styles.section}>
            <h2>Experience</h2>
            <div className={styles.underline}></div>
            {content?.experience?.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className={styles.period}>{exp.period}</div>
                <div className={styles.jobTitle}>{exp.title}</div>
                <div className={styles.company}>{exp.company}</div>
                <p className={styles.description}>{exp.description}</p>
              </div>
            )) || <p>No experience information available</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TemplateRenderer;