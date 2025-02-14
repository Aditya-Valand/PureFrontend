// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Main AuthProvider component
const AuthProvider = ({ children }) => {

  
  const [user, setUser] = useState(() => {
    const token = Cookies.get('token');
    const isOnboarded = Cookies.get('isOnboarded') === 'true';
    return token ? { token, isOnboarded } : null;
  });

  const login = (userData) => {
    userData.user = jwtDecode(userData.token)
    setUser(userData);
    Cookies.set('token', userData.token, { expires: 7 });
    Cookies.set('isOnboarded', userData.isOnboarded || false, { expires: 7 });
  if (!userData.isOnboarded) {
  }
  };

  
  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('isOnboarded');
  };

  const completeOnboarding = () => {
    setUser(prev => ({ ...prev, isOnboarded: true }));
    Cookies.set('isOnboarded', true, { expires: 7 });
  };

  return (
    <AuthContext.Provider value={{  login, logout, completeOnboarding, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;