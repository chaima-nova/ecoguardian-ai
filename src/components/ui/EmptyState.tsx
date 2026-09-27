import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

/**
 * The canonical "honest empty state" used throughout EcoGuardian. Preferred
 * over ever fabricating placeholder data.
 */
export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-8" : "py-16"
      }`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 bg-navy/[0.045] text-slate">
          {icon}
        </div>
      )}
      <div className="text-[13px] font-semibold tracking-wide text-ice">{title}</div>
      {description && (
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-slate">{description}</p>
      )}
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 rounded-lg border border-cyan/30 bg-cyan/[0.08] px-4 py-2 text-[12px] font-medium text-cyan-mint transition-colors hover:bg-cyan/[0.14]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
