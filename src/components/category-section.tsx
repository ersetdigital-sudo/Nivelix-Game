"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ServiceIcon, SERVICE_TONES } from "@/components/service-icon";
import type { ServiceIconName } from "@/lib/data";
import { SectionHeading } from "@/components/ui";
import { categoryFilters, categoryLabels, services } from "@/lib/data";
import type { CategoryId } from "@/lib/data";

export function CategorySection() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = filter === "all" || service.category === filter;
      const matchesQuery =
        normalized.length === 0 ||
        service.title.toLowerCase().includes(normalized) ||
        service.tagline.toLowerCase().includes(normalized) ||
        categoryLabels[service.category].toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="kategori" className="scroll-mt-24">
      <SectionHeading
        title="Delapan layanan, satu akun"
        description="Pilih kategori, isi nomor, lalu lanjut ke pembayaran. Semua prosesnya sama singkatnya."
      />

      <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`min-h-10 rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent-strong text-accent-ink"
                    : "border-line bg-panel text-muted hover:border-accent/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dim"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari layanan, mis. BPJS"
            aria-label="Cari layanan"
            className="min-h-11 w-full rounded-xl border border-line bg-panel py-2.5 pl-10 pr-3 text-[14px] text-body placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-panel px-6 py-12 text-center">
          <p className="text-sm font-semibold text-white">Layanan tidak ditemukan</p>
          <p className="mx-auto mt-2 max-w-[46ch] text-sm text-muted">
            Coba kata kunci lain, atau pilih filter kategori yang berbeda.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-ink-2 px-5 text-sm font-semibold text-body transition hover:border-accent/60 hover:text-white"
          >
            Atur ulang pencarian
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/layanan/${service.slug}`}
                className="card-hover group flex h-full flex-col rounded-2xl border border-line bg-panel p-3.5 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_26px_50px_-30px_rgba(202,210,197,0.35)] sm:p-5"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14 ${
                    SERVICE_TONES[service.icon as ServiceIconName]?.tile ?? "bg-accent/10"
                  }`}
                >
                  <ServiceIcon
                    name={service.icon as ServiceIconName}
                    size={22}
                    className={`h-[22px] w-[22px] sm:h-7 sm:w-7 ${
                      SERVICE_TONES[service.icon as ServiceIconName]?.ink ?? "text-accent"
                    }`}
                  />
                </span>
                <h3 className="mt-3 text-[14px] font-bold leading-snug text-white sm:mt-4 sm:text-[15.5px]">
                  {service.title}
                </h3>
                <p className="mt-1.5 hidden flex-1 text-[13px] leading-relaxed text-muted sm:block">
                  {service.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent sm:mt-4 sm:text-[12.5px]">
                  Mulai dari {service.products[0]?.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
