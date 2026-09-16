"use client";

import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/constants";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.410-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.040.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/case-studies/service-site")) {
    return null;
  }

  return (
    <footer className="bg-dark px-5 py-16 text-on-dark-soft md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl leading-none tracking-[-0.02em] text-on-dark">
            fahad<span className="text-accent-soft">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {siteConfig.role} in {siteConfig.location}. SwiftUI to Kubernetes.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[1.5px] text-on-dark">Sections</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={`/${link.href}`} className="transition-colors hover:text-on-dark">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[1.5px] text-on-dark">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-on-dark">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-on-dark"
              >
                <GithubIcon className="h-4 w-4" />
                github.com/fkabaalkhail
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1200px] border-t border-white/10 pt-6 text-xs text-muted-soft">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
