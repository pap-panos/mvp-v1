"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Language = "el" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const languageStorageKey = "language";
const languageChangeEvent = "app-language-change";

function getStoredLanguage(): Language {
  const savedLanguage = localStorage.getItem(languageStorageKey);
  return savedLanguage === "en" ? "en" : "el";
}

function subscribeToLanguage(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === languageStorageKey) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(languageChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(languageChangeEvent, callback);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguage,
    getStoredLanguage,
    () => "el" as Language,
  );

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(languageStorageKey, lang);
    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
