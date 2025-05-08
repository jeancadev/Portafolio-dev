import React from 'react';
import '@/styles/terminal.css';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
}

const Terminal = ({ title = "usuario@portfolio ~ %", children }: TerminalProps) => {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button terminal-close" />
          <div className="terminal-button terminal-minimize" />
          <div className="terminal-button terminal-maximize" />
        </div>
        <div className="terminal-title">{title}</div>
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