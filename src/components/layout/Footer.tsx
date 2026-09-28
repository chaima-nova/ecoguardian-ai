import EcoGuardianLogo from "../EcoGuardianLogo";

const PARTNERS = [
  { src: "/assets/partners/gcom-logo.png", alt: "Global Covenant of Mayors" },
  { src: "/assets/partners/hack-for-earth-logo.png", alt: "Hack for Earth Foundation" },
  { src: "/assets/partners/un-habitat-logo.png", alt: "UN-HABITAT Innovate4Cities" },
  { src: "/assets/partners/climate-action-hackathon-logo.png", alt: "AI x City Climate Action Hackathon" },
];

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Global footer rendered on every page via PageShell. Purely additive —
 * does not alter any existing page content or routes.
 * ---------------------------------------------------------------------------
 */
export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/50 bg-white/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-9">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <EcoGuardianLogo size={30} />
            <div className="leading-tight">
              <div className="text-[12.5px] font-bold tracking-[0.14em] text-navy">ECOGUARDIAN AI</div>
              <div className="text-[10.5px] text-slate">City Intelligence &amp; Early Warning System</div>
            </div>
          </div>
          <p className="max-w-sm text-[11.5px] leading-relaxed text-slate">
            A research prototype for city intelligence and early warning — open, transparent, and
            built to make what a city knows visible.
          </p>
        </div>

        <div className="my-8 h-px w-full bg-navy/10" />

        <div>
          <div className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            PARTNERS &amp; RECOGNITION
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PARTNERS.map((p) => (
              <div
                key={p.src}
                className="flex h-20 items-center justify-center rounded-xl border border-navy/10 bg-white/50 px-4 py-3 transition-colors hover:bg-white/70"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="max-h-12 w-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-[10.5px] text-slate/80">
          © {new Date().getFullYear()} EcoGuardian AI. Research prototype — not an operational
          early-warning system.
        </div>
      </div>
    </footer>
  );
}
