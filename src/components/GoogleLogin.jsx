import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from '../utils/axios';

const GoogleLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post('/google', {
          credentials: tokenResponse.credential,
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });
        localStorage.setItem('token', response.data.data); // Save token in localStorage
        alert('Login successful!');
      } catch (error) {
        alert(error.response?.data?.message || 'Google login failed');
      }
    },
  });

  return (
    <button onClick={() => login()}>
      Login with Google
    </button>
  );
};

export default GoogleLogin;
