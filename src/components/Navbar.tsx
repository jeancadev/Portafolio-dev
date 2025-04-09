
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 flex justify-center ${scrolled ? 'py-3' : 'py-5'}`}>
      <nav className="px-6">
        <div className="flex items-center justify-center">
          <div className="glass-nav flex items-center rounded-full">
            <ul className="flex">
              {navLinks.map((link) => (
                <li key={link.name} className="px-1">
                  <a 
                    href={link.href} 
                    className="nav-link-glass block px-4 py-2 text-light hover:text-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 px-4">
              <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
              <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white rounded-full">
                <a href="#contact">{currentLanguage === 'es' ? 'Contáctame' : 'Contact Me'}</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
