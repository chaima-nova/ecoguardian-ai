import { useNavigate } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import EmptyState from "../components/ui/EmptyState";
import MemoryTimeline from "../components/visualization/MemoryTimeline";
import { useCityMemoryEvents } from "../state/useCityData";

export default function CityMemory() {
  const events = useCityMemoryEvents();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl animate-in">
      <SectionHeading
        eyebrow="CITY MEMORY"
        title="City Memory"
        subtitle="EcoGuardian doesn't only watch today's city. It remembers how the city has changed over time."
      />

      <GlassPanel>
        {events.state === "loading" ? (
          <div className="flex items-center justify-center gap-2 py-10 text-[13px] text-slate">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan-mint" />
            Reconstructing available history…
          </div>
        ) : (
          <EmptyState
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="CITY MEMORY NOT CONNECTED"
            description="Connect historical observations to build the city's memory."
            actionLabel="Connect Data"
            onAction={() => navigate("/data")}
            compact
          />
        )}
      </GlassPanel>

      <div className="mt-6">
        <MemoryTimeline />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GlassPanel>
          <div className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            WHAT MEMORY WILL SUPPORT
          </div>
          <ul className="flex flex-col gap-1.5 text-[12.5px] text-slate">
            <li>· Historical observations across environment, infrastructure and mobility</li>
            <li>· Spatial and infrastructure changes over time</li>
            <li>· Anomalies detected relative to historical baselines</li>
            <li>· Relationships discovered across time periods</li>
          </ul>
        </GlassPanel>
        <GlassPanel>
          <div className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            SELECTED PERIOD
          </div>
          <p className="text-[12.5px] text-slate">
            No time period selected. Once historical data is connected, select a range on the
            timeline above to inspect its supporting evidence.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
