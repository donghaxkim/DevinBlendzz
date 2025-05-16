import { useState, useEffect } from 'react';
import { Home, Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-800/40 shadow-md backdrop-blur-lg py-2'
          : 'bg-black/20 backdrop-blur-md py-4'
      }`}
    >
      <div className="flex items-center w-full px-8">
        {/* Left - Home + Social links */}
        <div className="flex items-center gap-4 ml-20">
          <a
            href="#hero"
            className={`flex items-center font-bold text-lg ${
              scrolled ? 'text-gray-100' : 'text-white'
            }`}
          >
            <Home size={20} />
          </a>
          <a
            href="https://www.instagram.com/barber.dev1n/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl ${
              scrolled ? 'text-gray-100 hover:text-pink-400' : 'text-white hover:text-pink-300'
            }`}
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@devin.soup"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl ${
              scrolled ? 'text-gray-100 hover:text-green-400' : 'text-white hover:text-green-300'
            }`}
          >
            <FaTiktok size={20} />
          </a>
        </div>

        {/* Right - Nav links */}
        <div className="hidden md:flex ml-auto mr-20 gap-x-6">
          <NavLink href="#gallery" scrolled={scrolled}>Gallery</NavLink>
          <NavLink href="#services" scrolled={scrolled}>Services</NavLink>
          <NavLink href="#contact" scrolled={scrolled}>Contact</NavLink>
          <NavLink href="book" scrolled={scrolled}>Book</NavLink>
        </div>

        {/* Mobile menu button */}
        <MobileMenuButton scrolled={scrolled} />
      </div>

      {/* Mobile menu */}
      <MobileMenu scrolled={scrolled} />
    </nav>
  );
}

// NavLink component
function NavLink({ href, children, scrolled }) {
  return (
    <a
      href={href}
      className={`font-medium transition-colors ${
        scrolled
          ? 'text-gray-100 hover:text-blue-400'
          : 'text-white hover:text-blue-300'
      }`}
    >
      {children}
    </a>
  );
}

// Mobile menu button
function MobileMenuButton({ scrolled }) {
  return (
    <button
      className={`md:hidden ml-4 p-2 rounded-md ${
        scrolled ? 'text-gray-200' : 'text-white'
      }`}
    >
      <div className="w-6 flex flex-col gap-1">
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
      </div>
    </button>
  );
}

// Mobile menu content
function MobileMenu({ scrolled }) {
  return (
    <div className="hidden md:hidden">
      <div className={`px-4 pt-2 pb-4 ${scrolled ? 'bg-gray-900/90' : 'bg-black/80 backdrop-blur-sm'}`}>
        <a href="#gallery" className={`block py-2 px-4 font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Gallery</a>
        <a href="#contact" className={`block py-2 px-4 font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Contact</a>
        <a href="#services" className={`block py-2 px-4 font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Services</a>
        <a href="#book" className={`block py-2 px-4 font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Book</a>
      </div>
    </div>
  );
}
