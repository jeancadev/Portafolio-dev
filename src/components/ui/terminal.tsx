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
  
  const handleClose = () => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Deshabilitar interacciones durante la animación
    terminal.style.pointerEvents = 'none';
    
    // Forzar renderizado antes de la animación
    gsap.set(terminal, { 
      willChange: 'transform, opacity, filter',
      transformOrigin: 'center center'
    });
    
    // Animación de cierre con efecto de desvanecimiento y escala
    const tl = gsap.timeline({
      onComplete: () => {
        // Limpiar estilos después de la animación
        gsap.set(terminal, { clearProps: 'all' });
        setClosedTerminals(prev => [...prev, id]);
        // Restaurar eventos después de la animación
        terminal.style.pointerEvents = '';
      }
    });
    
    tl.to(terminal, {
      scale: 0.96,
      duration: 0.15,
      ease: 'power2.in',
      onStart: () => {
        document.body.classList.add('terminal-closing');
      }
    })
    .to(terminal, {
      scale: 1.02,
      opacity: 0.8,
      filter: 'blur(2px)',
      duration: 0.2,
      ease: 'power2.out'
    })
    .to(terminal, {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(4px)',
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        document.body.classList.remove('terminal-closing');
      }
    }, '>0.05');
  };
  
  const handleMinimize = () => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Deshabilitar interacciones durante la animación
    terminal.style.pointerEvents = 'none';
    
    // Forzar renderizado antes de la animación
    gsap.set(terminal, { 
      willChange: 'transform, opacity',
      transformOrigin: 'bottom center'
    });
    
    // Crear una copia de los estados actuales para usarlos en el callback
    const currentMaximized = [...maximizedTerminals];
    const currentMinimized = [...minimizedTerminals];
    
    // Animación de minimizar con efecto de compresión
    const tl = gsap.timeline({
      onComplete: () => {
        // Limpiar estilos después de la animación
        gsap.set(terminal, { clearProps: 'all' });
        
        // Actualizar estados después de la animación
        if (isMaximized) {
          setMaximizedTerminals(currentMaximized.filter(termId => termId !== id));
          document.body.classList.remove('terminal-maximized-active');
        }
        setMinimizedTerminals([...currentMinimized, id]);
        
        // Restaurar eventos
        terminal.style.pointerEvents = '';
      }
    });
    
    tl.to(terminal, {
      scaleY: 0.8,
      scaleX: 0.96,
      opacity: 0.9,
      duration: 0.15,
      ease: 'power2.in',
      onStart: () => {
        document.body.classList.add('terminal-minimizing');
      }
    })
    .to(terminal, {
      y: 40,
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        document.body.classList.remove('terminal-minimizing');
      }
    }, '>0.05');
  };
  
  const handleMaximize = () => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    
    // Forzar renderizado antes de la animación
    gsap.set(terminal, { willChange: 'transform, opacity' });
    
    if (isMaximized) {
      // Restaurar desde maximizado con efecto de desvanecimiento suave
      gsap.to(terminal, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(terminal, { clearProps: 'all' });
          setMaximizedTerminals(maximizedTerminals.filter(termId => termId !== id));
          // Pequeño retraso para restaurar la opacidad después de la animación
          gsap.to(terminal, { 
            opacity: 1, 
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
    } else {
      // Maximizar con efecto de zoom suave
      wasMaximized.current = true;
      
      // Guardar la posición actual antes de maximizar
      const rect = terminal.getBoundingClientRect();
      
      setMaximizedTerminals([...maximizedTerminals, id]);
      
      if (isMinimized) {
        setMinimizedTerminals(minimizedTerminals.filter(termId => termId !== id));
      }
      
      // Animación de expansión suave al maximizar
      gsap.fromTo(terminal,
        { 
          scale: 0.95,
          opacity: 0.9
        },
        { 
          scale: 1, 
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(terminal, { clearProps: 'all' });
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
      // Asegurar que la terminal sea visible y ocupe el espacio correcto
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--terminal-max-width', '95%');
      document.body.classList.add('terminal-maximized-active');
      
      // Pequeño retraso para asegurar que los estilos se apliquen
      requestAnimationFrame(() => {
        terminal.classList.add('active');
      });
    } else {
      // Restaurar estilos cuando la terminal no está maximizada
      document.body.style.overflow = '';
      document.documentElement.style.setProperty('--terminal-max-width', isMobile ? '95%' : '800px');
      document.body.classList.remove('terminal-maximized-active');
      wasMaximized.current = false;
      
      // Limpiar estilos
      if (terminal) {
        gsap.set(terminal, { clearProps: 'all' });
      }
    }
    
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (isMaximized && currentIsMobile) {
        document.documentElement.style.setProperty('--terminal-max-width', '95%');
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
    <motion.div 
      ref={terminalRef}
      className={`terminal ${isMaximized ? 'terminal-maximized' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{
        type: 'tween',
        duration: 0.3,
        ease: [0.2, 0, 0, 1]
      }}
    >
      <div className="terminal-header backdrop-blur-md bg-gradient-to-b from-card/50 to-card/30 border-b border-blue/20">
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
            delay: 0.1,
            duration: 0.25,
            ease: [0.2, 0, 0, 1]
          }
        }}
      >
        <div className="terminal-content">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;