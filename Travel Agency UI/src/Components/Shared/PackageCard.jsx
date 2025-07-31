import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating, Button, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccessTime, LocationOn, Star, FavoriteBorder, Favorite, ShoppingCart, Close } from '@mui/icons-material';
import { useCart } from '../../Context/CartContext';

const PackageCard = ({ travelPackage, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(travelPackage);
    setShowSnackbar(true);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setDetailsOpen(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Card className="package-card">
        <div className="package-img">
          <CardMedia
            component="img"
            image={travelPackage.imageUrl}
            alt={travelPackage.title}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </div>
        <CardContent className="package-content">
          <Typography variant="h5" component="h3" className="package-title">
            {travelPackage.title}
          </Typography>
          
          <Box className="package-info">
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              {travelPackage.region}
            </Typography>
          </Box>
          
          <Box className="package-info">
            <AccessTime fontSize="small" />
            <Typography variant="body2">
              {travelPackage.days} Days
            </Typography>
          </Box>
          
          <Typography variant="body2" className="package-description">
            {travelPackage.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={travelPackage.rating} 
              precision={0.5} 
              readOnly 
              size="small"
              icon={<Star fontSize="inherit" />}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({travelPackage.reviews} reviews)
            </Typography>
          </Box>
          
          <div className="package-features">
            {travelPackage.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">
              ₹{travelPackage.price.toLocaleString()}
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{
                  whiteSpace: 'nowrap'
                }}
              >
                Add to Cart
              </Button>
              <Chip
                label="View Details"
                color="primary"
                onClick={handleViewDetails}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
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
            <IconButton onClick={() => setDetailsOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="img"
            src={travelPackage.imageUrl}
            alt={travelPackage.title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              objectFit: 'cover',
              mb: 3
            }}
          />

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
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="inherit">
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

export default PackageCard;