import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  
  // Referencias para animaciones GSAP
  const sectionRef = useGsapAnimation<HTMLElement>({
    trigger: true,
    start: 'top 75%',
    duration: 0.8,
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 }
  });
  
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const formElementsRef = useRef<HTMLFormElement>(null);
  
  // Configurar animaciones con GSAP
  useEffect(() => {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación para las tarjetas optimizada para dispositivos móviles
    const cards = [formCardRef.current, infoCardRef.current];
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // En dispositivos móviles, simplemente establecer el estado final sin ScrollTrigger
      // para evitar problemas con el teclado virtual
      gsap.set(cards, { 
        y: 0, 
        opacity: 1,
        scale: 1
      });
    } else {
      // En dispositivos de escritorio, mantener la animación con ScrollTrigger
      gsap.fromTo(cards,
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 80%',
            toggleActions: 'play none reset reset'
          }
        }
      );
    }
    // Animación para los elementos del formulario
    if (formElementsRef.current) {
      const inputs = formElementsRef.current.querySelectorAll('input, textarea, button');
      
      gsap.fromTo(inputs,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.4
        }
      );
    }
    
    // Animación para los links de contacto
    const contactLinks = document.querySelectorAll('.contact-link');
    gsap.fromTo(contactLinks,
      { x: -20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1,
        stagger: 0.15,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.6
      }
    );
    
    // Pequeña animación de escala al hacer hover en los botones de redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.2, duration: 0.3, ease: 'back.out(1.5)' });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.2, ease: 'power1.out' });
      });
    });
    
    return () => {
      // Limpiar animaciones y eventos
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      socialLinks.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        'service_omeb98p',
        'template_aqc7rxa',
        e.currentTarget,
        'YtumYpqFiQvqJHsg0'
      );

      toast({
        title: t('messageSent'),
        description: t('messageSuccess'),
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: t('messageError'),
        description: t('tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('contact')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            ref={formCardRef}
            className="p-6 backdrop-blur-sm border border-muted/20 bg-card/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue/10">
            <form ref={formElementsRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  type="text" 
                  name="user_name"
                  placeholder={t('yourName')} 
                  required 
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  name="user_email"
                  placeholder={t('yourEmail')} 
                  required 
                />
              </div>
              <div>
                <Textarea 
                  name="message"
                  placeholder={t('yourMessage')} 
                  className="min-h-[120px]" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="btn-send w-full"
                disabled={isLoading}
              >
                {isLoading ? t('sending') : t('send')}
              </Button>
            </form>
          </Card>

          <Card 
            ref={infoCardRef}
            className="p-6 backdrop-blur-sm border border-muted/20 bg-card/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">{t('contactInfo')}</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:jean.obandocortes@gmail.com" 
                  className="contact-link flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1"
                >
                  <Mail size={20} className="text-blue" />
                  jean.obandocortes@gmail.com
                </a>
                
                <div className="flex gap-6">
                  <a 
                    href="https://github.com/jeancadev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link text-muted-foreground hover:text-blue transition-all duration-300 transform hover:scale-110 dark:hover:text-white hover:text-gray-900"
                  >
                    <Github size={28} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/jeancarlosobando/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link text-muted-foreground hover:text-blue transition-all duration-300 transform hover:scale-110 dark:hover:text-white hover:text-gray-900"
                  >
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
