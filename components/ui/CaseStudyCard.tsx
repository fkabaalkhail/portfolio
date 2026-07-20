import Link from "next/link";
import Image from "next/image";

interface CaseStudyCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export default function CaseStudyCard({ title, imageSrc, imageAlt, href }: CaseStudyCardProps) {
  const isExternal = /^https?:\/\//.test(href);

  const cardClass =
    "group relative block overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300";

  const inner = (
    <>
      <div className="relative aspect-[4/3] w-full bg-white/[0.02]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5">
        <div>
          <span className="text-lg font-bold text-white">{title}</span>
          <p className="text-xs text-white/30 mt-1 group-hover:text-white/60 transition-colors">
            {isExternal ? "View live site" : "View case study"}
          </p>
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClass}>
      {inner}
    </Link>
  );
}
