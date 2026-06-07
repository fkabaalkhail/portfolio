"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (613) 555-0147",
    href: "tel:+16135550147",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: null,
  },
];

export default function ServiceContact() {
  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-white/40 leading-relaxed mb-12 max-w-2xl">
          Have a project in mind? Reach out and let&apos;s talk about how I can help.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {contactInfo.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5 transition-colors"
          >
            <item.icon className="w-5 h-5 text-white/50 mb-3" />
            <p className="text-xs text-white/40 mb-1">{item.label}</p>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm text-white/80">{item.value}</p>
            )}
          </div>
        ))}
      </motion.div>

      {/* About section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-24"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          About
        </h2>
        <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8">
          <p className="text-white/50 leading-relaxed mb-4">
            {siteConfig.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-xs text-white/40 mb-1">Education</p>
              <p className="text-sm text-white/80">
                {siteConfig.education.program}
              </p>
              <p className="text-xs text-white/40">
                {siteConfig.education.university} · GPA{" "}
                {siteConfig.education.gpa}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-1">Experience</p>
              <p className="text-sm text-white/80">
                {siteConfig.experiences[0].company}
              </p>
              <p className="text-xs text-white/40">
                {siteConfig.experiences[0].role}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-1">Focus Areas</p>
              <p className="text-sm text-white/80">
                Cloud, DevOps, Full-Stack
              </p>
              <p className="text-xs text-white/40">
                AWS · Kubernetes · React · Swift
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
