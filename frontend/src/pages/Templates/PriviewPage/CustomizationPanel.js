import React from 'react';
import styles from './previewPage.module.css';
// Import icons from a library like react-icons
import { 
  BiAlignLeft, BiAlignMiddle, BiAlignRight, BiAlignJustify,
  BiBold, BiItalic, BiUnderline, BiStrikethrough
} from 'react-icons/bi';


const CustomizationPanel = ({ template, setTemplate }) => {
  return (
    <div className={styles.customizationPanel}>
      {/* Align Section */}
      <div className={styles.section}>
        <h3>Align</h3>
        <div className={styles.alignButtons}>
          <button className={styles.iconButton}><BiAlignLeft /></button>
          <button className={styles.iconButton}><BiAlignMiddle /></button>
          <button className={styles.iconButton}><BiAlignRight /></button>
          <button className={styles.iconButton}><BiAlignJustify /></button>
        </div>
      </div>

      {/* Edit Text Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Edit Text</h3>
          <button className={styles.closeButton}>×</button>
        </div>
        <input 
          type="text" 
          className={styles.editInput}
          placeholder="Double click to edit"
        />
      </div>

      {/* Text Options Section */}
      <div className={styles.section}>
        <h3>Text</h3>
        <div className={styles.textControls}>
          <select className={styles.fontSelect}>
            <option>Hellix</option>
          </select>
          <div className={styles.fontProperties}>
            <span>SemiBold</span>
            <span>Aa</span>
            <span>14px</span>
          </div>
          <div className={styles.colorPicker}>
            <div className={styles.colorBox} style={{backgroundColor: '#244CEC'}}></div>
            <span>#244CEC</span>
          </div>
          <div className={styles.textMetrics}>
            <div className={styles.metricItem}>
              <span>160</span>
              <span>%</span>
            </div>
            <div className={styles.metricItem}>
              <span>20.5</span>
              <span>%</span>
            </div>
          </div>
          <div className={styles.textFormatting}>
            <button className={styles.iconButton}><BiBold /></button>
            <button className={styles.iconButton}><BiUnderline /></button>
            <button className={styles.iconButton}><BiItalic /></button>
            <button className={styles.iconButton}><BiStrikethrough /></button>
          </div>
        </div>
      </div>

      {/* Size Section */}
      <div className={styles.section}>
        <h3>Size</h3>
        <div className={styles.sizeControls}>
          <div className={styles.dimensionControl}>
            <span>↕ 860</span>
            <span>px</span>
          </div>
          <div className={styles.dimensionControl}>
            <span>↔ 540</span>
            <span>px</span>
          </div>
        </div>
      </div>

      {/* Style Effects Section */}
      <div className={styles.section}>
        <h3>Style Effects</h3>
      </div>
    </div>
  );
};

export default CustomizationPanel;