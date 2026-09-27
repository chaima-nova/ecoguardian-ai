import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import EmptyState from "../components/ui/EmptyState";
import RelationshipDiagram from "../components/visualization/RelationshipDiagram";
import RelationshipStatusRow from "../components/visualization/RelationshipStatusRow";
import EpistemicTag from "../components/ui/EpistemicTag";
import { useDiscoveries } from "../state/useCityData";

const EVIDENCE_ROWS = [
  { label: "Environmental observation", status: "awaiting data" },
  { label: "Infrastructure observation", status: "awaiting data" },
  { label: "Historical comparison", status: "awaiting data" },
];

export default function Discoveries() {
  const discoveries = useDiscoveries();

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="DISCOVERY ENGINE"
        title="Discovery Engine"
        subtitle="Find changes and relationships humans did not explicitly ask for."
      />

      {discoveries.state === "loading" ? (
        <GlassPanel>
          <div className="flex items-center gap-2 py-10 justify-center text-[13px] text-slate">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
            Scanning connected sources for candidate discoveries…
          </div>
        </GlassPanel>
      ) : (
        <GlassPanel>
          <EmptyState
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                <line x1="12.6" y1="12.6" x2="17" y2="17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            }
            title="No candidate discoveries yet."
            description="Connect historical city data to begin discovery experiments."
          />
        </GlassPanel>
      )}

      {/* Illustrative template of what a discovery record looks like once populated */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md border border-amber/30 bg-amber/[0.08] px-2 py-1 text-[10px] font-semibold tracking-wider text-amber">
            ILLUSTRATIVE EXAMPLE — NOT LIVE DATA
          </span>
          <span className="text-[11.5px] text-slate">
            Structural preview of how a candidate discovery will be presented once data is connected.
          </span>
        </div>

        <GlassPanel className="opacity-90">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-navy/[0.10] pb-5">
            <div>
              <div className="text-[15px] font-semibold text-navy">Candidate Discovery</div>
              <div className="mt-1 text-[12px] text-slate">Unassigned · no dataset linked</div>
            </div>
            <div className="flex items-center gap-2">
              <EpistemicTag state="HYPOTHESIZED" />
              <span className="rounded-md border border-navy/10 bg-navy/[0.045] px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-slate">
                AWAITING REAL DATA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <div className="flex items-center justify-center rounded-xl border border-navy/[0.10] bg-navy/[0.025] py-4">
              <RelationshipDiagram />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
                  RELATIONSHIP EVIDENCE
                </div>
                <RelationshipStatusRow />
              </div>

              <div>
                <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
                  EVIDENCE
                </div>
                <div className="flex flex-col divide-y divide-navy/[0.10] rounded-xl border border-navy/[0.10]">
                  {EVIDENCE_ROWS.map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12.5px] text-ice">{row.label}</span>
                      <span className="text-[11.5px] italic text-slate/60">{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-navy/[0.10] pt-5">
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-navy/10 bg-navy/[0.035] px-4 py-2 text-[12.5px] font-medium text-slate/50"
            >
              Inspect Evidence
            </button>
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-navy/10 bg-navy/[0.035] px-4 py-2 text-[12.5px] font-medium text-slate/50"
            >
              Send for Human Review
            </button>
            <span className="ml-auto self-center text-[11px] text-slate/50">
              Actions unlock once a real candidate discovery exists.
            </span>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
