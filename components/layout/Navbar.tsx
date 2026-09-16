"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const isServiceSite = pathname.startsWith("/case-studies/service-site");
  const isHome = pathname === "/";

  useEffect(() => {
    if (isServiceSite) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isServiceSite]);

  useEffect(() => {
    if (isServiceSite || !isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isServiceSite, isHome]);

  if (isServiceSite) return null;

  function handleClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else router.push(`/${href}`);
  }

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-ember via-sun to-plum"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      >
        <nav
          className={cn(
            "flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border px-2 py-2 pl-5 transition-all duration-500",
            scrolled || menuOpen
              ? "border-ink/10 bg-paper/75 shadow-[0_10px_40px_-12px_rgba(23,18,13,0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink">
            fahad<span className="text-ember">.</span>
          </Link>

          <div className="relative hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-paper" : "text-ink/60 hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95 md:inline-flex"
          >
            Let&apos;s talk
          </a>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink px-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                onClick={() => handleClick(link.href)}
                className="text-left font-display text-5xl font-bold tracking-tight text-paper"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={`mailto:${siteConfig.email}`}
              className="mt-8 font-mono text-sm text-sun"
            >
              {siteConfig.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
