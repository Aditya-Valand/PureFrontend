import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

// Create Authentication Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user token from cookies on initialization
    const token = Cookies.get('token');
    return token ? { token } : null;
  });

  const login = (userData) => {
    setUser(userData);
    Cookies.set('token', userData.token, { expires: 7 }); // Save token in cookies for 7 days
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token'); // Remove token from cookies
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
