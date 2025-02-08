// Save draft to localStorage
export const saveDraft = (templateData) => {
  try {
    localStorage.setItem('cvDraft', JSON.stringify(templateData));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
};

// Load draft from localStorage
export const loadDraft = () => {
  try {
    const draft = localStorage.getItem('cvDraft');
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
};

// Clear draft from localStorage
export const clearDraft = () => {
  try {
    localStorage.removeItem('cvDraft');
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
};

// Check if a draft exists
export const hasDraft = () => {
  return !!localStorage.getItem('cvDraft');
};