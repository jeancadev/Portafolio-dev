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
      // Velocidad variable basada en varios factores para simular escritura humana
      const word = words[currentIndex];
      const wordLength = word?.length || 1;
      
      // Factores que afectan la velocidad:
      // 1. Longitud de la palabra (palabras más largas toman más tiempo)
      // 2. Pequeña variación aleatoria para simular ritmo humano
      // 3. Pausa más larga después de signos de puntuación
      const hasPunctuation = /[.,!?]$/.test(word || '');
      const randomVariation = Math.random() * 0.5 + 0.75; // Variación entre 0.75x y 1.25x
      const punctuationDelay = hasPunctuation ? 2.5 : 1;
      
      const typingDelay = delay * Math.min(2, wordLength / 3) * randomVariation * punctuationDelay;
      
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