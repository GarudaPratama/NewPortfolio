// src/App.jsx
import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import { LanguageProvider, useLang } from "./context/LanguageContext";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Opening from "./components/OpeningSplash";

// Language switcher
function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const list = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" },
    { code: "jp", label: "JP" },
    { code: "es", label: "ES" },
    { code: "ar", label: "AR" },
  ];

  return (
    <div style={{ position: "fixed", right: 16, top: 16, zIndex: 999999 }}>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border border-muted/30 text-sm rounded px-3 py-2 font-helvetica text-text outline-none focus:ring-2 focus:ring-accent cursor-pointer backdrop-blur-sm"
      >
        {list.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Main app content
function AppContent() {
  const [openingDone, setOpeningDone] = useState(false);

  // smooth scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => rafId && cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Opening animation (full screen) */}
      {!openingDone && <Opening onFinish={() => setOpeningDone(true)} />}

      {/* Only shows AFTER intro disappears */}
      {openingDone && <LanguageSwitcher />}

      <Hero />
      <About />
      <Projects />
      <Skills />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
