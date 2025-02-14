import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file exists and is in the correct location

import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const CLIENT_ID = '36146732171-34vbjse2gbc9acg970fl766qo0k8se2f.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  
    <App />
);
