import React, { createContext, useState, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get('token');
    const isOnboarded = Cookies.get('isOnboarded') === 'true';
    return token ? { token, isOnboarded } : null;
  });

  const login = (userData) => {
    userData.user = jwtDecode(userData.token);
    setUser(userData);
    Cookies.set('token', userData.token, { expires: 7 });
    Cookies.set('isOnboarded', userData.isOnboarded || false, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('isOnboarded');
  };

  const completeOnboarding = useCallback(() => {
    setUser(prevUser => ({
      ...prevUser,
      isOnboarded: true
    }));
    Cookies.set('isOnboarded', true, { expires: 7 });
  }, []);

  // Computed values for easier use in components
  const isAuthenticated = !!user?.token;
  const isOnboarded = !!user?.isOnboarded;

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        completeOnboarding,
        isAuthenticated,
        isOnboarded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;