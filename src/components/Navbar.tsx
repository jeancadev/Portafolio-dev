
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: currentLanguage === 'es' ? 'Inicio' : 'Home', href: '#home' },
    { name: currentLanguage === 'es' ? 'Sobre mí' : 'About', href: '#about' },
    { name: currentLanguage === 'es' ? 'Proyectos' : 'Projects', href: '#projects' },
    { name: currentLanguage === 'es' ? 'Habilidades' : 'Skills', href: '#skills' },
    { name: currentLanguage === 'es' ? 'Contacto' : 'Contact', href: '#contact' },
  ];

  const handleLanguageChange = (language: 'es' | 'en') => {
    setCurrentLanguage(language);
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-dark/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold text-blue">Portfolio<span className="text-light">.</span></a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
          <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white">
            <a href="#contact">{currentLanguage === 'es' ? 'Contáctame' : 'Contact Me'}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-dark">
          <button
            className="absolute right-6 top-6 text-light"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-2xl font-medium text-light transition-colors hover:text-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-center space-y-4">
            <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
            
            <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white">
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                {currentLanguage === 'es' ? 'Contáctame' : 'Contact Me'}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
