import { useState } from 'react';
import TemplateFilters from './TemplateFilters';
import TemplateCard from './TemplateCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import styles from './templates.module.css';
import image from '../../assets/pic_7.jpeg'
import image1 from '../../assets/pic_6.jpeg'

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
    thumbnail: image
  },
  {
    id: 2,
    name: 'Corporate Blue',
    industry: 'Business',
    style: 'Professional',
    colors: ['#1c3faa', '#f1f1f1'],
    thumbnail: image
  },
  {
    id: 3,
    name: 'Creative Studio',
    industry: 'Design',
    style: 'Minimalist',
    colors: ['#ff5733', '#282c34'],
    thumbnail: image
  },
  {
    id: 4,
    name: 'Green Nature',
    industry: 'Environment',
    style: 'Organic',
    colors: ['#228B22', '#f4a261'],
    thumbnail: image
  },
  {
    id: 5,
    name: 'Elegant Fashion',
    industry: 'Fashion',
    style: 'Elegant',
    colors: ['#d63384', '#ffffff'],
    thumbnail: image
  },
  {
    id: 6,
    name: 'Bold Startup',
    industry: 'Startup',
    style: 'Bold',
    colors: ['#ffcc00', '#333333'],
    thumbnail: image
  },
  {
    id: 7,
    name: 'Health & Wellness',
    industry: 'Healthcare',
    style: 'Clean',
    colors: ['#3cba92', '#fdfdfd'],
    thumbnail: image
  },
  {
    id: 8,
    name: 'Rustic Cafe',
    industry: 'Food & Beverage',
    style: 'Rustic',
    colors: ['#8b4513', '#e6c4a3'],
    thumbnail: image
  },
  {
    id: 9,
    name: 'Dark Portfolio',
    industry: 'Photography',
    style: 'Dark',
    colors: ['#000000', '#ffcc00'],
    thumbnail: image
  },
  {
    id: 10,
    name: 'Dark Portfolio',
    industry: 'Photography',
    style: 'Dark',
    colors: ['#000000', '#ffcc00'],
    thumbnail: image1
  }
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