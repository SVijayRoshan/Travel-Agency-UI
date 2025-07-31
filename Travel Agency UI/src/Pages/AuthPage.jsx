import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab, TextField, Button, Grid, Link, Divider, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeTerms: false
  });
  const { login, signup, error } = useAuth();
  const navigate = useNavigate();
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    // Clear error when typing
    if (loginErrors[name]) {
      setLoginErrors({
        ...loginErrors,
        [name]: ''
      });
    }
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when typing
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: ''
      });
    }
  };
  
  const validateLogin = () => {
    const errors = {};
    if (!loginData.email) errors.email = 'Email is required';
    if (!loginData.password) errors.password = 'Password is required';
    return errors;
  };
  
  const validateRegister = () => {
    const errors = {};
    if (!registerData.fullName) errors.fullName = 'Full name is required';
    if (!registerData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!registerData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }
    return errors;
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    try {
      await login(loginData.email, loginData.password);
      const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
      sessionStorage.removeItem('redirectUrl');
      navigate(redirectUrl);
    } catch (err) {
      setLoginErrors({ general: err.message });
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegister();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    try {
      await signup(registerData.email, registerData.password, registerData.fullName);
      const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
      sessionStorage.removeItem('redirectUrl');
      navigate(redirectUrl);
    } catch (err) {
      setRegisterErrors({ general: err.message });
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          
          <Box sx={{ p: 4 }}>
            {/* Login Form */}
            {activeTab === 0 && (
              <Box component="form" onSubmit={handleLoginSubmit}>
                <Typography variant="h5" align="center" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                  Sign in to your account to continue
                </Typography>
                
                {loginErrors.general && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {loginErrors.general}
                  </Alert>
                )}
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    error={!!loginErrors.email}
                    helperText={loginErrors.email}
                    InputProps={{
                      startAdornment: <Email color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    error={!!loginErrors.password}
                    helperText={loginErrors.password}
                    InputProps={{
                      startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Button 
                  type="submit"
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ mb: 3 }}
                >
                  Login
                </Button>
              </Box>
            )}
            
            {/* Register Form */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handleRegisterSubmit}>
                <Typography variant="h5" align="center" gutterBottom>
                  Create An Account
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                  Join us for better travel experiences
                </Typography>
                
                {registerErrors.general && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {registerErrors.general}
                  </Alert>
                )}
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.fullName}
                    helperText={registerErrors.fullName}
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.email}
                    helperText={registerErrors.email}
                    InputProps={{
                      startAdornment: <Email color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.password}
                    helperText={registerErrors.password}
                    InputProps={{
                      startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.confirmPassword}
                    helperText={registerErrors.confirmPassword}
                    InputProps={{
                      startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="agreeTerms" 
                        checked={registerData.agreeTerms}
                        onChange={handleRegisterChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
                      </Typography>
                    }
                  />
                  {registerErrors.agreeTerms && (
                    <Typography variant="caption" color="error">
                      {registerErrors.agreeTerms}
                    </Typography>
                  )}
                </Box>
                
                <Button 
                  type="submit"
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ mb: 3 }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;