"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          About
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8"
      >
        <p className="text-white/50 leading-relaxed mb-4">
          I&apos;m Fahad Aba-Alkhail — a Computer Science student at the University of Ottawa
          and freelance software engineer specializing in cloud infrastructure, full-stack
          web development, and native iOS apps. I turn complex problems into clean, reliable
          solutions that ship on time and scale with confidence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-xs text-white/40 mb-1">Education</p>
            <p className="text-sm text-white/80">BSc Computer Science</p>
            <p className="text-xs text-white/40">University of Ottawa · GPA 3.9/4.0</p>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">Experience</p>
            <p className="text-sm text-white/80">Ericsson</p>
            <p className="text-xs text-white/40">Software Engineer</p>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">Focus Areas</p>
            <p className="text-sm text-white/80">Cloud, DevOps, Full-Stack</p>
            <p className="text-xs text-white/40">AWS · Kubernetes · React · Swift</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
