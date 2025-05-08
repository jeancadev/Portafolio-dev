import React, { useState } from 'react';
import { Book, Laptop, Code, Users, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="section-padding mt-0 bg-gradient-to-b from-background to-background/95 text-foreground content-visibility-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('aboutMe')}</h2>
          <div className="text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>{t('aboutDescription1')}</p>
            <p>{t('aboutDescription2')}</p>
            <p>{t('aboutDescription3')}</p>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Code className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{t('cardDevelopment')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardDevelopmentDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Laptop className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{t('cardTech')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardTechDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Users className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{t('cardCollab')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardCollabDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-muted/20 backdrop-blur-sm transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue/10 p-3">
                <Book className="h-6 w-6 text-blue" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{t('cardLearning')}</h3>
              <p className="text-sm text-muted-foreground">{t('cardLearningDesc')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('professionalFocus')}</h3>
            <div className="relative">
              <div className={`text-muted-foreground overflow-hidden transition-all duration-500 ease-in-out ${!isExpanded ? 'max-h-28' : 'max-h-[500px]'}`}>
                <p className="mb-4">
                  {t('focusDescription1')}
                </p>
                <p className={`transform transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {t('focusDescription2')}
                </p>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
                )}
              </div>
              <Button
                variant="ghost"
                className="mt-2 w-full border border-blue/20 hover:bg-blue/10 text-blue hover:text-blue-dark group"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>{isExpanded ? t('readLess') : t('readMore')}</span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
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

