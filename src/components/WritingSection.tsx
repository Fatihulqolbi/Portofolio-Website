"use client";

import { motion } from "framer-motion";
import { PenLine, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel, stagger, staggerChild } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useState, useEffect } from "react";
import { WritingDropdown } from "@/components/ui/writing-dropdown";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function WritingSection() {
  const [selectedCategory, setSelectedCategory] = useState("Essay");
  const [writings, setWritings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/writings")
      .then(res => res.json())
      .then(data => setWritings(data))
      .catch(err => console.error(err));
  }, []);

  const typewriterWords = [
    { text: "Ideas," },
    { text: "stories" },
    { text: "&" },
    { text: "perspectives.", className: "text-[var(--color-accent)]" },
  ];

  const filteredWritings = writings.filter(item => item.category === selectedCategory);

  return (
    <section id="writing" className="section-gap">
      <div className="container-main">
        <SectionLabel text="Writing" />

        <Reveal>
          <h2 className="heading-lg mb-4">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
          <p className="text-body max-w-lg mb-12">
            A collection of articles, essays, and written works sharing thoughts on technology, life, and everything in between.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex justify-start">
            <WritingDropdown 
              selected={selectedCategory} 
              onSelect={(cat) => setSelectedCategory(cat)} 
            />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mt-8 mx-auto">
          <style>{`
            .flip-card {
              background-color: transparent;
              width: 250px;
              height: 360px;
              perspective: 1200px;
            }
            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              text-align: center;
              transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform-style: preserve-3d;
            }
            .flip-card:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
            .flip-card-front, .flip-card-back {
              box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid var(--color-border);
            }
            .flip-card-front {
              background: var(--color-surface);
              display: flex;
              flex-direction: column;
            }
            .flip-card-back {
              background: #0a0c14;
              transform: rotateY(180deg);
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              padding: 1.5rem;
              border: 1px solid var(--color-accent);
              box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
            }
          `}</style>
          <motion.div
            key={selectedCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="contents"
          >
            {filteredWritings.length > 0 ? (
              filteredWritings.map((item, idx) => (
                <motion.div key={item._id ? String(item._id) : `writ-${idx}`} variants={staggerChild} className="flip-card cursor-pointer">
                <div className="flip-card-inner">
                  
                  {/* FRONT */}
                  <div className="flip-card-front">
                    {item.imageSrc ? (
                      <div className="w-full flex-grow relative bg-[#0a0c14]">
                        <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover opacity-90 absolute inset-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] to-transparent opacity-80" />
                      </div>
                    ) : (
                      <div className="w-full flex-grow flex items-center justify-center bg-[var(--color-accent-dim)]">
                        <PenLine size={40} className="text-[var(--color-accent)] opacity-50" />
                      </div>
                    )}
                    <div className="w-full shrink-0 flex items-center justify-center p-4 bg-[#0a0c14] border-t border-[var(--color-border)] min-h-[35%]">
                      <h3 className="text-sm font-bold text-center leading-snug">{item.title}</h3>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="flip-card-back overflow-y-auto custom-scrollbar">
                    <div className="flex gap-2 items-center mb-3 shrink-0">
                      <span className="tag text-[10px] py-0.5 px-2">{item.category}</span>
                    </div>
                    
                    <h3 className="text-xs font-bold text-[var(--color-accent)] mb-3 leading-tight shrink-0">
                      {item.title}
                    </h3>
                    
                    <p className="text-[11px] text-gray-300 mb-4 leading-relaxed flex-grow text-center">
                      {item.excerpt}
                    </p>

                    {item.link && item.link !== "#" && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-md hover:bg-[var(--color-accent)] hover:text-[#0a0c14] transition-all font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                      >
                        Read Article <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                  
                </div>
              </motion.div>
            ))
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center w-full flex justify-center"
              >
                <style>{`
                  .coming-soon-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 40px;
                    margin: 40px auto;
                    min-width: 300px;
                  }

                  .coming-soon-wrapper::before,
                  .coming-soon-wrapper::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #ffffff, transparent);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
                    animation: pulse-line 3s ease-in-out infinite;
                  }

                  .coming-soon-wrapper::before { top: 0; }
                  .coming-soon-wrapper::after { bottom: 0; }

                  @keyframes pulse-line {
                    0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
                    50% { opacity: 1; transform: scaleX(1); }
                  }

                  .coming-soon-text {
                    font-size: 2.5rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }

                  @media (min-width: 768px) {
                    .coming-soon-text {
                      font-size: 4rem;
                    }
                  }

                  .coming-soon-text::before {
                    content: "COMING SOON";
                    color: #fff;
                    text-shadow: 0 5px 15px rgba(255,255,255,0.3);
                    animation: glitch-content 4s infinite;
                    white-space: nowrap;
                  }

                  @keyframes glitch-content {
                    0% { content: "###########"; text-shadow: 0 0 10px #fff; }
                    2% { content: "..........."; text-shadow: 0 0 10px #fff; }
                    5% { content: "_[^[_[^[_[^"; text-shadow: 0 0 10px #fff; }
                    7% { content: "-!-!-!-!-!-"; text-shadow: 0 0 10px #fff; }
                    10% { content: "#$_#$_#$_#$"; text-shadow: 0 0 10px #fff; }
                    12% { content: "XOXOXOXOXOX"; text-shadow: 0 0 10px #fff; }
                    15% { content: "#[+.#[+.#[+"; text-shadow: 0 0 10px #fff; }
                    17% { content: "@]-?@]-?@]-"; text-shadow: 0 0 10px #fff; }
                    20% { content: "?[4@%?[4@%?"; text-shadow: 0 0 10px #fff; }
                    22% { content: "=.,^!=.,^!="; text-shadow: 0 0 10px #fff; }
                    25% { content: "?2@%?2@%?2@"; text-shadow: 0 0 10px #fff; }
                    27% { content: "10101010101"; text-shadow: 0 0 10px #fff; }
                    30% { content: "?[%:%?[%:%?"; text-shadow: 0 0 10px #fff; }
                    32% { content: "|[f[4|[f[4|"; text-shadow: 0 0 10px #fff; }
                    35% { content: "[4%0%[4%0%["; text-shadow: 0 0 10px #fff; }
                    37% { content: "-0_0-0_0-0_"; text-shadow: 0 0 10px #fff; }
                    40% { content: "[0%[0%[0%[0"; text-shadow: 0 0 10px #fff; }
                    42% { content: "+><+><+><+>"; text-shadow: 0 0 10px #fff; }
                    45% { content: "44444444444"; text-shadow: 0 0 10px #fff; }
                    47% { content: "22222222222"; text-shadow: 0 0 10px #fff; }
                    49.9% { content: "22222222222"; text-shadow: 0 0 10px #fff; }
                    50%, 100% { content: "COMING SOON"; text-shadow: 0 5px 15px rgba(255,255,255,0.3); }
                  }
                `}</style>
                <div className="coming-soon-wrapper">
                  <h3 className="coming-soon-text" aria-label="Coming Soon"></h3>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
