import React from 'react';
import { cn } from '@/lib/utils';

interface MacOSWindowProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({ 
  children, 
  className,
  title 
}) => {
  return (
    <div className={cn("macos-window group", className)}>
      {/* Barra de título estilo macOS */}
      <div className="macos-window-titlebar">
        {/* Botones de semáforo */}
        <div className="macos-window-buttons">
          <div className="macos-btn macos-btn-close" />
          <div className="macos-btn macos-btn-minimize" />
          <div className="macos-btn macos-btn-maximize" />
        </div>
        
        {/* Título opcional */}
        {title && (
          <span className="macos-window-title">{title}</span>
        )}
      </div>
      
      {/* Contenido de la ventana */}
      <div className="macos-window-content">
        {children}
      </div>
    </div>
  );
};

export default MacOSWindow;
