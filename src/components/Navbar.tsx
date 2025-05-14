import React, { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

// Componente reutilizable para el icono del hamburguesa
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div 
      className="w-8 h-8 flex flex-col justify-center items-center relative"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      whileTap={{ scale: 0.85 }}
      variants={{
        open: { rotate: 180, scale: 1.1 },
        closed: { rotate: 0, scale: 1 }
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }}
    >
      {/* Fondo animado circular */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        variants={{
          open: { 
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.1) 70%, rgba(236,72,153,0.05) 100%)",
            boxShadow: "0 0 12px rgba(99,102,241,0.3)",
            scale: 1.1
          },
          closed: { 
            background: "radial-gradient(circle, rgba(99,102,241,0) 0%, rgba(168,85,247,0) 70%, rgba(236,72,153,0) 100%)",
            boxShadow: "0 0 0px rgba(99,102,241,0)",
            scale: 0.95
          }
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Líneas del menú hamburguesa con animación premium */}
      <motion.span 
        className="absolute w-6 h-0.5 rounded-full"
        style={{ transformOrigin: "center" }}
        variants={{
          open: { 
            rotate: 45, 
            y: 0, 
            width: '22px', 
            background: "linear-gradient(90deg, #6366f1 0%, #a855f7 100%)",
            boxShadow: "0 0 5px rgba(99,102,241,0.7)" 
          },
          closed: { 
            rotate: 0, 
            y: -7, 
            width: '18px', 
            background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
            boxShadow: "0 0 0px rgba(99,102,241,0)" 
          }
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.6, 0.05, -0.01, 0.9],
          delay: isOpen ? 0 : 0.2
        }}
      />
      <motion.span 
        className="absolute w-6 h-0.5 rounded-full"
        variants={{
          open: { 
            opacity: 0, 
            x: 20, 
            scale: 0, 
            background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)" 
          },
          closed: { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            width: '22px', 
            background: "linear-gradient(90deg, #6366f1 0%, #ec4899 100%)" 
          }
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.6, 0.05, -0.01, 0.9],
          opacity: { duration: 0.1 }
        }}
      />
      <motion.span 
        className="absolute w-6 h-0.5 rounded-full"
        style={{ transformOrigin: "center" }}
        variants={{
          open: { 
            rotate: -45, 
            y: 0, 
            width: '22px', 
            background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)",
            boxShadow: "0 0 5px rgba(236,72,153,0.7)"
          },
          closed: { 
            rotate: 0, 
            y: 7, 
            width: '18px', 
            background: "linear-gradient(90deg, #ec4899 0%, #3b82f6 100%)",
            boxShadow: "0 0 0px rgba(99,102,241,0)" 
          }
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.6, 0.05, -0.01, 0.9],
          delay: isOpen ? 0 : 0.1
        }}
      />
      
      {/* Efecto de pulso adicional durante la transición */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        animate={isOpen ? "active" : "inactive"}
        variants={{
          active: {
            boxShadow: [
              "0 0 0 0 rgba(99,102,241,0)",
              "0 0 0 3px rgba(99,102,241,0.3)",
              "0 0 0 5px rgba(99,102,241,0)"
            ],
            scale: [1, 1.1, 1]
          },
          inactive: {
            boxShadow: "0 0 0 0 rgba(99,102,241,0)",
            scale: 1
          }
        }}
        transition={{
          duration: 0.5,
          times: [0, 0.5, 1]
        }}
      />
    </motion.div>
  );
};

// Crear un contexto para el estado del menú
export const MenuContext = createContext<{ isMenuOpen: boolean }>({ isMenuOpen: false });

// Hook personalizado para consumir el contexto del menú
export const useMenuState = () => useContext(MenuContext);

const Navbar = () => {
  // Este estado será compartido con otros componentes
  const [isOpen, setIsOpen] = useState(false);
  
  // Cuando el menú se abre, ocultar el botón de volver arriba usando una clase global
  useEffect(() => {
    // Agregamos o removemos una clase al body para controlar la visibilidad del botón
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      // Limpieza al desmontar el componente
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
      
      // Detectar sección activa con mayor precisión
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      
      // Método mejorado: determinar la sección basada en la posición del centro de la pantalla
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      // Caso especial: si estamos en la parte superior, activa 'home'
      if (scrollPosition < 50) {
        setActiveSection('home');
        return;
      }
      
      // Encontrar qué sección contiene el punto central de la pantalla
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si el centro de la pantalla está dentro de esta sección o si su borde superior está visible
          if ((rect.top <= viewportCenter && rect.bottom >= viewportCenter) || 
              (rect.top <= 100 && rect.top > 0)) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      // Si pasamos por todas las secciones sin encontrar una adecuada, usa otra lógica
      // Para la sección inferior (usualmente 'contact'), si estamos cerca del final de la página
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setActiveSection('contact');
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
    <MenuContext.Provider value={{ isMenuOpen: isOpen }}>
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
            
            {/* Premium Mobile Navigation con botón único para abrir/cerrar en línea con los otros controles */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(!isOpen)}
                className="relative md:hidden group overflow-hidden hover:bg-foreground/5 transition-all duration-500
                         before:absolute before:inset-0 before:rounded-full before:border before:border-foreground/20
                         before:scale-75 before:opacity-0 hover:before:scale-100 hover:before:opacity-100
                         before:transition-all before:duration-500
                         after:absolute after:inset-0 after:rounded-full after:border-2 after:border-blue/20
                         after:scale-90 after:opacity-0 hover:after:scale-110 hover:after:opacity-100
                         after:transition-all after:duration-700 after:ease-in-out"
              >
                <HamburgerIcon isOpen={isOpen} />
                <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              </Button>
              <SheetContent 
                className="w-[320px] bg-background/90 backdrop-blur-xl border-neutral-200/10
                         data-[state=open]:animate-in data-[state=closed]:animate-out
                         data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                         data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
                         transition-all duration-800 ease-out"
                hideCloseButton={true}
              >
                {/* Ornamento de diseño - gradientes premium en esquinas */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-b from-blue/10 to-purple-500/5 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-gradient-to-t from-pink-500/10 to-blue/5 blur-3xl opacity-50"></div>
                
                <div className="flex flex-col gap-2 mt-8 relative">
                  {/* Barra de progreso vertical */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-foreground/10 rounded-full"></div>
                  <div 
                    className="absolute left-6 top-2 w-0.5 bg-gradient-to-b from-blue via-purple-500 to-pink-500 rounded-full z-10"
                    style={{ 
                      height: `${(menuItems.findIndex(item => item.href.replace('#', '') === activeSection) + 1) * 100 / menuItems.length}%` 
                    }}
                  ></div>
                  {menuItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <div 
                        key={item.href}
                        className="relative"
                      >
                        <a
                          href={item.href}
                          onClick={handleNavClick}
                          className={cn(
                            "relative flex items-center group px-8 py-4 rounded-lg transition-all duration-300",
                            isActive 
                              ? "bg-gradient-to-r from-foreground/5 to-foreground/10 text-foreground" 
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                          )}
                        >
                          {/* Indicador numerado con círculo premium */}
                          <div className="relative mr-5">
                            <div 
                              className={cn(
                                "absolute -left-6 w-3 h-3 rounded-full transition-all duration-300",
                                isActive 
                                  ? "bg-blue scale-100" 
                                  : "bg-foreground/20 scale-75 group-hover:scale-100 group-hover:bg-foreground/40"
                              )}
                            ></div>
                            <div className={cn(
                              "flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300",
                              isActive 
                                ? "border-blue/60 text-blue bg-blue/5" 
                                : "border-foreground/20 text-foreground/40 group-hover:border-foreground/40 group-hover:text-foreground/60"
                            )}>
                              <span className="text-xs font-medium">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Texto del elemento con efecto de subrayado animado */}
                          <div className="relative overflow-hidden">
                            <span className="text-base font-medium">{item.label}</span>
                            <div 
                              className={cn(
                                "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue via-purple-500 to-pink-500 transition-transform duration-300 ease-out",
                                isActive 
                                  ? "transform scale-x-100" 
                                  : "transform scale-x-0 group-hover:scale-x-100"
                              )}
                            ></div>
                          </div>
                          
                          {/* Indicador de progreso horizontal para el elemento activo */}
                          {isActive && (
                            <div 
                              className="absolute bottom-2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue/40 to-transparent"
                            ></div>
                          )}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </MenuContext.Provider>
  );
};

export default Navbar;
