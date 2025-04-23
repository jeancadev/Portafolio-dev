import React, { useState, useEffect } from 'react';

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
  }, [startDelay]);

  useEffect(() => {
    if (isTyping && currentIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay * words[currentIndex].length);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, words, delay, isTyping]);

  return (
    <span className={`${className} relative`}>
      {displayText}
      {showCursor && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-blue animate-blink-fast align-middle">
        </span>
      )}
    </span>
  );
};

export default TypewriterEffect;