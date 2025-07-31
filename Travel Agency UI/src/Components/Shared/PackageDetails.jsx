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

const PackageDetails = ({ package: travelPackage, open, onClose }) => {
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  if (!travelPackage) return null;

  const handleAddToCart = () => {
    addToCart(travelPackage);
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
            <Typography variant="h4" component="h2">
              {travelPackage.title}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={travelPackage.imageUrl}
                alt={travelPackage.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  objectFit: 'cover'
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Package Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  {travelPackage.description}
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Package Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Region"
                      secondary={travelPackage.region}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Duration"
                      secondary={`${travelPackage.days} Days`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Star color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Rating"
                      secondary={
                        <Box display="flex" alignItems="center">
                          <Rating
                            value={travelPackage.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({travelPackage.reviews} reviews)
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Package Features
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {travelPackage.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h4" color="primary">
                  ₹{travelPackage.price.toLocaleString()}
                </Typography>
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
          {travelPackage.title} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PackageDetails; 