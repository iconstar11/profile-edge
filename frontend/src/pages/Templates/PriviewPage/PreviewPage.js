import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TemplateRenderer from './TemplateRenderer';
import CustomizationPanel from './CustomizationPanel';
import LeftCustomizationPanel from './LeftCustomizationPanel';
import styles from './previewPage.module.css';
import image from '../../../assets/pic_7.jpeg';

// Default template structure
const DEFAULT_TEMPLATE = {
  content: {
    name: 'David St. Peter',
    title: 'UX Designer',
    profileImage: image, // Add the imported image
    education: [
      {
        period: '2014 - 2016',
        degree: 'Degree Name',
        university: 'University name here'
      },
      {
        period: '2010 - 2014',
        degree: 'Degree Name',
        university: 'University name here'
      },
      {
        period: '2008 - 2010',
        degree: 'Degree Name',
        university: 'University name here'
      }
    ],
    profile: 'For more Sales, Leads, Customer Engagement. Become an Author, Create Information Products. All done quickly and easily. No Design or Technical skills necessary',
    experience: [
      {
        period: '2020 - Present',
        title: 'Senior UX Designer',
        company: 'Company Name',
        description: 'Lorem ipsum is simply dummy text offset the printing and typesetting industry.'
      },
      {
        period: '2017 - 2019',
        title: 'Junior UX Designer',
        company: 'Company Name',
        description: 'Lorem ipsum is simply dummy text offset the printing and typesetting industry.'
      }
    ],
    contact: {
      phone: '+000 123 456 789',
      email: 'youremail@gmail.com'
    }
  }
};

const PreviewPage = () => {
  const location = useLocation();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  
  // Initialize templateData with DEFAULT_TEMPLATE
  const [templateData, setTemplateData] = useState(() => {
    const locationTemplate = location.state?.template;
    const locationUserCV = location.state?.userCV;
    
    if (locationTemplate || locationUserCV) {
      return {
        ...DEFAULT_TEMPLATE,
        content: {
          ...DEFAULT_TEMPLATE.content,
          ...(locationTemplate?.content || {}),
          ...(locationUserCV || {})
        }
      };
    }
    
    return DEFAULT_TEMPLATE;
  });

  // Auto-save draft
  useEffect(() => {
    if (templateData) {
      localStorage.setItem('cvDraft', JSON.stringify(templateData));
    }
  }, [templateData]);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Handle template data updates
  const handleTemplateUpdate = (newData) => {
    setTemplateData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        ...newData
      }
    }));
  };

  return (
    <div className={styles.previewPage} data-theme={theme}>
      <div className={styles.header}>
        <h1>Preview Your CV</h1>
        <div className={styles.headerControls}>
          <button
            className={styles.customizeButton}
            onClick={() => setShowLeftPanel(!showLeftPanel)}
          >
            {showLeftPanel ? 'Hide Editor' : 'Show Editor'}
          </button>
          <button
            className={styles.customizeButton}
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            {isCustomizing ? 'Close Customization' : 'Customize'}
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        {showLeftPanel && (
          <LeftCustomizationPanel 
            templateData={templateData}
            setTemplateData={handleTemplateUpdate}
          />
        )}
        
        <div className={styles.content}>
          <TemplateRenderer template={templateData} />
          {isCustomizing && (
            <CustomizationPanel
              template={templateData}
              setTemplate={handleTemplateUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;