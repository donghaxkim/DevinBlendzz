import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';

export default function ContactSection() {
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbs57kIoPvRR0anFyd7zd4C1Zof6Z3R8w`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps'));

        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      try {
        const center = { lat: 43.896469, lng: -79.455039 };
        const mapElement = document.getElementById("map");

        if (!mapElement) throw new Error('Map element not found');

        const map = new window.google.maps.Map(mapElement, {
          zoom: 15,
          center: center,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Blue dot marker

        new window.google.maps.Marker({
          position: center,
          map: map,
          title: "Devin Soup - Barber Shop",
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="10" fill="#4285F4" fill-opacity="1"/>
                <circle cx="18" cy="18" r="14" fill="#4285F4" fill-opacity="0.2"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(36, 36),
            anchor: new window.google.maps.Point(18, 18)
          }
        });


        // 1km radius radar circle
        new window.google.maps.Circle({
          strokeColor: "#4285F4",
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: "#4285F4",
          fillOpacity: 0.2,
          map: map,
          center: center,
          radius: 1000
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError(true);
      }
    };

    loadGoogleMapsScript()
      .then(() => setTimeout(initializeMap, 100))
      .catch((error) => {
        console.error('Failed to load Google Maps:', error);
        setMapError(true);
      });

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) script.remove();
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Contact</h2>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Barber Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl h-[900px]">
              <img 
                src="/ss1.png" 
                alt="Devin Soup - Master Barber" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Devin Soup</h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              With over 10 years of experience in the industry, Devin Soup has established himself as one of the most sought-after barbers in Toronto. Specializing in modern cuts, fades, and classic styles, Devin brings precision and artistry to every client's experience.
            </p>

            {/* Location Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-gray-800 dark:text-white" size={20} />
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Location</h4>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
                {mapError ? (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">Unable to load map. Please try again later.</p>
                  </div>
                ) : (
                  <div id="map" style={{ height: '100%', width: '100%' }}></div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Located at Yonge Street & 19th Avenue (3km service radius)
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="mailto:devin@soupbarber.com" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <Mail size={22} className="text-black dark:text-white" />
                </div>
                <span className="text-lg">devin@soupbarber.com</span>
              </a>
              <a href="tel:+14165551234" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <Phone size={22} className="text-black dark:text-white" />
                </div>
                <span className="text-lg">(416) 555-1234</span>
              </a>
              <a href="https://www.instagram.com/barber.dev1n/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <FaInstagram size={22} />
                </div>
                <span className="text-lg">@barber.dev1n</span>
              </a>
              <a href="https://tiktok.com/@devin.soup" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <FaTiktok size={22} />
                </div>
                <span className="text-lg">@devin.soup</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
