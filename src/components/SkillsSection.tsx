
import React from 'react';
import { Code, Database, Globe, Server } from 'lucide-react';

const SkillsSection = () => {
  const skillGroups = [
    {
      category: "Frontend",
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
      category: "Backend",
      icon: <Server className="w-8 h-8 mb-4 text-blue" />,
      skills: [
        "Node.js", 
        "Express", 
        "C#", 
        ".NET",
        "Python", 
        "SQL"
      ]
    },
    {
      category: "Otros",
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
            <div key={group.category} className="bg-muted/5 border border-muted/20 rounded-lg p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center">{group.icon}</div>
              <h3 className="text-xl font-bold mb-6 text-blue">{group.category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {group.skills.map((skill) => (
                  <div key={skill} className="px-4 py-2 bg-muted/10 border border-blue/20 rounded-full text-sm transition-all hover:bg-blue/20">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Herramientas & Entornos</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["VS Code", "Git", "GitHub", "Docker", "AWS", "Jest", "Cypress", "Figma", "Gitlab CI", "Azure"].map(tech => (
              <div key={tech} className="px-4 py-2 bg-muted/5 border border-muted/20 rounded-full text-sm hover:bg-blue/10 transition-all">
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
