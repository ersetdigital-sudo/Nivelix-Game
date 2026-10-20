import type { ReactNode } from "react";

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent-strong px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-[0_16px_36px_-18px_rgba(202,210,197,0.45)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_20px_42px_-16px_rgba(202,210,197,0.55)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

export const btnGhost =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-panel px-5 py-2.5 text-sm font-semibold text-body transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-panel-2 hover:text-white active:translate-y-0";

export const btnOutline =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 active:translate-y-0";

export const card = "rounded-2xl border border-line bg-panel";

export const inputBase =
  "w-full min-h-11 rounded-xl border border-line bg-ink-2 px-4 py-2.5 text-[15px] text-body placeholder:text-dim transition-colors focus:border-accent focus:outline-none";

export function SectionHeading({
  title,
  description,
  align = "left",
  action,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl text-center" : "max-w-2xl"}>
        <h2 className="text-[clamp(1.75rem,1.15rem+2.4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
