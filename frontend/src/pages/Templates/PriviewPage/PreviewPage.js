// src/components/preview/PreviewPage.js
import React, { useState, useRef } from 'react';
import { useCV } from './hooks/useCV';
import TemplateRenderer from './TemplateRenderer';
import styles from './previewPage.module.css';

const PreviewPage = () => {
  const { state, dispatch } = useCV();
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const cvRef = useRef(null);

  console.log('PreviewPage State:', {
    sectionsCount: state?.sections?.length,
    sections: state?.sections?.map(s => s.type)
  });

  if (!state || !state.sections) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.previewPage}>
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
        <div className={styles.content}>
          <div ref={cvRef}>
            <TemplateRenderer 
              template={state}
              isEditing={false}
              activeSection={null}
              onContentUpdate={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;