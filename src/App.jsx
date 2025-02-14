import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import GoogleLogin from './components/GoogleLogin';
import AboutUs from './components/AboutUs';
import SignUpForm from './components/SignUpForm';
import OnboardingFlow from './components/OnboardingFlow';
import MobileNavigation from './components/MobileNavigation';
import ScanAfter from './components/scanAfter';
import ChatBot from './components/ChatBot';

// Auth and Protection
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
          <Route path="/account" element={<SignUpForm />} />
            <Route 
              path="/verify" 
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <OnboardingFlow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MobileNavigation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Analyze" 
              element={
                <ProtectedRoute>
                  <ScanAfter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/insightbuddy" 
              element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              } 
            />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;