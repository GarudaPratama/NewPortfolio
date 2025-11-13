import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  {
    id: 1,
    title: "LUME",
    desc: "We create brand strategies that make your ideas clear and focused.",
    img: "/images/strategy.jpg",
  },
  {
    id: 2,
    title: "OSIS",
    desc: "We design strong brand identities with clear visual style.",
    img: "/images/identity.jpg",
  },
  {
    id: 3,
    title: "XB",
    desc: "We build beautiful and easy-to-use digital experiences.",
    img: "/images/experience.jpg",
  },
  {
    id: 4,
    title: "technology",
    desc: "We use modern technology to make your brand stronger online.",
    img: "/images/technology.jpg",
  },
  {
    id: 5,
    title: "activation",
    desc: "We turn ideas into real action through campaigns.",
    img: "/images/activation.jpg",
  },
];

export default function HoverGallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12">
      {/* === KIRI: preview (gambar + deskripsi) === */}
      <motion.div
        className="w-full md:w-1/2 md:pr-12 mt-8 md:mt-0 relative h-80 md:h-[500px] bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {active !== null ? (
            <motion.div
              key={ITEMS[active].id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              {/* Gambar */}
              <img
                src={ITEMS[active].img}
                alt={ITEMS[active].title}
                className="w-full h-full object-cover absolute inset-0 opacity-70"
              />
              {/* Deskripsi di atas gambar */}
              <div className="relative z-10 bg-white/70 backdrop-blur-sm p-6 rounded-lg max-w-md">
                <h3 className="text-2xl font-hanson text-text">{ITEMS[active].title}</h3>
                <p className="text-sm mt-2 text-muted">{ITEMS[active].desc}</p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500"
            >
              Hover a title to preview
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* === KANAN: daftar teks besar, tiap item muncul saat discroll === */}
      <div className="w-full md:w-1/2 text-right md:pl-12">
        <ul className="space-y-6">
          {ITEMS.map((item, index) => (
            <motion.li
              key={item.id}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className="cursor-pointer select-none"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              <div
                className={`text-4xl md:text-6xl font-hanson font-bold transition-colors ${
                  active === index ? "text-black" : "text-gray-400"
                }`}
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
