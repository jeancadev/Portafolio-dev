import React, { useEffect, useRef } from 'react';
import { Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const ProjectsSection = () => {
  const { t } = useTranslation();
  
  // Referencias para las animaciones - definimos la sección como visible por defecto
  const sectionRef = useRef<HTMLElement>(null);
  
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  
  // Configurar animaciones para las tarjetas de proyectos
  useEffect(() => {
    // Al cargar, asegurarse de que la sección sea visible primero
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
    }
    
    if (!projectsContainerRef.current) return;
    
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Primero, asegurarse de que las tarjetas estén ocultas
    const projectCards = projectsContainerRef.current.querySelectorAll('.project-card');
    gsap.set(projectCards, { y: 50, opacity: 0, scale: 0.95 });
    
    // Crear un pequeño retraso antes de iniciar la animación
    setTimeout(() => {
      // Animación de entrada para cada tarjeta con desplazamiento escalonado
      gsap.to(projectCards, 
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }, 300);
    
    // Animación para el botón CTA
    if (ctaButtonRef.current) {
      gsap.fromTo(ctaButtonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.6,
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    return () => {
      // Limpiar las animaciones
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Game Management Platform",
      description: t('gameManagementDesc'),
      image: "/projects/proyecto2.png",
      tags: ["ASP.NET Core 8.0", "Entity Framework Core", "Clean Architecture", "JWT", "SignalR", "Swagger"],
      githubUrl: "https://github.com/jeancadev/GameManagementPlatform-"
    },
    {
      id: 2,
      title: "Business Management",
      description: t('businessManagementDesc'),
      image: "/projects/proyecto.png",
      tags: ["C# .NET Core", "ASP.NET Core", "SQL Server", "Docker", "Entity Framework", "Clean Architecture"],
      githubUrl: "https://github.com/jeancadev/BusinessManagement"
    },
    {
      id: 3,
      title: "Real-Time Dashboard",
      description: t('dashboardDesc'),
      image: "/projects/proyecto3.png",
      tags: ["React", "Python Flask", "Docker", "WebSocket", "CSS", "RESTful API"],
      githubUrl: "https://github.com/jeancadev/real-time-dashboard"
    }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding content-visibility-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('featuredProjects')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription')}
          </p>
        </div>

        <div ref={projectsContainerRef} className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="project-card flex flex-col h-full group backdrop-blur-sm border border-muted/20 bg-card/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue/10">
              <div className="relative h-[200px] md:h-[250px] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              </div>
              
              <CardHeader className="flex-none">
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-3 md:line-clamp-4">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="bg-blue/10 text-blue border-blue/20 text-xs py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex-none mt-auto">
                <Button variant="ghost" size="sm" className="btn-project w-full group">
                  <a 
                    href={project.githubUrl} 
                    className="flex items-center justify-center gap-2 w-full text-gradient-hover" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="btn-icon-hover" size={16} /> {t('viewCode')}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div ref={ctaButtonRef} className="mt-12 text-center">
          <Button className="btn-send group">
            <a 
              href="https://github.com/jeancadev?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2"
            >
              <Github className="btn-icon-hover" size={18} />
              {t('viewMoreProjects')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
