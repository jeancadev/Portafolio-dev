import React from 'react';
import { Code, Database, Globe, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillsSection = () => {
  const { t } = useTranslation();
  
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
        "Java",
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
    <section id="skills" className="section-padding bg-gradient-to-b from-background/95 to-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('mySkills')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div 
              key={group.category} 
              className="bg-card/30 border border-muted/20 rounded-lg p-5 md:p-6 backdrop-blur-sm text-center
                       transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue/10
                       hover:border-blue/30 group"
            >
              <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-5 md:mb-6 text-blue">{group.category}</h3>
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
          <h3 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-center text-foreground">{t('tools')}</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["VS Code", "Visual Studio", "Cursor", "Git", "GitHub", "GitHub Copilot", "ChatGPT", "Docker", "AWS", "Jest", "Cypress", "Figma", "Gitlab CI", "Azure", "Claude", "Gemini"].map(tech => (
              <div 
                key={tech} 
                className="px-4 py-2 bg-card/30 border border-muted/20 rounded-full text-sm 
                          transition-all duration-300 hover:scale-110 hover:bg-blue/20 
                          hover:border-blue/30 hover:text-blue hover:shadow-lg cursor-pointer"
              >
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
