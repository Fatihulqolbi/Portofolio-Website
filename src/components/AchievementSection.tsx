"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Reveal, SectionLabel, stagger, staggerChild } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useState, useEffect } from "react";
import { AchievementSwitch } from "@/components/ui/achievement-switch";
import { AchievementCard } from "@/components/ui/achievement-card";
import { AchievementMoreBtn } from "@/components/ui/achievement-more-btn";

export default function AchievementSection() {
  const [isHighSchool, setIsHighSchool] = useState(true);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/achievements")
      .then(res => res.json())
      .then(data => setAchievements(data))
      .catch(err => console.error(err));
  }, []);

  const highSchoolAchievements = achievements.filter(a => a.category === "High School");
  const universityAchievements = achievements.filter(a => a.category === "University");

  const typewriterWords = [
    { text: "Milestones" },
    { text: "&" },
    { text: "achievements.", className: "text-[var(--color-accent)]" },
  ];

  return (
    <section id="achievements" className="section-gap">
      <div className="container-main">
        <SectionLabel text="Achievements" />

        <Reveal>
          <h2 className="heading-lg mb-4">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
          <p className="text-body max-w-lg mb-12">
            Recognitions, competitions, and milestones along the journey.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 mt-4">
            <AchievementMoreBtn text="Click Switch for More ➔" />
            <AchievementSwitch 
              isHighSchool={isHighSchool} 
              onChange={(val) => setIsHighSchool(val)} 
            />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* We use key={isHighSchool} to remount the animation when switching */}
          <motion.div
            key={isHighSchool ? "hs" : "uni"}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="contents"
          >
            {(isHighSchool ? highSchoolAchievements : universityAchievements).map((item) => (
              <motion.div key={item._id || item.id} variants={staggerChild}>
                <AchievementCard
                  title={item.title}
                  organizer={item.organizer}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  link={item.link}
                  imageClassName={(item as any).imageClassName}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
