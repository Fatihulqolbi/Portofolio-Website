"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData as defaultSkills } from "@/data/siteConfig";
import { Reveal, SectionLabel } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";

const FloatingTriangle = ({ delay, left, top, size = 14 }: { delay: number; left: string; top: string; size?: number }) => (
  <motion.div
    className="absolute w-0 h-0 opacity-20"
    style={{ 
      left, 
      top,
      borderLeft: `${size/2}px solid transparent`,
      borderRight: `${size/2}px solid transparent`,
      borderBottom: `${size}px solid var(--color-accent)`
    }}
    animate={{
      y: [0, -40, 0],
      rotate: [0, 120, 360],
      opacity: [0.1, 0.5, 0.1],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
);

export default function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [skillsData, setSkillsData] = useState(defaultSkills);

  // Fetch from DB
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const rawSkills = await res.json();
          if (rawSkills.length > 0) {
            const grouped: Record<string, any[]> = {};
            rawSkills.forEach((skill: any) => {
              if (!grouped[skill.category]) {
                grouped[skill.category] = [];
              }
              grouped[skill.category].push({ name: skill.name, icon: skill.icon });
            });
            const formatted = Object.keys(grouped).map((cat) => ({
              category: cat,
              items: grouped[cat],
            }));
            setSkillsData(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    }
    fetchSkills();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (skillsData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skillsData.length);
    }, 4500); // Change every 4.5 seconds
    return () => clearInterval(interval);
  }, [skillsData.length]);

  const typewriterWords = [
    { text: "Technologies" },
    { text: "I" },
    { text: "work with.", className: "text-[var(--color-accent)]" },
  ];

  return (
    <section id="skills" className="section-gap relative overflow-hidden">
      {/* Floating Triangles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingTriangle left="15%" top="20%" delay={0} size={16} />
        <FloatingTriangle left="85%" top="15%" delay={2} size={12} />
        <FloatingTriangle left="10%" top="70%" delay={4} size={20} />
        <FloatingTriangle left="90%" top="80%" delay={1} size={14} />
        <FloatingTriangle left="45%" top="10%" delay={5} size={18} />
        <FloatingTriangle left="35%" top="85%" delay={3} size={15} />
        <FloatingTriangle left="75%" top="55%" delay={6} size={22} />
      </div>

      <div className="container-main relative z-10">
        <SectionLabel text="Skills" />

        <Reveal>
          <h2 className="heading-lg mb-4">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
          <p className="text-body max-w-lg mb-12">
            A collection of tools, frameworks, and platforms I use across
            different domains.
          </p>
        </Reveal>

        {/* 3D Auto Slider Container */}
        <Reveal delay={0.2}>
          <motion.div 
            className="relative max-w-5xl mx-auto rounded-3xl p-6 md:p-10 flex flex-col md:flex-row overflow-hidden"
            style={{ background: "rgba(22, 22, 22, 0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            animate={{
              boxShadow: [
                "20px 20px 60px rgba(0,0,0,0.5), -20px -20px 60px rgba(255,255,255,0.02)",
                "20px 20px 60px rgba(100,255,218,0.08), -20px -20px 60px rgba(255,255,255,0.02)",
                "20px 20px 60px rgba(0,0,0,0.5), -20px -20px 60px rgba(255,255,255,0.02)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Left Vertical Label */}
            <div className="hidden md:flex flex-col items-center justify-center border-r border-gray-800 pr-8 mr-8">
               <h3 className="text-gray-400 font-medium tracking-[0.3em] uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                 Skills
               </h3>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex flex-col justify-center min-h-[380px] md:min-h-[350px]">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left" style={{ color: "var(--color-accent)" }}>
                What I do
              </h3>
              <div className="text-gray-400 text-sm md:text-base mb-8 text-center md:text-left max-w-2xl min-h-[48px]">
                <TextGenerateEffect 
                  words="I am passionate about leveraging these technologies to build robust applications and intelligent systems."
                  delay={0.3}
                />
              </div>

              {/* Slider Content */}
              <div className="relative h-[240px] md:h-[200px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <h4 className="text-white text-lg font-medium mb-4 text-center md:text-left">
                      {skillsData[currentIndex].category}
                    </h4>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      {skillsData[currentIndex].items.map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: idx * 0.08 
                          }}
                        >
                          <CardContainer containerClassName="m-0 p-0 w-24 h-24 md:w-28 md:h-28" className="w-full h-full">
                            <CardBody
                              className="group flex flex-col items-center justify-center rounded-2xl w-full h-full relative cursor-pointer border border-transparent hover:border-[var(--color-accent)] transition-all duration-300"
                              style={{
                                background: "rgba(28, 28, 28, 0.78)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                boxShadow: "6px 6px 12px rgba(0,0,0,0.5), -6px -6px 12px rgba(255,255,255,0.05)",
                              }}
                            >
                              <CardItem translateZ={35} className="w-10 h-10 md:w-12 md:h-12 relative mb-3 bg-[#e4e4e9] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(100,255,218,0.4)] rounded-xl flex items-center justify-center shadow-inner transition-all duration-300">
                                <Image
                                  src={skill.icon}
                                  alt={skill.name}
                                  fill
                                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                />
                              </CardItem>
                              <CardItem translateZ={20} className="w-full flex justify-center mt-1">
                                <span className="text-[10px] md:text-xs font-semibold text-gray-300 group-hover:text-[var(--color-accent)] uppercase tracking-wider text-center px-1 leading-tight line-clamp-2 transition-colors duration-300">
                                  {skill.name}
                                </span>
                              </CardItem>
                            </CardBody>
                          </CardContainer>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls (Bottom) */}
              <div className="flex items-center justify-between mt-8 md:mt-12">
                <div className="flex gap-2">
                  {skillsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: currentIndex === idx ? "24px" : "12px",
                        background: currentIndex === idx ? "var(--color-accent)" : "#333",
                        boxShadow: currentIndex === idx ? "0 0 10px var(--color-accent)" : "none"
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + skillsData.length) % skillsData.length)}
                    className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:text-[#060609] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % skillsData.length)}
                    className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-gray-400 hover:text-[#060609] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
