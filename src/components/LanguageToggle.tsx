import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="w-9 px-0 transition-transform hover:scale-110"
    >
      <span className="text-sm font-medium">
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
