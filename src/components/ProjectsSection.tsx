import React from 'react';
import { Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: "Game Management Platform",
    description: "Sistema robusto para gestión de partidas multijugador con autenticación JWT y comunicación en tiempo real vía SignalR. Implementa Clean Architecture y principios SOLID para garantizar un código mantenible y escalable.",
    image: "/lovable-uploads/f4c0ebed-84ca-4304-abb5-30ac1fdcd669.png",
    tags: ["ASP.NET Core 8.0", "Entity Framework Core", "Clean Architecture", "JWT", "SignalR", "Swagger"],
    githubUrl: "https://github.com/jeancadev/GameManagementPlatform-"
  },
  {
    id: 2,
    title: "Business Management",
    description: "Sistema CRUD empresarial optimizado con Clean Architecture y Docker. Gestiona clientes, productos, ventas e inventarios con autenticación JWT y seeding automático de datos para un despliegue rápido.",
    image: "/lovable-uploads/business-management-swagger.png",
    tags: ["C# .NET Core", "ASP.NET Core", "SQL Server", "Docker", "Entity Framework", "Clean Architecture"],
    githubUrl: "https://github.com/jeancadev/BusinessManagement"
  },
  {
    id: 3,
    title: "Real-Time Dashboard",
    description: "Dashboard interactivo full-stack para monitoreo de recursos en tiempo real. Integra frontend React con backend Python Flask, ofreciendo una solución profesional y escalable en contenedores Docker.",
    image: "/lovable-uploads/d0ad05af-09b3-4da0-a524-8344f8c9fc04.png",
    tags: ["React", "Python Flask", "Docker", "WebSocket", "CSS", "RESTful API"],
    githubUrl: "https://github.com/jeancadev/real-time-dashboard"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Proyectos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estos son algunos de los proyectos en los que he trabajado recientemente.
            Cada uno demuestra diferentes habilidades y tecnologías.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="project-card overflow-hidden group backdrop-blur-sm border border-muted/20 bg-card/30">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-blue/10 text-blue border-blue/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <Button variant="ghost" size="sm" className="text-blue hover:text-blue-light">
                  <a href={project.githubUrl} className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    <Github size={16} /> Ver Código
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue hover:bg-blue-dark text-white">
            <a href="https://github.com/jeancadev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={18} />
              Ver más proyectos
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
