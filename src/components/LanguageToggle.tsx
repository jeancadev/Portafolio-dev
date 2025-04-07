
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface LanguageToggleProps {
  currentLanguage: 'es' | 'en';
  onChange: (language: 'es' | 'en') => void;
}

const LanguageToggle = ({ currentLanguage, onChange }: LanguageToggleProps) => {
  return (
    <ToggleGroup type="single" value={currentLanguage} onValueChange={(value) => value && onChange(value as 'es' | 'en')}>
      <ToggleGroupItem value="es" aria-label="Español" className="text-sm font-medium">
        ES
      </ToggleGroupItem>
      <ToggleGroupItem value="en" aria-label="English" className="text-sm font-medium">
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageToggle;
