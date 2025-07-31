import React from 'react';
import Hero from '../components/home/Hero';
import TravelPackages from '../components/home/TravelPackages';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <TravelPackages />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;