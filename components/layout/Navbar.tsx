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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-canvas/90 backdrop-blur-md transition-colors duration-300",
          scrolled || menuOpen ? "border-hairline" : "border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-mono text-xs font-medium text-canvas">
              FA
            </span>
            <span className="text-[15px] font-medium">{siteConfig.name}</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md bg-surface-card"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              );
            })}
          </div>

          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden h-10 items-center rounded-md bg-coral px-5 text-sm font-medium text-white transition-colors hover:bg-coral-active lg:inline-flex"
          >
            Get in touch
          </a>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-ink lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-coral" />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col gap-1 bg-canvas px-5 pt-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="border-b border-hairline py-4 text-left font-display text-3xl text-ink"
              >
                {link.label}
              </button>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-coral text-base font-medium text-white"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
