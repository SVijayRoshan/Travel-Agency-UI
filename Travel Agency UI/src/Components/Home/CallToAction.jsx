import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Box className="cta-section">
      <Container>
        <div className="cta-content">
          <Typography variant="h2" component="h2" gutterBottom>
            Ready for your next adventure?
          </Typography>
          <Typography variant="h5" paragraph>
            Book your dream vacation today and save up to 25% on selected packages
          </Typography>
          
          <div className="cta-buttons">
            <Button 
              variant="contained" 
              size="large" 
              component={Link}
              to="/packages"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Browse Packages
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link}
              to="/contact"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default CallToAction;