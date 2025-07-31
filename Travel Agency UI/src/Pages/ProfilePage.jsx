import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import UserProfile from '../Components/Shared/UserProfile';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your personal information and preferences
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <UserProfile />
      </Paper>
    </Container>
  );
};

export default ProfilePage;