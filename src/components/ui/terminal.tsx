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
    document.documentElement.style.setProperty(
      '--terminal-max-width', 
      isMaximized ? '95%' : '800px'
    );
    
    // Arreglar el problema con la terminal maximizada que no se muestra correctamente
    if (isMaximized) {
      // Asegurar que la terminal sea visible
      document.body.style.overflow = 'hidden'; // Prevenir scroll mientras la terminal está maximizada
    } else {
      // Restaurar overflow cuando la terminal no está maximizada
      document.body.style.overflow = '';
    }
    
    return () => {
      // Limpieza al desmontar
      document.body.style.overflow = '';
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