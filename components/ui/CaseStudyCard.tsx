import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  tags: string[];
}

export default function CaseStudyCard({ title, imageSrc, imageAlt, href, tags }: CaseStudyCardProps) {
  const isExternal = /^https?:\/\//.test(href);

  const card = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-surface-card">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pb-1 pt-5">
        <div>
          <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">{title}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-surface-card px-2.5 py-0.5 text-xs font-medium text-body">
                {t}
              </span>
            ))}
          </div>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
          {isExternal ? "Live site" : "Case study"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  );

  const className =
    "group block rounded-lg border border-hairline bg-canvas p-3 transition-colors hover:border-muted-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {card}
    </Link>
  );
}
