import React from 'react';
import { Switch, Route } from 'wouter';
import { ProtectedRoute } from './lib/protected-route';

// Import all pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import NotFound from './pages/not-found';
import Profile from './pages/Profile';

/**
 * Main application router
 * Uses wouter for routing with protected routes that redirect to /auth if user is not logged in
 */
export function AppRoutes() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      
      {/* Protected routes */}
      <ProtectedRoute path="/destinations" component={Destinations} />
      <ProtectedRoute path="/packages" component={Packages} />
      <ProtectedRoute path="/contact" component={Contact} />
      
      {/* Protected routes */}
      <ProtectedRoute path="/profile" component={Profile} />
      
      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;