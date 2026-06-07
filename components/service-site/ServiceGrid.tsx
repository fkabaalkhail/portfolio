"use client";

import { motion, type Variants } from "framer-motion";
import { Cloud, Globe, Smartphone, Bot, Phone, Zap } from "lucide-react";
import { GridCard } from "@/components/ui/GridCard";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Globe,
  Smartphone,
  Bot,
  Phone,
  Zap,
};

const services = [
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      "Kubernetes, AWS, Terraform, CI/CD pipelines — production infrastructure that scales.",
    icon: "Cloud",
    pricing: "From $150/hr",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Fast, modern websites and web apps built with React, Next.js, and Node.js.",
    icon: "Globe",
    pricing: "From $120/hr",
  },
  {
    id: "ios-dev",
    title: "iOS Development",
    description:
      "Native iOS apps with SwiftUI — from design to App Store deployment.",
    icon: "Smartphone",
    pricing: "From $140/hr",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description:
      "Integrate AI into your workflows — chatbots, data pipelines, smart automation.",
    icon: "Bot",
    pricing: "From $160/hr",
  },
];

const bookingOptions = [
  {
    id: "discovery",
    title: "Discovery Call",
    description: "Free 30-minute intro call to discuss your project.",
    icon: "Phone",
    pricing: "Free",
    duration: "30 min",
  },
  {
    id: "sprint",
    title: "Sprint Session",
    description:
      "Focused 2-hour working session on your specific challenge.",
    icon: "Zap",
    pricing: "$200",
    duration: "2 hours",
  },
];

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
    <section id="services" className="py-24 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Services
        </h2>
        <p className="text-white/40 leading-relaxed mb-12 max-w-2xl">
          Specialized expertise across the full stack — from cloud
          infrastructure to pixel-perfect interfaces.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div key={service.id} variants={itemVariants}>
              <GridCard className="h-full">
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-5 h-5 text-white/60" />
                    <span className="text-xs text-white/40 font-medium">
                      {service.pricing}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GridCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Booking Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Book a Session</h3>
        <p className="text-white/40 leading-relaxed mb-8">
          Ready to get started? Pick a session type.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {bookingOptions.map((option) => {
          const Icon = iconMap[option.icon];
          return (
            <motion.div key={option.id} variants={itemVariants}>
              <GridCard className="h-full">
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-5 h-5 text-white/60" />
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        {option.pricing}
                      </span>
                      <span className="text-xs text-white/40 ml-2">
                        {option.duration}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </GridCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
