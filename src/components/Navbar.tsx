import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (href) {
      setIsOpen(false); // Cerrar el menú
      
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Pequeño retraso para asegurar una transición suave
    }
  };

  const menuItems = [
    { href: "#home", label: t('nav.home') },
    { href: "#about", label: t('nav.about') },
    { href: "#projects", label: t('nav.projects') },
    { href: "#skills", label: t('nav.skills') },
    { href: "#contact", label: t('nav.contact') }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-neutral-200/10 ${
        isScrolled 
          ? 'bg-background/65 backdrop-blur-2xl shadow-lg py-2' 
          : 'bg-background/50 backdrop-blur-xl py-4'
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={handleNavClick}
          className="font-bold text-xl text-foreground/90 hover:text-foreground transition-colors"
        >
          jeanca<span className="text-blue">Dev</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-foreground/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme as 'dark' | 'light'} toggleTheme={toggleTheme} />
          <LanguageToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-foreground/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-background/60 backdrop-blur-3xl border-neutral-200/10">
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-foreground/90 hover:text-foreground transition-colors px-4 py-3 rounded-md hover:bg-foreground/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
