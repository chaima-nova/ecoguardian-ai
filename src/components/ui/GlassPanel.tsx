import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
  className?: string;
}

/** The base "glass" surface used across EcoGuardian: frosted, translucent,
 * blurred, thin white border, soft elevated shadow. */
export default function GlassPanel({
  children,
  padded = true,
  className = "",
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={`eg-glass relative rounded-2xl border border-white/60 bg-white/45 backdrop-blur-xl shadow-glass ${
        padded ? "p-6" : ""
      } ${className}`}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
