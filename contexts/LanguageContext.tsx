'use client';
 
import {createContext, useContext, useState, ReactNode, useEffect, useRef} from 'react';
 
type Locale = 'en' | 'bn';
 
interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
 
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
 
export function LanguageProvider({children, initialLocale}: {children: ReactNode; initialLocale: Locale}) {
  // Initialize locale from localStorage or use initialLocale
  const getInitialLocale = (): Locale => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'bn')) {
        return savedLocale;
      }
    }
    return initialLocale;
  };

  const [locale, setLocale] = useState<Locale>(getInitialLocale);
 
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update document direction for RTL languages if needed
    document.documentElement.lang = newLocale;
  };
 
  return (
    <LanguageContext.Provider value={{locale, setLocale: updateLocale}}>
      {children}
    </LanguageContext.Provider>
  );
}
 
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}