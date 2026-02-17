import { useEffect, useRef } from 'react';
import { Code, Globe, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoLoop from './ui/LogoLoop';
import type { LogoItem } from './ui/LogoLoop';

// react-icons
import {
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiOpenai,
  SiDocker,
  SiAmazonwebservices,
  SiJest,
  SiCypress,
  SiFigma,
  SiGitlab,
  SiClaude,
  SiGooglegemini,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { DiVisualstudio } from 'react-icons/di';
import { TbBrandAzure, TbCursorText } from 'react-icons/tb';

// Logos de herramientas para el LogoLoop (con colores de marca y enlaces)
const toolLogos: LogoItem[] = [
  { node: <VscVscode />, title: "VS Code", brandColor: "#007ACC", href: "https://code.visualstudio.com/" },
  { node: <DiVisualstudio />, title: "Visual Studio", brandColor: "#5C2D91", href: "https://visualstudio.microsoft.com/" },
  { node: <TbCursorText />, title: "Cursor", brandColor: "#00D1B2", href: "https://cursor.sh/" },
  { node: <SiGit />, title: "Git", brandColor: "#F05032", href: "https://git-scm.com/" },
  { node: <SiGithub />, title: "GitHub", brandColor: "#181717", href: "https://github.com/" },
  { node: <SiGithubcopilot />, title: "GitHub Copilot", brandColor: "#8957E5", href: "https://github.com/features/copilot" },
  { node: <SiOpenai />, title: "ChatGPT", brandColor: "#412991", href: "https://openai.com/chatgpt" },
  { node: <SiDocker />, title: "Docker", brandColor: "#2496ED", href: "https://www.docker.com/" },
  { node: <SiAmazonwebservices />, title: "AWS", brandColor: "#FF9900", href: "https://aws.amazon.com/" },
  { node: <SiJest />, title: "Jest", brandColor: "#C21325", href: "https://jestjs.io/" },
  { node: <SiCypress />, title: "Cypress", brandColor: "#69D3A7", href: "https://www.cypress.io/" },
  { node: <SiFigma />, title: "Figma", brandColor: "#F24E1E", href: "https://www.figma.com/" },
  { node: <SiGitlab />, title: "GitLab CI", brandColor: "#FC6D26", href: "https://about.gitlab.com/" },
  { node: <TbBrandAzure />, title: "Azure", brandColor: "#0078D4", href: "https://azure.microsoft.com/" },
  { node: <SiClaude />, title: "Claude", brandColor: "#D97757", href: "https://claude.ai/" },
  { node: <SiGooglegemini />, title: "Gemini", brandColor: "#8E75B2", href: "https://deepmind.google/technologies/gemini/" },
];

const SkillsSection = () => {
  const { t } = useTranslation();
  
  // Referencias para animaciones GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const toolsTitleRef = useRef<HTMLHeadingElement>(null);
  const toolsLoopRef = useRef<HTMLDivElement>(null);
  
  // Configurar animaciones avanzadas con GSAP
  useEffect(() => {
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones para las tarjetas de habilidades
    if (skillCardsRef.current) {
      const skillCards = skillCardsRef.current.querySelectorAll('.skill-card');
      
      gsap.fromTo(skillCards,
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.92,
          force3D: true,
          willChange: 'transform, opacity'
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          force3D: true,
          onComplete: () => gsap.set(skillCards, { clearProps: 'willChange' }),
          scrollTrigger: {
            trigger: skillCardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Animación para el título de herramientas
    if (toolsTitleRef.current) {
      gsap.set(toolsTitleRef.current, { opacity: 0, y: 20 });
      
      gsap.to(toolsTitleRef.current, {
        opacity: 1, 
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: toolsTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Animación para el contenedor del LogoLoop
    if (toolsLoopRef.current) {
      gsap.set(toolsLoopRef.current, { opacity: 0, y: 20 });
      
      gsap.to(toolsLoopRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: toolsLoopRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    
    return () => {
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
      className="section-padding text-foreground">
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
              className="skill-card gsap-hidden bg-card/25 border border-muted/15 rounded-xl p-5 md:p-6 text-center
                       transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.18)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-xl hover:shadow-blue/10
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
                             text-xs md:text-sm transition-all hover:bg-blue/20 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
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
          <div ref={toolsLoopRef} className="relative py-4 md:py-6">
            <LogoLoop
              logos={toolLogos}
              speed={80}
              direction="left"
              logoHeight={36}
              gap={48}
              scaleOnHover
              ariaLabel="Herramientas y entornos de desarrollo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

