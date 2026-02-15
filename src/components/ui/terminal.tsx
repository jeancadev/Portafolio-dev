import React, { useState, useEffect, useContext, useRef } from 'react';
import '@/styles/terminal.css';
import { motion } from 'framer-motion';
import { TerminalStateContext } from '@/contexts/TerminalStateContext';
import { gsap } from 'gsap';

interface TerminalProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  icon?: string;
}

const Terminal = ({ 
  id, 
  title = "usuario@portfolio ~ %", 
  children,
  icon = "/icons/terminal-icon.png"
}: TerminalProps) => {
  const { 
    minimizedTerminals, 
    setMinimizedTerminals, 
    closedTerminals, 
    setClosedTerminals,
    maximizedTerminals,
    setMaximizedTerminals
  } = useContext(TerminalStateContext);
  
  const isMinimized = minimizedTerminals.includes(id);
  const isClosed = closedTerminals.includes(id);
  const isMaximized = maximizedTerminals.includes(id);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const wasMaximized = useRef(false);
  const isAnimating = useRef(false);
  
  const handleClose = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Deshabilitar interacciones durante la animación
    terminal.style.pointerEvents = 'none';
    
    // Configurar la animación de cierre más suave
    gsap.set(terminal, { 
      willChange: 'transform, opacity, scale',
      transformOrigin: 'center center'
    });
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(terminal, { clearProps: 'all' });
        setClosedTerminals(prev => [...prev, id]);
        terminal.style.pointerEvents = '';
        isAnimating.current = false;
      }
    });
    
    // Animación de cierre más fluida con rebote suave
    tl.to(terminal, {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(terminal, {
      scale: 0.85,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    });
  };
  
  const handleMinimize = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Deshabilitar interacciones durante la animación
    terminal.style.pointerEvents = 'none';
    
    // Configurar la animación de minimizar más suave
    gsap.set(terminal, { 
      willChange: 'transform, opacity, scale',
      transformOrigin: 'center center'
    });
    
    const currentMaximized = [...maximizedTerminals];
    const currentMinimized = [...minimizedTerminals];
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(terminal, { clearProps: 'all' });
        
        // Actualizar estados después de la animación
        if (isMaximized) {
          setMaximizedTerminals(currentMaximized.filter(termId => termId !== id));
          document.body.classList.remove('terminal-maximized-active');
        }
        setMinimizedTerminals([...currentMinimized, id]);
        
        terminal.style.pointerEvents = '';
        isAnimating.current = false;
      }
    });
    
    // Animación de minimizar más fluida con rebote suave
    tl.to(terminal, {
      scale: 0.92,
      opacity: 0.85,
      y: 15,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(terminal, {
      scale: 0.8,
      opacity: 0,
      y: 30,
      duration: 0.25,
      ease: 'power2.in'
    });
  };
  
  const handleMaximize = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Detectar si es móvil para usar animaciones más suaves
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    gsap.set(terminal, { 
      willChange: 'transform, opacity, scale',
      transformOrigin: 'center center'
    });
    
    if (isMaximized) {
      // Restaurar desde maximizado con GSAP para animación más fluida
      const restoreDuration = isMobile ? 0.45 : isTablet ? 0.5 : 0.45;
      
      // Animar el overlay (::before) primero desvaneciendo
      terminal.classList.add('terminal-restoring');
      
      // Animación fluida de restauración con GSAP
      gsap.to(terminal, {
        scale: 0.95,
        opacity: 0,
        duration: restoreDuration,
        ease: 'power2.inOut',
        onComplete: () => {
          // Limpiar clases y estados
          // Disable transitions to prevent layout jump
          terminal.classList.add('no-transition');
          
          // Make invisible to hide layout shift
          terminal.style.opacity = '0';
          
          terminal.classList.remove('terminal-maximized', 'terminal-restoring', 'active');
          setMaximizedTerminals(prev => prev.filter(termId => termId !== id));
          
          if (wasMaximized.current) {
            document.body.classList.remove('terminal-maximized-active');
            wasMaximized.current = false;
          }
          
          // Resetear estilos y estado de animación
          gsap.set(terminal, { clearProps: 'all' });
          terminal.style.pointerEvents = '';
          isAnimating.current = false;
          
          // Remove no-transition after a short delay and fade in
          setTimeout(() => {
            if (terminal) {
              terminal.classList.remove('no-transition');
              // Smooth fade in to new position
              gsap.fromTo(terminal, 
                { opacity: 0, scale: 0.98 }, 
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
              );
            }
          }, 50);
        }
      });
    } else {
      // Maximizar con animación suave
      wasMaximized.current = true;
      
      setMaximizedTerminals([...maximizedTerminals, id]);
      
      if (isMinimized) {
        setMinimizedTerminals(minimizedTerminals.filter(termId => termId !== id));
      }
      
      // Animación de expansión
      terminal.classList.add('terminal-expanding');
      
      const expandDuration = isMobile ? 0.5 : isTablet ? 0.55 : 0.5;
      
      gsap.fromTo(terminal,
        { 
          scale: 0.9,
          opacity: 0.8
        },
        { 
          scale: 1, 
          opacity: 1,
          duration: expandDuration,
          ease: 'power1.out',
          onComplete: () => {
            gsap.set(terminal, { clearProps: 'all' });
            terminal.classList.remove('terminal-expanding');
            isAnimating.current = false;
          }
        }
      );
    }
  };
  
  // Actualizar las dimensiones de los elementos cuando se maximize/restaure
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const terminal = terminalRef.current;
    
    if (!terminal) return;
    
    if (isMaximized) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Fix: Limit width on large screens and tablets to avoid deformation
      let maxWidth = '95%';
      if (window.innerWidth >= 1200) {
        maxWidth = '1100px';
      } else if (window.innerWidth >= 768) {
        maxWidth = '850px';
      }
      
      document.documentElement.style.setProperty('--terminal-max-width', maxWidth);
      document.body.classList.add('terminal-maximized-active');
      
      requestAnimationFrame(() => {
        terminal.classList.add('active');
      });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.setProperty('--terminal-max-width', isMobile ? '95%' : '800px');
      document.body.classList.remove('terminal-maximized-active');
      wasMaximized.current = false;
      
      if (terminal) {
        gsap.set(terminal, { clearProps: 'all' });
      }
    }
    
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (currentIsMobile) {
        document.documentElement.style.setProperty('--terminal-max-width', '95%');
      } else if (window.innerWidth >= 1200) {
        document.documentElement.style.setProperty('--terminal-max-width', '1100px');
      } else if (window.innerWidth >= 768) {
        document.documentElement.style.setProperty('--terminal-max-width', '850px');
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('terminal-maximized-active');
      window.removeEventListener('resize', handleResize);
    };
  }, [isMaximized]);
  
  // Si está cerrada, no mostrar la terminal
  if (isClosed) return null;
  
  // Si está minimizada, renderizar el componente oculto para mantener el estado
  if (isMinimized) {
    return (
      <div style={{ display: 'none' }}>
        {children}
      </div>
    );
  }
  
  return (
    <div className="terminal-slot">
      <motion.div 
        ref={terminalRef}
        className={`terminal ${isMaximized ? 'terminal-maximized' : ''}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        transition={{
          type: 'tween',
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className="terminal-header bg-gradient-to-b from-card/50 to-card/30 border-b border-blue/20 shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
          <div className="terminal-buttons">
            <div 
              className="terminal-button terminal-close hover:scale-110 transition-transform cursor-pointer"
              onClick={handleClose}
              title="Cerrar"
            />
            <div 
              className="terminal-button terminal-minimize hover:scale-110 transition-transform cursor-pointer" 
              onClick={handleMinimize}
              title="Minimizar"
            />
            <div 
              className="terminal-button terminal-maximize hover:scale-110 transition-transform cursor-pointer" 
              onClick={handleMaximize}
              title={isMaximized ? "Restaurar" : "Maximizar"}
            />
          </div>
          <div className="terminal-title text-blue-foreground/70">
            {title}
          </div>
        </div>
        <motion.div 
          className="terminal-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 0.15,
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          <div className="terminal-content">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Terminal;
