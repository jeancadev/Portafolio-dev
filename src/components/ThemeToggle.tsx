import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  const isDark = theme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full glass-button overflow-hidden group"
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Fondo animado optimizado - usa CSS en lugar de animación continua */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300 ease-out"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.03) 100%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.05) 100%)',
        }}
      />

      {/* Efecto de brillo al hover - CSS puro para mejor rendimiento */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Contenedor de iconos optimizado */}
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Sol con glow estático via CSS */}
              <Sun 
                className="h-[1.2rem] w-[1.2rem] text-amber-400" 
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))'
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Luna con glow estático via CSS */}
              <Moon 
                className="h-[1.2rem] w-[1.2rem] text-indigo-400"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(129, 140, 248, 0.4))'
                }}
              />
              
              {/* Estrellas estáticas - sin animación para mejor rendimiento */}
              <div className="absolute inset-0 pointer-events-none">
                <span
                  className="absolute rounded-full bg-indigo-300/70"
                  style={{ width: 1.5, height: 1.5, top: '15%', left: '15%' }}
                />
                <span
                  className="absolute rounded-full bg-indigo-300/50"
                  style={{ width: 2, height: 2, top: '20%', right: '15%' }}
                />
                <span
                  className="absolute rounded-full bg-indigo-300/60"
                  style={{ width: 1.5, height: 1.5, bottom: '15%', right: '20%' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efecto ripple al click - simplificado */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        whileTap={{ 
          scale: 1.2, 
          opacity: 0.15,
        }}
        transition={{ duration: 0.15 }}
        style={{
          background: isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(99, 102, 241, 0.3)'
        }}
      />
    </Button>
  );
};

export default ThemeToggle;
