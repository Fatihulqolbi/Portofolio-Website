"use client";

import { useEffect, useRef, useCallback } from "react";

interface BitWaveBackgroundProps {
  color?: string;          // primary glyph color
  glowColor?: string;      // glow / bright-center color
  backgroundColor?: string;
  fontSize?: number;       // px
  speed?: number;          // animation speed multiplier
  opacity?: number;        // base opacity of glyphs
  waveAmplitude?: number;  // amplitude of the wave shape
  waveFrequency?: number;  // spatial frequency of the wave
  mouseInteraction?: boolean;
}

// Bit-wave characters — mix of binary and matrix-style glyphs
const CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン10";

export default function BitWaveBackground({
  color = "#00c896",
  glowColor = "#64ffda",
  backgroundColor = "#060609",
  fontSize = 13,
  speed = 1,
  opacity = 0.55,
  waveAmplitude = 0.38,
  waveFrequency = 1.4,
  mouseInteraction = true,
}: BitWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      // Clear with semi-transparent fill to create trail effect
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      const cols = Math.ceil(w / fontSize) + 2;
      const rows = Math.ceil(h / fontSize) + 2;

      for (let col = 0; col < cols; col++) {
        const x = col * fontSize;

        for (let row = 0; row < rows; row++) {
          const y = row * fontSize;

          // --- Wave shape: determines how bright/visible this cell is ---
          // Normalised column position [0..1]
          const nx = col / cols;
          // Time-animated wave offset
          const waveOffset =
            Math.sin(nx * Math.PI * 2 * waveFrequency + t * 0.8 * speed) *
            waveAmplitude;

          // Normalised row position — 0.5 = centre
          const ny = row / rows - 0.5;

          // How close is this cell to the wave ridge?
          const dist = Math.abs(ny - waveOffset);
          // Secondary wave for more organic feel
          const wave2 =
            Math.sin(
              nx * Math.PI * 3.5 * waveFrequency - t * 0.6 * speed + 1.2
            ) *
            waveAmplitude *
            0.5;
          const dist2 = Math.abs(ny - wave2);

          // Combine both waves
          const influence = Math.max(
            Math.exp(-dist * dist * 18),
            Math.exp(-dist2 * dist2 * 22) * 0.6
          );

          if (influence < 0.02) continue;

          // --- Mouse repulsion / attraction glow ---
          let mouseBoost = 0;
          if (mouseInteraction) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const mdist = Math.sqrt(dx * dx + dy * dy);
            if (mdist < 180) {
              mouseBoost = (1 - mdist / 180) * 0.7;
            }
          }

          // --- Pick a pseudo-random character (stable per cell) ---
          const charSeed =
            Math.floor(
              Math.sin(col * 374.7 + row * 531.1 + Math.floor(t * 3 * speed)) *
                10000
            ) % CHARS.length;
          const char = CHARS[Math.abs(charSeed) % CHARS.length];

          const totalBrightness = Math.min(1, influence + mouseBoost);
          const alpha = totalBrightness * opacity;

          // Bright center cells get the glow color, edges get the base color
          if (totalBrightness > 0.55) {
            ctx.fillStyle = `rgba(100,255,218,${alpha})`;
          } else {
            // Parse the base color channels once conceptually — use static values
            ctx.fillStyle = `rgba(0,200,150,${alpha * 0.85})`;
          }

          ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
          ctx.fillText(char, x, y + fontSize);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, glowColor, backgroundColor, fontSize, speed, opacity, waveAmplitude, waveFrequency, mouseInteraction]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (mouseInteraction) {
      window.addEventListener("mousemove", onMouseMove);
    }

    let last = 0;
    const loop = (ts: number) => {
      const delta = (ts - last) / 1000;
      last = ts;
      timeRef.current += delta;
      draw(ctx, w, h, timeRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      if (mouseInteraction) {
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [draw, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
        background: backgroundColor,
      }}
      aria-hidden="true"
    />
  );
}
