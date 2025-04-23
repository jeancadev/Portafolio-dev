import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navigation
          "nav.home": "Home",
          "nav.about": "About",
          "nav.skills": "Skills",
          "nav.projects": "Projects",
          "nav.contact": "Contact",

          // Hero Section
          "hello": "Hello, I'm",
          "description": "Full Stack development specialist focusing on modern architectures and scalable solutions. I create software that makes a difference, combining technical excellence with practical innovation.",
          "downloadCV": "Download CV",

          // About Section
          "aboutMe": "About me",
          "aboutDescription1": "I'm Jean Carlos, a software developer with solid experience in web application design and implementation.",
          "aboutDescription2": "I apply Clean Code and Clean Architecture principles in every project and containerize my developments with Docker to ensure scalability and maintainability.",
          "aboutDescription3": "I'm driven by constant innovation: I enjoy transforming complex problems into intuitive solutions that provide real value to the user. I work collaboratively, quickly adapting to new challenges and technologies.",
          
          // Professional Focus
          "professionalFocus": "Professional Focus",
          "focusDescription1": "My experience focuses on developing modern web applications, emphasizing performance optimization, implementing clean architectures, and leveraging Artificial Intelligence and advanced language models to enhance productivity and solution quality.",
          "focusDescription2": "I excel at designing and developing robust distributed systems, applying advanced design patterns, continuous integration practices, and AI-driven workflows that automate tasks, generate insights, and ensure maintainable and scalable code.",
          
          // Specialization Areas
          "specializationAreas": "Specialization Areas",
          "area1": "Clean architectures, Clean Code and design patterns",
          "area2": "Full Stack development with .NET, React and AI tools",
          "area3": "Containerization and orchestration with Docker",
          "area4": "Cloud solutions implementation (Azure, AWS)",
          "area5": "CI/CD, DevOps and AI-based automation",
          "area6": "Integration and optimization of LLMs to accelerate development and improve results",

          // Skills Section
          "mySkills": "My Skills",
          "skillsDescription": "I specialize in modern technologies for web application development. I'm constantly learning and updating my skills.",
          "tools": "Tools & Environments",

          // Contact Section
          "contact": "Contact Me",
          "contactDescription": "Do you have any questions or proposals? Don't hesitate to contact me.",
          "yourName": "Your name",
          "yourEmail": "Your email",
          "yourMessage": "Your message",
          "sending": "Sending...",
          "send": "Send message",
          "contactInfo": "Contact Information",

          // Toast Messages
          "messageSent": "Message sent!",
          "messageSuccess": "Thank you for contacting me. I'll reply as soon as possible.",
          "messageError": "Error sending message",
          "tryAgain": "Please try again later.",
        }
      },
      es: {
        translation: {
          // Navigation
          "nav.home": "Inicio",
          "nav.about": "Sobre mí",
          "nav.skills": "Habilidades",
          "nav.projects": "Proyectos",
          "nav.contact": "Contacto",

          // Hero Section
          "hello": "Hola, soy",
          "description": "Especialista en desarrollo Full Stack con enfoque en arquitecturas modernas y soluciones escalables. Creo software que marca la diferencia, combinando excelencia técnica con innovación práctica.",
          "downloadCV": "Descargar CV",

          // About Section
          "aboutMe": "Sobre mí",
          "aboutDescription1": "Soy Jean Carlos, desarrollador de software con sólida experiencia en el diseño e implementación de aplicaciones web.",
          "aboutDescription2": "Aplico principios de Clean Code y Clean Architecture en cada proyecto y contenedorizo mis desarrollos con Docker para garantizar escalabilidad y mantenibilidad.",
          "aboutDescription3": "Me motiva la innovación constante: disfruto transformando problemas complejos en soluciones intuitivas que aporten valor real al usuario. Trabajo de forma colaborativa, adaptándome rápido a nuevos retos y tecnologías.",
          
          // Professional Focus
          "professionalFocus": "Mi Enfoque Profesional",
          "focusDescription1": "Mi experiencia se centra en el desarrollo de aplicaciones web modernas, con énfasis en la optimización de rendimiento, la implementación de arquitecturas limpias y el aprovechamiento de Inteligencia Artificial y modelos de lenguaje avanzados para potenciar la productividad y la calidad de las soluciones.",
          "focusDescription2": "Destaco por mi habilidad para diseñar y desarrollar sistemas distribuidos robustos, aplicando patrones de diseño avanzados, prácticas de integración continua y flujos de trabajo impulsados por IA que automatizan tareas, generan insights y garantizan un código mantenible y escalable.",
          
          // Specialization Areas
          "specializationAreas": "Áreas de Especialización",
          "area1": "Arquitecturas limpias, Clean Code y patrones de diseño",
          "area2": "Desarrollo Full Stack con .NET, React y herramientas de IA",
          "area3": "Contenerización y orquestación con Docker",
          "area4": "Implementación de soluciones Cloud (Azure, AWS)",
          "area5": "CI/CD, DevOps y automatización basada en IA",
          "area6": "Integración y optimización de LLMs para acelerar el desarrollo y mejorar resultados",

          // Skills Section
          "mySkills": "Mis Habilidades",
          "skillsDescription": "Me especializo en tecnologías modernas para el desarrollo de aplicaciones web. Estoy constantemente aprendiendo y actualizando mis habilidades.",
          "tools": "Herramientas & Entornos",

          // Contact Section
          "contact": "Contáctame",
          "contactDescription": "¿Tienes alguna pregunta o propuesta? No dudes en contactarme.",
          "yourName": "Tu nombre",
          "yourEmail": "Tu email",
          "yourMessage": "Tu mensaje",
          "sending": "Enviando...",
          "send": "Enviar mensaje",
          "contactInfo": "Información de contacto",

          // Toast Messages
          "messageSent": "¡Mensaje enviado!",
          "messageSuccess": "Gracias por contactarme. Te responderé lo antes posible.",
          "messageError": "Error al enviar mensaje",
          "tryAgain": "Por favor, intenta nuevamente más tarde.",
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;