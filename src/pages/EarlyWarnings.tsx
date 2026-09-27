import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import EmptyState from "../components/ui/EmptyState";
import { useWarningSignals } from "../state/useCityData";

const UNCERTAINTY_CATEGORIES = [
  "Exact cause",
  "Whether an event will occur",
  "Final severity",
  "Precise affected boundary",
];

export default function EarlyWarnings() {
  const signals = useWarningSignals();

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="EARLY WARNING"
        title="Early Warning"
        subtitle="Surface emerging signals without pretending to know the future."
      />

      {signals.state === "loading" ? (
        <GlassPanel>
          <div className="flex items-center justify-center gap-2 py-10 text-[13px] text-slate">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
            Checking detection logic against connected data…
          </div>
        </GlassPanel>
      ) : (
        <GlassPanel>
          <EmptyState
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3l8 14H2l8-14z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <line x1="10" y1="8.5" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="10" cy="14.6" r="0.9" fill="currentColor" />
              </svg>
            }
            title="NO VALIDATED EARLY-WARNING SIGNALS"
            description="EcoGuardian will surface an early-warning signal only when supported by connected data and validated detection logic."
          />
        </GlassPanel>
      )}

      {/* Conceptual explanation of what a signal will look like */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md border border-amber/30 bg-amber/[0.08] px-2 py-1 text-[10px] font-semibold tracking-wider text-amber">
            ILLUSTRATIVE EXAMPLE — NOT LIVE DATA
          </span>
          <span className="text-[11.5px] text-slate">
            Structural preview of an emerging-signal record once detection logic is validated.
          </span>
        </div>

        <GlassPanel className="opacity-90">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/[0.10] pb-5">
            <div>
              <div className="text-[15px] font-semibold text-navy">Emerging signal detected</div>
              <p className="mt-1.5 max-w-lg text-[12.5px] leading-relaxed text-slate">
                An unusual combination of observed signals has been detected.
              </p>
            </div>
            <span className="rounded-md border border-amber/30 bg-amber/[0.08] px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-amber">
              UNDER VALIDATION
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2">
            <div className="rounded-xl border border-navy/[0.10] bg-navy/[0.035] p-4">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
                WHAT ECOGUARDIAN KNOWS
              </div>
              <p className="text-[12.5px] leading-relaxed text-slate/70">
                Only evidence-backed observations connected to this signal will be listed here —
                nothing is shown until real observations are linked.
              </p>
            </div>
            <div className="rounded-xl border border-navy/[0.10] bg-navy/[0.035] p-4">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-amber">
                WHAT ECOGUARDIAN DOES NOT KNOW
              </div>
              <ul className="flex flex-col gap-1.5">
                {UNCERTAINTY_CATEGORIES.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[12.5px] text-slate/70">
                    <span className="h-1 w-1 rounded-full bg-slate/50" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-navy/[0.10] pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Signal status",
              "Affected area",
              "Detection time",
              "Contributing observations",
              "Historical comparisons",
              "Potential lead time",
              "Uncertainty",
              "Missing data",
            ].map((field) => (
              <div key={field} className="rounded-lg border border-navy/[0.10] bg-navy/[0.025] px-3 py-2.5">
                <div className="text-[10.5px] font-medium text-ice">{field}</div>
                <div className="mt-1 text-[11px] italic text-slate/50">not available</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-navy/[0.10] pt-5">
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-navy/10 bg-navy/[0.035] px-4 py-2 text-[12.5px] font-medium text-slate/50"
            >
              VIEW EVIDENCE
            </button>
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-navy/10 bg-navy/[0.035] px-4 py-2 text-[12.5px] font-medium text-slate/50"
            >
              HUMAN VALIDATION
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
