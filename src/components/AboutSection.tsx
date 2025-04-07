
import React from 'react';
import { Book, Laptop, Code, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-dark to-dark/95">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Sobre mí</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soy un desarrollador de software apasionado por crear soluciones tecnológicas innovadoras, 
            con experiencia en el desarrollo de aplicaciones web y móviles.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-muted/5 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Code className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold">Desarrollo</h3>
              <p className="text-sm text-muted-foreground">Creo soluciones robustas y escalables utilizando las mejores prácticas.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/5 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Laptop className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold">Tecnologías</h3>
              <p className="text-sm text-muted-foreground">Domino tecnologías modernas para crear aplicaciones de alto rendimiento.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/5 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Users className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold">Colaboración</h3>
              <p className="text-sm text-muted-foreground">Trabajo eficientemente en equipos multidisciplinarios.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/5 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Book className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold">Aprendizaje</h3>
              <p className="text-sm text-muted-foreground">Constantemente actualizo mis conocimientos para mantenerme a la vanguardia.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mi Trayectoria</h3>
            <p className="text-muted-foreground mb-6">
              Con más de 5 años de experiencia en desarrollo de software, he tenido la oportunidad de trabajar 
              en diversos proyectos que me han permitido desarrollar una sólida experiencia técnica y de negocio.
            </p>
            <p className="text-muted-foreground">
              Mi enfoque se centra en crear aplicaciones web y móviles de alto rendimiento con una excelente 
              experiencia de usuario. Me apasiona aprender nuevas tecnologías y aplicarlas para resolver 
              problemas complejos.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Intereses</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-blue">▹</span>
                <span>Desarrollo web full-stack</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue">▹</span>
                <span>Desarrollo de aplicaciones móviles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue">▹</span>
                <span>Arquitectura de software</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue">▹</span>
                <span>Inteligencia Artificial</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue">▹</span>
                <span>Cloud Computing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
