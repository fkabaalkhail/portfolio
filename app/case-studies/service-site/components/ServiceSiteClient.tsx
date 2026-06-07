"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ServiceHero from "./ServiceHero";
import ServiceGrid from "./ServiceGrid";
import AboutSection from "./AboutSection";
import BookingSection from "./BookingSection";
import ContactSection from "./ContactSection";

export default function ServiceSiteClient() {
  return (
    <div className="min-h-screen bg-black">
      {/* Back link - inline, not fixed, so it doesn't overlap navbar */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 pt-8"
      >
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-white/50 hover:border-white/[0.15] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </motion.div>

      <ServiceHero />
      <ServiceGrid />
      <AboutSection />
      <BookingSection />
      <ContactSection />

      {/* Designer attribution */}
      <div className="py-8 text-center text-white/30 text-sm border-t border-white/[0.06]">
        Designed by Fahad Aba-Alkhail
      </div>
    </div>
  );
}
