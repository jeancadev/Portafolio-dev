
import React, { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const email = "jean.obandocortes@gmail.com"; 
  const cvUrl = "/cv.pdf";

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
    <section id="home" className="relative min-h-screen flex items-center justify-center section-padding pt-28 bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_80%)]"></div>
      
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side: Text content */}
          <div className="w-full md:w-3/5 animate-fade-in opacity-0 [animation-delay:0.2s]">
            <div className="space-y-6">
              <div className="text-left">
                <p className="text-blue mb-1 text-lg">Hola, soy</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Desarrollador de Software
                </h1>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
                Construyo aplicaciones modernas con tecnologías de vanguardia para crear experiencias digitales excepcionales.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-card/30 border border-muted/20">
                  <span className="text-sm md:text-base text-muted-foreground">
                    {email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={copyEmail} 
                    className="h-8 w-8 text-blue hover:text-blue-dark hover:bg-blue/10 cursor-hover-effect"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar email</span>
                  </Button>
                </div>
                <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white gap-2 cursor-hover-effect" asChild>
                  <a href={cvUrl} download>
                    <Download className="h-4 w-4" />
                    Descargar CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side: Avatar */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in opacity-0 [animation-delay:0.4s]">
            <Avatar className="h-48 w-48 md:h-64 md:w-64 border-2 border-blue cursor-hover-effect">
              <AvatarImage src="/lovable-uploads/f4c0ebed-84ca-4304-abb5-30ac1fdcd669.png" alt="Foto de perfil" />
              <AvatarFallback>JO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
