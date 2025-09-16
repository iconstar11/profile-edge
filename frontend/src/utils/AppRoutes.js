// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from '../components/Shared/Navbar';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import UploadPage from '../pages/CV/UploadPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import SignInPage from '../pages/Auth/SignInPage';
import ResponsePage from '../pages/CV/ResponsePage';
import TemplatesPage from '../pages/Templates/TemplatesPage';
import Dashboard from '../pages/Dashboard/dashboard';
import PreviewPage from '../pages/Templates/PriviewPage/PreviewPage';
import LandingPage from '../pages/Landing/LandingPage';
import CreateCVPage from '../pages/CV/CreateCVPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/response" element={<ResponsePage />} />
          <Route path="/resumetemplates" element={<TemplatesPage />} />
          <Route path="preview" element={<PreviewPage />} />  

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/createCv" 
            element={
              <PrivateRoute>
                <CreateCVPage />
              </PrivateRoute>
            } 
          />

          {/* Fallback Route for No Page Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Router>
  );
};

export default AppRoutes;
