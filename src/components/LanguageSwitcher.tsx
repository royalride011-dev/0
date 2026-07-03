import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('royalride_lang', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 hover:bg-champagne-gold-500/10 ${className}`}
      aria-label="Switch Language"
    >
      <Globe className="w-5 h-5 text-[#C5A85C]" />
    </button>
  );
}
