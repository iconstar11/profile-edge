import "./TemplateSelector.css";

function TemplateSelector({ selectedTemplate, onChange }) {
  return (
    <div className="template-selector">
      <label>Select Template: </label>
      <select value={selectedTemplate} onChange={(e) => onChange(e.target.value)}>
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
      </select>
    </div>
  );
}

export default TemplateSelector;


