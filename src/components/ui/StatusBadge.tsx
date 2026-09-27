import type { SystemStatus } from "../../types/models";

const CONFIG: Record<SystemStatus, { label: string; dot: string; text: string }> = {
  RESEARCH_PROTOTYPE: {
    label: "RESEARCH PROTOTYPE",
    dot: "bg-ice",
    text: "text-ice",
  },
  DATA_NOT_CONNECTED: {
    label: "DATA NOT CONNECTED",
    dot: "bg-slate",
    text: "text-slate",
  },
  DATA_CONNECTED: {
    label: "DATA CONNECTED",
    dot: "bg-cyan",
    text: "text-cyan",
  },
  PROCESSING: {
    label: "PROCESSING",
    dot: "bg-cyan-mint",
    text: "text-cyan-mint",
  },
  VALIDATION_REQUIRED: {
    label: "VALIDATION REQUIRED",
    dot: "bg-amber",
    text: "text-amber",
  },
};

export default function StatusBadge({ status }: { status: SystemStatus }) {
  const cfg = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wide shadow-[0_2px_12px_rgba(10,25,47,0.08)] ${cfg.text}`}
    >
      <span className={`relative flex h-1.5 w-1.5`}>
        <span className={`absolute inline-flex h-full w-full rounded-full ${cfg.dot} animate-pulseSoft`} />
      </span>
      {cfg.label}
    </span>
  );
}
