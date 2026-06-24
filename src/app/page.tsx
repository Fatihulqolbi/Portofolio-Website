import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementSection from "@/components/AchievementSection";
import WritingSection from "@/components/WritingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FluxStripesBackground from "@/components/ui/FluxStripesBackground";

export default function Home() {
  return (
    <>
      {/* Fixed full-screen Flux Stripes — lightweight CSS animation */}
      <FluxStripesBackground />

      {/* All page content sits above the canvas */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementSection />
        <WritingSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
