const STAGES = [
  { key: "watch", label: "CITY DATA", sub: "Heterogeneous observations" },
  { key: "memory", label: "CITY MEMORY", sub: "Historical continuity" },
  { key: "discover", label: "DISCOVERY", sub: "Unpredefined relationships" },
  { key: "evidence", label: "EVIDENCE", sub: "Traceable support" },
  { key: "warning", label: "EARLY WARNING", sub: "Validated by humans" },
];

/**
 * Represents the conceptual EcoGuardian pipeline. Intentionally abstract —
 * it must never imply real data is currently flowing through it.
 */
export default function SystemFlowDiagram() {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[760px] items-stretch gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="flex flex-1 items-stretch">
            <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-navy/[0.035] px-4 py-6 text-center transition-colors hover:border-cyan/25 hover:bg-cyan/[0.03]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/25 bg-cyan/[0.06] font-mono text-[11px] text-cyan-mint">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[12px] font-semibold tracking-wider text-navy">{stage.label}</div>
              <div className="text-[11px] leading-snug text-slate">{stage.sub}</div>
            </div>
            {i < STAGES.length - 1 && (
              <div className="flex w-10 shrink-0 items-center justify-center">
                <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                  <line
                    x1="0"
                    y1="5"
                    x2="24"
                    y2="5"
                    stroke="#00E5FF"
                    strokeOpacity="0.35"
                    strokeWidth="1.4"
                    strokeDasharray="4 4"
                  />
                  <path d="M22 1.5L27 5L22 8.5" stroke="#00E5FF" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-slate">
        Conceptual pipeline shown for orientation only — it does not represent live data movement.
      </p>
    </div>
  );
}
