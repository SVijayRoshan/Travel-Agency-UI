import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PackageCard from '../shared/PackageCard';
import { packagesData } from '../../lib/data';

const TravelPackages = () => {
  // Display only the first 3 packages
  const featuredPackages = packagesData.slice(0, 3);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container>
        <div className="section-title">
          <Typography variant="h2" component="h2">
            Popular Travel Packages
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Curated travel experiences for unforgettable journeys
          </Typography>
        </div>

        <Grid container spacing={4}>
          {featuredPackages.map((travelPackage) => (
            <Grid item xs={12} md={4} key={travelPackage.id}>
              <PackageCard 
                travelPackage={travelPackage} 
                onViewDetails={() => console.log(`View details for ${travelPackage.title}`)}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to="/packages"
            endIcon={<ArrowForward />}
          >
            View All Packages
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TravelPackages;