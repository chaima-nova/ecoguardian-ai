import { useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";
import GlassPanel from "../components/ui/GlassPanel";

/**
 * Connect.tsx
 * ---------------------------------------------------------------------------
 * Outreach / partnership page. This page is intentionally kept separate from
 * the city-intelligence domain (no CityObservation / WarningSignal / etc. is
 * referenced here) — it is marketing & collaboration content, not dashboard
 * data, so it does not need to route through dataClient.ts / useCityData.ts.
 *
 * Honesty notes (see project trust rules):
 *  - The inquiry form has no backend yet. Submitting opens the visitor's own
 *    email client via a `mailto:` link rather than pretending a message was
 *    sent to a live server. The destination address below is a placeholder —
 *    swap CONTACT_EMAIL for a real, monitored inbox before shipping.
 *  - "Resource Quick Links" only point to destinations that actually exist
 *    today (the public GitHub repo). The pitch-deck link routes into this
 *    same form instead of pretending to offer a real file download.
 * ---------------------------------------------------------------------------
 */

// TODO: replace with a real, monitored inbox before this goes live.
const CONTACT_EMAIL = "hello@ecoguardian.ai";
const GITHUB_REPO_URL = "https://github.com/chaima-nova/ecoguardian-ai";
const API_SPECS_URL = "https://github.com/chaima-nova/ecoguardian-ai/tree/main/src/api";

type PartnerCategory = "cities" | "investors" | "technical" | "general";

const CATEGORIES: {
  id: PartnerCategory;
  label: string;
  description: string;
  icon: ReactElement;
}[] = [
  {
    id: "cities",
    label: "Cities & Municipalities",
    description: "Interested in deploying early-warning city monitoring.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 21V9l6-4v16M14 21V5l6 4v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13h1M7 17h1M17 12h1M17 16h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "investors",
    label: "Investors & Accelerators",
    description: "Seeking pitch decks or strategic discussion.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 19h16M7 19v-6M12 19V9M17 19v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "technical",
    label: "Technical & Impact Partners",
    description: "ML model integrations, open-source collaboration, dataset pairing.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "general",
    label: "General Inquiries",
    description: "For anyone passionate about climate-tech and spatial AI.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 11.5a8.5 8.5 0 1 1-3.6-6.94L21 4l-1.1 3.9A8.46 8.46 0 0 1 21 11.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const CREDENTIALS = [
  { label: "Winner — AI x City Climate Action Hackathon" },
  { label: "UN-HABITAT Innovate4Cities Honoree" },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-gradient-to-br from-cyan/[0.16] to-cyan-mint/[0.10] text-[12px] font-bold tracking-wide text-cyan">
      {initials}
    </div>
  );
}

export default function Connect() {
  const [category, setCategory] = useState<PartnerCategory>("general");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const activeCategory = useMemo(() => CATEGORIES.find((c) => c.id === category)!, [category]);

  const canSubmit = name.trim().length > 0 && message.trim().length > 0;

  function scrollToForm(nextCategory?: PartnerCategory) {
    if (nextCategory) setCategory(nextCategory);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit() {
    setAttemptedSubmit(true);
    if (!canSubmit) return;

    const subject = `EcoGuardian AI — ${activeCategory.label} inquiry`;
    const bodyLines = [
      `Category: ${activeCategory.label}`,
      `Name: ${name}`,
      organization ? `Organization: ${organization}` : null,
      "",
      message,
    ].filter((l): l is string => l !== null);

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
    window.location.href = mailto;
  }

  return (
    <div className="mx-auto max-w-6xl animate-in">
      {/* Hero */}
      <section className="eg-glass relative overflow-hidden rounded-3xl border border-white/60 bg-white/45 backdrop-blur-xl shadow-glass px-6 py-14 sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 15% 0%, rgba(0,102,255,0.12), transparent 55%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(0,174,219,0.12), transparent 55%)",
          }}
        />
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wide text-ice">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-mint animate-pulseSoft" />
          OPEN FOR PARTNERSHIP &amp; COLLABORATION
        </div>
        <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl">
          Connect &amp;{" "}
          <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
            Collaborate
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">
          EcoGuardian AI is a research prototype for city intelligence and early warning. We're
          looking for cities, investors, and technical partners who want to help take it further.
        </p>
      </section>

      {/* Three-column layout */}
      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-start">
        {/* Column 1: Leadership & Credentials */}
        <GlassPanel>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            PROJECT LEADERSHIP &amp; CREDENTIALS
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Avatar initials="CH" />
            <div>
              <div className="text-[14px] font-semibold text-navy">Chaima</div>
              <div className="text-[12px] text-slate">Founder &amp; AI Lead</div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {CREDENTIALS.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-2 rounded-lg border border-cyan/25 bg-cyan/[0.07] px-3 py-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-cyan-mint">
                  <path
                    d="m9 12 2 2 4-4M12 3a2.5 2.5 0 0 1 4.2-1.6 2.5 2.5 0 0 1 3.4 3.4A2.5 2.5 0 0 1 21 9a2.5 2.5 0 0 1-1.6 4.2 2.5 2.5 0 0 1-3.4 3.4A2.5 2.5 0 0 1 12 21a2.5 2.5 0 0 1-4.2-1.6 2.5 2.5 0 0 1-3.4-3.4A2.5 2.5 0 0 1 3 9a2.5 2.5 0 0 1 1.6-4.2 2.5 2.5 0 0 1 3.4-3.4A2.5 2.5 0 0 1 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[11.5px] font-medium leading-snug text-ice">{c.label}</span>
              </div>
            ))}
          </div>

          <div className="my-4 h-px w-full bg-navy/10" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar initials="AI" />
              <div className="text-[13px] font-medium text-navy">AI Engineer</div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar initials="OS" />
              <div className="text-[13px] font-medium text-navy">Open Source Contributor</div>
            </div>
          </div>
        </GlassPanel>

        {/* Column 2: Partner & Connect form */}
        <div ref={formRef}>
        <GlassPanel>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            PARTNER &amp; CONNECT WITH ECOGUARDIAN
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  category === c.id
                    ? "border-cyan/40 bg-cyan/[0.10]"
                    : "border-navy/10 bg-white/30 hover:bg-white/50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    category === c.id ? "bg-cyan/[0.18] text-cyan" : "bg-navy/[0.05] text-slate"
                  }`}
                >
                  {c.icon}
                </span>
                <span>
                  <span className="block text-[12.5px] font-semibold text-navy">{c.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate">{c.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full rounded-lg border border-navy/15 bg-white/60 px-3 py-2.5 text-[13px] text-navy placeholder:text-slate/70 outline-none transition-colors focus:border-cyan/50 focus:bg-white/80"
            />
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Organization (optional)"
              className="w-full rounded-lg border border-navy/15 bg-white/60 px-3 py-2.5 text-[13px] text-navy placeholder:text-slate/70 outline-none transition-colors focus:border-cyan/50 focus:bg-white/80"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={4}
              className="w-full resize-none rounded-lg border border-navy/15 bg-white/60 px-3 py-2.5 text-[13px] text-navy placeholder:text-slate/70 outline-none transition-colors focus:border-cyan/50 focus:bg-white/80"
            />

            {attemptedSubmit && !canSubmit && (
              <div className="text-[11.5px] font-medium text-amber">
                Please add your name and a short message before sending.
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-xl border border-cyan-mint/50 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow-btn transition-transform hover:-translate-y-0.5"
            >
              Be Our Next Partner
            </button>
            <p className="text-center text-[10.5px] text-slate">
              Opens your email client addressed to {CONTACT_EMAIL} — no data is stored or sent automatically.
            </p>
          </div>
        </GlassPanel>
        </div>

        {/* Column 3: Resource quick links */}
        <GlassPanel>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-cyan-mint">
            RESOURCE QUICK LINKS
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white/30 px-3.5 py-3 transition-colors hover:bg-white/55"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/[0.10] text-cyan">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.487 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.465-1.11-1.465-.908-.622.069-.61.069-.61 1.003.071 1.531 1.032 1.531 1.032.892 1.532 2.341 1.09 2.91.834.091-.649.35-1.09.636-1.341-2.221-.253-4.556-1.114-4.556-4.958 0-1.096.39-1.992 1.03-2.694-.103-.254-.446-1.276.098-2.66 0 0 .84-.27 2.75 1.029A9.548 9.548 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.3 2.747-1.03 2.747-1.03.546 1.385.203 2.407.1 2.66.64.703 1.028 1.599 1.028 2.695 0 3.854-2.339 4.703-4.566 4.951.359.31.678.921.678 1.856 0 1.34-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.02C22 6.487 17.523 2 12 2Z" />
                </svg>
              </span>
              <span>
                <span className="block text-[12.5px] font-semibold text-navy">Explore GitHub Repository</span>
                <span className="block text-[11px] text-slate">Source code, architecture, models</span>
              </span>
            </a>

            <button
              type="button"
              onClick={() => scrollToForm("investors")}
              className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white/30 px-3.5 py-3 text-left transition-colors hover:bg-white/55"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/[0.10] text-cyan">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 3h8l4 4v14H5V3h2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[12.5px] font-semibold text-navy">Request Pitch Deck Summary</span>
                <span className="block text-[11px] text-slate">Routes to the inquiry form below</span>
              </span>
            </button>

            <a
              href={API_SPECS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white/30 px-3.5 py-3 transition-colors hover:bg-white/55"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/[0.10] text-cyan">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-[12.5px] font-semibold text-navy">Inspect API &amp; Architecture Specs</span>
                <span className="block text-[11px] text-slate">src/api &amp; data models, on GitHub</span>
              </span>
            </a>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}
