import React, { useState } from 'react';
import axios from '../utils/axios';
import Toastify from 'toastify-js';
import {GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignin, setIsSignin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignin ? 'signin' : 'signup';
    const data = { email, password };

    try {
      const response = await axios.post(`http://localhost:3000/auth/${endpoint}`, data);
      if (response.data.success) {
        handleSuccessfulLogin(response.data.data);
      } else {
        showToast(response.data.message || `${isSignin ? 'Login' : 'Registration'} failed`, true);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'An error occurred', true);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Credential:', credentialResponse); // Debug log
    try {
      const response = await axios.post('http://localhost:3000/auth/google', {
        credential: credentialResponse.credential
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data);
        window.location.href = '/scan';
      }
    } catch (error) {
      console.error('Google Auth Error:', error.response?.data);
      // Add error toast or handling
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google Login Failed:', error);
  };
  const handleSuccessfulLogin = (tokenData) => {
    // Destructure relevant information from the token response
    const { token, isOnboarded } = tokenData;
  
    // Store token and onboarding status
    localStorage.setItem('token', token);
    
    login({
      token,
      isOnboarded
    });
    // If not onboarded, redirect to verify
    if (!isOnboarded) {
      window.location.href = '/verify';
    } else {
      // If already onboarded, redirect to home or dashboard
      window.location.href = '/';
    }
  };
  const showToast = (message, isError = false) => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: isError ? '#b91c1c' : '#3d5e31',
        borderRadius: '8px',
        padding: '12px 24px',
        fontWeight: '500',
      },
    }).showToast();
  };

  return (
    <div className="min-h-screen bg-[#fbfbfe] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-2xl p-8 border border-[#82a685]/20">
        {/* Toggle Switch */}
        <div className="flex bg-[#82a685]/10 rounded-full p-1">
          <button
            onClick={() => setIsSignin(true)}
            className={`w-1/2 py-3 rounded-full transition-all duration-300 ${
              isSignin 
                ? 'bg-[#3d5e31] text-white shadow-md' 
                : 'text-[#3d5e31]/70 hover:bg-[#82a685]/10'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignin(false)}
            className={`w-1/2 py-3 rounded-full transition-all duration-300 ${
              !isSignin 
                ? 'bg-[#3d5e31] text-white shadow-md' 
                : 'text-[#3d5e31]/70 hover:bg-[#82a685]/10'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#040316] mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#82a685]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d5e31]/50 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#040316] mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#82a685]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d5e31]/50 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {!isSignin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#3d5e31] focus:ring-[#3d5e31] border-[#82a685] rounded"
                required
              />
              <label className="ml-2 block text-sm text-[#040316]">
                I agree to the{' '}
                <a href="#" className="text-[#3d5e31] hover:underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#3d5e31] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#3d5e31] text-white py-3 rounded-xl hover:bg-[#3d5e31]/90 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            {isSignin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-[#82a685]/30 flex-grow"></div>
          <span className="text-sm text-[#040316]/70">or</span>
          <div className="h-px bg-[#82a685]/30 flex-grow"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
        <GoogleOAuthProvider 
      clientId="36146732171-34vbjse2gbc9acg970fl766qo0k8se2f.apps.googleusercontent.com"
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap
        flow='implicit'
      />
    </GoogleOAuthProvider>
        </div>

        {message && (
          <p className="text-center text-[#3d5e31] mt-4 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Account;