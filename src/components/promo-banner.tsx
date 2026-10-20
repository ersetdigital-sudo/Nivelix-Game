"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pad } from "@/lib/format";

function nextMidnight() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(24, 0, 0, 0);
  return target.getTime() - now.getTime();
}

export function PromoBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(nextMidnight());
    const timer = window.setInterval(() => setRemaining(nextMidnight()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = remaining ?? 0;
  const hours = Math.floor(total / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);

  return (
    <section id="flash-sale" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-r from-[#2b4143] via-[#23383a] to-[#1c2d2f] shadow-[0_40px_90px_-50px_rgba(202,210,197,0.35)]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-accent/45 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent">
              Flash Sale
            </p>
            <h2 className="mt-4 text-[clamp(1.6rem,1.2rem+1.8vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Cashback 5% untuk semua transaksi hari ini.
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              Berlaku untuk token listrik, pulsa, paket data, iuran BPJS, dan tagihan PDAM. Syarat
              berlaku untuk 1.000 transaksi pertama setiap hari.
            </p>
            <Link
              href="/#kategori"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent-strong px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Paket promo sekarang
            </Link>
          </div>

          <div className="shrink-0">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
              Berakhir dalam
            </p>
            <div className="mt-3 flex items-center gap-2.5 sm:gap-3">
              {[
                { value: hours, label: "Jam" },
                { value: minutes, label: "Menit" },
                { value: seconds, label: "Detik" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="min-w-[68px] rounded-2xl border border-accent/35 bg-black/40 px-3 py-3 text-center backdrop-blur-sm sm:min-w-[84px]"
                >
                  <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] font-extrabold leading-none tracking-[-0.03em] text-white tabular-nums">
                    {remaining === null ? "--" : pad(unit.value)}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium text-muted">{unit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
