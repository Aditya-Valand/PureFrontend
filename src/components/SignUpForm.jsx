import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import apiClient from '../utils/axios';


const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Reset form and message when switching modes
    setFormData({
      email: '',
      password: '',
      rememberPassword: false
    });
    setMessage('');
  }, [isSignUp]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const endpoint = isSignUp ? '/signup' : '/signin';
      const response = await apiClient.post(endpoint, {
        email: formData.email,
        password: formData.password
      });

      if (!isSignUp) {
        // Save token on successful login
        localStorage.setItem('token', response.data.data);
      }

      setMessage(response.data.message || (isSignUp ? 'Signup successful!' : 'Login successful!'));
      
      // Clear form after successful submission
      setFormData({
        email: '',
        password: '',
        rememberPassword: false
      });
      
    } catch (error) {
      setMessage(error.response?.data?.message || (isSignUp ? 'Signup failed' : 'Login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await apiClient.post('/google', {
          credentials: tokenResponse.credential,
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });
        localStorage.setItem('token', response.data.data);
        setMessage('Google login successful!');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Google login failed');
      }
    },
    onError: () => {
      setMessage('Google login failed');
    }
  });

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching modes
    setFormData({
      name: isSignUp ? '' : formData.name,
      email: '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-[#2C3639] h-48 rounded[11px_11px_11px_11px] px-8 pt-8">
          <button onClick={toggleAuthMode} className="text-white mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-4xl font-bold pl-4">{isSignUp ? 'Sign up' : 'Log in'}</h1>
        </div>

        <div className="px-8 pb-8 pt-8">
          <p className="text-gray-600 mb-6">{isSignUp ? 'Create a new account' : 'Sign in to your account'}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-green-500"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-green-500"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-green-500"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                id="togglePassword"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              ></button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                  name="rememberPassword"
                  checked={formData.rememberPassword}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">Remember password</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-xl hover:bg-[#374045] transition duration-200 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2C3639]'
              }`}
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Log in')}
            </button>

            <div className="text-center text-gray-500 text-sm mt-4">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={toggleAuthMode} className="text-blue-500 hover:text-blue-600 ml-1">
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </div>

            <div className="text-center text-gray-500 text-sm mt-4">or connect with</div>

            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition duration-200"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign In with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;