import React, { useEffect, useRef } from 'react';
import { Code, Database, Globe, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ToolHoverCard } from './ui/tool-hover-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const SkillsSection = () => {
  const { t } = useTranslation();
  
  // Referencias para animaciones GSAP - definimos la sección como visible por defecto
  const sectionRef = useRef<HTMLElement>(null);
  
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const toolsTitleRef = useRef<HTMLHeadingElement>(null);
  
  // Configurar animaciones avanzadas con GSAP
  useEffect(() => {
    // Al cargar, asegurarse de que la sección sea visible primero
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
    }
    
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones para las tarjetas de habilidades
    if (skillCardsRef.current) {
      const skillCards = skillCardsRef.current.querySelectorAll('.skill-card');
      
      // Primero, asegurarse de que las tarjetas estén inicialmente ocultas
      gsap.set(skillCards, { y: 60, opacity: 0, scale: 0.9 });
      
      // Crear un pequeño retraso antes de iniciar la animación
      setTimeout(() => {
        gsap.to(skillCards, 
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillCardsRef.current,
              start: 'top 85%',
              // Que solo se animen una vez al cargar inicialmente
              once: true
            }
          }
        );
      }, 300);
    }
    
    // Animación para el título de herramientas
    if (toolsTitleRef.current) {
      // Establecer estado inicial
      gsap.set(toolsTitleRef.current, { opacity: 0, y: 20 });
      
      // Animar hacia el estado final
      gsap.to(toolsTitleRef.current, {
        opacity: 1, 
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: toolsTitleRef.current,
          start: 'top 80%',
          // toggleActions: play(onEnter) none(onLeave) none(onEnterBack) reverse(onLeaveBack)
          // Esto hace que la animación se reproduzca cada vez que el elemento entra en la vista
          // y se revierta cuando sale de la vista hacia arriba
          toggleActions: 'play none none reverse'
        }
      });
    }
    
    // Animación para las etiquetas de herramientas
    if (toolsContainerRef.current) {
      const toolItems = toolsContainerRef.current.querySelectorAll('.tool-item');
      
      // Establecer estado inicial
      gsap.set(toolItems, { 
        opacity: 0, 
        y: 15,
        scale: 0.8
      });
      
      // Animar hacia el estado final
      gsap.to(toolItems, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: toolsContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    
    return () => {
      // Limpiar las animaciones al desmontar
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const skillGroups = [
    {
      category: t("frontend"),
      icon: <Globe className="w-8 h-8 mb-4 text-blue" />,
      skills: [
        "JavaScript", 
        "TypeScript", 
        "React", 
        "Vue.js", 
        "Tailwind CSS", 
        "Astro"
      ]
    },
    {
      category: t("backend"),
      icon: <Server className="w-8 h-8 mb-4 text-blue" />,
      skills: [
        "Node.js", 
        "Express", 
        "Java",
        "C#", 
        ".NET",
        "Python", 
        "SQL"
      ]
    },
    {
      category: t("others"),
      icon: <Code className="w-8 h-8 mb-4 text-blue" />,
      skills: [
        "Git", 
        "Docker", 
        "AWS", 
        "Jest", 
        "CI/CD"
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-background/95 to-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('mySkills')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </div>

        <div ref={skillCardsRef} className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div 
              key={group.category} 
              className="skill-card bg-card/30 border border-muted/20 rounded-lg p-5 md:p-6 backdrop-blur-sm text-center
                       transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue/10
                       hover:border-blue/30 group"
            >
              <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-5 md:mb-6 text-blue transform transition-all duration-300 group-hover:scale-125 group-hover:tracking-wider">{group.category}</h3>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {group.skills.map((skill) => (
                  <div 
                    key={skill} 
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-card/50 border border-blue/20 rounded-full 
                             text-xs md:text-sm transition-all hover:bg-blue/20 hover:scale-105"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <h3 ref={toolsTitleRef} className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-center text-foreground">{t('tools')}</h3>
          <div ref={toolsContainerRef} className="flex flex-wrap justify-center gap-3 md:gap-4">            {["VS Code", "Visual Studio", "Cursor", "Git", "GitHub", "GitHub Copilot", "ChatGPT", "Docker", "AWS", "Jest", "Cypress", "Figma", "Gitlab CI", "Azure", "Claude", "Gemini"].map(tech => (
              <ToolHoverCard key={tech} tool={tech}>
                <div className="tool-item px-3 py-1.5 sm:px-4 sm:py-2 bg-card/30 border border-muted/20 rounded-full text-xs sm:text-sm 
                            transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-blue/20 
                            hover:border-blue/30 hover:text-blue hover:shadow-lg touch-manipulation"
                >
                  {tech}
                </div>
              </ToolHoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

