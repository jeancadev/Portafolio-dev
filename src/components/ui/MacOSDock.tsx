import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  // Filtrar solo los elementos minimizados
  const minimizedItems = items.filter(item => item.isMinimized);
  
  // No mostrar el dock si no hay elementos minimizados
  if (minimizedItems.length === 0) return null;
  
  return (
    <motion.div 
      className="mac-os-dock"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="mac-os-dock-container">
        {minimizedItems.map((item) => (
          <motion.div
            key={item.id}
            className="dock-item"
            whileHover={{ 
              scale: 1.2, 
              y: -10,
              transition: { type: 'spring', stiffness: 400, damping: 17 }
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={item.onRestore}
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
                  transition={{ duration: 0.15 }}
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
