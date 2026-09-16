import HeroSection from "@/components/sections/HeroSection";
import AppsSection from "@/components/sections/AppsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AppsSection />
      <ExperienceSection />
      <AboutSection />
      <WorkflowSection />
      <CaseStudyGrid />
      <ContactSection />
    </>
  );
}
