import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Button
} from '@mui/material';
import {
  LocationOn,
  FavoriteBorder,
  Favorite,
  ShoppingCart
} from '@mui/icons-material';
import DestinationDetails from './DestinationDetails';
import { useCart } from '../../Context/CartContext';

const DestinationCard = ({ destination }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleExploreClick = (e) => {
    e.stopPropagation();
    setDetailsOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(destination);
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={destination.imageUrl}
            alt={destination.name}
            sx={{
              objectFit: 'cover',
              filter: 'brightness(0.9)'
            }}
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
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn color="primary" sx={{ mr: 0.5, fontSize: 18 }} />
            <Typography variant="subtitle2" color="text.secondary">
              {destination.country}, {destination.continent}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            {destination.name}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={4.5} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              (128 reviews)
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {destination.description}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">
              ₹{destination.price.toLocaleString()}
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
                label="Explore"
                color="primary"
                onClick={handleExploreClick}
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

      <DestinationDetails
        destination={destination}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
};

export default DestinationCard;