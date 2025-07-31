import React, { useEffect } from 'react';
import { Route, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!user && location !== '/auth') {
      // Store the attempted URL for redirect after login
      sessionStorage.setItem('redirectUrl', location);
      setLocation('/auth');
    }
  }, [user, location, setLocation]);

  if (!user) {
    return null;
  }

  return <Route {...rest} component={Component} />;
};