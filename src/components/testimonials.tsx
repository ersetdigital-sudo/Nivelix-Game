import { SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/data";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} dari 5 bintang`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={index < count ? "#CAD2C5" : "#4A6467"}
          aria-hidden="true"
        >
          <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="testimoni">
      <SectionHeading
        title="Cerita dari pelanggan"
        description="Ulasan dari pelanggan yang rutin memakai Nivelix Game untuk tagihan harian."
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <li
            key={item.name}
            className="flex h-full flex-col rounded-2xl border border-line bg-panel p-5"
          >
            <Stars />
            <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-body/90">{item.text}</p>
            <div className="mt-5 flex items-center gap-3 border-t border-line-soft pt-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[13px] font-bold text-accent">
                {item.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-white">{item.name}</p>
                <p className="truncate text-[12px] text-dim">
                  {item.city} · {item.service}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
