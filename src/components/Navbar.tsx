"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { UiverseContactBtn } from "@/components/ui/UiverseContactBtn";

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const sections = siteConfig.navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        // Adjust the offset slightly so it triggers well
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount to set correct active state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-2 rounded-full overflow-x-auto max-w-full hide-scrollbar"
        style={{
          background: "rgba(12, 14, 20, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); navigate("#home"); }}
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ml-1 mr-1 sm:mr-3 relative group"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="font-mono text-sm font-bold text-white relative z-10">Obi</span>
        </a>

        {siteConfig.navLinks.map((link) => {
          const isActive = active === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); navigate(link.href); }}
              className={`relative px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors z-10 whitespace-nowrap flex-shrink-0 ${
                isActive ? "text-[var(--color-accent)]" : "text-[#8b949e] hover:text-[var(--color-accent)]"
              }`}
            >
              <span className="relative z-20">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full z-10"
                  style={{
                    background: "rgba(100, 255, 218, 0.15)",
                    border: "1px solid rgba(100, 255, 218, 0.5)",
                    boxShadow: "0 2px 12px rgba(100, 255, 218, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          );
        })}

        <div className="ml-2 hidden md:block">
          <UiverseContactBtn />
        </div>
      </motion.nav>
    </div>
  );
}
