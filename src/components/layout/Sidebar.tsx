import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Overview", code: "01" },
  { to: "/city-watch", label: "City Watch", code: "02" },
  { to: "/city-memory", label: "City Memory", code: "03" },
  { to: "/discoveries", label: "Discoveries", code: "04" },
  { to: "/early-warnings", label: "Early Warnings", code: "05" },
  { to: "/evidence", label: "Evidence", code: "06" },
  { to: "/data", label: "Data", code: "07" },
  { to: "/connect", label: "Connect", code: "08" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/50 bg-white/35 backdrop-blur-xl px-4 py-6 lg:flex">
      <div className="mb-8 px-2">
        <div className="text-[10px] font-semibold tracking-[0.2em] text-slate">CONTROL CENTER</div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors ${
                isActive
                  ? "bg-cyan/[0.10] text-navy border border-cyan/20"
                  : "border border-transparent text-slate hover:bg-navy/[0.05] hover:text-ice"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`font-mono text-[10px] ${isActive ? "text-cyan-mint" : "text-slate/60"}`}
                >
                  {item.code}
                </span>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-mint" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 rounded-xl border border-navy/10 bg-navy/[0.035] p-3.5">
        <div className="text-[10px] font-semibold tracking-widest text-slate">DATA COVERAGE</div>
        <div className="mt-2 text-[12px] text-ice">No sources connected</div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-navy/[0.07]">
          <div className="h-full w-0 bg-cyan-mint" />
        </div>
      </div>
    </aside>
  );
}
