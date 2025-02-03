import { useState } from 'react';
import TemplateFilters from './TemplateFilters';
import TemplateCard from './TemplateCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import styles from './templates.module.css';

const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filters, setFilters] = useState({
    industry: '',
    style: '',
    color: ''
  });

  // Mock data - replace with API call
  const templates = [
    {
      id: 1,
      name: 'Modern Tech',
      industry: 'Technology',
      style: 'Modern',
      colors: ['#2c3e50', '#3498db'],
      thumbnail: '/templates/modern-tech.jpg'
    },
    // Add more templates
  ];

  const filteredTemplates = templates.filter(template => {
    return (
      (!filters.industry || template.industry === filters.industry) &&
      (!filters.style || template.style === filters.style) &&
      (!filters.color || template.colors.includes(filters.color))
    );
  });

  return (
    <div className={styles.templatesPage}>
      <TemplateFilters 
        filters={filters}
        setFilters={setFilters}
      />
      
      <div className={styles.templateGrid}>
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={() => setSelectedTemplate(template)}
          />
        ))}
      </div>

      {selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
};

export default TemplatesPage;