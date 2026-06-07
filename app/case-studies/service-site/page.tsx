import { Metadata } from "next";
import ServiceHero from "@/components/service-site/ServiceHero";
import ServiceGrid from "@/components/service-site/ServiceGrid";
import BookingFlow from "@/components/service-site/BookingFlow";
import ServiceContact from "@/components/service-site/ServiceContact";

export const metadata: Metadata = {
  title: "Fahad Dev Studio – Service Site",
  description: "Freelance tech consulting & development services",
};

export default function ServiceSitePage() {
  return (
    <div className="min-h-screen">
      <ServiceHero />
      <ServiceGrid />
      <BookingFlow />
      <ServiceContact />
      <footer className="py-8 text-center text-white/30 text-sm border-t border-white/[0.06]">
        Designed by Fahad Aba-Alkhail
      </footer>
    </div>
  );
}
