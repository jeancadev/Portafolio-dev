
import React from 'react';
import { Progress } from '@/components/ui/progress';

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 75 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "SQL", level: 75 },
      { name: "MongoDB", level: 85 },
      { name: "GraphQL", level: 70 }
    ]
  },
  {
    category: "Otros",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Jest", level: 80 },
      { name: "CI/CD", level: 75 }
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-dark/95 to-dark">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Mis Habilidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Me especializo en tecnologías modernas para el desarrollo de aplicaciones web y móviles.
            Estoy constantemente aprendiendo y actualizando mis habilidades.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="bg-muted/5 border border-muted/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-blue">{group.category}</h3>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-muted/20" indicatorClassName="bg-blue" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Tecnologías y herramientas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["JavaScript", "TypeScript", "React", "Vue.js", "Node.js", "Express", "MongoDB", "PostgreSQL", 
              "GraphQL", "Docker", "AWS", "Git", "GitHub", "Jest", "Cypress", "Figma", "Tailwind", "Redux"].map(tech => (
              <div key={tech} className="px-4 py-2 bg-muted/5 border border-muted/20 rounded-md text-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
