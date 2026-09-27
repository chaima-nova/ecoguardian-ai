const ROWS: { key: string; label: string }[] = [
  { key: "spatial", label: "SPATIAL RELATIONSHIP" },
  { key: "temporal", label: "TEMPORAL RELATIONSHIP" },
  { key: "historical", label: "HISTORICAL SIMILARITY" },
];

export default function RelationshipStatusRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {ROWS.map((r) => (
        <div
          key={r.key}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-navy/10 bg-navy/[0.035] px-4 py-6 text-center"
        >
          <div className="text-[10.5px] font-semibold tracking-widest text-slate">{r.label}</div>
          <div className="h-px w-8 bg-navy/[0.06]" />
          <div className="text-[11px] text-slate/70">Awaiting data</div>
        </div>
      ))}
    </div>
  );
}
