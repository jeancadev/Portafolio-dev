import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';
import '@/styles/macos-dock.css';

interface DockItem {
  id: string;
  icon: string;
  title: string;
  isMinimized: boolean;
  onRestore: () => void;
}

const MacOSDock: React.FC<{
  items: DockItem[];
}> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const controls = useAnimation();
  const { theme } = useTheme();
  
  // Filtrar solo los elementos minimizados
  const minimizedItems = items.filter(item => item.isMinimized);
  
  // Efecto para animar la entrada/salida del dock
  useEffect(() => {
    if (minimizedItems.length > 0) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.4
        }
      });
    } else {
      controls.start({
        y: 100,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      });
    }
  }, [minimizedItems.length, controls]);
  
  // No renderizar nada si no hay elementos minimizados
  if (minimizedItems.length === 0) return null;
  
  return (
    <motion.div 
      className={`mac-os-dock ${theme === 'dark' ? 'dark' : ''}`}
      initial={{ y: 100, opacity: 0 }}
      animate={controls}
      exit={{ y: 100, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20,
        duration: 0.4
      }}
    >
      <div className="mac-os-dock-container">
        {minimizedItems.map((item) => (
          <motion.div
            key={item.id}
            className="dock-item group"
            whileHover={{ 
              scale: 1.15, 
              y: -8,
              transition: { 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                duration: 0.2
              }
            }}
            whileTap={{ 
              scale: 0.95,
              y: 0,
              transition: { duration: 0.1 }
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={(e) => {
              e.stopPropagation();
              item.onRestore();
            }}
          >
            <motion.div 
              className="dock-item-icon"
              whileTap={{ scale: 0.9 }}
            >
              <img 
                src={item.icon || `/icons/terminal-icon-64.png`} 
                alt={item.title} 
                className="w-6 h-6 text-white" 
                onError={(e) => {
                  // Si el PNG falla, intentar con SVG
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('svg')) {
                    target.src = '/icons/terminal-icon.svg';
                  }
                }}
              />
            </motion.div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  className="dock-tooltip"
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {item.title}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MacOSDock;
