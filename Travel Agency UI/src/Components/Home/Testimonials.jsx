import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { testimonialsData } from '../../lib/data';

const Testimonials = () => {
  // Display only the first 3 testimonials
  const featuredTestimonials = testimonialsData.slice(0, 3);

  return (
    <Box className="testimonial-section">
      <Container>
        <div className="section-title">
          <Typography variant="h2" component="h2">
            What Our Travelers Say
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Authentic experiences from our valued customers
          </Typography>
        </div>

        <Grid container spacing={4}>
          {featuredTestimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card className="testimonial-card">
                <CardContent>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <FormatQuote fontSize="large" color="primary" />
                  </Box>
                  
                  <Typography variant="body1" className="testimonial-content" paragraph>
                    {testimonial.comment}
                  </Typography>
                  
                  <Box className="testimonial-header">
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="h3">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="subtitle2" color="primary">
                        {testimonial.trip}
                      </Typography>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        size="small" 
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
                    {testimonial.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;