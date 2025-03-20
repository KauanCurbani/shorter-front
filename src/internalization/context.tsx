"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseInternationalization } from "./base-interface";
import { ptBr } from "./lang/pt-br";
import { en } from "./lang/en";

interface LanguageContextProps {
  texts: BaseInternationalization;
  setLanguage: (language: Language) => void;
  selectedLanguage: Language;
}

export type Language = "PT-BR" | "EN";

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [texts, setTexts] = useState(en);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("EN");

  useEffect(() => {
    const selectedLanguage = localStorage.getItem(
      "selectedLanguage",
    ) as Language;
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setSelectedLanguage(selectedLanguage);
      setTexts(selectedLanguage === "PT-BR" ? ptBr : en);
    }
  }, []);

  const setLanguage = (language: Language) => {
    switch (language) {
      case "PT-BR":
        setTexts(ptBr);
        setSelectedLanguage("PT-BR");
        localStorage.setItem("selectedLanguage", "PT-BR");
        break;
      case "EN":
        setTexts(en);
        setSelectedLanguage("EN");
        localStorage.setItem("selectedLanguage", "EN");
        break;
      default:
      setTexts(en);
      setSelectedLanguage("EN");
      localStorage.setItem("selectedLanguage", "EN");
      break;
    }
  };

  return (
    <LanguageContext.Provider value={{ texts, setLanguage, selectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
