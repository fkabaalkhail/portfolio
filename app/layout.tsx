import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const grotesque = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-grotesque" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Fahad Aba-Alkhail | Portfolio",
  description:
    "Portfolio of Fahad Aba-Alkhail — software engineer building cloud infrastructure and iOS apps like Mrasem and Mawaqeet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesque.variable} ${instrument.variable} ${geistMono.variable}`}
    >
      <body className="grain min-h-screen flex flex-col bg-cream text-ink font-sans">
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
