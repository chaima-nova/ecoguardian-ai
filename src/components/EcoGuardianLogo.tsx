interface EcoGuardianLogoProps {
  /** Pixel size (square) of the rendered mark. Defaults to 32. */
  size?: number;
  className?: string;
}

const LOGO_SRC = "/assets/brand/ecoguardian-logo.png";

/**
 * EcoGuardianLogo
 * ---------------------------------------------------------------------------
 * The glassmorphic 3D monogram brand mark. Used alongside the "ECOGUARDIAN
 * AI" wordmark in the top navigation bar and the global footer — this
 * component only renders the icon itself, callers keep their own text.
 * ---------------------------------------------------------------------------
 */
export default function EcoGuardianLogo({ size = 32, className = "" }: EcoGuardianLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="EcoGuardian AI"
      width={size}
      height={size}
      className={`select-none object-contain ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}
