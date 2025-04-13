
import React, { useState, useEffect } from 'react';
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 flex justify-center ${scrolled ? 'py-0.5' : 'py-1'}`}>
      <nav className="container mx-auto px-3 sm:px-4 max-w-5xl">
        <div className="flex items-center justify-center">
          <div className="glass-nav flex items-center rounded-full max-w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center justify-between w-full px-2">
              <ul className="flex space-x-1 sm:space-x-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="nav-link-glass block px-2 py-1 text-xs sm:text-sm md:text-sm whitespace-nowrap hover:text-blue transition-colors cursor-hover-effect"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
