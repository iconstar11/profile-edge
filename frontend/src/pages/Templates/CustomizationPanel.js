import { useState } from 'react';
import { CirclePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './templates.module.css';

const CustomizationPanel = ({ template, onUpdateTemplate }) => {
  const [customization, setCustomization] = useState({
    colors: template.colors,
    font: template.font || 'Arial',
    layout: template.sections
  });

  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New'];
  
  const handleColorChange = (color, type) => {
    const newColors = [...customization.colors];
    const colorIndex = type === 'primary' ? 0 : 1;
    newColors[colorIndex] = color.hex;
    
    setCustomization(prev => ({
      ...prev,
      colors: newColors
    }));
    
    onUpdateTemplate({ colors: newColors });
  };

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setCustomization(prev => ({ ...prev, font: newFont }));
    onUpdateTemplate({ font: newFont });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const newSections = [...customization.layout];
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);
    
    setCustomization(prev => ({
      ...prev,
      layout: newSections
    }));
    
    onUpdateTemplate({ sections: newSections });
  };

  return (
    <div className={styles.customizationPanel}>
      <div className={styles.customizationSection}>
        <h3>Colors</h3>
        <div className={styles.colorPickers}>
          <div className={styles.colorPickerGroup}>
            <label>Primary Color</label>
            <CirclePicker
              color={customization.colors[0]}
              onChange={(color) => handleColorChange(color, 'primary')}
            />
          </div>
          <div className={styles.colorPickerGroup}>
            <label>Secondary Color</label>
            <CirclePicker
              color={customization.colors[1]}
              onChange={(color) => handleColorChange(color, 'secondary')}
            />
          </div>
        </div>
      </div>

      <div className={styles.customizationSection}>
        <h3>Font Family</h3>
        <select 
          value={customization.font} 
          onChange={handleFontChange}
          className={styles.fontSelector}
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className={styles.customizationSection}>
        <h3>Layout Order</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.layoutEditor}
              >
                {customization.layout.map((section, index) => (
                  <Draggable 
                    key={section} 
                    draggableId={section} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggableSection}
                      >
                        {section}
                        <span className={styles.dragHandle}>☰</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default CustomizationPanel;