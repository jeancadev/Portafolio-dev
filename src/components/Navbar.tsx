
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LanguageToggle from './LanguageToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 flex justify-center ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-center">
          <div className="glass-nav flex items-center rounded-full max-w-full md:max-w-3xl lg:max-w-4xl">
            {isMobile ? (
              <>
                <button 
                  onClick={toggleMenu}
                  className="p-3 text-light"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
                
                <div className="ml-auto flex items-center gap-2 pr-3">
                  <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
                </div>
                
                {isMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 mx-4 glass-nav rounded-lg p-4">
                    <ul className="space-y-3">
                      {navLinks.map((link) => (
                        <li key={link.name}>
                          <a 
                            href={link.href} 
                            className="block px-4 py-2 text-light hover:text-blue transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <Button variant="outline" className="w-full border-blue text-blue hover:bg-blue hover:text-white rounded-full">
                          <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                            {currentLanguage === 'es' ? 'Contáctame' : 'Contact Me'}
                          </a>
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <ul className="flex px-2">
                  {navLinks.map((link) => (
                    <li key={link.name} className="px-1">
                      <a 
                        href={link.href} 
                        className="nav-link-glass block px-3 py-2 text-sm md:text-base text-light hover:text-blue transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 lg:gap-4 px-3">
                  <LanguageToggle currentLanguage={currentLanguage} onChange={handleLanguageChange} />
                  <Button variant="outline" className="text-xs md:text-sm border-blue text-blue hover:bg-blue hover:text-white rounded-full">
                    <a href="#contact">{currentLanguage === 'es' ? 'Contáctame' : 'Contact Me'}</a>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
