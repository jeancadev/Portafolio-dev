
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 bg-card/30 text-foreground border-t border-muted/10 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {currentYear} Portfolio. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#home" className="text-muted-foreground hover:text-blue transition-colors">
              Inicio
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-blue transition-colors">
              Proyectos
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-blue transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
