import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="testimonial-card">
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <FormatQuote fontSize="large" color="primary" />
        </Box>
        
        <Typography variant="body1" className="testimonial-content" paragraph>
          "{testimonial.comment}"
        </Typography>
        
        <div className="testimonial-header">
          <div className="testimonial-image">
            <Avatar 
              src={testimonial.image} 
              alt={testimonial.name}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="testimonial-info">
            <Typography variant="h6" component="h4">
              {testimonial.name}
            </Typography>
            <Typography variant="body2" className="testimonial-trip">
              {testimonial.trip}
            </Typography>
            <div className="testimonial-rating">
              <Rating 
                value={testimonial.rating} 
                readOnly 
                size="small"
              />
            </div>
          </div>
        </div>
        
        <Typography variant="caption" className="testimonial-date">
          {testimonial.date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;