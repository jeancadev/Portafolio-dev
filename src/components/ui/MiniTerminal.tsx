import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '@/styles/mini-terminal.css';

interface MiniTerminalProps {
  title?: string;
  command?: string;
  children: React.ReactNode;
  variant?: 'text' | 'tree';
  typewriter?: boolean;
  typewriterDelay?: number;
  className?: string;
}

const MiniTerminal: React.FC<MiniTerminalProps> = ({
  title = "usuario@portfolio ~ %",
  command,
  children,
  variant = 'text',
  typewriter = false,
  typewriterDelay = 50,
  className = ''
}) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [showContent, setShowContent] = useState(!typewriter);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Efecto typewriter para el comando
  useEffect(() => {
    if (!typewriter || !command || hasAnimated.current) {
      setDisplayedCommand(command || '');
      setShowContent(true);
      return;
    }

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedCommand(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        hasAnimated.current = true;
        // Pequeña pausa antes de mostrar el contenido
        setTimeout(() => setShowContent(true), 300);
      }
    }, typewriterDelay);

    return () => clearInterval(typeInterval);
  }, [command, typewriter, typewriterDelay]);

  // Cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      ref={terminalRef}
      className={`mini-terminal ${variant === 'tree' ? 'mini-terminal-tree' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header estilo macOS */}
      <div className="mini-terminal-header">
        <div className="mini-terminal-buttons">
          <div className="mini-terminal-button mini-terminal-close" />
          <div className="mini-terminal-button mini-terminal-minimize" />
          <div className="mini-terminal-button mini-terminal-maximize" />
        </div>
        <div className="mini-terminal-title">{title}</div>
      </div>

      {/* Body */}
      <div className="mini-terminal-body">
        {/* Comando */}
        {command && (
          <div className="mini-terminal-command">
            <span className="mini-terminal-prompt">$</span>
            <span className="mini-terminal-command-text">
              {displayedCommand}
              {typewriter && !showContent && (
                <span className={`mini-terminal-cursor ${showCursor ? 'visible' : ''}`}>▊</span>
              )}
            </span>
          </div>
        )}

        {/* Contenido */}
        <motion.div
          className={`mini-terminal-content ${variant === 'tree' ? 'tree-content' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>

        {/* Cursor final */}
        {showContent && (
          <div className="mini-terminal-cursor-line">
            <span className="mini-terminal-prompt">$</span>
            <span className={`mini-terminal-cursor ${showCursor ? 'visible' : ''}`}>▊</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MiniTerminal;
