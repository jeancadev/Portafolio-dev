import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        'service_omeb98p',
        'template_aqc7rxa',
        e.currentTarget,
        'YtumYpqFiQvqJHsg0'
      );

      toast({
        title: t('messageSent'),
        description: t('messageSuccess'),
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: t('messageError'),
        description: t('tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-accent pb-2 mb-4">{t('contact')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 backdrop-blur-sm border border-muted/20 bg-card/30">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  type="text" 
                  name="user_name"
                  placeholder={t('yourName')} 
                  required 
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  name="user_email"
                  placeholder={t('yourEmail')} 
                  required 
                />
              </div>
              <div>
                <Textarea 
                  name="message"
                  placeholder={t('yourMessage')} 
                  className="min-h-[120px]" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue hover:bg-blue-dark active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? t('sending') : t('send')}
              </Button>
            </form>
          </Card>

          <Card className="p-6 backdrop-blur-sm border border-muted/20 bg-card/30">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">{t('contactInfo')}</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:jean.obandocortes@gmail.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={20} />
                  jean.obandocortes@gmail.com
                </a>
                
                <div className="flex gap-6">
                  <a 
                    href="https://github.com/jeancadev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue transition-all duration-300 transform hover:scale-110 dark:hover:text-white hover:text-gray-900"
                  >
                    <Github size={28} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/jeancarlosobando/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue transition-all duration-300 transform hover:scale-110 dark:hover:text-white hover:text-gray-900"
                  >
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
