import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import apiClient from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize navigate


  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Reset form and message when switching modes
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      rememberPassword: false,
    });
    setMessage('');
  }, [isSignUp]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    console.log('Updated form data:', { ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formData);
      const endpoint = isSignUp ? '/signup' : '/signin';
      const response = await apiClient.post(endpoint, formData);

      if (!isSignUp) {
        login({ token: response.data.data });
        navigate('/verify'); // Redirect after login
      }

      setMessage(response.data.message || 'Success!');
      setFormData({ email: '', password: '', rememberPassword: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error occurred';
      console.error('Error:', errorMessage);
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Token Response:', tokenResponse);
        const response = await apiClient.post('/google', {
          access_token: tokenResponse.access_token,
        });
        login({ token: response.data.data }); // Save user data
        setMessage('Google login successful!');
        navigate('/verify'); // Redirect to onboarding after successful login
      } catch (error) {
        console.error('Google Login Error:', error.response?.data || error.message);
        setMessage(error.response?.data?.message || 'Google login failed');
      }
    },
    onError: () => setMessage('Google login failed'),
  });
  console.log('Navigate function:', navigate);


  // Toggle between sign-up and log-in modes
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);

    // Reset form data while keeping all fields defined
    setFormData((prevData) => ({
      ...prevData,
      name: !isSignUp ? '' : prevData.name,
      email: '',
      password: '',
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-[#2C3639] h-48 px-8 pt-8">
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
                  required={isSignUp}
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
                type={showPassword ? 'text' : 'password'}
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
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
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
              {isLoading ? 'Processing...' : isSignUp ? 'Sign up' : 'Log in'}
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
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              Sign In with Google
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
