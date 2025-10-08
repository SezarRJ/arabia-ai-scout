import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/locales/en.json';
import arTranslations from '@/locales/ar.json';
import trTranslations from '@/locales/tr.json';
import ckbTranslations from '@/locales/ckb.json';

export const translations = {
  en: enTranslations,
  ar: arTranslations,
  tr: trTranslations,
  ckb: ckbTranslations,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' },
    { value: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { value: 'ckb', label: 'کوردی', flag: '🏴' },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sharkvest-language') || 'en';
    setLanguage(savedLanguage);
    
    const isRTL = ['ar', 'ckb'].includes(savedLanguage);
    setDirection(isRTL ? 'rtl' : 'ltr');
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('sharkvest-language', newLanguage);
    
    const isRTL = ['ar', 'ckb'].includes(newLanguage);
    setDirection(isRTL ? 'rtl' : 'ltr');
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(paramKey => {
      translation = translation.replace(`{${paramKey}}`, params[paramKey]);
    });
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};