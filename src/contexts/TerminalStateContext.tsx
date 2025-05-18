import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface TerminalStateContextProps {
  minimizedTerminals: string[];
  setMinimizedTerminals: React.Dispatch<React.SetStateAction<string[]>>;
  closedTerminals: string[];
  setClosedTerminals: React.Dispatch<React.SetStateAction<string[]>>;
  maximizedTerminals: string[];
  setMaximizedTerminals: React.Dispatch<React.SetStateAction<string[]>>;
  restoreTerminal: (id: string) => void;
}

// Valor por defecto del contexto
const defaultContext: TerminalStateContextProps = {
  minimizedTerminals: [],
  setMinimizedTerminals: () => {},
  closedTerminals: [],
  setClosedTerminals: () => {},
  maximizedTerminals: [],
  setMaximizedTerminals: () => {},
  restoreTerminal: () => {},
};

export const TerminalStateContext = createContext<TerminalStateContextProps>(defaultContext);

interface TerminalStateProviderProps {
  children: ReactNode;
}

export const TerminalStateProvider: React.FC<TerminalStateProviderProps> = ({ children }) => {
  const [minimizedTerminals, setMinimizedTerminals] = useState<string[]>([]);
  const [closedTerminals, setClosedTerminals] = useState<string[]>([]);
  const [maximizedTerminals, setMaximizedTerminals] = useState<string[]>([]);

  // Función para restaurar una terminal minimizada
  const restoreTerminal = (id: string) => {
    setMinimizedTerminals(prev => prev.filter(termId => termId !== id));
  };

  return (
    <TerminalStateContext.Provider
      value={{
        minimizedTerminals,
        setMinimizedTerminals,
        closedTerminals,
        setClosedTerminals,
        maximizedTerminals,
        setMaximizedTerminals,
        restoreTerminal,
      }}
    >
      {children}
    </TerminalStateContext.Provider>
  );
};
