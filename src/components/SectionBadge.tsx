import { cn } from "@/lib/utils";

type SectionBadgeProps = {
  label: string;
  className?: string;
};

const SectionBadge = ({ label, className }: SectionBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-600 shadow-sm",
      className
    )}
  >
    <span
      className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
      aria-hidden="true"
    />
    <span className="tracking-[0.45em] whitespace-nowrap">{label.toUpperCase()}</span>
  </span>
);

export default SectionBadge;

