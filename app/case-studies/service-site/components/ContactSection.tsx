"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "fk.abaalkhail@gmail.com",
    href: "mailto:fk.abaalkhail@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (613) 316-8025",
    href: "tel:+16133168025",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ottawa, Canada",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 max-w-5xl mx-auto px-6">
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
            className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] px-5 py-4 transition-colors hover:border-white/[0.15]"
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
    </section>
  );
}
