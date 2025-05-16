import React from 'react';
import Hero from './Hero';
import ContactSection from './Contact.jsx';

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Gallery Section */}
      <section id="gallery" className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Gallery</h2>
          {/* Gallery content */}
        </div>
      </section>


      {/* Service Section */}
      <section id="services" className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Services</h2>
          {/* Service content */}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;
