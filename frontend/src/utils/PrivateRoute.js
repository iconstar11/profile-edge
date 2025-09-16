// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Optional: replace with spinner
  }

  return currentUser ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
