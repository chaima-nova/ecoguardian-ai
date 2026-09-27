import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import EmptyState from "../components/ui/EmptyState";
import { useDataSources } from "../state/useCityData";
import type { DataSourceCategory } from "../types/models";

const CATALOG: { category: DataSourceCategory; label: string; description: string }[] = [
  { category: "satellite", label: "Satellite / Earth Observation", description: "Remote sensing and imagery feeds." },
  { category: "environmental", label: "Environmental Observations", description: "Air, water, and ecological measurements." },
  { category: "infrastructure", label: "Infrastructure Data", description: "Utilities, structures, and urban assets." },
  { category: "mobility", label: "Mobility Data", description: "Movement, transit, and traffic patterns." },
  { category: "weather", label: "Weather", description: "Meteorological observations and forecasts." },
  { category: "city_events", label: "City Event Records", description: "Reported municipal and civic events." },
  { category: "geospatial", label: "Geospatial Datasets", description: "Boundaries, zoning, and spatial layers." },
  { category: "user_provided", label: "User-Provided Datasets", description: "Custom datasets supplied by researchers." },
];

export default function DataSources() {
  const sources = useDataSources();
  const [showConnectHint, setShowConnectHint] = useState(false);

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="DATA"
        title="Data"
        subtitle="Manage the connections that power EcoGuardian's observations, memory and discovery."
        right={
          <button
            onClick={() => setShowConnectHint((v) => !v)}
            className="rounded-lg border border-cyan/30 bg-cyan/[0.10] px-4 py-2 text-[12.5px] font-medium text-cyan-mint transition-colors hover:bg-cyan/[0.16]"
          >
            Connect Data Source
          </button>
        }
      />

      {showConnectHint && (
        <div className="mb-6 rounded-xl border border-cyan/20 bg-cyan/[0.06] px-4 py-3 text-[12.5px] text-ice">
          Data connections are configured by wiring this interface to a backend via
          <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 font-mono text-[11px] text-cyan-mint">
            VITE_ECOGUARDIAN_API_URL
          </code>
          — see <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[11px]">src/api/dataClient.ts</code>.
        </div>
      )}

      {/* Connected sources */}
      <GlassPanel className="mb-6">
        <div className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
          CONNECTED SOURCES
        </div>
        {sources.state === "loading" ? (
          <div className="flex items-center gap-2 py-6 text-[13px] text-slate">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
            Checking configured connections…
          </div>
        ) : (
          <EmptyState compact title="NO DATA SOURCES CONNECTED" description="Nothing is currently feeding observations into EcoGuardian." />
        )}
      </GlassPanel>

      {/* Available datasets catalog */}
      <div className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
        AVAILABLE DATASETS
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATALOG.map((item) => (
          <GlassPanel key={item.category} className="flex flex-col justify-between">
            <div>
              <div className="text-[12.5px] font-semibold text-navy">{item.label}</div>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate">{item.description}</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate/40" />
              <span className="text-[10.5px] font-medium tracking-wide text-slate/70">NOT CONNECTED</span>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Health, coverage, ingestion */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <GlassPanel>
          <div className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">DATA HEALTH</div>
          <div className="mt-3 text-[13px] text-slate">No sources to evaluate.</div>
        </GlassPanel>
        <GlassPanel>
          <div className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">COVERAGE</div>
          <div className="mt-3 text-[13px] text-slate">No spatial or temporal coverage yet.</div>
        </GlassPanel>
        <GlassPanel>
          <div className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">LAST INGESTION</div>
          <div className="mt-3 text-[13px] text-slate">—</div>
        </GlassPanel>
      </div>
    </div>
  );
}
