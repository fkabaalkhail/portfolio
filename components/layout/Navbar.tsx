"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleClick(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/[0.06]">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-white text-lg tracking-tight">FA</span>

        {/* desktop nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-sm font-medium transition-colors ${
                active === link.href.slice(1) ? "text-white" : "text-white/40 hover:text-white/80"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/60 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-xl font-medium ${
                active === link.href.slice(1) ? "text-white" : "text-white/40"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
