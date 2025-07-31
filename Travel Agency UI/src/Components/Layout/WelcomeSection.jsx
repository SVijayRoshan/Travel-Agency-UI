import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WelcomeSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: 'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Typography 
          variant="h1" 
          component="h1"
          sx={{ 
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            mb: 0,
            fontFamily: '"Montserrat", sans-serif',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
              borderRadius: '2px'
            }
          }}
        >
          {user ? `Welcome back, ${user.name}!` : 'Welcome to Our Travel Agency'}
        </Typography>

        <Typography 
          variant="h5"
          sx={{ 
            color: 'white',
            maxWidth: '800px',
            textAlign: 'center',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.8,
            fontSize: { xs: '1.1rem', md: '1.5rem' },
            opacity: 0.9
          }}
        >
          {user 
            ? 'We\'re glad to have you back. Ready to plan your next adventure?'
            : 'Discover amazing destinations and create unforgettable memories with our curated travel experiences'}
        </Typography>

        {!user && (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth')}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .5)',
              }
            }}
          >
            Start Your Journey
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default WelcomeSection; 