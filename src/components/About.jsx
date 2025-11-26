// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function About() {
  const { t } = useLang();
  const lines = t("about_lines") || [];

  return (
    <section className="w-full flex justify-center px-6 md:px-12 lg:px-24 mb-36 md:mb-48">
      <div className="w-[75vw] md:w-[50vw]">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20, color: "var(--text-muted)" }}
            whileInView={{ opacity: 1, y: 0, color: "var(--text)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: i * 0.12,
            }}
            className="text-left text-xl md:text-4xl lg:text-5xl leading-tight font-hanson"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
