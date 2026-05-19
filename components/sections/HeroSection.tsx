"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/constants";
import EtherealShadow from "@/components/ui/EtherealShadow";

const TextThree = dynamic(() => import("@/components/animations/TextThree"), {
  ssr: false,
  loading: () => (
    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
      {siteConfig.name}
    </span>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* background animation */}
      <div className="absolute inset-0 -z-10 h-[130%]">
        <EtherealShadow
          color="rgba(160, 160, 160, 1)"
          animation={{ scale: 80, speed: 70 }}
          noise={{ opacity: 0.8, scale: 1.5 }}
          sizing="fill"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-black z-20" />
      </div>

      <div className="text-center max-w-3xl mx-auto relative z-10 px-4">
        <h1 className="mb-4">
          <TextThree
            text={siteConfig.name}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            speed={70}
            delay={300}
          />
        </h1>
        <p className="text-xl sm:text-2xl text-white/70 font-medium mb-6">
          {siteConfig.location}
        </p>
        <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto">
          {siteConfig.intro}
        </p>
      </div>
    </section>
  );
}
