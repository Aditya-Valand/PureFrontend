import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import GoogleLogin from './components/GoogleLogin';
import AboutUs from './components/AboutUs';
import SignUpForm from './components/SignUpForm';
import OnboardingFlow from './components/OnboardingFlow';
import MobileNavigation from './components/MobileNavigation';
import ScanAfter from './components/ScanAfter';
import ChatBot from './components/ChatBot';
import SearchApp from './components/Search';
import Read from './components/Read';

// Auth and Protection
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DeepAnalyze from './components/DeepAnalyze';
import ProfilePage from './components/ProfilePage';
import PricingPlans from './components/PricingPlans';
import WhyChooseUs from './components/WhyChooseUs';
import Blog from './components/Blog';

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
              path="/plans" 
              element={
                <ProtectedRoute>
                  <PricingPlans />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/feature" 
              element={
                <ProtectedRoute>
                  <Blog />
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
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/search" element={<SearchApp />} />
            <Route path="/read/:slug" element={<Read/>} />
            <Route path="/chat/history/:session" element={<DeepAnalyze/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;