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
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: projectsRef, inView: projectsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
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
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        
        <div 
          ref={aboutRef} 
          className={`transition-all duration-500 ease-out transform 
            ${aboutInView 
              ? 'translate-y-0 opacity-100 scale-[1.01]' 
              : 'translate-y-10 opacity-0 scale-95'
            }`}
        >
          <AboutSection />
        </div>

        <div 
          ref={projectsRef} 
          className={`transition-all duration-500 ease-out transform 
            ${projectsInView 
              ? 'translate-y-0 opacity-100 scale-[1.01]' 
              : 'translate-y-10 opacity-0 scale-95'
            }`}
        >
          <ProjectsSection />
        </div>

        <div 
          ref={skillsRef} 
          className={`transition-all duration-500 ease-out transform 
            ${skillsInView 
              ? 'translate-y-0 opacity-100 scale-[1.01]' 
              : 'translate-y-10 opacity-0 scale-95'
            }`}
        >
          <SkillsSection />
        </div>

        <div 
          ref={contactRef} 
          className={`transition-all duration-500 ease-out transform 
            ${contactInView 
              ? 'translate-y-0 opacity-100 scale-[1.01]' 
              : 'translate-y-10 opacity-0 scale-95'
            }`}
        >
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
