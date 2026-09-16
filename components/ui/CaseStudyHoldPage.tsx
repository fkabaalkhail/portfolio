import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CaseStudyHoldPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 font-display text-5xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="mb-8 text-lg text-muted">Coming Soon</p>
      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-transform hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>
    </main>
  );
}
