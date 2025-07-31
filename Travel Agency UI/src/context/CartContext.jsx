import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (destination) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === destination.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === destination.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...destination, quantity: 1 }];
    });
  };

  const removeFromCart = (destinationId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== destinationId));
  };

  const updateQuantity = (destinationId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(destinationId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === destinationId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 