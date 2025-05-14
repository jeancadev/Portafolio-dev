import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  id: number;
  element: HTMLDivElement;
  active: boolean;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isOverLink, setIsOverLink] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // Colores para las partículas
  const particleColors = [
    '#3b82f6', // Azul principal
    '#60a5fa', // Azul claro
    '#93c5fd', // Azul muy claro
    '#2563eb', // Azul oscuro
    '#ffffff', // Blanco
  ];
  
  useEffect(() => {
    // Inicializar elementos de trail
    const trailCount = 8;
    if (trailRef.current.length === 0) {
      // Crear elementos para el trail
      for (let i = 0; i < trailCount; i++) {
        const element = document.createElement('div');
        element.className = 'cursor-trail-dot';
        document.body.appendChild(element);
        trailRef.current.push(element);
      }
    }

    // Función para actualizar la posición del cursor y los trails
    const updatePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setPosition({ x, y });
      lastMousePos.current = { x, y };
      
      // Animar el cursor principal
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          left: x,
          top: y,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
      
      // Animar los trails con retraso
      trailRef.current.forEach((dot, index) => {
        // Retraso progresivo para crear efecto de estela
        const delay = index * 0.08;
        
        gsap.to(dot, {
          left: x,
          top: y,
          duration: 0.5,
          delay: delay,
          ease: 'power2.out',
          scale: 1 - (index * 0.08),
          opacity: 1 - (index * 0.08),
        });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Detección de elementos interactivos
    const handleLinkHover = () => setIsOverLink(true);
    const handleLinkLeave = () => setIsOverLink(false);
    
    // Seleccionar todos los elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    // Añadir listeners para elementos interactivos
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHover);
      element.addEventListener('mouseleave', handleLinkLeave);
    });

    // Event listeners principales
    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      
      // Remover listeners de elementos interactivos
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      // Limpiar elementos del trail
      trailRef.current.forEach(dot => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
      trailRef.current = [];
    };
  }, []);

  // Si no es visible, no renderizar nada
  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className={`cursor-main ${isOverLink ? 'cursor-active' : ''}`}
    />
  );
};

export default CustomCursor;