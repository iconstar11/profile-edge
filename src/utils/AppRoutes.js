// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Components
import Navbar from '../components/Shared/Navbar';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';

const AppRoutes = () => {
  return (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          {/* Primary Route for Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Fallback Route for No Page Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Router>
  );
};

export default AppRoutes;
