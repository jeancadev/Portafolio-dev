
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface LanguageToggleProps {
  currentLanguage: 'es' | 'en';
  onChange: (language: 'es' | 'en') => void;
}

const LanguageToggle = ({ currentLanguage, onChange }: LanguageToggleProps) => {
  return (
    <ToggleGroup 
      type="single" 
      value={currentLanguage} 
      onValueChange={(value) => value && onChange(value as 'es' | 'en')}
      className="border border-white/10 bg-dark/40 rounded-full p-0.5"
    >
      <ToggleGroupItem 
        value="es" 
        aria-label="Español" 
        className={`text-sm font-medium px-3 py-1 rounded-full transition-all cursor-hover-effect ${currentLanguage === 'es' ? 'bg-blue text-white' : 'text-light/80'}`}
      >
        ES
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="en" 
        aria-label="English" 
        className={`text-sm font-medium px-3 py-1 rounded-full transition-all cursor-hover-effect ${currentLanguage === 'en' ? 'bg-blue text-white' : 'text-light/80'}`}
      >
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageToggle;
