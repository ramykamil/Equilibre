"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "@/data/translations";

interface TranslationContextProps {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app-locale") as Locale;
    if (savedLang === "en" || savedLang === "fr") {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem("app-locale", newLang);
  };

  const t = (key: string): string => {
    const dict = translations[lang];
    if (!dict) return key;
    
    // Support dot notation: e.g. t('brand')
    const value = (dict as any)[key];
    return value !== undefined ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
