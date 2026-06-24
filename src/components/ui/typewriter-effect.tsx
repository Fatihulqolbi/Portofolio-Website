"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TypewriterWord {
  text: string;
  className?: string;
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Build the complete text with spaces
  const fullText = words.map((w) => w.text).join(" ");

  // Build character spans preserving per-word className
  const characterSpans: { char: string; className?: string }[] = [];
  words.forEach((word, wi) => {
    for (const char of word.text) {
      characterSpans.push({ char, className: word.className });
    }
    // Add space after each word except the last
    if (wi < words.length - 1) {
      characterSpans.push({ char: "\u00A0", className: undefined });
    }
  });

  return (
    <div ref={ref} className={cn("flex items-center", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "fit-content" } : {}}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        <div className="whitespace-nowrap" style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}>
          {characterSpans.map((span, i) => (
            <span key={i} className={span.className}>
              {span.char}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "inline-block rounded-sm w-[3px] h-[1em] ml-1",
          "bg-[var(--color-accent)]",
          cursorClassName
        )}
        style={{
          animation: "blink 1s step-end infinite",
        }}
      />
    </div>
  );
};
