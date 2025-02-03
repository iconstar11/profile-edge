import React, { useState } from 'react';
import styles from './templates.module.css';
import CustomizationPanel from './CustomizationPanel'; // Assuming CustomizationPanel is in the same directory

const TemplatePreviewModal = ({ template, onClose, onTemplateSelect }) => {
  const [customTemplate, setCustomTemplate] = useState(template);

  const handleTemplateSelect = () => {
    if (onTemplateSelect) {
      onTemplateSelect(customTemplate);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        {/* Preview Area */}
        <div style={{
          fontFamily: customTemplate.font,
          color: customTemplate.colors[0],
          backgroundColor: customTemplate.colors[1]
        }}>
          {/* Your template preview rendering */}
          <p>Preview Content Here</p>
        </div>
        
        <CustomizationPanel 
          template={customTemplate}
          onUpdateTemplate={setCustomTemplate}
        />
        
        <button 
          className={styles.useTemplateButton}
          onClick={handleTemplateSelect}
        >
          Use This Template
        </button>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;