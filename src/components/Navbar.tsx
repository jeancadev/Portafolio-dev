
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 flex justify-center ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <div className="flex items-center justify-center">
          <div className="glass-nav flex items-center rounded-full max-w-full lg:max-w-4xl xl:max-w-5xl overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap py-2 px-1 sm:px-2">
              <ul className="flex px-2 flex-nowrap">
                {navLinks.map((link) => (
                  <li key={link.name} className="px-1 sm:px-2">
                    <a 
                      href={link.href} 
                      className="nav-link-glass block px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap hover:text-blue transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 lg:gap-4 px-2 sm:px-3">
                <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
