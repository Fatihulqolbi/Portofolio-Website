"use client";

import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Terminal } from "@/components/ui/terminal";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RubiksCube } from "@/components/ui/rubik-cube";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// --- Scan state machine ---
type ScanPhase = "idle" | "scanning" | "done";

function PhotoWithScan() {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [scanY, setScanY] = useState(0); // 0..100 percent
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    // Start scanning after short delay
    const startTimer = setTimeout(() => {
      setPhase("scanning");
    }, 600);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;

    let frame: number;
    let start: number | null = null;
    const duration = 1800; // ms for scan to sweep

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setScanY(progress * 100);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase("done");
        // Small delay then show photo
        setTimeout(() => setShowPhoto(true), 200);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  return (
    <motion.div
      className="hero-photo-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Decorative animated elements */}
      <div className="hero-photo-decorations">
        <div className="hero-photo-glow-arc" />
        <div className="hero-float-dot" />
        <div className="hero-float-dot" />
        <div className="hero-float-dot" />
        <div className="hero-float-dot" />
        <div className="hero-float-dot" />
        <div className="hero-float-dot" />
        <div className="hero-geo-line" />
        <div className="hero-geo-line" />
        <div className="hero-geo-line" />
        <div className="hero-orbit-ring" />
        <div className="hero-corner-bracket hero-corner-bracket--tl" />
        <div className="hero-corner-bracket hero-corner-bracket--br" />
      </div>

      {/* ===== Scan overlay ===== */}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            className="hero-scan-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Corner brackets */}
            <span className="scan-corner scan-corner--tl" />
            <span className="scan-corner scan-corner--tr" />
            <span className="scan-corner scan-corner--bl" />
            <span className="scan-corner scan-corner--br" />

            {/* Scan line */}
            {phase === "scanning" && (
              <div
                className="scan-line"
                style={{ top: `${scanY}%` }}
              />
            )}

            {/* Scan HUD labels */}
            <div className="scan-hud-top">
              <span className="scan-label">SCANNING</span>
              <span className="scan-label">{Math.round(scanY)}%</span>
            </div>
            <div className="scan-hud-bottom">
              {phase === "done" && (
                <motion.span
                  className="scan-label accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✓ IDENTITY VERIFIED
                </motion.span>
              )}
            </div>

            {/* Grid overlay while scanning */}
            {phase === "scanning" && (
              <div className="scan-grid-overlay" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Actual Photo ===== */}
      <motion.div
        className="hero-photo-img-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: showPhoto ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 65%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 65%, transparent 100%)",
        }}
      >
        <Image
          src="/profile.png"
          alt="Obi - Muhammad Fatihul Qolbi"
          width={650}
          height={850}
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            width: "100%",
            height: "100%",
            mixBlendMode: "screen",
            filter: "brightness(1.05) contrast(1.1)",
          }}
          priority
        />
      </motion.div>

      <div className="hero-photo-bottom-fade" />
    </motion.div>
  );
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen">

      {/* Photo with scan animation */}
      <PhotoWithScan />

      {/* ===== Main Content ===== */}
      <div className="container-main relative z-10 pt-24 pb-16 flex items-center" style={{ minHeight: "100vh" }}>
        <div className="w-full relative z-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-xl"
          >
            {/* Encrypted greeting */}
            <motion.div variants={item} className="mb-6">
              <EncryptedText
                text="HELLO"
                animateOn="mount"
                speed={40}
                revealDelayMs={80}
                className="mono text-2xl md:text-3xl font-bold tracking-widest uppercase hero-text-readable"
                encryptedClassName="text-[var(--color-muted)]"
                revealedClassName="text-[var(--color-accent)]"
              />
            </motion.div>

            {/* Name */}
            <motion.h1 variants={item} className="heading-xl mb-3 hero-text-readable">
              <EncryptedText text="I'm " animateOn="mount" speed={50} revealDelayMs={100} />
              <EncryptedText text="Obi" animateOn="mount" speed={50} revealDelayMs={100} className="accent-text" />
            </motion.h1>

            {/* Role subtitle */}
            <motion.h2
              variants={item}
              className="hero-text-readable"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                fontWeight: 500,
                color: "var(--color-muted-light)",
                marginBottom: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              <TextGenerateEffect
                words="AI Engineer, Fullstack Developer & IoT Enthusiast"
                delay={0.5}
              />
            </motion.h2>

            {/* Description */}
            <motion.div variants={item} className="space-y-3 mb-8 max-w-lg">
              <div className="text-body hero-text-readable">
                <TextGenerateEffect
                  words="Information Technology student at Institut Teknologi Sepuluh Nopember with strong interests in Artificial Intelligence, scalable web development, and IoT innovation."
                  delay={0.8}
                />
              </div>
              <div className="text-body hero-text-readable">
                <TextGenerateEffect
                  words="Beyond technology, I'm passionate about event management, strategic negotiation, and creating meaningful experiences through collaboration and leadership."
                  delay={1.3}
                />
              </div>
              <div className="text-body hero-text-readable">
                <TextGenerateEffect
                  words="I also enjoy writing as a way to share ideas, stories, and perspectives."
                  delay={1.8}
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
              <HoverBorderGradient
                as="a"
                href="/cv.pdf"
                containerClassName="rounded-full"
                className="flex items-center space-x-2 bg-[var(--color-surface)] text-white font-bold"
                style={{
                  padding: "0.85rem 2.5rem",
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                }}
              >
                <Download size={20} className="mr-2" />
                <span>CV</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                as="a"
                href="https://wa.me/6287759765892"
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="rounded-full"
                className="flex items-center space-x-2 bg-[var(--color-surface)] text-white"
                style={{ padding: "0.75rem 2rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Contact me</span>
              </HoverBorderGradient>
            </motion.div>

            {/* Socials Quadrant and Rubik's Cube */}
            <motion.div variants={item} className="flex items-center gap-12 relative z-20">
              <div className="flex flex-col gap-[6px]">
                <style>{`
                  .social-quadrant {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
                  }
                  .social-quadrant:hover {
                    cursor: pointer;
                    transform: scale(1.08);
                    background-color: var(--color-accent) !important;
                    border-color: var(--color-accent) !important;
                    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.4);
                    z-index: 10;
                  }
                `}</style>
                <div className="flex flex-row gap-[6px]">
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-quadrant group flex items-center justify-center w-[75px] h-[75px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200"
                    style={{ borderRadius: "35px 8px 8px 8px" }}
                  >
                    <div className="text-[var(--color-muted-light)] group-hover:text-[#0a0c14] transition-colors duration-200">
                      <InstagramIcon size={32} />
                    </div>
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="social-quadrant group flex items-center justify-center w-[75px] h-[75px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200"
                    style={{ borderRadius: "8px 35px 8px 8px" }}
                  >
                    <div className="text-[var(--color-muted-light)] group-hover:text-[#0a0c14] transition-colors duration-200">
                      <LinkedinIcon size={32} />
                    </div>
                  </a>
                </div>
                <div className="flex flex-row gap-[6px]">
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="social-quadrant group flex items-center justify-center w-[75px] h-[75px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200"
                    style={{ borderRadius: "8px 8px 8px 35px" }}
                  >
                    <div className="text-[var(--color-muted-light)] group-hover:text-[#0a0c14] transition-colors duration-200">
                      <GithubIcon size={32} />
                    </div>
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.socials.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                    className="social-quadrant group flex items-center justify-center w-[75px] h-[75px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200"
                    style={{ borderRadius: "8px 8px 35px 8px" }}
                  >
                    <div className="text-[var(--color-muted-light)] group-hover:text-[#0a0c14] transition-colors duration-200">
                      <Mail size={32} />
                    </div>
                  </a>
                </div>
              </div>

              {/* Rubik's Cube Companion */}
              <div className="hidden sm:block">
                <RubiksCube />
              </div>
            </motion.div>

            {/* Terminal */}
            <motion.div variants={item} className="mt-12">
              <Terminal
                commands={[
                  "whoami",
                  "cat skills.txt",
                  "echo $STATUS",
                ]}
                outputs={{
                  0: ["Obi | AI Engineer | FullStack Developer | IoT Enthusiast"],
                  1: [
                    "▸ Machine Learning & Deep Learning",
                    "▸ React, Next.js, Node.js",
                    "▸ ESP32, Arduino, MQTT",
                  ],
                  2: ["Open to opportunities ✓"],
                }}
                typingSpeed={45}
                delayBetweenCommands={1200}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          onClick={() => scrollTo("about")}
          className="cursor-pointer"
          style={{ color: "var(--color-muted)" }}
          aria-label="Scroll down"
        >
          <ChevronDown size={20} />
        </button>
      </motion.div>
    </section>
  );
}
