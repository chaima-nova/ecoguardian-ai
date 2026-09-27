import { Link } from "react-router-dom";
import GlassPanel from "../components/ui/GlassPanel";
import SystemFlowDiagram from "../components/visualization/SystemFlowDiagram";
import { EpistemicLegend } from "../components/ui/EpistemicTag";

const CAPABILITIES = [
  {
    n: "01",
    title: "WATCH",
    body: "Continuously organize and monitor heterogeneous city data.",
  },
  {
    n: "02",
    title: "DISCOVER",
    body: "Identify unusual changes and relationships that were not explicitly predefined.",
  },
  {
    n: "03",
    title: "WARN",
    body: "Surface emerging signals with evidence, uncertainty, and historical context.",
  },
];

export default function Overview() {
  return (
    <div className="mx-auto max-w-6xl animate-in">
      {/* Hero */}
      <section className="eg-glass relative overflow-hidden rounded-3xl border border-white/60 bg-white/45 backdrop-blur-xl shadow-glass px-6 py-14 sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 20% 0%, rgba(0,102,255,0.12), transparent 55%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(0,174,219,0.10), transparent 55%)",
          }}
        />
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wide text-ice">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-mint animate-pulseSoft" />
          RESEARCH PROTOTYPE · EXPERIMENTAL
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl">
          EcoGuardian AI
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ice">
          City Intelligence &amp; Early-Warning System
        </p>

        <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate">
          Watch the city. Discover what is changing. Detect emerging risks before they escalate.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/city-watch"
            className="rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow-btn transition-transform hover:-translate-y-0.5"
          >
            Enter City Watch
          </Link>
          <Link
            to="/data"
            className="rounded-2xl border border-white/70 bg-white/35 backdrop-blur-md px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-white/55"
          >
            Connect Data
          </Link>
        </div>
      </section>

      {/* Capability cards */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <GlassPanel key={c.n} className="transition-transform hover:-translate-y-0.5">
            <div className="font-mono text-[11px] text-cyan-mint">{c.n}</div>
            <div className="mt-3 text-[15px] font-semibold tracking-wide text-navy">{c.title}</div>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">{c.body}</p>
          </GlassPanel>
        ))}
      </section>

      {/* System pipeline */}
      <section className="mt-8">
        <GlassPanel>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">SYSTEM MODEL</div>
              <h2 className="mt-1 text-[16px] font-semibold text-navy">How EcoGuardian is structured</h2>
            </div>
          </div>
          <SystemFlowDiagram />
        </GlassPanel>
      </section>

      {/* Epistemic legend */}
      <section className="mt-8 mb-4">
        <GlassPanel>
          <div className="mb-4">
            <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">TRUST MODEL</div>
            <h2 className="mt-1 text-[16px] font-semibold text-navy">
              How EcoGuardian labels what it knows
            </h2>
            <p className="mt-1 text-[13px] text-slate">
              Every observation, relationship and signal in this interface is labeled with its
              epistemic status. A discovery is never presented as a prediction, and a prediction is
              never presented as a confirmed event.
            </p>
          </div>
          <EpistemicLegend />
        </GlassPanel>
      </section>
    </div>
  );
}
