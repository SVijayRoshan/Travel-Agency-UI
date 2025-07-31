import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => AuthService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const signup = async (email, password, fullName) => {
    try {
      console.log('AuthContext: Starting signup...');
      setLoading(true);
      setError(null);
      const newUser = await AuthService.signup(email, password, fullName);
      console.log('AuthContext: Signup successful, setting user:', newUser);
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error('AuthContext: Signup error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('AuthContext: Starting login...');
      setLoading(true);
      setError(null);
      const userData = await AuthService.login(email, password);
      console.log('AuthContext: Login successful, setting user:', userData);
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('AuthContext: Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext: Starting logout...');
      await AuthService.logout();
      console.log('AuthContext: Logout successful, clearing user state');
      setUser(null);
      sessionStorage.removeItem('redirectUrl');
    } catch (err) {
      console.error('AuthContext: Logout error:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await AuthService.updateProfile(user.email, updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.deleteAccount(user.email);
      setUser(null);
      sessionStorage.removeItem('redirectUrl');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    deleteAccount,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};