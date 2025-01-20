// src/App.js

import React from 'react';
import './App.css'; // Optional: Import global CSS for your app
import AppRoutes from './utils/AppRoutes';
import { ThemeProvider } from './utils/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
