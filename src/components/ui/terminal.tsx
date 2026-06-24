"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

let audioCtx: AudioContext | null = null;
const playTypingSound = () => {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.02);
    
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch (err) {
    // Ignore any audio playback errors
  }
};

interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
}

export function Terminal({
  commands,
  outputs = {},
  typingSpeed = 45,
  delayBetweenCommands = 1000,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<
    { type: "command" | "output"; text: string }[]
  >([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines, currentChar]);

  // Typing effect
  useEffect(() => {
    if (currentCommand >= commands.length) {
      setIsTyping(false);
      return;
    }

    const cmd = commands[currentCommand];

    if (currentChar < cmd.length) {
      const timeout = setTimeout(() => {
        playTypingSound();
        setCurrentChar((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    // Command fully typed — add it + outputs, move to next
    const timeout = setTimeout(() => {
      const newLines: { type: "command" | "output"; text: string }[] = [
        { type: "command", text: cmd },
      ];
      const cmdOutputs = outputs[currentCommand];
      if (cmdOutputs) {
        cmdOutputs.forEach((line) => {
          newLines.push({ type: "output", text: line });
        });
      }
      setDisplayedLines((prev) => [...prev, ...newLines]);
      setCurrentChar(0);
      setCurrentCommand((prev) => prev + 1);
    }, delayBetweenCommands);

    return () => clearTimeout(timeout);
  }, [currentCommand, currentChar, commands, outputs, typingSpeed, delayBetweenCommands]);

  const currentTypingText =
    currentCommand < commands.length
      ? commands[currentCommand].slice(0, currentChar)
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-lg rounded-xl overflow-hidden"
      style={{
        background: "transparent",
        border: "none",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "none" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span
          className="mono text-xs ml-2"
          style={{ color: "var(--color-muted)" }}
        >
          Obi
        </span>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="p-4 mono text-sm leading-relaxed overflow-y-auto"
        style={{ maxHeight: "280px", color: "var(--color-muted-light)" }}
      >
        {/* Already completed lines */}
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === "command" ? (
              <div>
                <span style={{ color: "var(--color-accent)" }}>$</span>{" "}
                <span style={{ color: "var(--color-foreground)" }}>{line.text}</span>
              </div>
            ) : (
              <div style={{ color: "var(--color-muted)" }}>{line.text}</div>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {isTyping && currentCommand < commands.length && (
          <div className="mb-1">
            <span style={{ color: "var(--color-accent)" }}>$</span>{" "}
            <span style={{ color: "var(--color-foreground)" }}>
              {currentTypingText}
            </span>
            <span
              style={{
                color: "var(--color-accent)",
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            >
              ▊
            </span>
          </div>
        )}

        {/* Idle cursor after all commands */}
        {!isTyping && (
          <div className="mb-1">
            <span style={{ color: "var(--color-accent)" }}>$</span>{" "}
            <span
              style={{
                color: "var(--color-accent)",
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            >
              ▊
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
