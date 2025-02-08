// components/DownloadButtons.js
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import styles from './downloadButtons.module.css';

const DownloadButtons = ({ cvRef }) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadAsPDF = async () => {
    try {
      setIsLoading(true);
      const element = cvRef.current;
      const opt = {
        margin: 1,
        filename: 'my-cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      alert('CV downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.downloadButtons}>
      <button 
        className={`${styles.downloadButton} ${isLoading ? styles.loading : ''}`}
        onClick={downloadAsPDF}
        disabled={isLoading}
      >
        {isLoading ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
};

export default DownloadButtons;