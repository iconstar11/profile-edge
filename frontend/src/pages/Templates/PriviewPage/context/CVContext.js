// context/CVContext.js
import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  sections: [
    {
      id: 'personal',
      type: 'personal',
      order: 0,
      content: {
        name: 'David St. Peter',
        title: 'UX Designer',
        profileImage: null
      }
    },
    {
      id: 'education',
      type: 'education',
      order: 1,
      content: {
        items: [
          {
            period: '2014 - 2016',
            degree: 'Degree Name',
            university: 'University name here'
          }
          // ... other education items
        ]
      }
    },
    // ... other sections
  ],
  stylePreferences: {
    fontFamily: 'Helvetica',
    fontSize: '16px',
    primaryColor: '#4CAF50',
    textColor: '#333333',
    backgroundColor: '#ffffff',
  },
  activeTemplate: 'default',
  lastSaved: new Date()
};

export const CVContext = createContext();

function cvReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.sectionId
            ? { ...section, content: action.payload.content }
            : section
        ),
        lastSaved: new Date()
      };
    
    case 'REORDER_SECTIONS':
      return {
        ...state,
        sections: action.payload.map((id, index) => ({
          ...state.sections.find(s => s.id === id),
          order: index
        })),
        lastSaved: new Date()
      };
    
    case 'UPDATE_STYLE':
      return {
        ...state,
        stylePreferences: { ...state.stylePreferences, ...action.payload },
        lastSaved: new Date()
      };
    
    case 'SET_TEMPLATE':
      return {
        ...state,
        activeTemplate: action.payload,
        lastSaved: new Date()
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
}

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cv-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('cv-state', JSON.stringify(state));
    }, 1000); // Debounce saves

    return () => clearTimeout(saveTimeout);
  }, [state]);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}