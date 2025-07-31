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
  TextField,
  InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import DestinationCard from '../components/shared/DestinationCard';
import { destinationsData } from '../lib/data';

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [continent, setContinent] = useState('All');
  const [priceSort, setPriceSort] = useState('');

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia'];

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  const handlePriceSortChange = (event) => {
    setPriceSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredDestinations = destinationsData.filter(destination =>
    (destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (continent === 'All' || destination.continent === continent)
  );

  if (priceSort === 'lowToHigh') {
    filteredDestinations = [...filteredDestinations].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'highToLow') {
    filteredDestinations = [...filteredDestinations].sort((a, b) => b.price - a.price);
  }

  return (
    <Box sx={{ py: 6, backgroundColor: 'white' }}> {/* removed grey by enforcing white background */}
      <Container>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Explore Destinations
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Discover amazing places around the world
        </Typography>

        {/* Search and Filters */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search destinations or countries..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="continent-filter-label">Continent</InputLabel>
              <Select
                labelId="continent-filter-label"
                value={continent}
                onChange={handleContinentChange}
                label="Continent"
              >
                {continents.map((cont) => (
                  <MenuItem key={cont} value={cont}>{cont}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="price-sort-label">Sort By Price</InputLabel>
              <Select
                labelId="price-sort-label"
                value={priceSort}
                onChange={handlePriceSortChange}
                label="Sort By Price"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="lowToHigh">Low to High</MenuItem>
                <MenuItem value="highToLow">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Destination Cards */}
        <Grid container spacing={4}>
          {filteredDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}

          {filteredDestinations.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No destinations found matching your criteria.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DestinationsPage;
