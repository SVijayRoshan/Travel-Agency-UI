import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './Context/CartContext';

// Context
// Layout components
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import WelcomeSection from './Components/Layout/WelcomeSection';

// Pages
import HomePage from './Pages/HomePage';
import DestinationsPage from './Pages/DestinationsPage';
import PackagesPage from './Pages/PackagesPage';
import ContactPage from './Pages/ContactPage';
import AuthPage from './Pages/AuthPage';
import NotFoundPage from './Pages/NotFoundPage';
import ProfilePage from './Pages/ProfilePage';

// CSS
import './assets/index.css';
import './assets/styles.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <>
                    <WelcomeSection />
                    <HomePage />
                  </>
                } />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </Box>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
