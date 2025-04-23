
import React from 'react';
import { Book, Laptop, Code, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-padding mt-24 bg-gradient-to-b from-background to-background/95 text-foreground">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('aboutMe')}</h2>
          <div className="text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>{t('aboutDescription1')}</p>
            <p>{t('aboutDescription2')}</p>
            <p>{t('aboutDescription3')}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Code className="h-6 w-6 text-blue" />
              </div>
<<<<<<< HEAD
              <h3 className="mb-2 font-bold text-foreground">{t('cardDevelopment')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardDevelopmentDesc')}</p>
=======
              <h3 className="mb-2 font-bold text-foreground">{t("aboutDev", "Desarrollo")}</h3>
              <p className="text-sm text-muted-foreground">{t("aboutDevDesc", "Creo soluciones robustas y escalables utilizando las mejores prácticas.")}</p>
>>>>>>> 98f7ee48efb0f6a932cdb4e719c38d8d7e81a866
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Laptop className="h-6 w-6 text-blue" />
              </div>
<<<<<<< HEAD
              <h3 className="mb-2 font-bold text-foreground">{t('cardTech')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardTechDesc')}</p>
=======
              <h3 className="mb-2 font-bold text-foreground">{t("aboutTech", "Tecnologías")}</h3>
              <p className="text-sm text-muted-foreground">{t("aboutTechDesc", "Domino tecnologías modernas para crear aplicaciones de alto rendimiento.")}</p>
>>>>>>> 98f7ee48efb0f6a932cdb4e719c38d8d7e81a866
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Users className="h-6 w-6 text-blue" />
              </div>
<<<<<<< HEAD
              <h3 className="mb-2 font-bold text-foreground">{t('cardCollab')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardCollabDesc')}</p>
=======
              <h3 className="mb-2 font-bold text-foreground">{t("aboutCollab", "Colaboración")}</h3>
              <p className="text-sm text-muted-foreground">{t("aboutCollabDesc", "Trabajo eficientemente en equipos multidisciplinarios.")}</p>
>>>>>>> 98f7ee48efb0f6a932cdb4e719c38d8d7e81a866
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Book className="h-6 w-6 text-blue" />
              </div>
<<<<<<< HEAD
              <h3 className="mb-2 font-bold text-foreground">{t('cardLearning')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardLearningDesc')}</p>
=======
              <h3 className="mb-2 font-bold text-foreground">{t("aboutLearn", "Aprendizaje")}</h3>
              <p className="text-sm text-muted-foreground">{t("aboutLearnDesc", "Constantemente actualizo mis conocimientos para mantenerme a la vanguardia.")}</p>
>>>>>>> 98f7ee48efb0f6a932cdb4e719c38d8d7e81a866
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('professionalFocus')}</h3>
            <div className="text-muted-foreground mb-6">
              {t('focusDescription1')}
            </div>
            <div className="text-muted-foreground">
              {t('focusDescription2')}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('specializationAreas')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span>💡</span>
                <span>{t('area1')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>⚡</span>
                <span>{t('area2')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>🐳</span>
                <span>{t('area3')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>☁️</span>
                <span>{t('area4')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>🔄</span>
                <span>{t('area5')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>🧠</span>
                <span>{t('area6')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

