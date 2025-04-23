import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 bg-card/30 text-foreground border-t border-muted/10 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {currentYear} Portfolio. {t('allRightsReserved')}
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#home" className="text-muted-foreground hover:text-blue transition-colors">
              {t('nav.home')}
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-blue transition-colors">
              {t('nav.projects')}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-blue transition-colors">
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

