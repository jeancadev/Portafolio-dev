import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
    rootMargin: '-50px'
  });

  const { ref: projectsRef, inView: projectsInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
    rootMargin: '-50px'
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
    rootMargin: '-50px'
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
    rootMargin: '-50px'
  });

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    document.title = 'Jean Carlos | Desarrollador de Software';
    
    window.scrollTo(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input');
      
      if (!isInteractive) {
        createRipple(e);
      }
    };

    const createRipple = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    setMounted(true);
    
    // Añadir estilos para el comportamiento de scroll suave a toda la página
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDistance = window.innerHeight * 0.3;
      
      // Solo mostrar el botón cuando se ha desplazado cierta distancia
      if (scrollTop > scrollDistance) {
        document.body.classList.add('show-scroll-button');
      } else {
        document.body.classList.remove('show-scroll-button');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="space-y-0">
        <HeroSection />
        
        <div 
          ref={aboutRef} 
          className={`section-spacing ${
            aboutInView 
              ? 'reveal-section' 
              : 'reveal-section-hidden'
          }`}
        >
          <AboutSection />
        </div>

        <div 
          ref={projectsRef} 
          className={`section-spacing ${
            projectsInView 
              ? 'reveal-section reveal-delay-200' 
              : 'reveal-section-hidden'
          }`}
        >
          <ProjectsSection />
        </div>

        <div 
          ref={skillsRef} 
          className={`section-spacing ${
            skillsInView 
              ? 'reveal-section reveal-delay-400' 
              : 'reveal-section-hidden'
          }`}
        >
          <SkillsSection />
        </div>

        <div 
          ref={contactRef} 
          className={`section-spacing ${
            contactInView 
              ? 'reveal-section reveal-delay-600' 
              : 'reveal-section-hidden'
          }`}
        >
          <ContactSection />
        </div>
      </main>
      <Footer />
      
      {/* Botón para volver arriba con animación mejorada */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue/80 hover:bg-blue text-white rounded-full p-3 shadow-lg opacity-0 invisible transform translate-y-10 transition-all duration-300 ease-in-out z-50 group hover:scale-110 scroll-button view-more-btn"
        aria-label="Volver arriba"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
