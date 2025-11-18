// src/components/Skills.jsx
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const DESIGN_W = 1400;
  const DESIGN_H = 1400;

  const CARD_W = 360;
  const CARD_H = 560;

  const CARDS = [
    {
      id: "react",
      title: "REACT\n.JS",
      left: 56,
      top: 120,
      bg: "#0b1220",
      text: "#ffffff",
      align: "left",
      desc:
        "React.js untuk membangun antarmuka modern dengan komponen cepat & modular.",
    },
    {
      id: "tailwind",
      title: "TAIL\nWIND",
      left: 760,
      top: 160,
      bg: "#f5f5f5",
      text: "#0b1220",
      align: "right",
      desc:
        "Tailwind CSS untuk styling yang efisien, bersih, dan konsisten.",
    },
    {
      id: "javascript",
      title: "JAVA\nSCRIPT",
      left: 48,
      top: 840,
      bg: "#f5f5f5",
      text: "#0b1220",
      align: "left",
      desc:
        "JavaScript sebagai pondasi interaksi, animasi, dan logic aplikasi web.",
    },
  ];

  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(DESIGN_W);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const parent = el.parentElement;
      const parentW = Math.max(350, parent.clientWidth);
      const s = parentW / DESIGN_W;
      setScale(s);
      setContainerWidth(parentW);
    });

    ro.observe(el.parentElement);

    const parent = el.parentElement;
    const parentW = Math.max(350, parent.clientWidth);
    setScale(parentW / DESIGN_W);
    setContainerWidth(parentW);

    return () => ro.disconnect();
  }, []);

  const renderSkillLine = (count) =>
    Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ marginRight: 22, display: "inline-block" }}>
        SKILLS
      </span>
    ));

  const bgVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12 },
    }),
  };

  return (
    <section
      className="relative w-full bg-white pt-40 pb-40"
      style={{ overflow: "hidden" }}
    >
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            marginLeft:
              (containerWidth - DESIGN_W * scale) / 2 / scale || 0,
            background: "#ffffff",
            position: "relative",
          }}
          className="hidden lg:block"
        >
          {/* BACKGROUND — now using font-hanson */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={bgVariants}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              style={{
                position: "absolute",
                left: "-24%",
                top: "-40%",
                width: "160%",
                height: "200%",
                transform: "rotate(-8deg)",
              }}
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: `${(i / 13) * 100}%`,
                    paddingLeft: `${(i % 4) * 24}px`,
                    width: "100%",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    className="text-muted font-hanson"
                    style={{ fontSize: 64, lineHeight: 1 }}
                  >
                    {renderSkillLine(20)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARDS */}
          <div className="relative w-full h-full z-20">
            {CARDS.map((card, idx) => (
              <motion.article
                key={card.id}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariant}
                style={{
                  position: "absolute",
                  left: card.left,
                  top: card.top,
                  width: CARD_W,
                  height: CARD_H,
                  padding: 32,
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                  background: card.bg,
                  color: card.text,
                  boxShadow: "0 14px 40px rgba(2,8,23,0.18)",
                }}
              >
                <h3
                  className="font-hanson whitespace-pre-line"
                  style={{
                    fontSize: 56,
                    lineHeight: 0.95,
                    textAlign: card.align,
                    marginBottom: 20,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="font-helvetica text-muted"
                  style={{
                    fontSize: 18,
                    lineHeight: 1.4,
                    flex: 1,
                    maxWidth: 260,
                  }}
                >
                  {card.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className="lg:hidden px-6 max-w-[500px] mx-auto">
        {/* MOBILE BACKGROUND — updated to font-hanson */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute left-0 top-0 w-full h-[900px] -z-10 pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              width: "160%",
              left: "-30%",
              top: "-20%",
              height: "150%",
              transform: "rotate(-8deg)",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  top: `${(i / 11) * 100}%`,
                  paddingLeft: `${(i % 3) * 20}px`,
                }}
              >
                <div
                  className="text-muted font-hanson"
                  style={{ fontSize: 36, lineHeight: 1 }}
                >
                  {renderSkillLine(12)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MOBILE CARDS */}
        <div className="relative z-20 mt-10">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-lg shadow-xl mb-10 p-6"
              style={{ background: card.bg, color: card.text }}
            >
              <h3
                className="font-hanson whitespace-pre-line mb-4"
                style={{ fontSize: 34, lineHeight: 1, textAlign: card.align }}
              >
                {card.title}
              </h3>

              <p
                className="font-helvetica text-muted"
                style={{ fontSize: 18, lineHeight: 1.4 }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
