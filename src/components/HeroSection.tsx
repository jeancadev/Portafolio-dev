
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
      
      <div className="container mx-auto max-w-3xl text-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-6 animate-fade-in opacity-0 [animation-delay:0.2s]">
            <Avatar className="h-40 w-40 md:h-56 md:w-56 border-2 border-blue mb-4">
              <AvatarImage src="/lovable-uploads/f4c0ebed-84ca-4304-abb5-30ac1fdcd669.png" alt="Foto de perfil" />
              <AvatarFallback>JO</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-blue mb-1">Hola, soy</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                Desarrollador de Software
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in opacity-0 [animation-delay:0.4s]">
            Construyo aplicaciones modernas con tecnologías de vanguardia para crear experiencias digitales excepcionales.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6 animate-fade-in opacity-0 [animation-delay:0.6s]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-card/30 border border-muted/20">
              <span className="text-sm md:text-base text-muted-foreground">
                {email}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyEmail} 
                className="h-8 w-8 text-blue hover:text-blue-dark hover:bg-blue/10"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copiar email</span>
              </Button>
            </div>
            <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white gap-2" asChild>
              <a href={cvUrl} download>
                <Download className="h-4 w-4" />
                Descargar CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
