import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  startDelay?: number;
  cycleKey?: number;
  repeat?: boolean;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  text, 
  delay = 30,
  className = "",
  showCursor = true,
  startDelay = 0,
  cycleKey = 0,
  repeat = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const words = text.split(' ');

  // Función memoizada para manejar la escritura
  const handleTyping = useCallback(() => {
    if (currentIndex < words.length) {
      setDisplayText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, words]);

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
    if (isTyping && currentIndex < words.length) {
      // Usar una duración variable basada en la longitud de la palabra para un efecto más natural
      const typingDelay = delay * Math.max(1, words[currentIndex]?.length / 2);
      
      const timer = setTimeout(handleTyping, typingDelay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, delay, isTyping, handleTyping]);

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