"use client";

import { ArrowUp } from "lucide-react";
import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTop(); }}
              className="mono text-sm font-semibold cursor-pointer"
              style={{ color: "var(--color-accent)" }}
            >
              {"<Obi />"}
            </a>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              {siteConfig.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
              {siteConfig.role}
            </p>
          </div>

          {/* Center - socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: <GithubIcon size={16} />, href: siteConfig.socials.github, label: "GitHub" },
              { icon: <LinkedinIcon size={16} />, href: siteConfig.socials.linkedin, label: "LinkedIn" },
              { icon: <InstagramIcon size={16} />, href: siteConfig.socials.instagram, label: "Instagram" },
              { icon: <Mail size={16} />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.socials.email}`, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 cursor-pointer"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget).style.color = "var(--color-accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget).style.color = "var(--color-muted)"; }}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              &copy; {new Date().getFullYear()} Obi. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        className="fixed bottom-6 right-6 p-2.5 rounded-lg z-40 cursor-pointer transition-colors duration-200"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-muted-light)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget).style.borderColor = "rgba(100,255,218,0.3)";
          (e.currentTarget).style.color = "var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget).style.borderColor = "var(--color-border)";
          (e.currentTarget).style.color = "var(--color-muted-light)";
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
