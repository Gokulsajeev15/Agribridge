// AUTHENTICATION CONTEXT - Manages user login state
// ==================================================
// This React Context handles user authentication state across the entire app
// Provides login/logout functions and user data to all components

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use auth context easily in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component that wraps your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN FUNCTION
  // Calls your backend /auth/login endpoint
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const responseData = response.data;
      
      // Handle the backend response structure
      const newToken = responseData.token;
      const userData = {
        id: responseData.id,
        name: responseData.name,
        email: responseData.email
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setToken(newToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // REGISTER FUNCTION
  // Calls your backend /auth/register endpoint
  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // LOGOUT FUNCTION
  // Clears user data and redirects to login
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Context value that will be provided to all child components
  const value = {
    user,           // Current user data
    token,          // JWT token
    login,          // Login function
    register,       // Register function
    logout,         // Logout function
    isAuthenticated, // Check auth status
    loading,        // Loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
