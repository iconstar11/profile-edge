import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: {
    primary: '#ff7f50',
    secondary: '#f7f7f7',
    accent: '#ffc107',
    background: '#ffffff',
    textPrimary: '#333333',
    textSecondary: '#555555',
    error: '#e74c3c',
  },
  dark: {
    primary: '#ff7f50',
    secondary: '#2c3e50',
    accent: '#ffc107',
    background: '#121212',
    textPrimary: '#f5f5f5',
    textSecondary: '#cccccc',
    error: '#e74c3c',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark' ? themes.dark : themes.light);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme === themes.dark ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};