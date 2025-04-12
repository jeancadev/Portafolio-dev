
import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-background text-foreground">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Contáctame</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes algún proyecto en mente? ¿Quieres colaborar? No dudes en ponerte en contacto conmigo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-card/30 border-muted/20 p-6">
            <h3 className="text-xl font-bold mb-4 text-foreground">Envíame un mensaje</h3>
            <form className="space-y-4">
              <div>
                <Input placeholder="Tu nombre" className="bg-muted/10 border-muted/20" />
              </div>
              <div>
                <Input type="email" placeholder="Tu email" className="bg-muted/10 border-muted/20" />
              </div>
              <div>
                <Input placeholder="Asunto" className="bg-muted/10 border-muted/20" />
              </div>
              <div>
                <Textarea 
                  placeholder="Tu mensaje" 
                  className="bg-muted/10 border-muted/20 min-h-[150px]" 
                />
              </div>
              <Button className="w-full bg-blue hover:bg-blue-dark text-white">
                Enviar mensaje
              </Button>
            </form>
          </Card>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Información de contacto</h3>
              <p className="text-muted-foreground mb-6">
                Puedes contactarme directamente por email o a través de mis perfiles en redes sociales.
                Estoy disponible para trabajos freelance, colaboraciones y oportunidades laborales.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue/10 p-2">
                    <Mail className="h-4 w-4 text-blue" />
                  </div>
                  <a href="mailto:jean.obandocortes@gmail.com" className="text-foreground hover:text-blue transition-colors">
                    jean.obandocortes@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Redes sociales</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-card/30 p-3 text-foreground hover:bg-blue hover:text-white transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-card/30 p-3 text-foreground hover:bg-blue hover:text-white transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-full bg-card/30 p-3 text-foreground hover:bg-blue hover:text-white transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
