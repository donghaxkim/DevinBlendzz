import React from 'react';
import { FaMapPin, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/dongha.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold text-white mb-4">Devin Soup</h1>
        <p className="text-gray-200 text-lg flex items-center justify-center mb-6">
          <FaMapPin className="text-2xl text-white mr-2" />
          <span className="text-gray-300">Toronto, </span>
          <span className="text-gray-300 ml-2">Richmond Hill</span>
        </p>

        <Link
          to="/book"
          className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-300 flex items-center"
        >
          Book Your First Appointment
          <FaArrowRight className="text-base mt-[1px] ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
