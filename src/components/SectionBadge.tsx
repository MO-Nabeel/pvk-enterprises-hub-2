import { cn } from "@/lib/utils";

type SectionBadgeProps = {
  label: string;
  className?: string;
};

const SectionBadge = ({ label, className }: SectionBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] sm:tracking-[0.45em] text-slate-600 shadow-sm",
      className
    )}
  >
    <span
      className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
      aria-hidden="true"
    />
    <span className="tracking-[0.35em] sm:tracking-[0.45em]">{label.toUpperCase()}</span>
  </span>
);

export default SectionBadge;

