import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section className="border-y border-line bg-ink-2 py-4" aria-label="Layanan yang tersedia">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-2 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-2 to-transparent"
          aria-hidden="true"
        />
        <div className="flex w-max animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none">
          {row.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap text-[13px] font-medium text-muted"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
