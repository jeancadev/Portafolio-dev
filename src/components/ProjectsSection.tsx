import React, { useEffect, useRef } from 'react';
import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MacOSWindow from '@/components/ui/LaptopFrame';

const ProjectsSection = () => {
  const { t } = useTranslation();
  
  // Referencias para las animaciones
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
    
    const windowCards = projectsContainerRef.current.querySelectorAll('.project-window-card');
    // Animación con blur-in effect para todas las pantallas
    gsap.fromTo(windowCards,
      { 
        y: 60, 
        opacity: 0,
        scale: 0.92,
        filter: 'blur(10px)'
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Animación para el botón CTA
    if (ctaButtonRef.current) {
      gsap.fromTo(ctaButtonRef.current,
        { y: 30, opacity: 0, scale: 0.9, filter: 'blur(8px)' },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: 'top 90%',
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
      className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('featuredProjects')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription')}
          </p>
        </div>

        <div ref={projectsContainerRef} className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="project-window-card gsap-hidden flex flex-col">
              {/* Ventana macOS con proyecto */}
              <MacOSWindow title={project.title}>
                {/* Imagen del proyecto */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                />
                
                {/* Overlay con detalles del proyecto */}
                <div className="project-overlay">
                  <p className="project-overlay-description">{project.description}</p>
                  <div className="project-overlay-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-overlay-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </MacOSWindow>
              
              {/* Botón de GitHub debajo de la ventana */}
              <div className="mt-4 flex justify-center">
                <a 
                  href={project.githubUrl} 
                  className="btn-view-code inline-flex items-center gap-2 px-4 py-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="btn-view-code-icon" size={16} />
                  <span className="btn-view-code-text">{t('viewCode')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaButtonRef} className="mt-12 text-center">
          <a 
            href="https://github.com/jeancadev?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-send inline-flex items-center gap-2 px-6 py-3 rounded-lg"
          >
            <Github className="btn-icon-hover" size={18} />
            {t('viewMoreProjects')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
