import React from 'react';
import styles from './previewPage.module.css';
import { 
  BiBold, BiItalic, BiUnderline, BiLink, 
  BiInfinite, BiListUl, BiAlignJustify 
} from 'react-icons/bi';

const LeftCustomizationPanel = () => {
  return (
    <div className={styles.leftPanel}>
      {/* Top Navigation */}
      <div className={styles.tabNavigation}>
        <button className={`${styles.tabButton} ${styles.active}`}>Create</button>
        <button className={styles.tabButton}>Templates</button>
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {/* Personal Information Section */}
        <div className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <span>Personal Information</span>
            <button className={styles.expandButton}>+</button>
          </div>
        </div>

        {/* Professional Summary Section */}
        <div className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <span>Professional Summary</span>
            <button className={styles.expandButton}>+</button>
          </div>
        </div>

        {/* Employment History Section */}
        <div className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <span>Employment History</span>
            <button className={styles.expandButton}>-</button>
          </div>
          
          {/* Employment Form */}
          <div className={styles.sectionContent}>
            <input 
              type="text" 
              className={styles.formInput} 
              placeholder="Job Title"
            />
            <input 
              type="text" 
              className={styles.formInput} 
              placeholder="Employer"
            />
            <div className={styles.dateInputs}>
              <input 
                type="text" 
                className={styles.formInput} 
                placeholder="MM / YYY"
              />
              <input 
                type="text" 
                className={styles.formInput} 
                placeholder="MM / YYY"
              />
            </div>
            <input 
              type="text" 
              className={styles.formInput} 
              placeholder="City"
            />
            
            {/* Text Formatting Tools */}
            <div className={styles.textFormatting}>
              <button className={styles.formatButton}><BiBold /></button>
              <button className={styles.formatButton}><BiItalic /></button>
              <button className={styles.formatButton}><BiUnderline /></button>
              <button className={styles.formatButton}><BiLink /></button>
              <button className={styles.formatButton}><BiInfinite /></button>
              <button className={styles.formatButton}><BiListUl /></button>
              <button className={styles.formatButton}><BiAlignJustify /></button>
            </div>

            <textarea 
              className={styles.descriptionArea}
              rows={4}
            />
          </div>

          <button className={styles.addMoreButton}>
            + Add One More
          </button>
        </div>

        {/* Education Section */}
        <div className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <span>Education</span>
            <button className={styles.expandButton}>+</button>
          </div>
        </div>

        {/* Websites & Social Links Section */}
        <div className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <span>Websites & Social Links</span>
            <button className={styles.expandButton}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCustomizationPanel;