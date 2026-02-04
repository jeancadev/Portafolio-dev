import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  // scrub allows the animation to be tied to the scrollbar directly
  scrub?: boolean | number;
}

const ScrollRevealText = ({ children, className, scrub = 1 }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = children.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordElements = container.querySelectorAll('.reveal-word');

    // Reset initial state to avoid conflicts
    gsap.set(wordElements, { opacity: 0.1 });

    // Create a timeline linked to scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%', // Helper to start effect when text enters view
        end: 'bottom 60%', // Finish effect when text is near middle/top
        scrub: scrub, // Smooth scrubbing
        toggleActions: 'play none none reverse',
      }
    });

    // Simple stagger opacity animation
    tl.to(wordElements, {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'none', // Linear ease is best for scrub
    });

    return () => {
      // Proper cleanup is crucial for performance
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [children, scrub]);

  return (
    <div ref={containerRef} className={cn("leading-relaxed", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-word inline-block mr-1.5 will-change-opacity"
          style={{ opacity: 0.1 }} // Set initial style in CSS to prevent flash
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default ScrollRevealText;
