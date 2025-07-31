import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Button,
  Divider,
  TextField
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  Add,
  Remove
} from '@mui/icons-material';
import { useCart } from '../../Context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleDrawerToggle}>
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: 400, maxWidth: '100%' }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          <Divider />
          
          {cart.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={item.imageUrl}
                        alt={item.name || item.title}
                        variant="rounded"
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name || item.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            inputProps={{
                              min: 1,
                              style: { textAlign: 'center', width: 40 }
                            }}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                handleQuantityChange(item.id, value);
                              }
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            ₹{item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              
              <Divider />
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Total: ₹{getCartTotal().toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    // Handle checkout
                    console.log('Checkout clicked');
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart; 