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
      {/* Fondo animado que cambia con el tema */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(249, 115, 22, 0.08) 100%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Efecto de brillo al hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.2) 0%, transparent 60%)'
            : 'radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Contenedor de iconos con AnimatePresence para transición suave */}
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                scale: 0.5, 
                rotate: -90,
                opacity: 0,
              }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
              }}
              exit={{ 
                scale: 0.5, 
                rotate: 90,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4
              }}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
              {/* Rayos del sol animados */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-0.5 h-1 bg-yellow-400/60 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: 'center',
                    }}
                    initial={{ 
                      transform: `rotate(${i * 45}deg) translateY(-12px) scaleY(0)`,
                      opacity: 0 
                    }}
                    animate={{ 
                      transform: `rotate(${i * 45}deg) translateY(-12px) scaleY(1)`,
                      opacity: 0.7 
                    }}
                    transition={{ 
                      delay: 0.1 + i * 0.03,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 400
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                scale: 0.5, 
                rotate: 90,
                opacity: 0,
              }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
              }}
              exit={{ 
                scale: 0.5, 
                rotate: -90,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4
              }}
            >
              <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
              {/* Estrellas animadas alrededor de la luna */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {[
                  { x: -8, y: -8, size: 2, delay: 0.1 },
                  { x: 10, y: -6, size: 1.5, delay: 0.15 },
                  { x: 8, y: 8, size: 2, delay: 0.2 },
                  { x: -6, y: 10, size: 1.5, delay: 0.25 },
                ].map((star, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-indigo-300"
                    style={{
                      width: star.size,
                      height: star.size,
                      top: '50%',
                      left: '50%',
                      marginLeft: star.x,
                      marginTop: star.y,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 0.8]
                    }}
                    transition={{ 
                      delay: star.delay,
                      duration: 0.4,
                      times: [0, 0.6, 1]
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efecto de pulso al hacer click */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileTap={{ 
          scale: 1.5, 
          opacity: [0, 0.3, 0],
          transition: { duration: 0.4 }
        }}
        style={{
          background: isDark 
            ? 'rgba(251, 191, 36, 0.3)' 
            : 'rgba(99, 102, 241, 0.3)'
        }}
      />
    </Button>
  );
};

export default ThemeToggle;
