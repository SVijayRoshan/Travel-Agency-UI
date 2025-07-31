import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, TextField, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, YouTube, Send } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1c2331', color: 'white', pt: 6, pb: 3 }}>
      <Container>
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Vijay Travels
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted partner for unforgettable travel experiences since 1995. We provide exceptional service and personalized travel packages.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Home', 'Destinations', 'Packages', 'Contact Us', 'Login'].map((item, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={index === 0 ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    color="inherit"
                    underline="hover"
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" paragraph>
              No. 45, Anna Salai, Thousand Lights<br />
              Chennai, Tamil Nadu 600006
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +91 98765 43210
            </Typography>
            <Typography variant="body2">
              Email: info@vijaytravels.com
            </Typography>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for travel tips and exclusive offers.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField
                size="small"
                placeholder="Your Email"
                variant="outlined"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px 0 0 4px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      borderRight: 'none',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ borderRadius: '0 4px 4px 0' }}
              >
                <Send />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Vijay Travels. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
