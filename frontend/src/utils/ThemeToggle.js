import * as React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    
    // Update state and DOM attribute
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = (checked) => {
    // Update state
    setDarkMode(checked);
    
    // Save preference
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    
    // Update DOM attribute
    document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={30}
      sunColor="#FFC107" // Your secondary accent (gold)
      moonColor="#E0E0E0" // Dark mode text color
      className="theme-toggle"
      aria-label="Toggle dark mode"
    />
  );
};

export default ThemeToggle;