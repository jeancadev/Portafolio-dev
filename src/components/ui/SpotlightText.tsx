import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightTextProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

const SpotlightText = ({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  spotlightSize = 250
}: SpotlightTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Layer - Dimmed/Muted Text */}
      <div className="relative z-10 text-muted-foreground/40 select-none">
        {children}
      </div>

      {/* Reveal Layer - Bright Text with Gradient Mask */}
      <div
        className="absolute inset-0 z-20 text-foreground select-none pointer-events-none"
        style={{
          maskImage: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, black, transparent)`,
          opacity: opacity,
          transition: 'opacity 300ms ease',
        }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-light via-white to-blue-light">
            {children}
        </span>
      </div>
      
       {/* Optional: Glow Effect underneath */}
       <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(${spotlightSize * 1.5}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent)`,
          opacity: opacity * 0.4, // Subtle glow
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  );
};

export default SpotlightText;
