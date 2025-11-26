// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <main
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 bg-bg overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="w-full max-w-3xl">
        <motion.h1
          id="hero-heading"
          className="text-4xl md:text-7xl lg:text-7xl font-hanson text-text leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("hero_title")}
        </motion.h1>

        <motion.p
          className="mt-4 text-base md:text-lg text-muted font-helvetica max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {t("hero_sub")}
        </motion.p>
      </div>
    </main>
  );
}
