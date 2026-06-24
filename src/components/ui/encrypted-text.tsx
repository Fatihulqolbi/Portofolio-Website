"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

interface EncryptedTextProps {
  text: string;
  speed?: number;
  revealDelayMs?: number;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  animateOn?: "view" | "mount";
}

export function EncryptedText({
  text,
  speed = 50,
  revealDelayMs = 60,
  className = "",
  encryptedClassName = "",
  revealedClassName = "",
  animateOn = "view",
}: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startAnimation = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsAnimating(true);
  }, [hasStarted]);

  // Scramble effect
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealedCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, revealedCount, speed]);

  // Reveal characters one by one
  useEffect(() => {
    if (!isAnimating) return;

    const timeout = setTimeout(() => {
      if (revealedCount < text.length) {
        setRevealedCount((prev) => prev + 1);
      } else {
        setIsAnimating(false);
        setDisplayText(text);
      }
    }, revealDelayMs);

    return () => clearTimeout(timeout);
  }, [isAnimating, revealedCount, text, revealDelayMs]);

  if (animateOn === "view") {
    return (
      <motion.span
        className={className}
        onViewportEnter={() => startAnimation()}
        viewport={{ once: true, margin: "-50px" }}
      >
        {(displayText || text).split("").map((char, i) => (
          <span
            key={i}
            className={i < revealedCount ? revealedClassName : encryptedClassName}
          >
            {char}
          </span>
        ))}
      </motion.span>
    );
  }

  // animateOn === "mount"
  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <span className={className}>
      {(displayText || text).split("").map((char, i) => (
        <span
          key={i}
          className={i < revealedCount ? revealedClassName : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
