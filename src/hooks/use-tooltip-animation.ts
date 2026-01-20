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

    // Función para animación de entrada - Efecto Flip 3D
    const animateTooltipIn = (element: HTMLElement) => {
      // Detener cualquier animación previa
      gsap.killTweensOf(element);

      // Configurar estado inicial para Flip 3D
      // transformOrigin 'top center' + rotationX positivo = emerge desde el elemento hacia arriba
      gsap.set(element, {
        opacity: 0,
        rotationX: 90,
        rotationY: -3,
        scale: 0.85,
        y: -15,
        transformOrigin: 'top center',
        transformPerspective: 1000,
        filter: 'blur(3px)',
        boxShadow: '0 0 0 rgba(0, 100, 255, 0)'
      });

      // Crear timeline para animación Flip 3D secuencial
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          duration: 0.5
        }
      });

      // Secuencia de animación Flip
      tl.to(element, {
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.45,
        boxShadow: '0 12px 28px rgba(0, 100, 255, 0.2)',
        ease: 'back.out(1.4)'
      })
        // Pequeño ajuste de perspectiva final para suavizar
        .to(element, {
          rotationX: 2,
          duration: 0.15,
          ease: 'power1.out'
        })
        .to(element, {
          rotationX: 0,
          duration: 0.2,
          ease: 'power2.out'
        });

      // Animación de contenido interno con efecto stagger
      const contentItems = element.querySelectorAll('.tooltip-content > *');
      if (contentItems.length) {
        gsap.from(contentItems, {
          y: 10,
          opacity: 0,
          rotationX: -15,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    };

    // Función para animación de salida - Efecto Flip 3D inverso
    const animateTooltipOut = (element: HTMLElement) => {
      // Detener cualquier animación previa
      gsap.killTweensOf(element);

      // Primero, asegurar que el elemento siga visible durante la animación
      gsap.set(element, { display: 'block', visibility: 'visible' });

      // Animación de salida Flip 3D inverso - se pliega hacia el elemento
      gsap.to(element, {
        opacity: 0,
        rotationX: 60,
        scale: 0.9,
        y: -10,
        filter: 'blur(2px)',
        duration: 0.22,
        ease: 'power2.in',
        transformOrigin: 'top center',
        transformPerspective: 1000,
        onComplete: () => {
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
