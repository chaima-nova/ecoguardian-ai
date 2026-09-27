import { useState } from "react";
import { NavLink } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";

const NAV_ITEMS = [
  { to: "/", label: "Overview" },
  { to: "/city-watch", label: "City Watch" },
  { to: "/city-memory", label: "City Memory" },
  { to: "/discoveries", label: "Discoveries" },
  { to: "/early-warnings", label: "Early Warnings" },
  { to: "/evidence", label: "Evidence" },
  { to: "/data", label: "Data" },
];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/50 bg-white/35 backdrop-blur-xl px-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/[0.08]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5.4" stroke="#0066FF" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="1.3" fill="#0066FF" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-bold tracking-[0.14em] text-navy">ECOGUARDIAN AI</div>
          <div className="text-[10.5px] text-slate">City Intelligence &amp; Early Warning System</div>
        </div>
      </div>

      <button
        className="flex items-center gap-2 rounded-lg border border-navy/10 px-3 py-1.5 text-[12px] text-slate lg:hidden"
        onClick={() => setMenuOpen((v) => !v)}
      >
        Menu
      </button>

      <div className="hidden items-center gap-4 lg:flex">
        <StatusBadge status="DATA_NOT_CONNECTED" />
        <StatusBadge status="RESEARCH_PROTOTYPE" />
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-white/50 bg-white/80 backdrop-blur-xl p-4 lg:hidden">
          <nav className="mb-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-[13px] ${
                    isActive ? "bg-cyan/[0.10] text-navy" : "text-slate"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <StatusBadge status="DATA_NOT_CONNECTED" />
            <StatusBadge status="RESEARCH_PROTOTYPE" />
          </div>
        </div>
      )}
    </header>
  );
}
