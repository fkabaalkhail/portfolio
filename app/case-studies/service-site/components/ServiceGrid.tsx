"use client";

import { motion, type Variants } from "framer-motion";
import { Cloud, Globe, Smartphone, Bot } from "lucide-react";
import { services } from "../lib/services";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Globe,
  Smartphone,
  Bot,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ServiceGrid() {
  return (
    <section id="services" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
          Services
        </h2>
        <p className="text-black/40 dark:text-white/40 leading-relaxed mb-12 max-w-2xl">
          Specialized expertise across the full stack — from cloud
          infrastructure to pixel-perfect interfaces.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div key={service.id} variants={itemVariants}>
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-[#0a0a0a] px-5 py-4 h-full transition-colors hover:border-black/[0.15] dark:hover:border-white/[0.15]">
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-5 h-5 text-black/60 dark:text-white/60" />
                  <span className="text-xs text-black/40 dark:text-white/40 font-medium">
                    {service.pricing}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-black/40 dark:text-white/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
