import React, { useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import useTooltipAnimation from '@/hooks/use-tooltip-animation';

interface ToolHoverCardProps {
  tool: string;
  children: React.ReactNode;
}

interface ToolDescriptions {
  [key: string]: {
    es: {
      description: string;
      proficiency: string;
    };
    en: {
      description: string;
      proficiency: string;
    };
  };
}

const toolDescriptions: ToolDescriptions = {
  "VS Code": {
    es: {
      description: "Mi editor de código principal. Lo uso por su extensibilidad y potentes características de desarrollo.",
      proficiency: "Experto en personalización y extensiones para optimizar el flujo de trabajo."
    },
    en: {
      description: "My main code editor. I use it for its extensibility and powerful development features.",
      proficiency: "Expert in customization and extensions to optimize workflow."
    }
  },
  "Visual Studio": {
    es: {
      description: "IDE robusto que utilizo para desarrollo en .NET y aplicaciones empresariales.",
      proficiency: "Dominio avanzado en depuración y desarrollo de aplicaciones enterprise."
    },
    en: {
      description: "Robust IDE I use for .NET development and enterprise applications.",
      proficiency: "Advanced mastery in debugging and enterprise application development."
    }
  },
  "Cursor": {
    es: {
      description: "Editor de código potenciado por IA que mejora mi productividad en el desarrollo.",
      proficiency: "Tengo conocimiento avanzado en integración de IA para desarrollo rápido."
    },
    en: {
      description: "AI-powered code editor that enhances my development productivity.",
      proficiency: "I have knowledge dvanced user in AI integration for rapid development."
    }
  },
  "Git": {
    es: {
      description: "Sistema de control de versiones que uso para gestionar todos mis proyectos.",
      proficiency: "Experto en flujos de trabajo Git, resolución de conflictos y gestión de ramas."
    },
    en: {
      description: "Version control system I use to manage all my projects.",
      proficiency: "Expert in Git workflows, conflict resolution, and branch management."
    }
  },
  "GitHub": {
    es: {
      description: "Plataforma principal para colaboración y hosting de código.",
      proficiency: "Dominio completo de GitHub Actions, PRs y gestión de proyectos."
    },
    en: {
      description: "Main platform for code collaboration and hosting.",
      proficiency: "Complete mastery of GitHub Actions, PRs, and project management."
    }
  },
  "GitHub Copilot": {
    es: {
      description: "Asistente de IA que potencia mi velocidad de desarrollo y calidad de código.",
      proficiency: "Experto en prompting y generación de código eficiente."
    },
    en: {
      description: "AI assistant that enhances my development speed and code quality.",
      proficiency: "Expert in prompting and efficient code generation."
    }
  },
  "ChatGPT": {
    es: {
      description: "Herramienta de IA para resolución de problemas y mejora de algoritmos.",
      proficiency: "Experto en ingeniería de prompts y soluciones técnicas."
    },
    en: {
      description: "AI tool for problem-solving and algorithm improvement.",
      proficiency: "Expert in prompt engineering and technical solutions."
    }
  },
  "Docker": {
    es: {
      description: "Plataforma de contenedorización para despliegues consistentes y escalables.",
      proficiency: "Dominio avanzado en containerización y orquestación."
    },
    en: {
      description: "Containerization platform for consistent and scalable deployments.",
      proficiency: "Advanced mastery in containerization and orchestration."
    }
  },
  "AWS": {
    es: {
      description: "Plataforma cloud que uso para infraestructura y servicios escalables.",
      proficiency: "Competente en servicios principales de AWS y arquitecturas cloud."
    },
    en: {
      description: "Cloud platform I use for scalable infrastructure and services.",
      proficiency: "Proficient in core AWS services and cloud architectures."
    }
  },
  "Jest": {
    es: {
      description: "Framework de testing para garantizar la calidad del código JavaScript.",
      proficiency: "Experto en TDD y cobertura completa de pruebas."
    },
    en: {
      description: "Testing framework to ensure JavaScript code quality.",
      proficiency: "Expert in TDD and comprehensive test coverage."
    }
  },
  "Cypress": {
    es: {
      description: "Framework moderno para testing end-to-end de aplicaciones web.",
      proficiency: "Dominio en automatización de pruebas E2E y CI/CD."
    },
    en: {
      description: "Modern framework for end-to-end web application testing.",
      proficiency: "Mastery in E2E test automation and CI/CD."
    }
  },
  "Figma": {
    es: {
      description: "Herramienta de diseño colaborativo para interfaces modernas.",
      proficiency: "Competente en diseño de UI y prototipado."
    },
    en: {
      description: "Collaborative design tool for modern interfaces.",
      proficiency: "Proficient in UI design and prototyping."
    }
  },
  "Gitlab CI": {
    es: {
      description: "Plataforma de CI/CD para automatización de desarrollo y despliegue.",
      proficiency: "Experto en pipelines y automatización de desarrollo."
    },
    en: {
      description: "CI/CD platform for development and deployment automation.",
      proficiency: "Expert in pipelines and development automation."
    }
  },
  "Azure": {
    es: {
      description: "Plataforma cloud de Microsoft para servicios empresariales.",
      proficiency: "Competente en servicios Azure y DevOps."
    },
    en: {
      description: "Microsoft's cloud platform for enterprise services.",
      proficiency: "Proficient in Azure services and DevOps."
    }
  },
  "Claude": {
    es: {
      description: "IA avanzada para análisis y resolución de problemas complejos.",
      proficiency: "Conocimiento avanzado en prompting y análisis técnico."
    },
    en: {
      description: "Advanced AI for complex problem analysis and resolution.",
      proficiency: "Advanced knowledge in prompting and technical analysis."
    }
  },
  "Gemini": {
    es: {
      description: "Modelo multimodal de IA de Google para desarrollo asistido.",
      proficiency: "Competente en generación y análisis de código."
    },
    en: {
      description: "Google's multimodal AI for assisted development.",
      proficiency: "Proficient in code generation and analysis."
    }
  }
};

// Ya no necesitamos estilos CSS para animaciones, GSAP se encarga de todo

export function ToolHoverCard({ tool, children }: ToolHoverCardProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith('es') ? 'es' : 'en';
  const toolInfo = toolDescriptions[tool];
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [touchStartTime, setTouchStartTime] = React.useState(0);
  const [touchStartPos, setTouchStartPos] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  
  // Activar las animaciones GSAP para tooltips
  useTooltipAnimation();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Cerrar el tooltip cuando se toca fuera
  React.useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleTouchOutside = (event: TouchEvent) => {
      if (isOpen && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchend', handleTouchOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchend', handleTouchOutside);
    };
  }, [isMobile, isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    // Guardar la posición inicial del toque
    if (e.touches && e.touches[0]) {
      setTouchStartPos({ 
        x: e.touches[0].clientX,
        y: e.touches[0].clientY 
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchDuration = Date.now() - touchStartTime;
    
    // Verificar si el usuario ha movido el dedo significativamente (scroll vs. tap)
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      
      const moveDistance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
        Math.pow(touchEndPos.y - touchStartPos.y, 2)
      );
      
      // Si el movimiento es menor a 10px y la duración es corta, consideramos que es un tap
      if (moveDistance < 10 && touchDuration < 500) {
        e.preventDefault(); // Prevenir doble acción
        setIsOpen(!isOpen);
      }
    }
  };

  if (!toolInfo) return <>{children}</>;

  return (
    <HoverCard open={isMobile ? isOpen : undefined}>
      <HoverCardTrigger asChild>
        <div 
          ref={triggerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => isMobile && setIsOpen(!isOpen)}
          className="touch-manipulation relative"
        >
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="hover-card-content z-50 w-[280px] sm:w-80 rounded-xl bg-card/95 backdrop-blur-sm border border-blue/20 
                 shadow-xl shadow-blue/10 p-4 max-w-[90vw] transition-none"
        side={isMobile ? "bottom" : "top"}
        align={isMobile ? "center" : "center"}
        sideOffset={isMobile ? 10 : 8}
        alignOffset={0}
        avoidCollisions={true}
        collisionPadding={16}
        forceMount={isMobile ? isOpen : undefined}
      >
        <div className="tooltip-content space-y-2.5">
          <h3 className="font-bold text-base sm:text-lg text-foreground">{tool}</h3>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {toolInfo[currentLanguage].description}
            </p>
            <p className="text-xs sm:text-sm font-medium text-blue">
              {toolInfo[currentLanguage].proficiency}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
