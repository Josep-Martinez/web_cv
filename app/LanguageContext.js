// app/LanguageContext.js
"use client";
import { createContext, useContext, useState } from "react";
import { useLanguageTransition } from "../app/components/LanguageTransitionProvider";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");
  const { startTransition, isTransitioning } = useLanguageTransition();

  const toggleLanguage = () => {
    if (isTransitioning) return; // Evitar múltiples clicks
    
    // Iniciar animación global
    startTransition();
    
    // Cambiar idioma en el punto medio
    setTimeout(() => {
      setLanguage((prevLang) => (prevLang === "EN" ? "ES" : "EN"));
    }, 200);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}