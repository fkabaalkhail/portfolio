"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/case-studies/service-site")) {
    return null;
  }

  return (
    <footer className="relative z-10 overflow-hidden px-5 pt-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name} · Built with Next.js & Framer Motion
        </p>
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Send email"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition-all hover:-translate-y-0.5 hover:bg-ember hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
      {/* giant cropped wordmark */}
      <motion.p
        aria-hidden
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "10%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none mt-6 select-none text-center font-display text-[24vw] font-bold leading-[0.8] tracking-[-0.07em] text-ink"
      >
        fahad<span className="text-ember">.</span>
      </motion.p>
    </footer>
  );
}
