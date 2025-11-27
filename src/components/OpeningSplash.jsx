// src/components/OpeningSplash.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function OpeningSplash({ onFinish }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const warpStartedRef = useRef(false);
  const finishedRef = useRef(false);
  const controls = useAnimation();

  const [readyToInteract, setReadyToInteract] = useState(false);

  const TOTAL_DURATION = 2200;
  const WARP_RAMP_MS = 850;
  const WARP_PEAK_MS = 1200;
  const FADE_DELAY_AFTER_PEAK = 400;
  const STAR_BASE = 600;

  // Init starfield
  const initStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(
      (STAR_BASE * Math.min(w, 1600)) / 1400 * (dpr > 1 ? 1.15 : 1)
    );

    const stars = new Array(count).fill(0).map(() => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 1 + 0.01,
      size: Math.random() * 1.2 + 0.2,
      baseSpeed: Math.random() * 0.012 + 0.002,
    }));

    return { ctx, w, h, stars };
  }, []);

  // Mount
  useEffect(() => {
    const state = initStars();
    if (!state) return;
    const { ctx, w, h, stars } = state;

    startRef.current = null;

    const readyTimer = setTimeout(() => setReadyToInteract(true), 220);

    function frame(now) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      const warp = warpStartedRef.current;
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!warp) {
          s.z -= s.baseSpeed * 0.08;
        } else {
          const ramp = Math.min(1, elapsed / WARP_RAMP_MS);
          s.z -= s.baseSpeed * (0.5 + ramp * 38);
        }

        if (s.z <= 0.01) {
          s.z = 1;
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
        }

        const px = cx + (s.x / s.z) * 0.6;
        const py = cy + (s.y / s.z) * 0.6;
        const brightness = Math.min(1, (1.4 - s.z) * 1.2);
        const size = s.size * (warp ? 2 : 1);

        if (!warp) {
          ctx.fillStyle = `rgba(255,255,255,${0.25 * brightness})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const dx = px - cx;
          const dy = py - cy;
          const angle = Math.atan2(dy, dx);
          const len = Math.max(1, (20 * brightness) * (1 / Math.max(0.02, s.z)));

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.fillStyle = `rgba(255,255,255,${0.75 * brightness})`;
          ctx.fillRect(-len, -size, len * 2, size * 2);
          ctx.restore();
        }
      }

      if (warp) {
        if (elapsed > TOTAL_DURATION - 400) {
          const fade = Math.min(1, (elapsed - (TOTAL_DURATION - 400)) / 400);
          ctx.fillStyle = `rgba(0,0,0,${fade})`;
          ctx.fillRect(0, 0, w, h);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      clearTimeout(readyTimer);
      rafRef.current && cancelAnimationFrame(rafRef.current);
    };
  }, [initStars]);

  // Start warp
  const startWarp = useCallback(() => {
    if (warpStartedRef.current) return;
    warpStartedRef.current = true;

    startRef.current = performance.now();

    setTimeout(() => {
      finishedRef.current = true;
    }, TOTAL_DURATION + 150);
  }, []);

  // Finish
  const finish = useCallback(async () => {
    if (typeof onFinish === "function") onFinish();
  }, [onFinish]);

  // Interaction event
  useEffect(() => {
    const handlePointer = () => startWarp();
    const handleKey = (e) => {
      if (["Enter", " ", "Spacebar"].includes(e.key)) startWarp();
      if (e.key === "Escape") finish();
    };

    document.addEventListener("pointerdown", handlePointer, { once: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointer, { once: true });
      window.removeEventListener("keydown", handleKey);
    };
  }, [startWarp, finish]);

  // Poll for finish
  useEffect(() => {
    const interval = setInterval(() => {
      if (finishedRef.current) {
        clearInterval(interval);
        finish();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [finish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: warpStartedRef.current ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 99999,
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />

      <button
        onClick={finish}
        style={{
          position: "fixed",
          right: 20,
          top: 20,
          padding: "8px 14px",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
          borderRadius: 6,
          cursor: "pointer",
          zIndex: 100000,
        }}
      >
        Skip
      </button>
    </motion.div>
  );
}
