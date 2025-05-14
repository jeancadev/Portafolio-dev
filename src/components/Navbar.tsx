import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
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
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
      
      // Detectar sección activa
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (href) {
      const section = href.replace('#', '');
      setActiveSection(section);
      setIsOpen(false);
      
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
      }, 100);
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-neutral-200/10 ${
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
          {menuItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "relative text-sm font-medium transition-all duration-500 ease-out px-3 py-2 rounded-md",
                  isActive 
                    ? "text-foreground after:w-full" 
                    : "text-foreground/75 hover:text-foreground after:w-0 hover:after:w-full",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue",
                  "after:transition-all after:duration-500 after:ease-out"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme as 'dark' | 'light'} toggleTheme={toggleTheme} />
          <LanguageToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-foreground/10 transition-all duration-500
                         after:absolute after:inset-0 after:rounded-full after:border after:border-foreground/10
                         after:scale-75 after:opacity-0 hover:after:scale-100 hover:after:opacity-100
                         after:transition-all after:duration-500"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span 
                    className={cn(
                      "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out",
                      isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                    )}
                  ></span>
                  <span 
                    className={cn(
                      "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out mt-0.5",
                      isOpen && "opacity-0 scale-0"
                    )}
                  ></span>
                  <span 
                    className={cn(
                      "w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out mt-0.5",
                      isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                    )}
                  ></span>
                </div>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              className="w-[300px] bg-background/60 backdrop-blur-3xl border-neutral-200/10
                       data-[state=open]:animate-in data-[state=closed]:animate-out
                       data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                       data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
                       transition-all duration-500"
            >
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        "relative text-foreground/90 hover:text-foreground transition-all duration-500 px-4 py-3 rounded-md",
                        isActive 
                          ? "text-foreground after:scale-x-100" 
                          : "after:scale-x-0 hover:after:scale-x-100",
                        "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-blue",
                        "after:transform after:transition-transform after:duration-500 after:ease-out",
                        isActive && "bg-foreground/5"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
