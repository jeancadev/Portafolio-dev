
import React, { useState } from 'react';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const email = "email@example.com"; // Cambia esto por tu email real
  const cvUrl = "/cv.pdf"; // Cambia esto por la ruta a tu CV

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      toast({
        title: "¡Email copiado!",
        description: `${email} ha sido copiado al portapapeles.`,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_80%)]"></div>
      
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 animate-fade-in opacity-0 [animation-delay:0.2s]">
              <Avatar className="h-16 w-16 md:h-24 md:w-24 border-2 border-blue">
                <AvatarImage src="/placeholder.svg" alt="Foto de perfil" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-blue mb-1">Hola, soy</p>
                <h1 className="text-3xl md:text-5xl font-bold">
                  Desarrollador de Software
                </h1>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground mb-6 max-w-md animate-fade-in opacity-0 [animation-delay:0.4s]">
              Construyo aplicaciones modernas con tecnologías de vanguardia para crear experiencias digitales excepcionales.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 animate-fade-in opacity-0 [animation-delay:0.6s]">
              <Button className="bg-blue hover:bg-blue-dark text-white gap-2" onClick={copyEmail}>
                <Mail className="h-4 w-4" />
                {copied ? "¡Copiado!" : "Copiar Email"}
              </Button>
              <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white gap-2" asChild>
                <a href={cvUrl} download>
                  <Download className="h-4 w-4" />
                  Descargar CV
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0 [animation-delay:0.8s]">
              <Button className="bg-blue hover:bg-blue-dark text-white">
                <a href="#projects">Ver proyectos</a>
              </Button>
              <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white">
                <a href="#contact">Contáctame</a>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center animate-fade-in opacity-0 [animation-delay:1s]">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-blue/20 blur-3xl"></div>
              <div className="relative z-10 w-full h-full rounded-full border-2 border-blue/20 flex items-center justify-center overflow-hidden bg-dark">
                <div className="w-full h-full bg-gradient-to-br from-blue/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-blue/20">&lt;/&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-blue transition-colors" 
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2">Scroll</span>
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
