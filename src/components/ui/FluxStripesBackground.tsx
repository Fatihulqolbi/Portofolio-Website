"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * FluxStripesBackground
 * ─────────────────────
 * Pure-CSS animated diagonal stripes — zero canvas, zero per-pixel work.
 * Layers:
 *   1. Thick diagonal stripes (45°) — slow drift
 *   2. Fine counter-diagonal stripes (135°) — faster drift, subtle
 *   3. Aurora gradient that shifts hue over time
 *   4. Travelling glint beam that sweeps the stripes
 *   5. Lightweight mouse-follow radial spotlight
 *   6. Edge vignette
 */
export default function FluxStripesBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── 0. Deep dark navy base ── */}
      <div className="flux-base" />

      {/* ── 1. Aurora gradient (slow colour shift) ── */}
      <div className="flux-aurora" />

      {/* ── 2. Primary thick stripes — drift diagonally ── */}
      <div className="flux-stripes-primary" />

      {/* ── 3. Secondary fine stripes — opposite drift ── */}
      <div className="flux-stripes-secondary" />

      {/* ── 3b. Accent blue-purple stripes ── */}
      <div className="flux-stripes-accent" />

      {/* ── 4. Travelling glint beam ── */}
      <div className="flux-glint" />

      {/* ── 5. Mouse spotlight (very lightweight state update) ── */}
      <div
        className="flux-mouse-spot"
        style={{
          background: `radial-gradient(
            circle 500px at ${mouse.x}% ${mouse.y}%,
            rgba(33, 126, 170, 0.25) 0%,
            rgba(125, 156, 183, 0.10) 40%,
            rgba(60, 30, 120, 0.06) 65%,
            transparent 100%
          )`,
        }}
      />

      {/* ── 6. Edge vignette ── */}
      <div className="flux-vignette" />
    </div>
  );
}
