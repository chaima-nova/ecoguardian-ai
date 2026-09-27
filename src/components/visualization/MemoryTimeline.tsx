import type { MemoryLayer } from "../../types/models";

const LAYERS: MemoryLayer[] = ["Environment", "Infrastructure", "Mobility", "Events", "Observations"];

/**
 * Horizontal lane-based timeline skeleton for City Memory. When no
 * historical data is connected, lanes render empty — no invented years,
 * events, or markers of any kind.
 */
export default function MemoryTimeline() {
  return (
    <div className="rounded-2xl border border-navy/10 bg-navy/[0.035] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[10px] tracking-widest text-slate/60">TEMPORAL AXIS · UNCALIBRATED</div>
        <div className="font-mono text-[10px] tracking-widest text-slate/40">NO PERIOD SELECTED</div>
      </div>

      <div className="flex flex-col gap-3">
        {LAYERS.map((layer) => (
          <div key={layer} className="flex items-center gap-4">
            <div className="w-28 shrink-0 text-[11.5px] font-medium text-ice">{layer}</div>
            <div className="relative h-9 flex-1 overflow-hidden rounded-lg border border-navy/[0.10] bg-[#0B1826]">
              <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#8A99AD" strokeOpacity="0.25" strokeDasharray="2 6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10.5px] text-slate/40">
                no historical observations
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-navy/[0.10] pt-4">
        <div className="text-[11px] text-slate/60">Drag to select a time period once data is connected.</div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-1 w-6 rounded-full bg-navy/[0.09]" />
          ))}
        </div>
      </div>
    </div>
  );
}
