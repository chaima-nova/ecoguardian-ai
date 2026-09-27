import type { DiscoveryVariable } from "../../types/models";

const PLACEHOLDER_VARIABLES: DiscoveryVariable[] = [
  { id: "a", role: "Variable A", label: "Observed variable" },
  { id: "b", role: "Variable B", label: "Observed variable" },
  { id: "c", role: "Variable C", label: "Observed variable" },
];

/**
 * Conceptual variable-relationship visual for the Discovery Engine. Shows
 * *structure* (A relates to B relates to C) without ever inventing values.
 */
export default function RelationshipDiagram({
  variables = PLACEHOLDER_VARIABLES,
}: {
  variables?: DiscoveryVariable[];
}) {
  return (
    <div className="flex flex-col items-center gap-0 py-4">
      {variables.map((v, i) => (
        <div key={v.id} className="flex w-full max-w-xs flex-col items-center">
          <div className="w-full rounded-xl border border-navy/10 bg-navy/[0.045] px-4 py-3 text-center transition-colors hover:border-cyan/25">
            <div className="text-[11px] font-semibold tracking-wider text-cyan-mint">{v.role}</div>
            <div className="mt-1 text-[12px] text-slate">{v.label}</div>
          </div>
          {i < variables.length - 1 && (
            <svg width="10" height="28" viewBox="0 0 10 28" fill="none" className="my-1">
              <line x1="5" y1="0" x2="5" y2="20" stroke="#00E5FF" strokeOpacity="0.3" strokeWidth="1.3" strokeDasharray="3 3" />
              <path d="M1.5 18L5 24L8.5 18" stroke="#00E5FF" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
