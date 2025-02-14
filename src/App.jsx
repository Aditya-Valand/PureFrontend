import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GoogleLogin from './components/GoogleLogin';
import Account from './components/Account';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ConversionOutput from './components/ConversionOutput';
import AgeSelection from './components/AgeSelection';
import ActivityLevel from './components/ActivityLevel';
import SignUpForm from './components/SignUpForm';
import HeightSelection from './components/HeightSelection';
import DietSelection from './components/DietSelection';
// import  Iphone  from './components/Iphone';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoalSelection from './components/GoalSelection';
import AllergySelection from './components/AllergySelection';
import OnboardingFlow from './components/Onboardingflow';
import MobileNavigation from './components/MobileNavigation';
import ScanAfter from './components/scanAfter';
import ChatBot from './components/ChatBot';
import UploadImage from './components/UploadImage';
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={<SignUpForm />} />
        <Route path="/Analyze" element={<ScanAfter/>} />
        <Route path="/insightbuddy" element={<ChatBot />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/mobile" element={<MobileNavigation />} />
        <Route path="/verify" element={<OnboardingFlow />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
    
  );
};

export default App;