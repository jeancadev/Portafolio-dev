import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { TerminalStateContext } from '@/contexts/TerminalStateContext';

interface TerminalLauncherProps {
  terminalId: string;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

const TerminalLauncher: React.FC<TerminalLauncherProps> = ({ 
  terminalId = 'hero-terminal',
  position = 'bottom-right' 
}) => {
  const { 
    closedTerminals, 
    reopenTerminal
  } = useContext(TerminalStateContext);

  const isClosed = closedTerminals.includes(terminalId);
  
  if (!isClosed) return null;
  
  const handleReopen = () => {
    reopenTerminal(terminalId);
  };
  
  // Definir clases para posicionar el botón
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-left': 'top-4 left-4'
  };
  
  return (
    <motion.div 
      className={`fixed ${positionClasses[position]} z-50`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20,
        duration: 0.4
      }}
    >
      <motion.button
        className="terminal-launcher-btn bg-gradient-to-b from-blue to-blue-dark 
                   p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                   border border-blue/60 flex items-center justify-center"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        onClick={handleReopen}
        aria-label="Abrir Terminal"
        title="Abrir Terminal"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default TerminalLauncher;
