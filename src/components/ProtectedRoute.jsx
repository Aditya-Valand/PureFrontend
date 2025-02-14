import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { user: userData } = useAuth();
  
  console.log(userData)

  if (!userData?.user) {
    return <Navigate to="/account" replace />;       
  }
  
  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to="/verify" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
