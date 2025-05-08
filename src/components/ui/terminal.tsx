import React from 'react';
import '@/styles/terminal.css';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
}

const Terminal = ({ title = "usuario@portfolio ~ %", children }: TerminalProps) => {
  return (
    <div className="terminal">      <div className="terminal-header backdrop-blur-md bg-gradient-to-b from-card/50 to-card/30 border-b border-blue/20">
        <div className="terminal-buttons">
          <div className="terminal-button terminal-close hover:scale-110 transition-transform" />
          <div className="terminal-button terminal-minimize hover:scale-110 transition-transform" />
          <div className="terminal-button terminal-maximize hover:scale-110 transition-transform" />
        </div>
        <div className="terminal-title text-blue-foreground/70">{title}</div>
      </div>
      <div className="terminal-body">
        <div className="terminal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Terminal;