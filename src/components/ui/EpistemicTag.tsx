import type { EpistemicState } from "../../types/models";

/**
 * Visually distinct treatment per epistemic state — this is the single most
 * important trust-design element in the product. Never let a hypothesis look
 * like a validated fact.
 */
const CONFIG: Record<
  EpistemicState,
  { label: string; classes: string; dotClasses: string; description: string }
> = {
  OBSERVED: {
    label: "OBSERVED",
    classes: "text-ice border-ice/30 bg-ice/[0.14]",
    dotClasses: "bg-ice",
    description: "Directly recorded from a connected data source.",
  },
  DISCOVERED: {
    label: "DISCOVERED",
    classes: "text-cyan-mint border-cyan-mint/30 bg-cyan-mint/[0.14]",
    dotClasses: "bg-cyan-mint",
    description: "An unpredefined pattern or relationship surfaced in data.",
  },
  INFERRED: {
    label: "INFERRED",
    classes: "text-cyan border-cyan/30 bg-cyan/[0.14]",
    dotClasses: "bg-cyan",
    description: "Derived indirectly — not a direct measurement.",
  },
  HYPOTHESIZED: {
    label: "HYPOTHESIZED",
    classes: "text-amber border-amber/30 bg-amber/[0.14]",
    dotClasses: "bg-amber",
    description: "A candidate explanation awaiting evidence or review.",
  },
  VALIDATED: {
    label: "VALIDATED",
    classes: "text-[#00966B] border-[#00E699]/30 bg-[#00E699]/[0.15]",
    dotClasses: "bg-[#00966B]",
    description: "Confirmed through human review of supporting evidence.",
  },
};

export default function EpistemicTag({
  state,
  showTooltip = true,
}: {
  state: EpistemicState;
  showTooltip?: boolean;
}) {
  const cfg = CONFIG[state];
  return (
    <span
      title={showTooltip ? cfg.description : undefined}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${cfg.classes}`}
    >
      <span className={`h-1 w-1 rounded-full ${cfg.dotClasses}`} />
      {cfg.label}
    </span>
  );
}

export function EpistemicLegend() {
  const order: EpistemicState[] = ["OBSERVED", "DISCOVERED", "INFERRED", "HYPOTHESIZED", "VALIDATED"];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {order.map((s) => (
        <div key={s} className="flex items-center gap-2">
          <EpistemicTag state={s} showTooltip={false} />
          <span className="text-[11px] text-slate">{CONFIG[s].description}</span>
        </div>
      ))}
    </div>
  );
}
