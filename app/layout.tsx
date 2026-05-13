import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Fahad Aba-Alkhail | Portfolio",
  description: "Portfolio of Fahad Aba-Alkhail - CS student at uOttawa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-black text-white/50">
        <SkipToContent />
        <Navbar />
        <main id="main-content" className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
