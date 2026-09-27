import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import { ScatterplotLayer } from "@deck.gl/layers";
import type { PickingInfo } from "@deck.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * CityMap3D
 * ---------------------------------------------------------------------------
 * A DeckGL + MapLibre powered 3D spatial canvas, angled with a 60° pitch on
 * a dark base map. This mirrors the same trust rules as the rest of
 * EcoGuardian: the points rendered here are NOT real observations or
 * detected signals. They are a clearly labeled illustrative example so the
 * interaction model (hover, pan, zoom, rotate) can be previewed before a
 * real spatial dataset is connected via the data layer (see
 * `src/api/dataClient.ts` and `src/state/useCityData.ts`).
 *
 * Swap `DEMO_SIGNAL_POINTS` for real `CityObservation`/`WarningSignal`
 * coordinates once a live source is connected — the layer/rendering code
 * does not need to change.
 * ---------------------------------------------------------------------------
 */

const DARK_MATTER_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  longitude: -73.9855,
  latitude: 40.7484,
  zoom: 12.4,
  pitch: 60,
  bearing: -20,
};

interface DemoSignalPoint {
  id: string;
  position: [number, number];
}

// Illustrative-only demonstration points — NOT real observations or
// detected signals. See the on-canvas "ILLUSTRATIVE EXAMPLE" label.
const DEMO_SIGNAL_POINTS: DemoSignalPoint[] = [
  { id: "demo-1", position: [-73.9855, 40.7484] },
  { id: "demo-2", position: [-73.978, 40.7527] },
  { id: "demo-3", position: [-73.9932, 40.7444] },
  { id: "demo-4", position: [-73.9772, 40.7405] },
  { id: "demo-5", position: [-73.9648, 40.7549] },
  { id: "demo-6", position: [-74.0012, 40.7502] },
];

interface CityMap3DProps {
  className?: string;
}

export default function CityMap3D({ className = "" }: CityMap3DProps) {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<DemoSignalPoint> | null>(null);

  const layers = useMemo(
    () => [
      // Soft outer glow
      new ScatterplotLayer<DemoSignalPoint>({
        id: "signal-glow",
        data: DEMO_SIGNAL_POINTS,
        getPosition: (d) => d.position,
        radiusUnits: "pixels",
        getRadius: 20,
        getFillColor: [0, 212, 255, 55],
        pickable: false,
      }),
      // Inner solid core (interactive)
      new ScatterplotLayer<DemoSignalPoint>({
        id: "signal-core",
        data: DEMO_SIGNAL_POINTS,
        getPosition: (d) => d.position,
        radiusUnits: "pixels",
        getRadius: 6,
        getFillColor: [153, 230, 255, 235],
        stroked: true,
        getLineColor: [255, 255, 255, 220],
        lineWidthUnits: "pixels",
        getLineWidth: 1.2,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 120],
        onHover: (info) => setHoverInfo(info.object ? info : null),
      }),
    ],
    []
  );

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl bg-[#0B1826] ${className}`}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0" }}
      >
        <Map mapStyle={DARK_MATTER_STYLE} reuseMaps style={{ width: "100%", height: "100%" }} />
      </DeckGL>

      {/* Persistent illustrative-data disclosure */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start justify-between gap-2">
        <div className="rounded-md border border-amber/40 bg-amber/[0.18] px-2 py-1 text-[9.5px] font-semibold tracking-wider text-amber backdrop-blur-sm">
          ILLUSTRATIVE EXAMPLE — NOT LIVE DATA
        </div>
        <div className="rounded-md border border-white/40 bg-white/20 px-2 py-1 font-mono text-[9.5px] tracking-wider text-white/80 backdrop-blur-sm">
          3D SPATIAL PREVIEW
        </div>
      </div>

      {/* Hover tooltip — reinforces that points are illustrative, not evidence */}
      {hoverInfo?.object && (
        <div
          className="pointer-events-none absolute z-20 max-w-[200px] rounded-lg border border-white/60 bg-white/90 px-2.5 py-1.5 text-[11px] font-medium leading-snug text-navy shadow-glass backdrop-blur-md"
          style={{ left: (hoverInfo.x ?? 0) + 12, top: (hoverInfo.y ?? 0) + 12 }}
        >
          Illustrative point — not a real observation or detected signal.
        </div>
      )}
    </div>
  );
}
