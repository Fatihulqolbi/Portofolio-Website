"use client";

import { educationData } from "@/data/siteConfig";
import { Reveal, SectionLabel } from "@/components/ui/Animations";

export default function EducationSection() {
  return (
    <section id="education" className="section-gap">
      <div className="container-main">
        <SectionLabel number="04" text="Education" />

        <Reveal>
          <h2 className="heading-lg mb-12">
            Where I{" "}
            <span className="accent-text">studied</span>.
          </h2>
        </Reveal>

        <div className="max-w-2xl">
          {educationData.map((edu) => (
            <Reveal key={edu.id}>
              <div className="card p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{edu.institution}</h3>
                    <p className="text-sm accent-text">
                      {edu.degree} &mdash; {edu.field}
                    </p>
                  </div>
                  <span className="mono text-xs shrink-0" style={{ color: "var(--color-muted)" }}>
                    {edu.period}
                  </span>
                </div>

                <p className="text-body mb-5">{edu.description}</p>

                <div>
                  <p className="text-sm-muted mb-3">Focus Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.focusAreas.map((area) => (
                      <span key={area} className="tag-neutral">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
