
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
    // Detect system theme preference on load
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Set up a listener for changes in system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // Update the page title
    document.title = 'Portfolio | Desarrollador de Software';
    
    // Optional: Scroll to top when page loads
    window.scrollTo(0, 0);

    // Handle mouse movement for radial gradient effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update CSS variables for radial gradient effect
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };

    // Handle click for water ripple effect
    const handleClick = (e: MouseEvent) => {
      // Only create ripples on empty space clicks (not on interactive elements)
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

    // Create water ripple effect at mouse position
    const createRipple = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      // Remove ripple after animation completes
      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    setMounted(true);
    
    // Clean up event listeners
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        
        <div ref={aboutRef} className={`transition-all duration-700 transform ${aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <AboutSection />
        </div>

        <div ref={projectsRef} className={`transition-all duration-700 transform ${projectsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ProjectsSection />
        </div>

        <div ref={skillsRef} className={`transition-all duration-700 transform ${skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <SkillsSection />
        </div>

        <div ref={contactRef} className={`transition-all duration-700 transform ${contactInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
