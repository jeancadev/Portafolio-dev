import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MenuContext } from '@/context/MenuContext';

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
        stiffness: 400,
        damping: 30,
        duration: 0.3
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
        transition={{ duration: 0.3 }}
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
            boxShadow: "0 0 5px rgba(99,102,241,0.3)" 
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
          duration: 0.3, 
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
          duration: 0.3, 
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
            boxShadow: "0 0 5px rgba(236,72,153,0.3)"
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
          duration: 0.3, 
          ease: [0.6, 0.05, -0.01, 0.9],
          delay: isOpen ? 0 : 0.2
        }}
      />
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isNavigatingRef = React.useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
      
      // Si el usuario está navegando por clic, no actualizamos la sección activa
      if (isNavigatingRef.current) return;
      
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const viewportHeight = window.innerHeight;
      const viewportMiddle = viewportHeight / 2;
      
      // Si estamos cerca de la parte superior, establecer como 'home'
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }
      
      // Si estamos cerca de la parte inferior, establecer como 'contact'
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setActiveSection('contact');
        return;
      }
      
      // Buscar la sección más cercana al centro de la ventana
      let closestSection = activeSection;
      let minDistance = Infinity;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementMiddle = rect.top + (rect.height / 2);
          const distance = Math.abs(viewportMiddle - elementMiddle);
          
          // Si el elemento está visible en la ventana
          if (rect.top <= viewportHeight * 0.7 && rect.bottom >= viewportHeight * 0.3) {
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = section;
            }
          }
        }
      });
      
      // Actualizar solo si la sección cambió
      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
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
      
      // 1. Marcar que estamos navegando por clic
      isNavigatingRef.current = true;
      
      // 2. Cerrar el menú móvil si está abierto
      setIsOpen(false);
      
      // 3. Actualizar la sección activa inmediatamente
      setActiveSection(section);
      
      // 4. Desplazamiento suave a la sección
      const element = document.getElementById(section);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // 5. Realizar el scroll suave
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // 6. Restablecer la bandera después de un tiempo
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1000);
      }
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
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
          "rounded-full max-w-fit",
          // Borde adaptativo para modo claro y oscuro
          "border border-neutral-500/15 dark:border-neutral-200/10",
          // Sombra adaptativa
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          isScrolled 
            ? 'bg-background/70 dark:bg-background/65 backdrop-blur-2xl py-2 px-6 lg:px-8' 
            : 'bg-background/60 dark:bg-background/50 backdrop-blur-xl py-3 px-8 lg:px-10'
        )}
      >
        <nav className="flex items-center justify-between gap-4 lg:gap-8">
          <a 
            href="#home" 
            onClick={handleNavClick}
            className="font-bold text-xl text-foreground/90 hover:text-foreground transition-colors"
          >
            jeanca<span className="text-blue">Dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-500 ease-out px-3 py-2 rounded-md whitespace-nowrap",
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
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative lg:hidden group overflow-hidden hover:bg-foreground/5 transition-all duration-500",
                  "before:absolute before:inset-0 before:rounded-full before:border before:border-foreground/20",
                  "before:scale-75 before:opacity-0 hover:before:scale-100 hover:before:opacity-100",
                  "before:transition-all before:duration-500",
                  "after:absolute after:inset-0 after:rounded-full after:border-2 after:border-blue/20",
                  "after:scale-90 after:opacity-0 hover:after:scale-110 hover:after:opacity-100",
                  "after:transition-all after:duration-700 after:ease-in-out",
                  isOpen && "bg-foreground/5"
                )}
              >
                <HamburgerIcon isOpen={isOpen} />
                <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
              </Button>
              <SheetContent 
                side="right"
                hideCloseButton={true}
                className={cn(
                  "w-[320px] bg-background/90 backdrop-blur-xl border-neutral-200/10",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
                  "transition-all duration-300 ease-out"
                )}
              >
                {/* Botón de cierre con el icono hamburguesa animado */}
                <SheetClose asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "absolute right-4 top-4 z-50 group overflow-hidden hover:bg-foreground/5 transition-all duration-500",
                      "before:absolute before:inset-0 before:rounded-full before:border before:border-foreground/20",
                      "before:scale-75 before:opacity-0 hover:before:scale-100 hover:before:opacity-100",
                      "before:transition-all before:duration-500",
                      "after:absolute after:inset-0 after:rounded-full after:border-2 after:border-blue/20",
                      "after:scale-90 after:opacity-0 hover:after:scale-110 hover:after:opacity-100",
                      "after:transition-all after:duration-700 after:ease-in-out",
                      "bg-foreground/5"
                    )}
                  >
                    <HamburgerIcon isOpen={true} />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </SheetClose>
                
                {/* Ornamento de diseño - gradientes premium */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-b from-blue/10 to-purple-500/5 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-gradient-to-t from-pink-500/10 to-blue/5 blur-3xl opacity-50"></div>
                
                <div className="flex flex-col gap-2 mt-8 relative">
                  {/* Barra de progreso vertical */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-foreground/10 rounded-full"></div>
                  <motion.div 
                    className="absolute left-6 top-2 w-0.5 bg-gradient-to-b from-blue via-purple-500 to-pink-500 rounded-full z-10"
                    style={{ 
                      height: `${(menuItems.findIndex(item => item.href.replace('#', '') === activeSection) + 1) * 100 / menuItems.length}%` 
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>

                  {/* Elementos del menú */}
                  {menuItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.div 
                        key={item.href}
                        className="relative"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
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
                            <motion.div 
                              className={cn(
                                "absolute -left-6 w-3 h-3 rounded-full transition-all duration-300",
                                isActive 
                                  ? "bg-blue scale-100" 
                                  : "bg-foreground/20 scale-75 group-hover:scale-100 group-hover:bg-foreground/40"
                              )}
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            ></motion.div>
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
                            <motion.div 
                              className={cn(
                                "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue via-purple-500 to-pink-500",
                                isActive ? "opacity-100" : "opacity-0"
                              )}
                              initial={false}
                              animate={{ 
                                scaleX: isActive ? 1 : 0,
                                opacity: isActive ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                            ></motion.div>
                          </div>
                          
                          {/* Indicador de progreso horizontal */}
                          {isActive && (
                            <motion.div 
                              className="absolute bottom-2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue/40 to-transparent"
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            ></motion.div>
                          )}
                        </a>
                      </motion.div>
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
