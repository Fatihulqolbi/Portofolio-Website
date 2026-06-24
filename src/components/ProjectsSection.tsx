"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projectCategories } from "@/data/siteConfig";
import { Reveal, SectionLabel } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Highlight } from "@/components/ui/hero-highlight";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const typewriterWords = [
    { text: "Some" },
    { text: "things" },
    { text: "I've" },
    { text: "built.", className: "text-[var(--color-accent)]" },
  ];

  return (
    <section id="projects" className="section-gap">
      <div className="container-main">
        <SectionLabel text="Projects" />

        <Reveal>
          <h2 className="heading-lg mb-4">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
          <p className="text-body max-w-lg mb-10">
            A selection of projects across{" "}
            <Highlight className="text-[var(--color-foreground)] font-medium">AI</Highlight>,{" "}
            <Highlight className="text-[var(--color-foreground)] font-medium">web development</Highlight>, and{" "}
            <Highlight className="text-[var(--color-foreground)] font-medium">IoT</Highlight>.
          </p>
        </Reveal>

        {/* CSS STYLES FOR PROJECT CARD AND BUTTONS */}
        <style>{`
          /* Filter Buttons */
          .project-filter-btn {
            background: transparent;
            border: 1px solid var(--color-border);
            padding: 10px 20px;
            display: inline-block;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            min-width: 120px;
            text-transform: uppercase;
            cursor: pointer;
            transform: skew(-21deg);
            position: relative;
            overflow: hidden;
            color: var(--color-muted);
            transition: all 0.3s;
            z-index: 1;
          }
          .project-filter-btn span {
            display: inline-block;
            transform: skew(21deg);
          }
          .project-filter-btn::before {
            content: '';
            position: absolute;
            top: 0; bottom: 0; right: 100%; left: 0;
            background: var(--color-accent);
            opacity: 0; z-index: -1; transition: all 0.5s;
          }
          .project-filter-btn:hover, .project-filter-btn.active {
            color: #0a0c14; border-color: var(--color-accent);
          }
          .project-filter-btn:hover::before, .project-filter-btn.active::before {
            left: 0; right: 0; opacity: 1;
          }

          /* 3D Flip Card Container */
          .proj-container {
            width: 100%;
            height: 380px;
            perspective: 1200px;
          }
          .proj-card {
            height: 100%; width: 100%;
            background-color: var(--color-surface);
            position: relative;
            transition: transform 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            border-radius: 1.5rem;
          }
          .proj-container:hover > .proj-card {
            cursor: pointer;
            transform: rotateY(180deg) rotateZ(180deg);
          }
          .proj-front, .proj-back {
            height: 100%; width: 100%;
            border-radius: 1.5rem;
            position: absolute;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            backface-visibility: hidden;
            border: 1px solid var(--color-border);
            overflow: hidden;
          }
          .proj-front {
            display: flex; justify-content: center; align-items: center;
          }
          .proj-back {
            transform: rotateY(180deg) rotateZ(180deg);
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            background: rgba(10, 12, 20, 0.95);
            border-color: var(--color-accent);
            padding: 1.5rem;
          }
          .proj-back-heading {
            font-size: 20px; font-weight: bold; color: var(--color-accent); text-align: center;
            margin-bottom: 12px;
          }

          /* Tech Stack Button */
          .btn-donate {
            --btn-bg-1: rgba(100, 255, 218, 0.2);
            --btn-bg-2: rgba(100, 255, 218, 0.05);
            --btn-bg-color: var(--color-accent);
            --radii: 0.5em;
            cursor: pointer;
            padding: 0.5em 1em;
            font-size: 11px;
            font-weight: 600;
            transition: 0.8s;
            background-size: 280% auto;
            background-image: linear-gradient(325deg, var(--btn-bg-2) 0%, var(--btn-bg-1) 55%, var(--btn-bg-2) 90%);
            border: 1px solid rgba(100, 255, 218, 0.3);
            border-radius: var(--radii);
            color: var(--btn-bg-color);
            box-shadow: 0px 0px 10px rgba(100, 255, 218, 0.1), inset 2px 2px 4px rgba(100, 255, 218, 0.1);
          }
          .btn-donate:hover { background-position: right top; border-color: var(--color-accent); }

          /* Category Auto-Animating Button */
          @keyframes catDropOut {
            0%, 45% { transform: translateY(0); opacity: 1; }
            50%, 95% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes catDropIn {
            0%, 45% { transform: translateY(-20px); opacity: 0; }
            50%, 95% { transform: translateY(0px); opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0; }
          }
          .cat-btn {
            display: flex; align-items: center; justify-content: center; height: 32px; position: relative; padding: 0 12px;
            font-size: 11px; text-transform: uppercase; border: 0;
            box-shadow: rgba(100, 255, 218, 0.4) 0px 4px 0px 0px;
            background-color: rgba(100, 255, 218, 0.9);
            border-radius: 8px; overflow: hidden;
          }
          .cat-btn:before {
            content: attr(data-alt); display: flex; align-items: center; justify-content: center; position: absolute; inset: 0;
            font-size: 11px; font-weight: bold; color: #000; letter-spacing: 1px;
            animation: catDropOut 4s infinite;
          }
          .cat-btn i {
            color: #000; font-size: 11px; font-weight: bold; letter-spacing: 1px; font-style: normal; opacity: 0;
            animation: catDropIn 4s infinite;
          }

          /* Status Button */
          .status-btn {
            position: relative; transition: all 0.3s ease-in-out;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
            padding: 4px 12px; border-radius: 9999px;
            display: flex; align-items: center; justify-content: center;
            color: #fff; gap: 6px; font-weight: bold;
            border: 2px solid rgba(255, 255, 255, 0.2);
            outline: none; overflow: hidden; font-size: 11px; text-transform: uppercase;
          }
          .status-completed { background-color: #10b981; } /* Green */
          .status-ongoing { background-color: #f59e0b; } /* Yellow */
          .status-btn:hover { transform: scale(1.05); border-color: rgba(255,255,255,0.5); }
          .status-btn::before {
            content: ""; position: absolute; width: 50px; height: 100%;
            background-image: linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6), rgba(255,255,255,0) 70%);
            top: 0; left: -100px; opacity: 0.6; animation: shine 2s ease-out infinite;
          }
          @keyframes shine { 0% { left: -100px; } 60%, 100% { left: 100%; } }

          /* Github/Link Button */
          .link-btn {
            width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
            border: none; background-color: transparent; position: relative; border-radius: 7px;
            cursor: pointer; transition: all .3s;
          }
          .link-btn .svgContainer {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
            background-color: transparent; border-radius: 10px; transition: all .3s;
            border: 1px solid rgba(156, 156, 156, 0.4);
            color: white;
          }
          .link-btn .BG {
            position: absolute; content: ""; width: 100%; height: 100%; background: #181818; z-index: -1;
            border-radius: 10px; pointer-events: none; transition: all .3s;
          }
          .link-btn:hover .BG { transform: rotate(35deg); transform-origin: bottom; }
          .link-btn:hover .svgContainer { background-color: rgba(100, 255, 218, 0.2); border-color: var(--color-accent); color: var(--color-accent); }
        `}</style>

        {/* Filter Buttons */}
        <Reveal>
          <div className="flex flex-wrap gap-4 mb-10 pl-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`project-filter-btn ${filter === cat ? "active" : ""}`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, index) => (
                <motion.div
                  key={project._id ? String(project._id) : `proj-${index}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="proj-container">
                    <div className="proj-card">
                      
                      {/* FRONT */}
                      <div className="proj-front">
                        <div className="w-full h-full relative bg-[#0a0c14]">
                          {(project.imageSrc || project.image) ? (
                            <img src={project.imageSrc || project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-surface)] opacity-50">
                              <span className="text-[var(--color-muted)] font-mono mb-2">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                          
                          {/* Top Elements */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <button className="cat-btn" data-alt={project.category}>
                              {project.category.split("").map((char: string, i: number) => (
                                <i key={i} style={{ animationDelay: `${i * 0.045}s` }}>
                                  {char === " " ? "\u00A0" : char}
                                </i>
                              ))}
                            </button>
                            
                            {project.status && (
                              <div className={`status-btn ${project.status.toLowerCase() === "completed" ? "status-completed" : "status-ongoing"}`}>
                                {project.status}
                              </div>
                            )}
                          </div>
                          
                          {/* Bottom Title */}
                          <div className="absolute bottom-6 left-0 right-0 px-6">
                            <h3 className="text-xl md:text-2xl font-bold text-white text-center leading-tight drop-shadow-lg">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="proj-back overflow-y-auto custom-scrollbar">
                        <h3 className="proj-back-heading">{project.title}</h3>
                        <p className="text-xs md:text-sm text-gray-300 text-center mb-6 leading-relaxed flex-grow">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                          {project.techStack?.map((tech: string) => (
                            <button key={tech} className="btn-donate">{tech}</button>
                          ))}
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-auto">
                          {(project.githubUrl || project.liveUrl) && (
                            <a href={project.githubUrl || project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
                              <div className="svgContainer"><GithubIcon size={22} /></div>
                              <div className="BG"></div>
                            </a>
                          )}
                        </div>
                      </div>
                      
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
