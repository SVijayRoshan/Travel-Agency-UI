import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import PackageCard from '../components/shared/PackageCard';
import { packagesData } from '../lib/data';

const PackagesPage = () => {
  const [region, setRegion] = useState('All');
  const [duration, setDuration] = useState('All');
  const [priceSort, setPriceSort] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const regions = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia'];
  const durations = ['All', 'Short (1-5 days)', 'Medium (6-10 days)', 'Long (11+ days)'];

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handlePriceSortChange = (event) => {
    setPriceSort(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter packages based on selections
  let filteredPackages = packagesData.filter(pkg => {
    const durationMatch = (() => {
      if (duration === 'All') return true;
      if (duration === 'Short (1-5 days)') return pkg.days <= 5;
      if (duration === 'Medium (6-10 days)') return pkg.days > 5 && pkg.days <= 10;
      if (duration === 'Long (11+ days)') return pkg.days > 10;
      return true;
    })();

    const regionMatch = region === 'All' ? true : pkg.region === region;

    const tabMatch = (() => {
      if (activeTab === 0) return true;
      if (activeTab === 1) return pkg.reviews > 80;
      if (activeTab === 2) return pkg.rating >= 4.5;
      if (activeTab === 3) return pkg.id > packagesData.length - 3;
      return true;
    })();

    return durationMatch && regionMatch && tabMatch;
  });

  // Sort packages
  if (priceSort === 'lowToHigh') {
    filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'highToLow') {
    filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price);
  }

  return (
    <Box sx={{ py: 6, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Travel Packages
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Discover our curated travel experiences
        </Typography>

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="All Packages" />
            <Tab label="Popular" />
            <Tab label="Featured" />
            <Tab label="New" />
          </Tabs>
        </Box>

        {/* Filters */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                value={region}
                label="Region"
                onChange={handleRegionChange}
              >
                {regions.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select
                value={duration}
                label="Duration"
                onChange={handleDurationChange}
              >
                {durations.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By Price</InputLabel>
              <Select
                value={priceSort}
                label="Sort By Price"
                onChange={handlePriceSortChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="lowToHigh">Low to High</MenuItem>
                <MenuItem value="highToLow">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Package Grid */}
        <Grid container spacing={4}>
          {filteredPackages.map((travelPackage) => (
            <Grid item xs={12} sm={6} md={4} key={travelPackage.id}>
              <PackageCard
                travelPackage={travelPackage}
                onViewDetails={(id) => console.log(`Viewing details for package ID: ${id}`)}
              />
            </Grid>
          ))}

          {filteredPackages.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No packages found matching your criteria.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default PackagesPage;
