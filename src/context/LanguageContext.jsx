// src/context/LanguageContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // try get from localStorage
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("site-lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("site-lang", lang);
    } catch {}
    // set direction for Arabic
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // helper t(key) returns translations[lang][key]
  const t = (key) => {
    const val = translations[lang] && translations[lang][key];
    return typeof val === "undefined" ? key : val;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
