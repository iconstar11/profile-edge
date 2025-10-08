// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from '../components/Shared/Navbar';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import UploadPage from '../pages/CV/UploadPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import SignInPage from '../pages/Auth/SignInPage';
import Dashboard from '../pages/Dashboard/dashboard';
import LandingPage from '../pages/Landing/LandingPage';
import CreateCVPage from '../pages/CV/CreateCVPage';
import PrivateRoute from './PrivateRoute';
import StartFreshPage from '../pages/CV/Components/StartFreshPage';
import Jobs from '../pages/Jobs/Jobs';
import PreviewCVPage from '../pages/CV/Components/PreviewCVPage';
import { CVProvider } from './CVContext';
import EditCVPage from '../pages/CV/Components/EditCVPage';
import TailorResumePage from '../pages/Ai_Tailor/TailorResumePage';
import TailoringResultPage from '../pages/Ai_Tailor/TailoringResultPage';

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
            <Route path="/input" element={<TailorResumePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/result" element={<TailoringResultPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            {/* CV Creation Routes - All Protected */}
            <Route
              path="/createCv"
              element={
                <PrivateRoute>
                  <CreateCVPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createCv/preview"
              element={
                <PrivateRoute>
                  <PreviewCVPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createCv/start-fresh"
              element={
                <PrivateRoute>
                  <StartFreshPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createCv/edit"
              element={
                <PrivateRoute>
                  <EditCVPage />
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