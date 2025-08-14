// src/App.js

import React from 'react';
import './App.css'; // Optional: Import global CSS for your app
import AppRoutes from './utils/AppRoutes'; // Import the AppRoutes component
import { CVProvider } from './pages/Templates/PriviewPage/context/CVContext';





const App = () => {
   console.log('App rendering');
  return (
    <CVProvider>
      <AppRoutes />
    </CVProvider>
  );
};

export default App;
