
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detectar el tema preferido del sistema al cargar
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Actualizar el título de la página
    document.title = 'Portfolio | Desarrollador de Software';
    
    // Opcional: Scroll al principio cuando se carga la página
    window.scrollTo(0, 0);
    
    setMounted(true);
  }, []);

  // Evitar cambios de hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
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
