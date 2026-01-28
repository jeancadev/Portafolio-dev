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
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.03) 100%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.05) 100%)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Efecto de brillo sutil al hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Contenedor de iconos con AnimatePresence para transición suave */}
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                scale: 0.6, 
                rotate: -180,
                opacity: 0,
              }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
              }}
              exit={{ 
                scale: 0.6, 
                rotate: 180,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5
              }}
            >
              {/* Sol minimalista con brillo elegante */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    'drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))',
                    'drop-shadow(0 0 6px rgba(251, 191, 36, 0.6))',
                    'drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-400" />
              </motion.div>
              
              {/* Anillo de luz suave que pulsa */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.8, 1.4, 0.8]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <div className="w-5 h-5 rounded-full border border-amber-400/30" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                scale: 0.6, 
                rotate: 90,
                opacity: 0,
              }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
              }}
              exit={{ 
                scale: 0.6, 
                rotate: -90,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5
              }}
            >
              {/* Luna con brillo sutil */}
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 2px rgba(129, 140, 248, 0.3))',
                    'drop-shadow(0 0 5px rgba(129, 140, 248, 0.5))',
                    'drop-shadow(0 0 2px rgba(129, 140, 248, 0.3))'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
              </motion.div>
              
              {/* Estrellas elegantes que parpadean */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {[
                  { x: -9, y: -7, size: 1.5, delay: 0 },
                  { x: 9, y: -5, size: 2, delay: 0.5 },
                  { x: 7, y: 9, size: 1.5, delay: 1 },
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
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: star.delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efecto de pulso sutil al hacer click */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        whileTap={{ 
          scale: 1.3, 
          opacity: [0, 0.2, 0],
          transition: { duration: 0.3 }
        }}
        style={{
          background: isDark 
            ? 'rgba(251, 191, 36, 0.2)' 
            : 'rgba(99, 102, 241, 0.2)'
        }}
      />
    </Button>
  );
};

export default ThemeToggle;
