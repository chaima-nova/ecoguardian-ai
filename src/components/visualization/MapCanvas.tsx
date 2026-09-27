import EmptyState from "../ui/EmptyState";

/**
 * Placeholder for a future Mapbox/Leaflet-backed geospatial canvas.
 * Renders a dark analytical grid with coordinate references purely as a
 * structural/aesthetic frame — never populated with fabricated markers.
 */
export default function MapCanvas({ onConnect }: { onConnect?: () => void }) {
  return (
    <div className="relative h-[440px] overflow-hidden rounded-2xl border border-navy/10 bg-[#0B1826]">
      {/* Aurora glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,242,254,0.06), transparent 65%)",
        }}
      />
      {/* Grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#8A99AD" strokeOpacity="0.16" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Coordinate reference chrome */}
      <div className="absolute left-4 top-4 font-mono text-[10px] tracking-wider text-slate/70">
        CITY OBSERVATION SPACE
      </div>
      <div className="absolute right-4 top-4 font-mono text-[10px] tracking-wider text-slate/50">
        NO SPATIAL LAYERS ACTIVE
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate/40">GRID · UNPROJECTED</div>

      {/* Scanning line motion — subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.15]">
        <div className="h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cyan/40 to-transparent animate-scan" />
      </div>

      <div className="relative flex h-full items-center justify-center">
        <div className="max-w-sm">
          <EmptyState
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10 14v4M6.5 20h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            }
            title="NO CITY DATA CONNECTED"
            description="Connect a city dataset to begin observing spatial and temporal patterns."
            actionLabel="Connect Data"
            onAction={onConnect}
          />
        </div>
      </div>
    </div>
  );
}
