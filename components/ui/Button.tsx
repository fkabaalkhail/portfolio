import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 font-medium transition-all min-h-[44px]",
        "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black",
        variant === "primary" && "bg-white text-black hover:bg-white/90",
        variant === "outline" && "border border-white/[0.15] text-white/60 hover:border-white/30 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
