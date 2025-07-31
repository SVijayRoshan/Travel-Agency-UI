import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Rating,
  Snackbar,
  Alert
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Attractions,
  Star,
  Close,
  ShoppingCart
} from '@mui/icons-material';
import { useCart } from '../../Context/CartContext';

const DestinationDetails = ({ destination, open, onClose }) => {
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  if (!destination) return null;

  const handleAddToCart = () => {
    addToCart(destination);
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{destination.name}</Typography>
            <Button onClick={onClose} color="inherit">
              <Close />
            </Button>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={4}>
            {/* Main Image */}
            <Grid item xs={12}>
              <Box
                component="img"
                src={destination.imageUrl}
                alt={destination.name}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 1
                }}
              />
            </Grid>

            {/* Location Info */}
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {destination.country}, {destination.continent}
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                {destination.description}
              </Typography>
            </Grid>

            {/* Price and Highlights */}
            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Typography variant="h5" color="primary" gutterBottom>
                  ₹{destination.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting price per person
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                Highlights
              </Typography>
              <List>
                {destination.highlights.map((highlight, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon>
                      <Attractions color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={highlight} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Best Time to Visit
                </Typography>
                <Typography variant="body1" paragraph>
                  The ideal time to visit {destination.name} is during the spring and autumn months when the weather is pleasant and the tourist crowds are manageable.
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Local Experiences
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {['Cultural Tours', 'Local Cuisine', 'Shopping', 'Adventure Activities'].map((experience, index) => (
                    <Chip
                      key={index}
                      label={experience}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {destination.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DestinationDetails; 