/* ---------------------------------------------
   src/components/Skills.jsx
----------------------------------------------*/

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function Skills() {
  const { t } = useLang();

  const DESIGN_W = 1400;
  const DESIGN_H = 1400;
  const CARD_W = 360;
  const CARD_H = 560;

  const CARDS = t("skills_cards") || [];

  const POS = [
    { left: 80, top: 120 },
    { left: 960, top: 120 },
    { left: 80, top: 760 },
    { left: 960, top: 760 },
  ];

  const cardsWithPos = CARDS.map((c, i) => ({ ...c, ...POS[i] }));

  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(DESIGN_W);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const parent = el.parentElement;
      const w = Math.max(350, parent.clientWidth);
      const s = w / DESIGN_W;
      setScale(s);
      setContainerWidth(w);
    };

    const ro = new ResizeObserver(update);
    ro.observe(el.parentElement);

    update();
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
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.12 },
    }),
  };

  return (
    <section className="relative w-full bg-white pt-40 pb-40 mt-56" style={{ overflow: "hidden" }}>
      
      {/* DESKTOP */}
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            marginLeft: (containerWidth - DESIGN_W * scale) / 2 / scale,
            background: "#fff",
            position: "relative",
          }}
          className="hidden lg:block"
        >
          {/* BG TEXT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
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
            {cardsWithPos.map((c, idx) => (
              <motion.article
                key={c.id}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariant}
                style={{
                  position: "absolute",
                  left: c.left,
                  top: c.top,
                  width: CARD_W,
                  height: CARD_H,
                  padding: 32,
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                  background: c.bg,
                  color: c.text,
                  boxShadow: "0 14px 40px rgba(2,8,23,0.18)",
                }}
              >
                <h3
                  className="font-hanson whitespace-pre-line"
                  style={{
                    fontSize: 56,
                    lineHeight: 0.95,
                    textAlign: c.align,
                    marginBottom: 20,
                  }}
                >
                  {c.title}
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
                  {c.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-6 max-w-[500px] mx-auto">

        {/* MOBILE BG */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute left-0 top-0 w-full h-[900px] -z-10 pointer-events-none"
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
          {cardsWithPos.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="rounded-lg shadow-xl mb-10 p-6"
              style={{ background: c.bg, color: c.text }}
            >
              <h3
                className="font-hanson whitespace-pre-line mb-4"
                style={{ fontSize: 34, textAlign: c.align }}
              >
                {c.title}
              </h3>

              <p className="font-helvetica text-muted" style={{ fontSize: 18 }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
