import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up window resize handler for better mobile experience
    let smootherInstance: ScrollSmoother | null = null;

    // Helper function to initialize or refresh ScrollSmoother
    const initSmoother = () => {
      // Destroy previous instance if it exists
      if (smootherInstance) {
        smootherInstance.kill();
      }

      // Create a media query to disable on mobile (optional)
      const mediaQuery = window.matchMedia('(min-width: 768px)');
      const isMobile = !mediaQuery.matches;

      // Initialize ScrollSmoother with different settings based on device
      smootherInstance = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        smooth: isMobile ? 0.8 : 2, // Aumentado para un efecto más pronunciado
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1, // Light smoothing for touch devices
        ease: 'expo.out' // Tipo de easing para el scroll
      });

      // Make ScrollTrigger refresh when ScrollSmoother updates
      ScrollTrigger.refresh();
      
      return smootherInstance;
    };

    // Initialize on component mount
    smootherInstance = initSmoother();

    // Handle resize events to refresh ScrollSmoother
    const handleResize = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        if (smootherInstance) {
          // Just refresh ScrollTrigger on resize
          ScrollTrigger.refresh();
        }
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (smootherInstance) {
        smootherInstance.kill();
      }
    };
  }, []);

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper">
      <div ref={smoothContentRef} className="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
