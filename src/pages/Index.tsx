
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Detectar el tema preferido del sistema al cargar
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = isDarkMode ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Also set up a listener for changes in system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // Actualizar el título de la página
    document.title = 'Portfolio | Desarrollador de Software';
    
    // Opcional: Scroll al principio cuando se carga la página
    window.scrollTo(0, 0);
    
    setMounted(true);
    
    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Function to toggle theme manually
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Evitar cambios de hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
