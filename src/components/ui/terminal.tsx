import React, { useState, useEffect, useContext } from 'react';
import '@/styles/terminal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalStateContext } from '@/contexts/TerminalStateContext';

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
  
  const handleClose = () => {
    setClosedTerminals([...closedTerminals, id]);
  };
  
  const handleMinimize = () => {
    // Si está maximizada, primero la restauramos
    if (isMaximized) {
      setMaximizedTerminals(maximizedTerminals.filter(termId => termId !== id));
      // Aseguramos que se quite la clase del body
      document.body.classList.remove('terminal-maximized-active');
    }
    // Luego la minimizamos
    setMinimizedTerminals([...minimizedTerminals, id]);
  };
  
  const handleMaximize = () => {
    if (isMaximized) {
      // Si ya está maximizada, la restauramos a su tamaño normal
      setMaximizedTerminals(maximizedTerminals.filter(termId => termId !== id));
    } else {
      // Maximizamos la terminal
      setMaximizedTerminals([...maximizedTerminals, id]);
      
      // Si estaba minimizada, la restauramos
      if (isMinimized) {
        setMinimizedTerminals(minimizedTerminals.filter(termId => termId !== id));
      }
    }
  };
  
  // Actualizar las dimensiones de los elementos cuando se maximize/restaure
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Detectar dispositivos móviles
    
    if (isMaximized) {
      // Asegurar que la terminal sea visible y ocupe el espacio correcto
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--terminal-max-width', '95%');
      
      // Agregar clase al body para ocultar la imagen de perfil
      document.body.classList.add('terminal-maximized-active');
    } else {
      // Restaurar estilos cuando la terminal no está maximizada
      document.body.style.overflow = '';
      document.documentElement.style.setProperty('--terminal-max-width', isMobile ? '95%' : '800px');
      
      // Remover clase del body para mostrar la imagen de perfil
      document.body.classList.remove('terminal-maximized-active');
    }
    
    // Manejar cambios en el tamaño de la ventana
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (isMaximized && currentIsMobile) {
        // Ajustar estilos específicos para móviles cuando está maximizado
        document.documentElement.style.setProperty('--terminal-max-width', '95%');
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Limpieza al desmontar
      document.body.style.overflow = '';
      document.body.classList.remove('terminal-maximized-active');
      window.removeEventListener('resize', handleResize);
    };
  }, [isMaximized]);
  
  // Si está cerrada o minimizada, no mostrar la terminal
  if (isClosed || isMinimized) return null;
  
  return (
    <motion.div 
      className={`terminal ${isMaximized ? 'terminal-maximized' : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isMaximized ? 1 : undefined
      }}
      transition={{ 
        type: isMaximized ? 'tween' : 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: isMaximized ? 0.3 : undefined
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.2,
          duration: 0.3
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