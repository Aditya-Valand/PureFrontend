import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
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
    try {
      const token = Cookies.get('token');
      if (!token) return null;
      
      const decodedToken = jwtDecode(token);
      const isOnboarded = Cookies.get('isOnboarded') === 'true';
      
      return {
        token,
        isOnboarded,
        userId: decodedToken.userId,
        email: decodedToken.email,
        // Add any other user properties from the token
        exp: decodedToken.exp
      };
    } catch (error) {
      console.error('Error parsing auth token:', error);
      // Clear invalid tokens
      Cookies.remove('token');
      Cookies.remove('isOnboarded');
      return null;
    }
  });

  // Check for token expiration
  useEffect(() => {
    if (user?.exp) {
      const expirationTime = user.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (currentTime > expirationTime) {
        logout();
      }
    }
  }, [user]);

  const login = (userData) => {
    try {
      const decodedToken = jwtDecode(userData.token);
      
      // Use the isOnboarded flag from the login response or default to false
      const isOnboarded = userData.isOnboarded ?? false;
  
      setUser({
        token: userData.token,
        isOnboarded: isOnboarded,
        userId: decodedToken.userId,
        email: decodedToken.email,
        exp: decodedToken.exp
      });
      
      Cookies.set('token', userData.token, { expires: 7 });
      Cookies.set('isOnboarded', isOnboarded, { expires: 7 });
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Invalid authentication token');
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('isOnboarded');
  }, []);

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
