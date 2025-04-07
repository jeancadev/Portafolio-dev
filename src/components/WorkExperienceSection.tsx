
import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    id: 1,
    position: "Desarrollador Frontend Senior",
    company: "Tech Solutions Inc.",
    period: "2021 - Presente",
    description: "Desarrollo de aplicaciones web utilizando React y TypeScript. Liderazgo en la implementación de nuevas funcionalidades y optimización del rendimiento de las aplicaciones.",
    achievements: [
      "Reduje el tiempo de carga de la aplicación principal en un 40%",
      "Implementé un sistema de CI/CD que redujo los errores en producción en un 25%",
      "Mentoría a desarrolladores junior del equipo"
    ],
    technologies: ["React", "TypeScript", "Redux", "Tailwind CSS", "Jest"]
  },
  {
    id: 2,
    position: "Desarrollador Full Stack",
    company: "Digital Innovations",
    period: "2019 - 2021",
    description: "Desarrollo de soluciones web completas utilizando el stack MERN. Participación en todas las fases del ciclo de desarrollo de software.",
    achievements: [
      "Creé una API RESTful para integración con múltiples servicios",
      "Desarrollé una arquitectura escalable para el crecimiento de la plataforma",
      "Implementé pruebas automatizadas que aumentaron la cobertura de código al 85%"
    ],
    technologies: ["Node.js", "Express", "MongoDB", "React", "AWS"]
  },
  {
    id: 3,
    position: "Desarrollador Frontend Junior",
    company: "WebCreate Studio",
    period: "2018 - 2019",
    description: "Desarrollo de interfaces de usuario y componentes para aplicaciones web utilizando JavaScript y frameworks frontend.",
    achievements: [
      "Desarrollé componentes reutilizables que aceleraron el desarrollo de nuevas páginas",
      "Colaboré en la migración de jQuery a React",
      "Optimicé el rendimiento en dispositivos móviles"
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "React", "SASS"]
  }
];

const WorkExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-dark to-dark/95">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Experiencia Laboral</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria profesional y los roles que he desempeñado en el sector tecnológico.
          </p>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-blue/20 md:ml-5">
          {experiences.map((job, index) => (
            <div key={job.id} className={`relative md:flex ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-8`}>
              <div className="absolute left-0 top-8 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-blue bg-dark text-blue md:static md:translate-x-0">
                <Briefcase size={18} />
              </div>

              <Card className={`md:w-1/2 bg-muted/5 border-muted/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue/10 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xl">{job.position}</CardTitle>
                      <CardDescription className="text-lg font-medium text-blue">{job.company}</CardDescription>
                    </div>
                    <Badge className="bg-muted/20 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {job.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Logros destacados:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-blue/10 text-blue border-blue/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
