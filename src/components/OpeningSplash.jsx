// src/components/OpeningSplash.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * OpeningSplash (text removed)
 *
 * - Pure dark start + idle starfield
 * - Wait for user interaction (click/tap/Enter/Space)
 * - On interaction: warp sequence (accel, streaks, flash) then fade out
 * - Skip button & Escape to skip
 *
 * Props:
 * - onFinish(): callback when intro finishes (or skipped)
 */

export default function OpeningSplash({ onFinish }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const warpStartedRef = useRef(false);
  const finishedRef = useRef(false);
  const controls = useAnimation();
  const [readyToInteract, setReadyToInteract] = useState(false);

  // ---- Config (ubah jika perlu) ----
  const TOTAL_DURATION = 2200; // ms
  const WARP_RAMP_MS = 850;
  const WARP_PEAK_MS = 1200;
  const FADE_DELAY_AFTER_PEAK = 400;
  const STAR_BASE = 600;
  // ----------------------------------

  const initStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((STAR_BASE * Math.min(w, 1600)) / 1400 * (dpr > 1 ? 1.15 : 1));
    const stars = new Array(count).fill(0).map(() => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 1 + 0.01,
      size: Math.random() * 1.2 + 0.2,
      baseSpeed: Math.random() * 0.012 + 0.002,
    }));

    return { ctx, w, h, dpr, stars };
  }, []);

  useEffect(() => {
    const state = initStars();
    if (!state) return;
    const { ctx, w, h, stars } = state;
    startRef.current = null;
    warpStartedRef.current = false;
    finishedRef.current = false;

    const readyTimer = setTimeout(() => setReadyToInteract(true), 280);

    function frame(now) {
      if (!startRef.current) startRef.current = now;
      const elapsedSinceStart = now - startRef.current;

      // Pure black base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      if (!warpStartedRef.current) {
        // idle subtle motion
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.z -= s.baseSpeed * 0.08;
          if (s.z <= 0.01) {
            s.z = 1;
            s.x = (Math.random() - 0.5) * w;
            s.y = (Math.random() - 0.5) * h;
          }

          const cx = w / 2;
          const cy = h / 2;
          const px = cx + (s.x / s.z) * 0.6;
          const py = cy + (s.y / s.z) * 0.6;
          const brightness = Math.min(1, (1.2 - s.z) * 0.9);

          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${0.25 * brightness})`;
          ctx.arc(px, py, Math.max(0.4, s.size * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }

        // subtle ambient
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(0, 0, w, h);
      } else {
        // warp sequence
        const actionElapsed = elapsedSinceStart;
        const tRamp = Math.max(0, Math.min(1, actionElapsed / WARP_RAMP_MS));
        const warpStrength = tRamp;
        const timeToPeak = WARP_PEAK_MS;
        const cx = w / 2;
        const cy = h / 2;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.z -= s.baseSpeed * (0.5 + 30 * warpStrength);
          if (s.z <= 0.002) {
            s.z = 1;
            s.x = (Math.random() - 0.5) * w;
            s.y = (Math.random() - 0.5) * h;
            s.size = Math.random() * 1.2 + 0.2;
          }

          const px = cx + (s.x / s.z) * 0.6;
          const py = cy + (s.y / s.z) * 0.6;
          const brightness = Math.min(1, (1.4 - s.z) + warpStrength * 0.9);
          const len = Math.max(1, (20 * warpStrength) * (1 / Math.max(0.02, s.z)));

          const dx = px - cx;
          const dy = py - cy;
          const angle = Math.atan2(dy, dx);
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          const g = ctx.createLinearGradient(-len, 0, len, 0);
          g.addColorStop(0, `rgba(255,255,255,${0.0 * brightness})`);
          g.addColorStop(0.5, `rgba(255,255,255,${0.75 * brightness})`);
          g.addColorStop(1, `rgba(255,255,255,${0.0 * brightness})`);
          ctx.fillStyle = g;
          const wStreak = Math.min(24, (s.size * 1.2 + warpStrength * 8) * (1 / Math.max(0.02, s.z)));
          ctx.fillRect(-len, -wStreak / 2, len * 2, wStreak);
          ctx.restore();
        }

        // flash at peak
        if (actionElapsed >= timeToPeak - 80 && actionElapsed <= timeToPeak + 240) {
          const t = (actionElapsed - (timeToPeak - 80)) / 320;
          const flashAlpha = Math.max(0, 0.9 * (1 - Math.abs(0.5 - t) * 2));
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha * 0.12})`;
          ctx.fillRect(0, 0, w, h);
        }

        // fade near end
        const totalSinceUser = actionElapsed;
        if (totalSinceUser >= (TOTAL_DURATION - FADE_DELAY_AFTER_PEAK)) {
          const fadeT = Math.min(1, (totalSinceUser - (TOTAL_DURATION - FADE_DELAY_AFTER_PEAK)) / FADE_DELAY_AFTER_PEAK);
          ctx.fillStyle = `rgba(0,0,0,${fadeT})`;
          ctx.fillRect(0, 0, w, h);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      clearTimeout(readyTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initStars]);

  // Start warp when user interacts
  const startWarp = useCallback(() => {
    if (warpStartedRef.current) return;
    warpStartedRef.current = true;

    startRef.current = performance.now();

    // quick brighten (keeps using framer for fade)
    controls.start({ opacity: 1, transition: { duration: 0.06 } });

    setTimeout(() => {
      finishedRef.current = true;
    }, TOTAL_DURATION + 120);
  }, [controls]);

  // finish: fade out and callback
  const finish = useCallback(async () => {
    if (!finishedRef.current) finishedRef.current = true;
    try {
      await controls.start({ opacity: 0, transition: { duration: 0.45 } });
    } catch (e) {}
    if (typeof onFinish === "function") onFinish();
  }, [controls, onFinish]);

  // interaction listeners
  useEffect(() => {
    const onPointer = () => startWarp();
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        startWarp();
      } else if (e.key === "Escape") {
        finish();
      }
    };

    document.addEventListener("pointerdown", onPointer, { once: true });
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onPointer, { once: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [startWarp, finish]);

  // poll finishedRef and auto-finish
  useEffect(() => {
    const id = setInterval(() => {
      if (finishedRef.current) {
        clearInterval(id);
        finish();
      }
    }, 120);
    return () => clearInterval(id);
  }, [finish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#fff",
        overflow: "hidden",
      }}
      role="dialog"
      aria-label="Opening animation"
    >
      {/* canvas starfield */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Skip button (kept) */}
      <button
        onClick={finish}
        aria-label="Skip intro"
        style={{
          position: "fixed",
          right: 18,
          top: 18,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.92)",
          padding: "8px 12px",
          borderRadius: 6,
          cursor: "pointer",
          zIndex: 100000,
          pointerEvents: "auto",
          backdropFilter: "blur(4px)",
        }}
      >
        Skip
      </button>
    </motion.div>
  );
}
