"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ToggleTheme } from "./ToggleTheme";
import ServiceHero from "./ServiceHero";
import ServiceGrid from "./ServiceGrid";
import AboutSection from "./AboutSection";
import BookingSection from "./BookingSection";
import ContactSection from "./ContactSection";

export default function ServiceSiteClient() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-white dark:bg-black text-black/80 dark:text-white/50">
        {/* Top bar with back link and theme toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto px-6 pt-8 flex items-center justify-between"
        >
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] px-4 py-2 text-sm text-black/50 dark:text-white/50 hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <ToggleTheme />
        </motion.div>

        <ServiceHero />
        <ServiceGrid />
        <AboutSection />
        <BookingSection />
        <ContactSection />

        {/* Designer attribution */}
        <div className="py-8 text-center text-black/30 dark:text-white/30 text-sm border-t border-black/[0.06] dark:border-white/[0.06]">
          Designed by Fahad Aba-Alkhail
        </div>
      </div>
    </ThemeProvider>
  );
}
