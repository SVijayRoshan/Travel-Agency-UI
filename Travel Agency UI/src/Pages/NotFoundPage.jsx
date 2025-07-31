import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { SentimentDissatisfied, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box sx={{ 
      py: 8,
      display: 'flex',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)' // Adjust based on your header/footer
    }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 5, borderRadius: 2, textAlign: 'center' }}>
          <SentimentDissatisfied sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '4rem', md: '6rem' } }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable. Please check the URL or go back to the homepage.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to="/"
            startIcon={<Home />}
            size="large"
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;