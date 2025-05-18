import React, { useContext } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import CustomCursor from './components/CustomCursor';
import './i18n/i18n';
import './styles/smooth-scroll.css';
import MacOSDock from '@/components/ui/MacOSDock';
import TerminalLauncher from '@/components/ui/TerminalLauncher';
import { TerminalStateProvider, TerminalStateContext } from '@/contexts/TerminalStateContext';
import '@/styles/terminal-launcher.css';

const queryClient = new QueryClient();

const App = () => {
  // Componente interno para usar el contexto TerminalState dentro de TerminalStateProvider
  const TerminalComponentsWithContext = () => {
    const { minimizedTerminals, restoreTerminal, closedTerminals } = useContext(TerminalStateContext);
    
    // Crear elementos para el dock basados en terminales minimizadas
    const dockItems = minimizedTerminals.map(id => ({
      id,
      icon: '/icons/terminal-icon.svg',
      title: id === 'hero-terminal' ? 'Terminal de Perfil' : 'Terminal',
      isMinimized: true,
      onRestore: () => restoreTerminal(id)
    }));
    
    return (
      <>
        {/* Dock para terminales minimizadas */}
        {dockItems.length > 0 && <MacOSDock items={dockItems} />}
        
        {/* Botón flotante para reabrir la terminal si fue cerrada */}
        <TerminalLauncher 
          terminalId="hero-terminal" 
          position="bottom-left" 
        />
      </>
    );
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TerminalStateProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* <CustomCursor /> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <TerminalComponentsWithContext />
        </TooltipProvider>
      </TerminalStateProvider>
    </QueryClientProvider>
  );
};

export default App;
