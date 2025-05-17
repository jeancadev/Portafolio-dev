import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  startDelay?: number;
  cycleKey?: number;
  repeat?: boolean;
  isVisible?: boolean;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  text, 
  delay = 300, // Delay significativamente más alto para una escritura más lenta y dramática
  className = "",
  showCursor = true,
  startDelay = 0,
  cycleKey = 0,
  repeat = false,
  isVisible = true
}) => {  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const characters = text.split('');

  // Función memoizada para manejar la escritura letra por letra
  const handleTyping = useCallback(() => {
    if (currentIndex < characters.length) {
      setDisplayText(prev => prev + characters[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, characters]);

  // Reiniciar solo si repeat es true y cycleKey cambia
  useEffect(() => {
    if (!repeat) return;
    
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
    
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [cycleKey, startDelay, repeat]);

  // Iniciar la primera vez
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);

      return () => clearTimeout(timer);
    }
  }, [startDelay, isTyping]);
  useEffect(() => {
    // Solo continuar la animación si el componente es visible
    if (isTyping && currentIndex < characters.length && isVisible) {
      // Simulación más realista de escritura humana
      const currentChar = characters[currentIndex];
      
      // Factores que afectan la velocidad:
      // 1. Pausa más larga después de signos de puntuación
      // 2. Pausa más corta entre letras normales
      // 3. Variación aleatoria para simular ritmo humano
      const isPunctuation = /[.,!?]/.test(currentChar);
      const isSpace = currentChar === ' ';
      const randomVariation = Math.random() * 0.4 + 0.8; // Variación entre 0.8x y 1.2x
      
      let typingDelay;
      if (isPunctuation) {
        typingDelay = delay * 3 * randomVariation; // Pausa más larga después de puntuación
      } else if (isSpace) {
        typingDelay = delay * 1.5 * randomVariation; // Pausa media en espacios
      } else {
        typingDelay = delay * randomVariation; // Velocidad normal para letras
      }
      
      const timer = setTimeout(handleTyping, typingDelay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, characters, delay, isTyping, handleTyping, isVisible]);

  return (
    <span className={`${className} relative will-change-contents`}>
      {displayText}
      {showCursor && isTyping && (
        <span 
          className="inline-block w-0.5 h-5 ml-1 bg-blue animate-blink-fast align-middle"
          style={{ 
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
        </span>
      )}
    </span>
  );
};

export default TypewriterEffect;