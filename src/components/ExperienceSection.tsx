"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Reveal, SectionLabel, stagger, staggerChild } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatedFolder } from "@/components/ui/animated-folder";
import { ComicCard } from "@/components/ui/comic-card";
import { experienceData, educationData } from "@/data/siteConfig";

export default function ExperienceSection() {
  const typewriterWords = [
    { text: "What" },
    { text: "I've" },
    { text: "been" },
    { text: "working on.", className: "text-[var(--color-accent)]" },
  ];

  const [activeFolder, setActiveFolder] = useState<"Academic" | "Non-Academic" | null>(null);

  const hoverFolder = (folder: "Academic" | "Non-Academic") => {
    setActiveFolder(folder);
  };

  const cardVariants = {
    hidden: ({ i, folderType }: { i: number; folderType: string }) => {
      // Academic folder is on the left, Non-Academic on the right
      // Depending on screen size, the X offset might need to be responsive, but -200/200 is a good baseline
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const targetX = folderType === "Academic" ? (isMobile ? 0 : -200) : (isMobile ? 0 : 200);
      const targetY = folderType === "Academic" ? (isMobile ? -100 : -250) : (isMobile ? -450 : -250);

      return {
        opacity: 0,
        y: targetY,
        x: targetX,
        scale: 0.1,
        rotate: (1.5 - i) * 15,
        zIndex: 0,
      };
    },
    visible: ({ i }: { i: number }) => ({
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      zIndex: 10,
      transition: { 
        type: "spring" as const, 
        stiffness: 260, 
        damping: 20, 
        delay: i * 0.1 
      }
    }),
    exit: ({ i, folderType }: { i: number; folderType: string }) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const targetX = folderType === "Academic" ? (isMobile ? 0 : -200) : (isMobile ? 0 : 200);
      const targetY = folderType === "Academic" ? (isMobile ? -100 : -250) : (isMobile ? -450 : -250);

      // Wind gathering effect: fly to center, swirl, then get sucked into the folder
      return {
        opacity: [1, 1, 0],
        y: [0, -120, targetY],
        x: [0, (targetX * 0.3), targetX],
        scale: [1, 0.6, 0.1],
        rotate: [0, (i * 60) - 90, (1.5 - i) * 25],
        zIndex: 0,
        transition: { 
          type: "tween" as const,
          duration: 0.6,
          times: [0, 0.6, 1],
          ease: "easeInOut" as const,
          delay: (3 - i) * 0.08 // Staggered pickup by wind
        }
      };
    }
  };

  const [dbExperiences, setDbExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/experiences")
      .then(res => res.json())
      .then(data => setDbExperiences(data))
      .catch(console.error);
  }, []);

  const academicCards = dbExperiences
    .filter(e => e.type === "Academic")
    .map(e => ({
      title: e.title,
      date: e.period,
      imageSrc: e.imageSrc,
      description: e.description,
      logoSrc: e.logoSrc
    }));

  const rawNonAcademicCards = dbExperiences
    .filter(e => e.type === "Non-Academic")
    .map(e => {
      let customContentTop = undefined;

      if (e.title.includes("RDK 46")) {
        customContentTop = (
          <div className="flex flex-col gap-1.5 border border-[var(--color-border)] rounded-md p-2 bg-[rgba(8,10,18,0.5)] relative z-10">
            <p className="text-[10px] text-[var(--color-accent)] font-bold tracking-wider text-center">NOTABLE GUEST SPEAKERS</p>
            <div className="flex justify-center gap-3 items-center w-full mt-2">
              {[
                { name: "Prof. Dr. H. Mahfud MD", img: "/Experiences/non-academic/Pemateri RDK46/Mahfud.png", desc: "Mantan Menko Polhukam RI, Guru Besar Hukum Tata Negara, dan tokoh kebangsaan." },
                { name: "Asma Nadia", img: "/Experiences/non-academic/Pemateri RDK46/Asma Nadia.png", desc: "Penulis, novelis, dan motivator nasional yang sangat menginspirasi." },
                { name: "Dr. Fahruddin Faiz", img: "/Experiences/non-academic/Pemateri RDK46/Fahrudin Faiz.png", desc: "Akademisi, filsuf, dan cendekiawan Muslim yang mendalam." },
                { name: "Gus Ahmad & Ning Shiela", img: "/Experiences/non-academic/Pemateri RDK46/GusAhmad&NingShiela.png", desc: "Pasangan pendakwah muda inspiratif untuk generasi masa kini." },
                { name: "Gus Rifqil & Ning Imaz", img: "/Experiences/non-academic/Pemateri RDK46/GusRifqil&NingImaz.png", desc: "Pasangan pendakwah berfokus pada pendidikan keluarga & nilai keislaman." }
              ].map((speaker, idx) => (
                <div key={idx} className="relative group cursor-help">
                  <div className={`rounded-full overflow-hidden hover:scale-110 transition-transform bg-black ${idx === 0 ? "w-20 h-20 border-[3px] border-[var(--color-accent)] shadow-[0_0_15px_rgba(100,255,218,0.7)]" : "w-16 h-16 border-[2px] border-[var(--color-border-hover)]"}`}>
                    <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover scale-[1.15] mt-1" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 p-3.5 bg-[#0a0c14] border-2 border-[var(--color-accent)] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] flex flex-col gap-1.5 text-center translate-y-2 group-hover:translate-y-0">
                    <strong className="text-[13px] text-[var(--color-accent)] leading-tight">{speaker.name}</strong>
                    <span className="text-[11px] text-gray-300 leading-tight">{speaker.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (e.title.includes("RDK 47")) {
        customContentTop = (
          <div className="flex flex-col gap-1.5 border border-[var(--color-border)] rounded-md p-2 bg-[rgba(8,10,18,0.5)] relative z-10">
            <p className="text-[10px] text-[var(--color-accent)] font-bold tracking-wider text-center">NOTABLE GUEST SPEAKERS</p>
            <div className="flex flex-wrap justify-center gap-2 items-center w-full mt-2">
              {[
                { name: "Prof. Dr. KH. Nasaruddin Umar", img: "/Experiences/non-academic/Pemateri RDK47/NasaruddinUmar.png", desc: "Menteri Agama RI, Imam Besar Masjid Istiqlal, dan cendekiawan Muslim." },
                { name: "Sherly Annavita Rahmi", img: "/Experiences/non-academic/Pemateri RDK47/Sherly.png", desc: "Psikolog, public speaker, dan pemuda inspiratif nasional." },
                { name: "Dr. Emil E. Dardak", img: "/Experiences/non-academic/Pemateri RDK47/EmilDardak.png", desc: "Wakil Gubernur Jatim, akademisi, dan inovator kebijakan publik." },
                { name: "Dr. Fahruddin Faiz", img: "/Experiences/non-academic/Pemateri RDK47/FahrudinFaiz.png", desc: "Akademisi, filsuf, dan cendekiawan Muslim." },
                { name: "Gus Amak & Ning Widad", img: "/Experiences/non-academic/Pemateri RDK47/Gus Amak dan Ning Widad.png", desc: "Pendakwah & inspirator pendidikan keluarga." },
                { name: "Gus Awis", img: "/Experiences/non-academic/Pemateri RDK47/Gus Awis.png", desc: "Pendakwah muda dengan penyampaian komunikatif & inspiratif." },
                { name: "Gus Ahmad Kafabihi", img: "/Experiences/non-academic/Pemateri RDK47/GusAhmad.png", desc: "Tokoh muda penguat spiritualitas dan karakter umat." }
              ].map((speaker, idx) => (
                <div key={idx} className="relative group cursor-help">
                  <div className={`rounded-full overflow-hidden hover:scale-110 transition-transform bg-black border-[2px] ${idx === 0 ? "w-14 h-14 md:w-16 md:h-16 border-[var(--color-accent)] shadow-[0_0_12px_rgba(100,255,218,0.5)]" : "w-12 h-12 md:w-14 md:h-14 border-[var(--color-border-hover)]"}`}>
                    <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover scale-[1.15] mt-1" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-[#0a0c14] border-2 border-[var(--color-accent)] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] flex flex-col gap-1 text-center translate-y-2 group-hover:translate-y-0">
                    <strong className="text-[12px] text-[var(--color-accent)] leading-tight">{speaker.name}</strong>
                    <span className="text-[11px] text-gray-300 leading-tight">{speaker.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      return {
        title: e.title,
        date: e.period,
        imageSrc: e.imageSrc,
        description: e.description,
        logoSrc: e.logoSrc,
        customContentTop
      };
    });

  // Force RDK cards to the top
  const rdkCards = rawNonAcademicCards.filter(c => c.title.includes("RDK"));
  const otherNonAcademicCards = rawNonAcademicCards.filter(c => !c.title.includes("RDK"));
  const nonAcademicCards = [...rdkCards, ...otherNonAcademicCards];

  const academicItems = educationData.map(edu => ({
    text: `${edu.degree} in ${edu.field} at ${edu.institution}`,
    highlighted: true
  }));
  
  educationData[0]?.focusAreas.slice(0, 3).forEach(focus => {
    academicItems.push({ text: `Focus: ${focus}`, highlighted: false });
  });

  dbExperiences.filter(e => e.type === "Academic" && e.imageSrc).forEach(exp => {
    academicItems.push({
      text: `${exp.title} at ${exp.organization}`,
      highlighted: true
    });
  });

  const nonAcademicItems = experienceData.slice(0, 4).map(exp => ({
    text: `${exp.title} at ${exp.organization}`,
    highlighted: true
  }));

  // Append new db experiences to items
  dbExperiences.filter(e => e.type === "Non-Academic" && e.imageSrc).forEach(exp => {
    nonAcademicItems.push({
      text: `${exp.title} at ${exp.organization}`,
      highlighted: true
    });
  });

  return (
    <section id="experience" className="section-gap">
      <div className="container-main">
        <SectionLabel text="Experience" />

        <Reveal>
          <h2 className="heading-lg mb-12">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 max-w-5xl mx-auto mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full md:w-1/2"
          >
            <AnimatedFolder 
              title="Academic" 
              filesCount={academicCards.length} 
              items={academicItems} 
              color="#3b82f6" 
              isActive={activeFolder === "Academic"}
              onHover={() => hoverFolder("Academic")}
              onClick={() => hoverFolder("Academic")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full md:w-1/2"
          >
            <AnimatedFolder 
              title="Non-Academic" 
              filesCount={nonAcademicCards.length} 
              items={nonAcademicItems} 
              color="#fbbf24" // Yellowish color
              isActive={activeFolder === "Non-Academic"}
              onHover={() => hoverFolder("Non-Academic")}
              onClick={() => hoverFolder("Non-Academic")}
            />
          </motion.div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto relative z-20">
          <AnimatePresence mode="wait">
            {activeFolder === "Academic" && (
              <motion.div
                key="academic-cards"
                initial={{ height: 0 }}
                animate={{ height: "auto", transition: { duration: 0.5 } }}
                exit={{ height: 0, transition: { delay: 0.6, duration: 0.4 } }}
                className="overflow-visible"
              >
                <div className="flex flex-wrap justify-center items-stretch gap-8 pt-4 pb-8">
                  {academicCards.map((card, i) => (
                    <motion.div
                      key={i}
                      custom={{ i, folderType: "Academic" }}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex"
                    >
                      <ComicCard {...card} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeFolder === "Non-Academic" && (
              <motion.div
                key="non-academic-cards"
                initial={{ height: 0 }}
                animate={{ height: "auto", transition: { duration: 0.5 } }}
                exit={{ height: 0, transition: { delay: 0.6, duration: 0.4 } }}
                className="overflow-visible"
              >
                <div className="flex flex-wrap justify-center items-stretch gap-8 pt-4 pb-8">
                  {nonAcademicCards.map((card, i) => (
                    <motion.div
                      key={i}
                      custom={{ i, folderType: "Non-Academic" }}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex"
                    >
                      <ComicCard {...card} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
