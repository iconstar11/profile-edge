// src/utils/constants.js
export const DEFAULT_TEMPLATE = {
  sections: [
    {
      id: 'personal',
      type: 'personal',
      order: 0,
      content: {
        name: 'David St. Peter',
        title: 'UX Designer',
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
  ],
  stylePreferences: {
    fontFamily: 'Helvetica',
    fontSize: '16px',
    primaryColor: '#4CAF50',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    theme: 'light'
  },
  editingState: {
    activeSection: null,
    isEditing: false
  },
  activeTemplate: 'default',
  lastSaved: new Date().toISOString()
};

// You can also add section type constants
export const SECTION_TYPES = {
  PERSONAL: 'personal',
  EDUCATION: 'education',
  PROFILE: 'profile',
  EXPERIENCE: 'experience',
  CONTACT: 'contact'
};

// Add template layout configurations if needed
export const TEMPLATE_LAYOUTS = {
  default: {
    sectionOrder: ['personal', 'education', 'profile', 'experience', 'contact']
  }
};