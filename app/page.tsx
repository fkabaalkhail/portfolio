import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AppsSection from "@/components/sections/AppsSection";
import StackSection from "@/components/sections/StackSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AppsSection />
      <StackSection />
      <ExperienceSection />
      <WorkflowSection />
      <CaseStudyGrid />
      <ContactSection />
    </>
  );
}
