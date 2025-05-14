import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Hook personalizado para aplicar animaciones avanzadas a tooltips
 * utilizando GSAP para efectos más atractivos y profesionales
 */
export const useTooltipAnimation = () => {
  useEffect(() => {
    // Registramos un observador para detectar cuando se muestran tooltips
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
          const target = mutation.target as HTMLElement;
          const state = target.getAttribute('data-state');
          
          // Si el tooltip está abierto o cerrado, aplicamos animaciones
          if (state === 'open') {
            animateTooltipIn(target);
          } else if (state === 'closed') {
            animateTooltipOut(target);
          }
        }
      });
    });

    // Función para animación de entrada
    const animateTooltipIn = (element: HTMLElement) => {
      // Detener cualquier animación previa
      gsap.killTweensOf(element);
      
      // Configurar estado inicial
      gsap.set(element, { 
        opacity: 0, 
        scale: 0.4, 
        rotate: -2, 
        y: -10,
        transformOrigin: 'top center',
        filter: 'blur(10px) brightness(1.2)',
        boxShadow: '0 0 0 rgba(0, 0, 255, 0)'
      });
      
      // Crear timeline para animación secuencial
      const tl = gsap.timeline({
        defaults: { 
          ease: 'elastic.out(0.7, 0.3)', 
          duration: 0.6 
        }
      });
      
      // Secuencia de animación
      tl.to(element, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        filter: 'blur(0px) brightness(1)',
        duration: 0.5,
        boxShadow: '0 8px 16px rgba(0, 0, 255, 0.15)',
        ease: 'power3.out'
      })
      // Un pequeño rebote para efecto especial
      .to(element, {
        y: -3,
        duration: 0.2,
        ease: 'power1.out',
        clearProps: false
      }, '-=0.1')
      .to(element, {
        y: 0,
        duration: 0.2,
        ease: 'power3.out'
      });
      
      // Animación de contenido interno (texto, iconos)
      const contentItems = element.querySelectorAll('.tooltip-content > *');
      if (contentItems.length) {
        gsap.from(contentItems, {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.15
        });
      }
    };
    
    // Función para animación de salida
    const animateTooltipOut = (element: HTMLElement) => {
      // Detener cualquier animación previa
      gsap.killTweensOf(element);
      
      // Primero, asegurar que el elemento siga visible durante la animación
      gsap.set(element, { display: 'block', visibility: 'visible' });
      
      // Animación de salida - ligeramente más larga para evitar parpadeos
      gsap.to(element, {
        opacity: 0,
        scale: 0.9,
        y: -5,
        filter: 'blur(3px)',
        duration: 0.25,  // Duración ligeramente más larga
        ease: 'power2.inOut',  // Easing más suave
        // Manejar la finalización para asegurar que el elemento se oculte correctamente
        onComplete: () => {
          // Solo limpiar props específicas, manteniendo opacity en 0 hasta que esté completamente oculto
          gsap.set(element, { 
            visibility: 'hidden',
            display: 'none'
          });
        }
      });
      
      // Prevenir cualquier interacción durante la animación de salida
      gsap.set(element, { pointerEvents: 'none' });
    };
    
    // Observar cualquier tooltip que aparezca
    const tooltips = document.querySelectorAll('.hover-card-content');
    tooltips.forEach(tooltip => {
      observer.observe(tooltip, { attributes: true });
    });
    
    // Configurar observador para tooltips futuros
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const tooltips = node.querySelectorAll('.hover-card-content');
              tooltips.forEach(tooltip => {
                observer.observe(tooltip, { attributes: true });
              });
              
              if (node.classList.contains('hover-card-content')) {
                observer.observe(node, { attributes: true });
              }
            }
          });
        }
      });
    });
    
    // Observar cambios en el DOM para detectar nuevos tooltips
    bodyObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Limpiar al desmontar
    return () => {
      observer.disconnect();
      bodyObserver.disconnect();
    };
  }, []);
  
  // No necesitamos retornar nada, el hook maneja todo internamente
  return null;
};

export default useTooltipAnimation;
