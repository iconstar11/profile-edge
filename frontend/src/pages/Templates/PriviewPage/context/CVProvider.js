// src/context/CVProvider.js
import React, { createContext, useReducer, useEffect } from 'react';

// Define initial sections
const INITIAL_SECTIONS = [
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
        },
        {
          period: '2010 - 2014',
          degree: 'Degree Name',
          university: 'University name here'
        }
      ]
    }
  },
  {
    id: 'profile',
    type: 'profile',
    order: 2,
    content: {
      text: 'For more Sales, Leads, Customer Engagement. Become an Author, Create Information Products. All done quickly and easily. No Design or Technical skills necessary'
    }
  },
  {
    id: 'experience',
    type: 'experience',
    order: 3,
    content: {
      items: [
        {
          period: '2020 - Present',
          title: 'Senior UX Designer',
          company: 'Company Name',
          description: 'Lorem ipsum is simply dummy text offset the printing and typesetting industry.'
        },
        {
          period: '2017 - 2019',
          title: 'Junior UX Designer',
          company: 'Company Name',
          description: 'Lorem ipsum is simply dummy text offset the printing and typesetting industry.'
        }
      ]
    }
  },
  {
    id: 'contact',
    type: 'contact',
    order: 4,
    content: {
      phone: '+000 123 456 789',
      email: 'youremail@gmail.com'
    }
  }
];

const INITIAL_STATE = {
  sections: INITIAL_SECTIONS,
  stylePreferences: {
    fontFamily: 'Helvetica',
    fontSize: '16px',
    primaryColor: '#4CAF50',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    theme: 'light'
  },
  activeTemplate: 'default',
  lastSaved: new Date().toISOString()
};

export const CVContext = createContext();

const cvReducer = (state, action) => {
  console.log('Reducer Action:', action.type, action.payload);

  switch (action.type) {
    case 'RESET_STATE':
      return INITIAL_STATE;

    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.sectionId
            ? { ...section, content: { ...section.content, ...action.payload.content } }
            : section
        )
      };

    default:
      return state;
  }
};

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, INITIAL_STATE);

  // Force reset state on mount
  useEffect(() => {
    localStorage.removeItem('cv-state'); // Clear localStorage
    dispatch({ type: 'RESET_STATE' }); // Reset to initial state
  }, []);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}