import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type AnimationOptions = {
  trigger?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | object;
  from?: object;
  to?: object;
  yPercent?: number;
  xPercent?: number;
  opacity?: number;
  scale?: number;
  autoAlpha?: number;
};

/**
 * Custom hook for GSAP animations with ScrollTrigger integration
 */
export const useGsapAnimation = <T extends HTMLElement>(
  options: AnimationOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.context.Context | null>(null);

  const {
    trigger = true,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    duration = 1,
    delay = 0.2,
    ease = 'power3.out',
    stagger = 0.1,
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
  } = options;

  useEffect(() => {
    // Only run if we have a valid ref
    if (!elementRef.current) return;

    // Create a context for better cleanup
    const ctx = gsap.context(() => {
      if (trigger) {
        // Create a timeline for the section animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: elementRef.current,
            start,
            end,
            scrub,
            markers,
            toggleActions: 'play none none reverse',
          },
        });

        // Animate the main element
        tl.fromTo(
          elementRef.current,
          { ...from },
          { 
            ...to, 
            duration, 
            ease,
          }
        );

        // Find and animate children with the 'gsap-item' class
        const items = elementRef.current.querySelectorAll('.gsap-item');
        if (items.length > 0) {
          tl.fromTo(
            items,
            { ...from },
            { 
              ...to, 
              duration, 
              stagger, 
              ease,
            },
            '-=0.5' // Slightly overlap with the main animation
          );
        }
      } else {
        // Simple animation without ScrollTrigger
        gsap.fromTo(
          elementRef.current,
          { ...from },
          { 
            ...to, 
            duration, 
            delay, 
            ease,
          }
        );
      }
    });

    // Store the context for cleanup
    animationRef.current = ctx;

    // Cleanup function
    return () => {
      ctx.revert(); // This cleans up all animations created by this context
    };
  }, [trigger, start, end, scrub, markers, duration, delay, ease, stagger]);

  return elementRef;
};

export default useGsapAnimation;
