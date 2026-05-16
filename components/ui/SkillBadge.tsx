interface SkillBadgeProps {
  label: string;
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="inline-block rounded-lg bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 text-sm text-white/50 hover:border-white/[0.15] hover:text-white/80 transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}
