
import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const education = [
  {
    id: 1,
    title: "Ingeniería en Informática",
    institution: "Universidad Tecnológica",
    period: "2015 - 2019",
    description: "Especializado en desarrollo de software y sistemas informáticos.",
    badges: ["Programación", "Bases de Datos", "Arquitectura de Software"]
  },
  {
    id: 2,
    title: "Máster en Desarrollo Web",
    institution: "Instituto de Tecnologías Digitales",
    period: "2020 - 2021",
    description: "Enfocado en tecnologías web modernas y experiencia de usuario.",
    badges: ["React", "Node.js", "UX/UI"]
  }
];

const certifications = [
  {
    id: 1,
    title: "Certificación AWS Developer Associate",
    institution: "Amazon Web Services",
    year: "2022",
    badges: ["Cloud Computing", "AWS", "Serverless"]
  },
  {
    id: 2,
    title: "Certificación en React Avanzado",
    institution: "Plataforma de Educación Online",
    year: "2021",
    badges: ["React", "Redux", "React Native"]
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding bg-gradient-to-b from-dark/95 to-dark">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">Formación</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi educación formal y certificaciones que han contribuido a mi desarrollo profesional.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-blue" size={24} />
              <h3 className="text-2xl font-bold">Educación</h3>
            </div>

            <div className="space-y-6">
              {education.map((item) => (
                <Card key={item.id} className="bg-muted/5 border-muted/20 transition-transform hover:translate-y-[-5px]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue/10 text-blue border-blue/20">
                        <Calendar className="mr-1 h-3 w-3" /> {item.period}
                      </Badge>
                    </div>
                    <CardDescription>{item.institution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-muted/20">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-blue" size={24} />
              <h3 className="text-2xl font-bold">Certificaciones</h3>
            </div>

            <div className="space-y-6">
              {certifications.map((item) => (
                <Card key={item.id} className="bg-muted/5 border-muted/20 transition-transform hover:translate-y-[-5px]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue/10 text-blue border-blue/20">
                        {item.year}
                      </Badge>
                    </div>
                    <CardDescription>{item.institution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-muted/20">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
