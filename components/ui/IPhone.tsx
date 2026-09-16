import Image from "next/image";
import { cn } from "@/lib/utils";

// CSS-only iPhone 17 Pro style frame. Screenshots already include the status bar,
// so the dynamic island simply sits on top of it.
export default function IPhone({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 320px",
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[1206/2622] w-full rounded-[16%/7.4%] bg-[#1b1b1d] p-[3.2%] shadow-[0_40px_80px_-20px_rgba(23,18,13,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]",
        className
      )}
    >
      {/* titanium edge highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />
      {/* side buttons */}
      <span className="absolute -left-[1.4%] top-[18%] h-[5%] w-[1.4%] rounded-l bg-[#2a2a2d]" />
      <span className="absolute -left-[1.4%] top-[27%] h-[9%] w-[1.4%] rounded-l bg-[#2a2a2d]" />
      <span className="absolute -right-[1.4%] top-[25%] h-[12%] w-[1.4%] rounded-r bg-[#2a2a2d]" />

      <div className="relative h-full w-full overflow-hidden rounded-[13%/6%] bg-black">
        {src && (
          <Image src={src} alt={alt ?? ""} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        )}
        {children}
        {/* dynamic island */}
        <div className="absolute left-1/2 top-[1.6%] h-[3.3%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        {/* glass sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
