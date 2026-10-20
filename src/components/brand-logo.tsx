import { useId } from "react";
import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  /** "color" = logo berwarna (default), "light" = putih polos */
  variant?: "color" | "light";
  size?: number;
  /** Sembunyikan wordmark, hanya mark */
  markOnly?: boolean;
};

/**
 * Logo Nivelix Game.
 * - variant "color": mark memakai gradien teal–slate, wordmark "Game" berwarna teal.
 * - variant "light": versi putih polos (untuk footer terang).
 *
 * Replace `BrandLogo` dengan file brand kit Anda (SVG) bila tersedia.
 */
export function BrandLogo({
  variant = "color",
  size = 36,
  markOnly = false,
  className,
  ...rest
}: LogoProps) {
  const colored = variant === "color";
  const viewWidth = markOnly ? 40 : 178;
  // ID gradien unik per instance (logo dipakai di header + footer)
  const uid = useId().replace(/:/g, "");
  const borderId = `nx-mark-border-${uid}`;
  const fillId = `nx-mark-fill-${uid}`;
  const accentId = `nx-mark-accent-${uid}`;
  const markStroke = colored ? `url(#${borderId})` : "#FFFFFF";
  const markFill = colored ? `url(#${fillId})` : "#FFFFFF";
  const wordmark = colored ? "#FFFFFF" : "#0B1220";
  const accent = colored ? `url(#${accentId})` : "#CAD2C5";

  return (
    <svg
      width={markOnly ? size : size * 4.45}
      height={size}
      viewBox={`0 0 ${viewWidth} 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Nivelix Game"
      {...rest}
    >
      <defs>
        <linearGradient id={borderId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FE3D3" />
          <stop offset="0.55" stopColor="#3FBFAE" />
          <stop offset="1" stopColor="#2A7C79" />
        </linearGradient>
        <linearGradient id={fillId} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D8EFE9" />
        </linearGradient>
        <linearGradient id={accentId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC46B" />
          <stop offset="1" stopColor="#FF8A3D" />
        </linearGradient>
      </defs>

      <g>
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="11"
          stroke={markStroke}
          strokeWidth="2.6"
          fill="none"
        />
        <path d="M12 28V12.8h5.2l9.1 9.3V12.8h4.9V28h-5.1l-9.2-9.4V28H12Z" fill={markFill} />
        <rect x="26.4" y="4.4" width="7.6" height="7.6" rx="2.4" fill={accent} />
      </g>

      {!markOnly && (
        <g>
          <text
            x="49"
            y="27.5"
            fill={wordmark}
            fontFamily="var(--font-jakarta), Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
            fontSize="19"
            fontWeight="800"
            letterSpacing="-0.5"
          >
            Nivelix
          </text>
          <text
            x="112"
            y="27.5"
            fill={accent}
            fontFamily="var(--font-jakarta), Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
            fontSize="19"
            fontWeight="700"
            letterSpacing="-0.2"
          >
            Game
          </text>
        </g>
      )}
    </svg>
  );
}

export function BrandMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nx-mark-only-border" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FE3D3" />
          <stop offset="0.55" stopColor="#3FBFAE" />
          <stop offset="1" stopColor="#2A7C79" />
        </linearGradient>
        <linearGradient id="nx-mark-only-fill" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D8EFE9" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="url(#nx-mark-only-border)" strokeWidth="2.6" />
      <path d="M12 28V12.8h5.2l9.1 9.3V12.8h4.9V28h-5.1l-9.2-9.4V28H12Z" fill="url(#nx-mark-only-fill)" />
      <rect x="26.4" y="4.4" width="7.6" height="7.6" rx="2.4" fill="#FF9A3D" />
    </svg>
  );
}
