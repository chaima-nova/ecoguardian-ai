import { useNavigate } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import MapCanvas from "../components/visualization/MapCanvas";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import { useWarningSignals } from "../state/useCityData";

const LAYER_TOGGLES = ["Observations", "Anomalies", "Affected Areas", "Temporal", "Evidence Links"];

export default function CityWatch() {
  const navigate = useNavigate();
  const signals = useWarningSignals();

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="CITY WATCH"
        title="City Watch"
        subtitle="A spatial view of observations, changes and emerging signals."
        right={<StatusBadge status="DATA_NOT_CONNECTED" />}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-5">
          <MapCanvas onConnect={() => navigate("/data")} />

          <GlassPanel padded={false} className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
                ACTIVE SIGNALS
              </div>
              <span className="font-mono text-[10px] text-slate/50">
                {signals.state === "loading" ? "checking…" : "0 validated"}
              </span>
            </div>

            {signals.state === "loading" ? (
              <div className="flex items-center gap-2 py-6 text-[13px] text-slate">
                <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
                Checking for connected signal sources…
              </div>
            ) : (
              <EmptyState
                compact
                title="No validated signals available."
                description="EcoGuardian will list a signal here only once it is supported by connected data and evidence."
              />
            )}
          </GlassPanel>
        </div>

        <div className="flex flex-col gap-5">
          <GlassPanel>
            <div className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
              SPATIAL LAYERS
            </div>
            <div className="flex flex-col gap-2">
              {LAYER_TOGGLES.map((l) => (
                <div
                  key={l}
                  className="flex items-center justify-between rounded-lg border border-navy/[0.10] bg-navy/[0.035] px-3 py-2 text-[12.5px] text-slate"
                >
                  <span>{l}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-navy/[0.12]" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate/70">
              Layers activate automatically once a corresponding dataset is connected.
            </p>
          </GlassPanel>

          <GlassPanel>
            <div className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
              AREA FOCUS
            </div>
            <p className="text-[12.5px] text-slate">
              No city area is currently configured. Location context will appear here once a city
              boundary dataset is connected.
            </p>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
