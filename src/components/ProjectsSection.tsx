
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "Panel de administración para tienda online con análisis de datos en tiempo real, gestión de inventario y procesamiento de pedidos.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Sistema de Gestión de Proyectos",
    description: "Aplicación web para gestionar proyectos, tareas y colaboradores con chat en tiempo real y seguimiento de tiempo.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Aplicación de Finanzas Personales",
    description: "App para gestionar finanzas personales con visualización de datos, presupuestos, y análisis de gastos.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["React Native", "TypeScript", "Redux", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-dark">
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
            <Card key={project.id} className="project-card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
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
              
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-blue hover:text-blue-light">
                  <a href={project.githubUrl} className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    <Github size={16} /> Código
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-blue hover:text-blue-light">
                  <a href={project.liveUrl} className="flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue hover:bg-blue-dark text-white">
            Ver más proyectos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
