import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './previewPage.module.css';

const SectionEditor = ({ sections, onReorder }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);

    onReorder(newSections);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.draggableSection}
                  >
                    {section.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionEditor;