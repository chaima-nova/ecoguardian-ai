import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import EmptyState from "../components/ui/EmptyState";
import { useEvidence } from "../state/useCityData";

const FIELDS = [
  "Observation",
  "Source",
  "Time",
  "Location",
  "Relationship",
  "Historical comparison",
  "Uncertainty",
  "Data quality",
];

export default function Evidence() {
  const evidence = useEvidence();

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="EVIDENCE"
        title="Evidence"
        subtitle="Every important signal should be traceable back to its supporting observations."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
        <GlassPanel>
          <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">FIELDS</div>
          <div className="flex flex-col gap-1.5">
            {FIELDS.map((f) => (
              <div
                key={f}
                className="rounded-lg border border-navy/[0.08] bg-navy/[0.025] px-3 py-2 text-[12px] text-slate"
              >
                {f}
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          {evidence.state === "loading" ? (
            <div className="flex items-center justify-center gap-2 py-14 text-[13px] text-slate">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
              Retrieving supporting observations…
            </div>
          ) : (
            <EmptyState
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="3" width="12" height="14" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="7" y1="10.2" x2="13" y2="10.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="7" y1="13.4" x2="10.5" y2="13.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              }
              title="NO EVIDENCE AVAILABLE"
              description="Evidence will appear here once observations and discovery results are connected."
            />
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
