import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif-display",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-code" });

export const metadata: Metadata = {
  title: "Fahad Aba-Alkhail | Full-Stack Engineer",
  description:
    "Fahad Aba-Alkhail — full-stack engineer shipping SwiftUI apps, Node and FastAPI services, and Kubernetes infrastructure on AWS and GCP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}>
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
