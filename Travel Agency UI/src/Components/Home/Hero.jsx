import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DestinationCard from '../shared/DestinationCard';
import { destinationsData } from '../../lib/data';

const FeaturedDestinations = () => {
  // Display only the first 6 destinations
  const featuredDestinations = destinationsData.slice(0, 6);

  return (
    <Box className="destination-section">
      <Container>
        <div className="section-title">
          <Typography variant="h2" component="h2">
            Popular Destinations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Explore top destinations loved by travelers around the world
          </Typography>
        </div>

        <Grid container spacing={4}>
          {featuredDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to="/destinations"
            endIcon={<ArrowForward />}
          >
            View All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedDestinations;