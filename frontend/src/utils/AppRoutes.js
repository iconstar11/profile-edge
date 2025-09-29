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
import Dashboard from '../pages/Dashboard/dashboard';
import LandingPage from '../pages/Landing/LandingPage';
import CreateCVPage from '../pages/CV/CreateCVPage';
import PrivateRoute from './PrivateRoute';
import StartFreshPage from '../pages/CV/Components/StartFreshPage';
import Jobs from '../pages/Jobs/Jobs';
import PreviewCVPage from '../pages/CV/Components/PreviewCVPage';
import { CVProvider } from './CVContext';



const AppRoutes = () => {
  return (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar />

        {/* Wrap all routes that need CV data in the Provider */}
        <CVProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/response" element={<ResponsePage />} />

            {/* Preview + Start Fresh */}
            <Route path="/preview" element={<PreviewCVPage />} />
            <Route path="/start-fresh" element={<StartFreshPage />} />

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

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CVProvider>
      </>
    </Router>
  );
};

export default AppRoutes;
