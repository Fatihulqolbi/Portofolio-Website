"use client";

import React from "react";
import Image from "next/image";

interface ComicCardProps {
  title: string;
  date: string;
  imageSrc: string;
  description: string;
  logoSrc?: string;
  logoClassName?: string;
  customImageNode?: React.ReactNode;
  customContentTop?: React.ReactNode;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  title,
  date,
  imageSrc,
  description,
  logoSrc = "/Badge_ITS.png",
  logoClassName = "object-contain p-1.5",
  customImageNode,
  customContentTop,
}) => {
  return (
    <>
      <style>{`
        .comic-card-wrapper {
          --paper: var(--color-surface); /* Dark surface */
          --primary: rgba(100, 255, 218, 0.15); /* Dim green */
          --accent: #64ffda; /* Hacker Green */
          --shadow: rgba(33, 126, 170, 0.8); /* Cyber Blue */
          --ink: #64ffda; /* Hacker green outlines */
          --text: var(--color-foreground);
          --border-stroke: 2px;
          --dot-color: rgba(100, 255, 218, 0.05);

          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 460px;
          background-color: var(--paper);
          border: var(--border-stroke) solid var(--ink);
          border-radius: 0.5em;
          padding: 1.2em;
          box-shadow: 0.5em 0.5em 0 var(--shadow);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          transform-origin: bottom left;
          font-family: var(--font-mono);
          margin-bottom: 20px;
          height: auto;
        }

        .comic-card-wrapper:hover {
          transform: translateY(-0.6em) rotate(-2deg);
          box-shadow: 0.8em 0.8em 0 0.1em var(--accent);
        }

        .comic-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1em;
        }

        .comic-card-avatar {
          width: 3.5em;
          height: 3.5em;
          border-radius: 50%;
          background: white;
          border: var(--border-stroke) solid var(--ink);
          flex-shrink: 0;
          transition: transform 0.3s ease;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .comic-card-wrapper:hover .comic-card-avatar {
          transform: scale(1.1) rotate(5deg);
        }

        .comic-card-user-info {
          margin-left: 0.8em;
          text-transform: uppercase;
        }

        .comic-card-title {
          margin: 0;
          font-size: 0.9em;
          font-weight: bold;
          color: var(--accent);
          background-color: var(--primary);
          padding: 0.3em 0.8em;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
          letter-spacing: 1px;
          line-height: 1.4;
        }

        .comic-card-date {
          margin: 0.4em 0 0 0.4em;
          font-size: 0.75em;
          color: var(--text);
          font-weight: 300;
          letter-spacing: 2px;
          opacity: 0.8;
        }

        .comic-card-image-container {
          width: 100%;
          height: 12em;
          border-radius: 0.2em;
          border: var(--border-stroke) solid var(--ink);
          overflow: hidden;
          background-color: var(--paper);
          background-image: radial-gradient(circle, var(--dot-color) 2px, transparent 2px);
          background-size: 10px 10px;
          transition: transform 0.3s ease;
          position: relative;
        }

        .comic-card-wrapper:hover .comic-card-image-container {
          transform: skewX(-2deg) scale(1.02);
        }

        .comic-card-caption {
          position: relative;
          margin: 1.2em 0 0 0;
          padding: 0.8em 1em;
          background-color: var(--paper);
          border: var(--border-stroke) solid var(--ink);
          border-radius: 0.5em;
          font-size: 0.85em;
          line-height: 1.5;
          color: var(--text);
          font-family: var(--font-sans);
        }

        .comic-card-caption::after {
          content: "";
          position: absolute;
          top: -0.6em;
          left: 1.5em;
          width: 0;
          height: 0;
          border: 0.5em solid var(--ink);
          border-color: transparent transparent var(--ink) transparent;
        }

        .comic-card-caption::before {
          content: "";
          position: absolute;
          top: -0.4em;
          left: 1.6em;
          width: 0;
          height: 0;
          border: 0.4em solid var(--paper);
          border-color: transparent transparent var(--paper) transparent;
          z-index: 1;
        }
      `}</style>
      <div className="comic-card-wrapper">
        <div className="comic-card-header">
          <div className="comic-card-avatar relative">
            <Image
              src={logoSrc}
              alt="Logo"
              fill
              className={logoClassName}
            />
          </div>
          <div className="comic-card-user-info">
            <h3 className="comic-card-title">{title}</h3>
            <p className="comic-card-date">{date}</p>
          </div>
        </div>

        <div className="card-content flex flex-col gap-3">
          {customContentTop}
          <div className="comic-card-image-container relative">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={`object-cover transition-opacity ${customImageNode ? "opacity-30 mix-blend-luminosity" : "opacity-100 hover:scale-105"}`}
            />
            {customImageNode && (
              <div className="absolute inset-0 z-10">
                {customImageNode}
              </div>
            )}
          </div>
          <div className="comic-card-caption mt-0">{description}</div>
        </div>
      </div>
    </>
  );
};
