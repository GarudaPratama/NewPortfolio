// src/components/Projects.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function Projects() {
  const { t } = useLang();

  const title = t("projects_title");
  const desc = t("projects_desc");
  const items = t("projects_items") || []; // array of items

  const [active, setActive] = useState(null);
  const activeItem = Number.isInteger(active) && items[active] ? items[active] : null;

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24 py-12">
      {/* LEFT: preview */}
      <motion.div
        className="w-full md:w-1/2 md:pr-12 mt-8 md:mt-0 relative h-80 md:h-[500px] overflow-hidden rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <img
                src={activeItem.img}
                alt={activeItem.title}
                className="w-full h-full object-cover absolute inset-0 opacity-70"
              />
              <div className="relative z-10 bg-bg backdrop-blur-sm p-6 rounded-lg max-w-md">
                <h3 className="text-2xl font-hanson text-text text-center md:text-center">
                  {activeItem.title}
                </h3>
                <p className="text-sm mt-2 text-muted text-center md:text-left">
                  {activeItem.desc}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 px-4 text-helvetica font-bold text-xl md:text-2xl">
              HOVER THE PROJECTS
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* RIGHT: header + list */}
      <div className="w-full md:w-1/2 flex flex-col items-end justify-center md:pl-12 h-full">
        <div className="self-end mb-6">
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl mb-16 uppercase text-text font-hanson text-right"
          >
            {title}
          </motion.h2>
        </div>

        <ul className="space-y-6 w-full">
          {items.map((item, idx) => (
            <motion.li
              key={item.id}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(idx)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(idx)}
              tabIndex={0}
              className="cursor-pointer select-none"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div
                className={`w-full text-right pr-4 text-4xl md:text-6xl font-hanson font-bold transition-colors ${active === idx ? "text-black" : "text-muted"}`}
              >
                {item.title}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
