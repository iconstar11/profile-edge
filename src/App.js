// src/App.js

import React from 'react';
import './App.css'; // Optional: Import global CSS for your app
import AppRoutes from './utils/AppRoutes';

const App = () => {
  return (
    <div className="App">
      {/* Render the AppRoutes */}
      <AppRoutes />
    </div>
  );
};

export default App;
