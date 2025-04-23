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
          "aboutDescription1": "Software developer with solid experience in designing and implementing web applications.",
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

          // About Section Cards
          "cardDevelopment": "Development",
          "cardDevelopmentDesc": "I create robust and scalable solutions using best practices.",
          "cardTech": "Technologies",
          "cardTechDesc": "I master modern technologies for high-performance applications.",
          "cardCollab": "Collaboration",
          "cardCollabDesc": "I work efficiently in multidisciplinary teams.",
          "cardLearning": "Learning",
          "cardLearningDesc": "I constantly update my knowledge to stay at the forefront.",

          // Projects Section
          "projects": "Projects",
          "projectsDescription": "Here are some of the projects I've worked on recently. Each one demonstrates different skills and technologies.",
          "project1": "Business Management System",
          "project1Description": "Optimized CRUD business system with Clean Architecture and Docker. Manages clients, products, sales, and inventories with JWT authentication and automatic data seeding for quick deployment.",
          "project2": "Game Management Platform",
          "project2Description": "Robust system for managing multiplayer games with JWT authentication and real-time communication via SignalR. Implements Clean Architecture and SOLID principles to ensure maintainable and scalable code.",
          "project3": "Real-Time Dashboard",
          "project3Description": "Interactive full-stack dashboard for real-time resource monitoring. Integrates React frontend with Python Flask backend, offering a professional and scalable solution in Docker containers.",
          "viewCode": "View Code",
          "viewMoreProjects": "View More Projects",
          "featuredProjects": "Featured Projects",
          "gameManagementDesc": "Robust system for managing multiplayer games with JWT authentication and real-time communication via SignalR. Implements Clean Architecture and SOLID principles to ensure maintainable and scalable code.",
          "businessManagementDesc": "Optimized CRUD business system with Clean Architecture and Docker. Manages clients, products, sales, and inventories with JWT authentication and automatic data seeding for quick deployment.",
          "dashboardDesc": "Interactive full-stack dashboard for real-time resource monitoring. Integrates React frontend with Python Flask backend, offering a professional and scalable solution in Docker containers.",

          // Skills Section
          "mySkills": "My Skills",
          "skillsDescription": "I specialize in modern technologies for web application development. I'm constantly learning and updating my skills.",
          "tools": "Tools & Environments",
          "frontend": "Frontend",
          "backend": "Backend",
          "others": "Others",
          

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

          // Footer
          "allRightsReserved": "All rights reserved."
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
          "aboutDescription1": "Desarrollador de software con sólida experiencia en el diseño e implementación de aplicaciones web.",
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

          // About Section Cards
          "cardDevelopment": "Desarrollo",
          "cardDevelopmentDesc": "Creo soluciones robustas y escalables utilizando las mejores prácticas.",
          "cardTech": "Tecnologías",
          "cardTechDesc": "Domino tecnologías modernas para aplicaciones de alto rendimiento.",
          "cardCollab": "Colaboración",
          "cardCollabDesc": "Trabajo eficientemente en equipos multidisciplinarios.",
          "cardLearning": "Aprendizaje",
          "cardLearningDesc": "Constantemente actualizo mis conocimientos para mantenerme a la vanguardia.",

          // Projects Section
          "projects": "Proyectos",
          "projectsDescription": "Estos son algunos de los proyectos en los que he trabajado recientemente. Cada uno demuestra diferentes habilidades y tecnologías.",
          "project1": "Plataforma de Gestion de Juegos",
          "project1Description": "Sistema robusto para gestión de partidas multijugador con autenticación JWT y comunicación en tiempo real vía SignalR. Implementa Clean Architecture y principios SOLID para garantizar un código mantenible y escalable.",
          "project2": "Sistema de Gestión Empresarial",
          "project2Description": "Sistema CRUD empresarial optimizado con Clean Architecture y Docker. Gestiona clientes, productos, ventas e inventarios con autenticación JWT y seeding automático de datos para un despliegue rápido.",
          "project3": "Dashboard en Tiempo Real",
          "project3Description": "Dashboard interactivo full-stack para monitoreo de recursos en tiempo real. Integra frontend React con backend Python Flask, ofreciendo una solución profesional y escalable en contenedores Docker.",
          "viewCode": "Ver Código",
          "viewMoreProjects": "Ver Más Proyectos",
          "featuredProjects": "Proyectos Destacados",
          "gameManagementDesc": "Sistema robusto para gestión de partidas multijugador con autenticación JWT y comunicación en tiempo real vía SignalR. Implementa Clean Architecture y principios SOLID para garantizar un código mantenible y escalable.",
          "businessManagementDesc": "Sistema CRUD empresarial optimizado con Clean Architecture y Docker. Gestiona clientes, productos, ventas e inventarios con autenticación JWT y seeding automático de datos para un despliegue rápido.",
          "dashboardDesc": "Dashboard interactivo full-stack para monitoreo de recursos en tiempo real. Integra frontend React con backend Python Flask, ofreciendo una solución profesional y escalable en contenedores Docker.",

          // Skills Section
          "mySkills": "Mis Habilidades",
          "skillsDescription": "Me especializo en tecnologías modernas para el desarrollo de aplicaciones web. Estoy constantemente aprendiendo y actualizando mis habilidades.",
          "tools": "Herramientas & Entornos",
          "frontend": "Frontend",
          "backend": "Backend",
          "others": "Otros",

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

          // Footer
          "allRightsReserved": "Todos los derechos reservados."
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;