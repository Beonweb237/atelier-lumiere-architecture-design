import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300"
      style={{
        backgroundColor: scrolled ? '#e4ceac' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(33, 46, 68, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="w-full max-w-container mx-auto px-content flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-medium tracking-tight"
          style={{ color: '#212e44' }}
        >
          Atelier <em className="italic">Lumière</em>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/projets"
            className="text-label uppercase transition-opacity hover:opacity-70"
            style={{ color: '#212e44', letterSpacing: '0.7px', fontSize: '14px' }}
          >
            Projets
          </Link>
          <Link
            to="/a-propos"
            className="text-label uppercase transition-opacity hover:opacity-70"
            style={{ color: '#212e44', letterSpacing: '0.7px', fontSize: '14px' }}
          >
            À Propos
          </Link>
          <Link
            to="/contact"
            className="text-label uppercase transition-opacity hover:opacity-70"
            style={{ color: '#212e44', letterSpacing: '0.7px', fontSize: '14px' }}
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="ml-4 px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: '#212e44',
              color: '#e4ceac',
              borderRadius: '25px',
            }}
          >
            Démarrer un Projet
          </Link>
        </div>
      </div>
    </nav>
  );
}
