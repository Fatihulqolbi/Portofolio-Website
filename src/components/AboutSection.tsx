"use client";

import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import Image from "next/image";

const defaultDraggableItems = [
  { id: 1, image: "/About me/1.jpeg", className: "absolute top-[5%] left-[5%] rotate-[-5deg] w-48 md:w-72 z-10" },
  { id: 2, image: "/About me/2.jpeg", className: "absolute top-[40%] left-[10%] rotate-[6deg] w-56 md:w-80 z-20" },
  { id: 3, image: "/About me/3.jpeg", className: "absolute top-[20%] left-[25%] rotate-[-8deg] w-64 md:w-96 z-30" },
  { id: 4, image: "/About me/4.jpeg", className: "absolute top-[55%] left-[20%] rotate-[4deg] w-48 md:w-72 z-10" },
  { id: 5, image: "/About me/5.jpeg", className: "absolute top-[10%] left-[45%] rotate-[-3deg] w-64 md:w-96 z-20" },
  { id: 6, image: "/About me/6.jpeg", className: "absolute top-[50%] left-[40%] rotate-[7deg] w-56 md:w-80 z-30" },
  { id: 7, image: "/About me/7.jpeg", className: "absolute top-[5%] left-[65%] rotate-[-6deg] w-48 md:w-72 z-10" },
  { id: 8, image: "/About me/8.jpeg", className: "absolute top-[45%] left-[60%] rotate-[5deg] w-56 md:w-80 z-20" },
  { id: 9, image: "/About me/9.jpeg", className: "absolute top-[70%] left-[50%] rotate-[-4deg] w-64 md:w-96 z-30" },
  { id: 10, image: "/About me/10.jpeg", className: "absolute top-[20%] left-[80%] rotate-[3deg] w-56 md:w-80 z-10" },
  { id: 11, image: "/About me/11.jpeg", className: "absolute top-[60%] left-[75%] rotate-[-7deg] w-64 md:w-96 z-20" },
  { id: 12, image: "/About me/12.jpeg", className: "absolute top-[5%] left-[85%] rotate-[6deg] w-48 md:w-72 z-30" },
  { id: 13, image: "/About me/13.jpeg", className: "absolute top-[75%] left-[10%] rotate-[-5deg] w-56 md:w-80 z-20" },
  { id: 14, image: "/About me/14.jpeg", className: "absolute top-[75%] left-[80%] rotate-[4deg] w-48 md:w-72 z-10" },
  { id: 15, image: "/About me/15.jpeg", className: "absolute top-[35%] left-[5%] rotate-[-4deg] w-64 md:w-96 z-30" },
  { id: 16, image: "/About me/16.jpeg", className: "absolute top-[25%] left-[45%] rotate-[8deg] w-56 md:w-80 z-10" },
  { id: 17, image: "/About me/17.jpeg", className: "absolute top-[80%] left-[35%] rotate-[-6deg] w-48 md:w-72 z-20" },
  { id: 18, image: "/About me/18.jpeg", className: "absolute top-[10%] left-[20%] rotate-[5deg] w-56 md:w-80 z-30" },
];

import { useState, useEffect } from "react";

function DraggableGallery() {
  const [photos, setPhotos] = useState<any[]>(defaultDraggableItems);

  useEffect(() => {
    fetch("/api/photos")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setPhotos(data);
      })
      .catch(err => console.error("Failed to fetch photos:", err));
  }, []);

  return (
    <Reveal delay={0.2}>
      <DraggableCardContainer className="relative flex min-h-[600px] md:min-h-[800px] w-full items-center justify-center overflow-hidden rounded-3xl mb-16 border border-[rgba(100,255,218,0.08)]" style={{ background: "rgba(10, 10, 16, 0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
        <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-1/2 text-center text-xl font-bold tracking-wider select-none pointer-events-none" style={{ color: "rgba(100,255,218,0.18)" }}>
          Drag around to explore my moments
        </p>
        {photos.map((item, index) => (
          <DraggableCardBody key={item._id || item.id || index} className={item.className}>
            <div className="p-2 md:p-3 bg-white rounded-xl shadow-2xl">
              <Image
                src={item.image}
                alt={`Moment ${index + 1}`}
                width={500}
                height={500}
                className="pointer-events-none rounded-lg object-cover w-full h-auto"
              />
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </Reveal>
  );
}

export default function AboutSection() {
  const typewriterWords = [
    { text: "A" },
    { text: "brief" },
    { text: "intro" },
    { text: "about" },
    { text: "who I am.", className: "text-[var(--color-accent)]" },
  ];

  return (
    <section id="about" className="section-gap">
      <div className="container-main">
        <SectionLabel text="About Me" />

        <Reveal>
          <h2 className="heading-lg mb-8">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
        </Reveal>

        <div className="max-w-3xl">
        <Reveal>
            <div
              className="space-y-4 text-body mb-12"
              style={{
                background: "rgba(6, 6, 9, 0.62)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: "12px",
                padding: "1.5rem 1.75rem",
                border: "1px solid rgba(28,28,40,0.6)",
              }}
            >
              <p>
                I&apos;m <strong style={{ color: "var(--color-foreground)" }}>Muhammad Fatihul Qolbi Ash Shiddiqi</strong>, 
                but most people call me <strong style={{ color: "var(--color-accent)" }}>Obi</strong>. 
                An Information Technology student at Institut Teknologi Sepuluh Nopember 
                who is passionate about AI Engineering, Fullstack Development, and Internet of Things.
              </p>
              <p>
                I love building intelligent and impactful digital solutions, from developing scalable applications 
                to exploring smart systems and connected technologies.
              </p>
              <p>
                Beyond the technical world, I&apos;m deeply interested in organization, event management, negotiation, 
                and leadership. I enjoy working with people, managing ideas, and creating experiences that bring 
                value to communities and teams.
              </p>
              <p style={{ color: "var(--color-foreground)", fontWeight: 500 }}>
                For me, growth comes not only from technology, but also from communication, collaboration, 
                and meaningful connections.
              </p>
            </div>
          </Reveal>

          {/* Draggable Photo Gallery */}
          <DraggableGallery />

          {/* Education */}
          <Reveal delay={0.1}>
            <h3 className="text-sm-muted mb-6">Education</h3>
            <div className="space-y-4">
              {/* ITS */}
              <div
                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Image
                    src="/Badge_ITS.png"
                    alt="Institut Teknologi Sepuluh Nopember"
                    width={44}
                    height={44}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h4 className="text-base font-semibold">
                      Institut Teknologi Sepuluh Nopember
                    </h4>
                    <span
                      className="mono text-xs shrink-0"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Jul 2024 - Jun 2028 (Expected)
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                    Bachelor of Information Technology
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                    Surabaya, Indonesia
                  </p>
                </div>
              </div>

              {/* SMAN 2 Lumajang */}
              <div
                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Image
                    src="/logo-smada-lumajang.png"
                    alt="SMAN 2 Lumajang"
                    width={44}
                    height={44}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h4 className="text-base font-semibold">
                      SMAN 2 Lumajang
                    </h4>
                    <span
                      className="mono text-xs shrink-0"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Jul 2021 - May 2024
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                    High School Diploma in MIPA
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                    88.13 / 100.00 &middot; Lumajang, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
