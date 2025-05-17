import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import TypewriterEffect from './TypewriterEffect';
import Terminal from '@/components/ui/terminal';
import { useTranslation } from 'react-i18next';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';
import { gsap } from 'gsap';

const HeroSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const { t, i18n } = useTranslation();
  const [languageKey, setLanguageKey] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Use GSAP animation hook for the hero section
  const heroRef = useGsapAnimation<HTMLElement>({
    trigger: true,
    start: 'top 80%',
    end: 'bottom 20%',
    duration: 0.8,
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    ease: 'power3.out'
  });
  
  // State to track if the hero section is visible
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const email = "jean.obandocortes@gmail.com"; 
  const cvUrl = "/docs/CV_JeanCarlosObando.pdf";
  // Ya no necesitamos el restartDelay porque la reescritura se controlará con inView

  const description = "Especialista en desarrollo Full Stack con enfoque en arquitecturas modernas y soluciones escalables. Creo software que marca la diferencia, combinando excelencia técnica con innovación práctica.";

  // Set up ScrollTrigger to detect when the hero section is visible
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setCycleKey(prev => prev + 1);
          
          // Animate image entrance with elastic effect
          gsap.fromTo(
            '.hero-avatar',
            { scale: 0.8, opacity: 0, rotationY: -15 },
            { 
              scale: 1, 
              opacity: 1, 
              rotationY: 0, 
              duration: 1.2, 
              delay: 0.3,
              ease: 'elastic.out(1, 0.5)'
            }
          );
          
          // Crear la animación de flotación continua una vez que la imagen ha aparecido
          setTimeout(() => {
            // Limpiar cualquier animación previa
            gsap.killTweensOf('.hero-avatar');
            
            // Crear una animación de flotación suave con GSAP
            const floatTl = gsap.timeline({
              repeat: -1,  // Repetir infinitamente
              yoyo: true,  // Efecto ida y vuelta para suavidad
              ease: 'power1.inOut'
            });
            
            // Movimiento vertical suave
            floatTl.to('.hero-avatar', {
              y: '-12px',
              duration: 2.5,
              ease: 'sine.inOut'
            })
            .to('.hero-avatar', {
              y: '12px', 
              duration: 2.5,
              ease: 'sine.inOut'
            })
            .to('.hero-avatar', {
              y: '0px',
              duration: 2.5,
              ease: 'sine.inOut'
            });
            
            // Añadir una ligera rotación para más realismo
            const rotateTl = gsap.timeline({
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
            
            rotateTl.to('.hero-avatar', {
              rotateZ: '1deg',
              duration: 3.5
            })
            .to('.hero-avatar', {
              rotateZ: '-1deg',
              duration: 3.5
            });
          }, 1500); // Esperar a que termine la animación de entrada
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(heroRef.current);
    
    return () => {
      // Limpieza de animaciones al desmontar
      gsap.killTweensOf('.hero-avatar');
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

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
        title: t('emailCopied'),
        description: t('emailCopiedDesc'),
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center hero-section-padding pt-28 bg-background text-foreground"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <div className="space-y-4 gsap-item">{/* GSAP will animate this */}
              <Terminal title={`${t('welcome')}@portfolio ~ $`}>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-blue mr-2">$ </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight flex flex-col items-start gap-2">
                      <TypewriterEffect 
                        text={t('hello')}
                        delay={70}
                        showCursor={false}
                        startDelay={500}
                        repeat={false}
                        key={`hello-${languageKey}${isHeroVisible ? '-visible' : ''}-1`}
                        isVisible={isHeroVisible}
                      />
                      <TypewriterEffect 
                        text="Jean Carlos"
                        delay={70}
                        showCursor={false}
                        startDelay={1500}
                        repeat={false}
                        key={`name-${languageKey}${isHeroVisible ? '-visible' : ''}-2`}
                        isVisible={isHeroVisible}
                      />
                    </h1>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-blue mr-2">$ </span>
                    <div className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed text-left">
                      <TypewriterEffect 
                        text={t('description')}
                        delay={40}
                        showCursor={true}
                        startDelay={2500}
                        repeat={false}
                        key={`desc-${isHeroVisible ? 'visible' : 'hidden'}-${languageKey}`}
                        isVisible={isHeroVisible}
                      />
                    </div>
                  </div>
                </div>
              </Terminal>
              
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8 gsap-item">
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
                  className="btn-primary w-full md:w-auto group" 
                  asChild
                >
                  <a href={cvUrl} download>
                    <Download className="btn-icon-hover h-4 w-4" />
                    {t('downloadCV')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <Avatar className="hero-avatar h-48 w-48 md:h-64 md:w-64 border-2 border-blue 
                              transition-colors duration-500 ease-in-out 
                              hover:shadow-xl hover:shadow-blue/20
                              hover:border-4 transform-gpu will-change-transform">
              <AvatarImage 
                ref={imageRef}
                src="/profile/profile.jpg" 
                alt="Foto de perfil de Jean Carlos"
                className="stable-image"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
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

