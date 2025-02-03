import styles from './templates.module.css';

const TemplateFilters = ({ filters, setFilters }) => {
  const industries = ['Technology', 'Finance', 'Healthcare'];
  const stylesList = ['Modern', 'Classic', 'Creative'];
  const colors = ['#2c3e50', '#3498db', '#e74c3c'];

  return (
    <div className={styles.filters}>
      <select
        value={filters.industry}
        onChange={(e) => setFilters({...filters, industry: e.target.value})}
      >
        <option value="">All Industries</option>
        {industries.map(industry => (
          <option key={industry} value={industry}>{industry}</option>
        ))}
      </select>

      <select
        value={filters.style}
        onChange={(e) => setFilters({...filters, style: e.target.value})}
      >
        <option value="">All Styles</option>
        {stylesList.map(style => (
          <option key={style} value={style}>{style}</option>
        ))}
      </select>

      <div className={styles.colorFilters}>
        {colors.map(color => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className={`${styles.colorFilter} ${
              filters.color === color ? styles.active : ''
            }`}
            onClick={() => setFilters({...filters, color})}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateFilters;