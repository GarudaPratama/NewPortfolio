


import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function CTASection() {
  const { t } = useLang();

  return (
    <section className="w-full bg-surface py-20 px-6 md:px-12 lg:px-24">
      
      {/* Mobile Version (button only) */}
      <div className="flex md:hidden justify-center">
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0C1529] text-white font-hanson font-bold text-sm px-8 py-4 rounded-lg shadow-md hover:opacity-80 transition"
        >
          {t("button_latest_projects")}
        </motion.a>
      </div>

      {/* Desktop Version (text left, button right) */}
      <div className="hidden md:flex items-center justify-between">
        
        {/* Left Text */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#0C1529] font-extrabold text-3xl lg:text-4xl leading-tight font-hanson"
        >
          “{t("cta_big_text")}”
        </motion.h2>

        {/* Button */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0C1529] text-white tracking-wide font-hanson font-bold text-sm px-10 py-4 rounded-lg shadow-md hover:opacity-80 transition text-center"
        >
          {t("button_latest_projects")}
        </motion.a>
      </div>
    </section>
  );
}
