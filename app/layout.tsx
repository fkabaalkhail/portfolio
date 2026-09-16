import type { Metadata } from "next";
import { Fira_Code, Newsreader, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const grotesk = Schibsted_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif-display",
});
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap", variable: "--font-code" });

export const metadata: Metadata = {
  title: "Fahad Aba-Alkhail | Software Engineer",
  description:
    "Fahad Aba-Alkhail — full-stack software engineer working across backend services, cloud infrastructure and DevOps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${newsreader.variable} ${firaCode.variable}`}>
      <body className="min-h-screen flex flex-col bg-canvas text-body font-sans">
        <MotionProvider>
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="flex-1 relative">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
