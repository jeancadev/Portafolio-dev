import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import TypewriterEffect from './TypewriterEffect';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const { t, i18n } = useTranslation();
  const [languageKey, setLanguageKey] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const email = "jean.obandocortes@gmail.com"; 
  const cvUrl = "/docs/JeanCarlosCV.pdf";
  const restartDelay = 25000; // Aumentado a 25 segundos para dar más tiempo de lectura

  const description = "Especialista en desarrollo Full Stack con enfoque en arquitecturas modernas y soluciones escalables. Creo software que marca la diferencia, combinando excelencia técnica con innovación práctica.";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCycleKey(prev => prev + 1);
    }, restartDelay);

    return () => clearInterval(intervalId);
  }, [restartDelay]);

  // Efecto para detectar cambios de idioma
  useEffect(() => {
    setLanguageKey(prev => prev + 1);
  }, [i18n.language]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.decode().catch(() => {
        // Manejo silencioso del error si la imagen falla al decodificar
      });
    }
  }, []);

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
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-4 animate-fade-in opacity-0 [animation-delay:0.2s]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <TypewriterEffect 
                  text={t('hello')}
                  delay={30}
                  showCursor={false}
                  startDelay={0}
                  repeat={false}
                  key={`hello-${languageKey}`}
                />
                <br />
                <span className="text-blue">
                  <TypewriterEffect 
                    text="Jean Carlos"
                    delay={30}
                    showCursor={false}
                    startDelay={1000}
                    repeat={false}
                    key={`name-${languageKey}`}
                  />
                </span>
              </h1>
              
              <div className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed mt-6">
                <TypewriterEffect 
                  text={t('description')}
                  delay={30}
                  showCursor={true}
                  startDelay={2000}
                  cycleKey={cycleKey}
                  repeat={true}
                  key={`desc-${languageKey}`}
                />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                <div className="w-full md:w-auto">
                  <div className="flex items-center justify-center md:justify-start gap-2 px-4 py-2 rounded-md bg-card/30 border border-muted/20">
                    <span className="text-sm md:text-base text-muted-foreground">
                      {email}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={copyEmail} 
                      className="h-8 w-8 text-blue hover:text-blue-dark hover:bg-blue/10 
                               transition-all duration-300 hover:scale-110 hover:rotate-12 
                               active:scale-95 focus:ring-2 focus:ring-blue/40"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copiar email</span>
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full md:w-auto border-blue text-blue hover:bg-blue hover:text-white gap-2" 
                  asChild
                >
                  <a href={cvUrl} download>
                    <Download className="h-4 w-4" />
                    {t('downloadCV')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in opacity-0 [animation-delay:0.4s]">
            <Avatar className="h-48 w-48 md:h-64 md:w-64 border-2 border-blue 
                             transition-all duration-300 ease-in-out 
                             hover:scale-105 hover:shadow-xl hover:shadow-blue/20
                             hover:border-4">
              <AvatarImage 
                ref={imageRef}
                src="/profile/profile.jpg" 
                alt="Foto de perfil de Jean Carlos"
                className="transition-all duration-300 ease-in-out hover:brightness-110"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  willChange: 'transform'
                }}
              />
              <AvatarFallback>
                <div className="animate-pulse bg-muted rounded-full w-full h-full" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

