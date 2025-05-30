import React, { useState, useEffect, useRef } from 'react';
import { Book, Laptop, Code, Users, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Efecto para seguimiento de mouse en las tarjetas
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, cardEl: HTMLDivElement) => {
      if (!cardEl) return;
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardEl.style.setProperty('--x', `${x}px`);
      cardEl.style.setProperty('--y', `${y}px`);
    };
    
    const cleanupListeners: Function[] = [];
    
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const onMove = (e: MouseEvent) => handleMouseMove(e, card);
      card.addEventListener('mousemove', onMove);
      cleanupListeners.push(() => card.removeEventListener('mousemove', onMove));
    });
    
    return () => cleanupListeners.forEach(fn => fn());
  }, []);
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // GSAP animation for the about section
  const aboutSectionRef = useGsapAnimation<HTMLElement>({
    trigger: true,
    start: 'top 80%',
    duration: 1,
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 }
  });
  
  // Separate animation for cards with staggered entrance
  const cardsContainerRef = useGsapAnimation<HTMLDivElement>({
    trigger: true,
    start: 'top 75%',
    delay: 0.2,
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    stagger: 0.1
  });
  
  // Animation for professional focus and specialization areas
  const infoSectionRef = useGsapAnimation<HTMLDivElement>({
    trigger: true,
    start: 'top 70%',
    duration: 0.8,
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 }
  });

  // Special animation for list items with emoji
  useEffect(() => {
    const listItems = document.querySelectorAll('.specialization-item');
    if (listItems.length > 0) {
      gsap.fromTo(
        listItems,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.specialization-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  // Handle expanded text animation with GSAP
  useEffect(() => {
    // Crear un timeline para mejor control de las animaciones
    const expandTl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: 'power3.out' }
    });
    
    const expandedTextElement = document.querySelector('.expanded-text');
    const gradientElement = document.querySelector('.text-gradient');
    
    if (isExpanded) {
      // Primero, asegurar que el texto sea visible pero con opacidad 0
      gsap.set(expandedTextElement, { display: 'block', opacity: 0, height: 0 });
      
      // Animar la apertura del texto
      expandTl
        .to(expandedTextElement, { 
          height: 'auto', 
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .to(expandedTextElement, { 
          opacity: 1, 
          y: 0,
          duration: 0.4
        }, '-=0.3')
        .to(gradientElement, {
          opacity: 0,
          duration: 0.3
        }, '-=0.4');
    } else if (expandedTextElement) {
      // Animar el cierre del texto
      expandTl
        .to(expandedTextElement, { 
          opacity: 0, 
          y: -10,
          duration: 0.3
        })
        .to(expandedTextElement, { 
          height: 0, 
          duration: 0.4,
          ease: 'power3.inOut'
        }, '-=0.2')
        .to(gradientElement, {
          opacity: 1,
          duration: 0.3
        }, '-=0.4')
        .set(expandedTextElement, { display: 'none' });
    }
    
    // Ejecutar la animación
    expandTl.play();
    
  }, [isExpanded]);

  return (
    <section 
      id="about" 
      ref={aboutSectionRef}
      className="section-padding mt-0 bg-gradient-to-b from-background to-background/95 text-foreground content-visibility-auto relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center gsap-item">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('aboutMe')}</h2>
          <div className="text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>{t('aboutDescription1')}</p>
            <p>{t('aboutDescription2')}</p>
            <p>{t('aboutDescription3')}</p>
          </div>
        </div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 perspective-card-container">
          <Card 
            ref={(el) => (cardRefs.current[0] = el)}
            className="premium-card group relative overflow-hidden bg-card/50 border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.1)]">
            <CardContent className="flex flex-col items-center p-6 text-center z-10 relative transition-all duration-500 group-hover:translate-y-[-8px]">
              <div className="relative mb-4 rounded-full bg-blue/10 p-3 transition-all duration-500 group-hover:bg-blue/20 group-hover:scale-110 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 before:translate-x-[-100%] group-hover:before:animate-shimmer">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <Code className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-all duration-500 group-hover:text-gradient-hover">{t('cardDevelopment')}</h3>
              <p className="text-sm text-muted-foreground transition-all duration-500">{t('cardDevelopmentDesc')}</p>
            </CardContent>
          </Card>

          <Card 
            ref={(el) => (cardRefs.current[1] = el)}
            className="premium-card group relative overflow-hidden bg-card/50 border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.1)]">
            <CardContent className="flex flex-col items-center p-6 text-center z-10 relative transition-all duration-500 group-hover:translate-y-[-8px]">
              <div className="relative mb-4 rounded-full bg-blue/10 p-3 transition-all duration-500 group-hover:bg-blue/20 group-hover:scale-110 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 before:translate-x-[-100%] group-hover:before:animate-shimmer">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <Laptop className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-all duration-500 group-hover:text-gradient-hover">{t('cardTech')}</h3>
              <p className="text-sm text-muted-foreground transition-all duration-500">{t('cardTechDesc')}</p>
            </CardContent>
          </Card>

          <Card 
            ref={(el) => (cardRefs.current[2] = el)}
            className="premium-card group relative overflow-hidden bg-card/50 border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.1)]">
            <CardContent className="flex flex-col items-center p-6 text-center z-10 relative transition-all duration-500 group-hover:translate-y-[-8px]">
              <div className="relative mb-4 rounded-full bg-blue/10 p-3 transition-all duration-500 group-hover:bg-blue/20 group-hover:scale-110 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 before:translate-x-[-100%] group-hover:before:animate-shimmer">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <Users className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-all duration-500 group-hover:text-gradient-hover">{t('cardCollab')}</h3>
              <p className="text-sm text-muted-foreground transition-all duration-500">{t('cardCollabDesc')}</p>
            </CardContent>
          </Card>

          <Card 
            ref={(el) => (cardRefs.current[3] = el)}
            className="premium-card group relative overflow-hidden bg-card/50 border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.1)]">
            <CardContent className="flex flex-col items-center p-6 text-center z-10 relative transition-all duration-500 group-hover:translate-y-[-8px]">
              <div className="relative mb-4 rounded-full bg-blue/10 p-3 transition-all duration-500 group-hover:bg-blue/20 group-hover:scale-110 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 before:translate-x-[-100%] group-hover:before:animate-shimmer">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <Book className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground transition-all duration-500 group-hover:text-gradient-hover">{t('cardLearning')}</h3>
              <p className="text-sm text-muted-foreground transition-all duration-500">{t('cardLearningDesc')}</p>
            </CardContent>
          </Card>
        </div>

        <div ref={infoSectionRef} className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('professionalFocus')}</h3>
            <div className="relative">
              <div className={`text-muted-foreground overflow-hidden transition-all duration-500 ease-in-out ${!isExpanded ? 'max-h-28' : 'max-h-[500px]'}`}>
                <p className="mb-4">
                  {t('focusDescription1')}
                </p>
                <p className="expanded-text">
                  {t('focusDescription2')}
                </p>
                <div className="text-gradient absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-300" style={{ opacity: isExpanded ? 0 : 1 }} />
              </div>
              <Button
                variant="ghost"
                className="btn-project mt-2 w-full group"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="text-gradient-hover">{isExpanded ? t('readLess') : t('readMore')}</span>
                <ChevronDown className={`ml-2 h-4 w-4 btn-icon-hover ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('specializationAreas')}</h3>
            <ul className="space-y-3 text-muted-foreground specialization-list">
              <li className="flex items-center gap-3 specialization-item">
                <span>💡</span>
                <span>{t('area1')}</span>
              </li>
              <li className="flex items-center gap-3 specialization-item">
                <span>⚡</span>
                <span>{t('area2')}</span>
              </li>
              <li className="flex items-center gap-3 specialization-item">
                <span>🐳</span>
                <span>{t('area3')}</span>
              </li>
              <li className="flex items-center gap-3 specialization-item">
                <span>☁️</span>
                <span>{t('area4')}</span>
              </li>
              <li className="flex items-center gap-3 specialization-item">
                <span>🔄</span>
                <span>{t('area5')}</span>
              </li>
              <li className="flex items-center gap-3 specialization-item">
                <span>🧠</span>
                <span>{t('area6')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          60% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .premium-card::before,
        .premium-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          transition: all 0.5s ease;
          opacity: 0;
        }
        
        .premium-card::before {
          z-index: -2;
          background: radial-gradient(
            800px circle at var(--x) var(--y),
            rgba(56, 189, 248, 0.12),
            transparent 40%
          );
        }
        
        .premium-card::after {
          z-index: -1;
          border: 1px solid transparent;
          background: linear-gradient(
            to bottom right,
            rgba(56, 189, 248, 0.3),
            rgba(236, 72, 153, 0.2),
            rgba(56, 189, 248, 0)
          ) border-box;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transform: scale(1.02);
        }
        
        .premium-card:hover::before,
        .premium-card:hover::after {
          opacity: 1;
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;

