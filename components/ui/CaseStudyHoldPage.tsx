import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CaseStudyHoldPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-4xl font-bold text-white">{title}</h1>
      <p className="mb-8 text-lg text-white/40">Coming Soon</p>
      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-5 py-3 text-white/50 hover:border-white/[0.15] hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>
    </main>
  );
}
