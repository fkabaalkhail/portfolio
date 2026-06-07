"use client";

import { motion } from "framer-motion";

export default function ServiceHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Subtle lamp/glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto relative z-10 px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Fahad Dev Studio
        </h1>
        <p className="text-xl sm:text-2xl text-white/70 font-medium mb-6">
          Freelance Tech Consulting & Development
        </p>
        <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto mb-10">
          Cloud infrastructure, web applications, iOS development, and AI
          automation — built with precision, shipped with confidence.
        </p>
        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="inline-block bg-white text-black hover:bg-white/90 rounded-md px-8 py-3 font-medium transition-colors"
        >
          Book a Session
        </motion.a>
      </motion.div>
    </section>
  );
}
