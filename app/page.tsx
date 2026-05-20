import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkflowSection />
      <ProjectsSection />
      <CaseStudyGrid />
    </>
  );
}
