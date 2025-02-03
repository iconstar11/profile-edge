import styles from './templates.module.css';

const TemplateCard = ({ template, onPreview }) => {
  return (
    <div className={styles.templateCard}>
      <img 
        src={template.thumbnail} 
        alt={`${template.name} template`}
        className={styles.thumbnail}
      />
      <div className={styles.cardContent}>
        <h3>{template.name}</h3>
        <div className={styles.colorPalette}>
          {template.colors.map((color, index) => (
            <div 
              key={index}
              style={{ backgroundColor: color }}
              className={styles.colorSwatch}
            />
          ))}
        </div>
        <button 
          onClick={onPreview}
          className={styles.previewButton}
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;