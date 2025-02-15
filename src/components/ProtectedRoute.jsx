import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const auth = useAuth();
  
  // If no auth or no user, redirect to login
  if (!auth || !auth.user) {
    return <Navigate to="/account" replace />;       
  }
  
  // If onboarding is required but not completed, redirect to verify
  if (requireOnboarding && !auth.user.isOnboarded) {
    return <Navigate to="/verify" replace />;
  }
  
  // If we're on the onboarding page but already onboarded, redirect to home
  if (!requireOnboarding && auth.user.isOnboarded) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;