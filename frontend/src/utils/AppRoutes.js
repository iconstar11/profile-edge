// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Components
import Navbar from '../components/Shared/Navbar';
import NotFoundPage from '../pages/NotFoundPage';
import UploadPage from '../pages/UploadPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import SignInPage from '../pages/Auth/SignInPage';
import ResponsePage from '../pages/ResponsePage';
import TemplatesPage from '../pages/Templates/TemplatesPage';
import Dashboard from '../pages/dashboard';
import PreviewPage from '../pages/Templates/PriviewPage/PreviewPage'
import LandingPage from '../pages/LandingPage';
import CreateCVPage from '../pages/CreateCVPage';

const AppRoutes = () => {
  return (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          {/* Primary Route for Home Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/upload" element={<UploadPage/>} />
          <Route path="/response" element={<ResponsePage />} />
          <Route path='/resumetemplates' element={<TemplatesPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='preview' element={<PreviewPage />} />  
          <Route path='/createCv' element={< CreateCVPage/>} />


          {/* Fallback Route for No Page Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Router>
  );
};

export default AppRoutes;
