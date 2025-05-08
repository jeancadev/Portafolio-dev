import React from 'react';
import { Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const { t } = useTranslation();

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
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('featuredProjects')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="project-card flex flex-col h-full group backdrop-blur-sm border border-muted/20 bg-card/30">
              <div className="relative h-[250px] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              </div>
              
              <CardHeader className="flex-none">
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-4">
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
                <Button variant="ghost" size="sm" className="w-full text-blue hover:text-blue-light">
                  <a 
                    href={project.githubUrl} 
                    className="flex items-center justify-center gap-2 w-full" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={16} /> {t('viewCode')}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue hover:bg-blue-dark text-white view-more-btn">
            <a 
              href="https://github.com/jeancadev?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2"
            >
              <Github size={18} />
              {t('viewMoreProjects')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
