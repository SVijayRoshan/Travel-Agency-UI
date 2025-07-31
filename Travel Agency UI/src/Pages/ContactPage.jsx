import React, { useState } from 'react';
import { Container, Typography, Grid, Box, TextField, Button, Card, CardContent, Paper, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { LocationOn, Phone, Email, Send } from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: ''
    });
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#fff' }}>
      <Container>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          We're here to help with your travel inquiries
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Thank You!
                  </Typography>
                  <Typography variant="body1">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 3 }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography variant="h5" gutterBottom>
                    Send Us a Message
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.inquiryType} required>
                        <InputLabel>Inquiry Type</InputLabel>
                        <Select
                          name="inquiryType"
                          value={formData.inquiryType}
                          label="Inquiry Type"
                          onChange={handleChange}
                        >
                          <MenuItem value="general">General Inquiry</MenuItem>
                          <MenuItem value="booking">Booking Information</MenuItem>
                          <MenuItem value="packages">Package Details</MenuItem>
                          <MenuItem value="customTour">Custom Tour</MenuItem>
                          <MenuItem value="feedback">Feedback</MenuItem>
                        </Select>
                        {errors.inquiryType && <FormHelperText>{errors.inquiryType}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        size="large"
                        endIcon={<Send />}
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <LocationOn color="primary" sx={{ fontSize: 30, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Our Office</Typography>
                      <Typography variant="body2" color="text.secondary">
                        No. 45, Anna Salai, Thousand Lights<br />
                        Chennai, Tamil Nadu 600006
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Phone color="primary" sx={{ fontSize: 30, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Phone</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +91 98765 43210<br />
                        +91 87654 32109
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Email color="primary" sx={{ fontSize: 30, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Email</Typography>
                      <Typography variant="body2" color="text.secondary">
                        info@vijaytravels.com<br />
                        bookings@vijaytravels.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
                  Business Hours
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="body2">Monday - Friday:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">9:00 AM - 6:00 PM</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">Saturday:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">10:00 AM - 4:00 PM</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">Sunday:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">Closed</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, height: '400px', borderRadius: 2, overflow: 'hidden' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Find Us</Typography>
          <Box 
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.894973610264!2d80.25364731520489!3d13.060938816203845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674fe9f8b7a1%3A0x9a3f06b0c47d7eaf!2sNo.%2045%2C%20Anna%20Salai%2C%20Thousand%20Lights%2C%20Chennai%2C%20Tamil%20Nadu%20600006!5e0!3m2!1sen!2sin!4v1685100000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
