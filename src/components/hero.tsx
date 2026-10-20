"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  BadgePercent,
  Clock3,
  Shield as ShieldIcon,
  Zap,
} from "lucide-react";

const FLOATING_CARDS = [
  {
    id: "token",
    className: "",
    delay: "0s",
    content: (
      <>
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
          <Zap size={13} aria-hidden="true" />
        </span>
        <span className="text-[12.5px] font-semibold text-body">Token PLN · Rp 100.000</span>
      </>
    ),
  },
  {
    id: "bpjs",
    className: "sm:mt-6",
    delay: "1.1s",
    content: (
      <>
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 13 4 4 10-10" />
          </svg>
        </span>
        <span className="text-[12.5px] text-muted">
          BPJS Rp 105.000 berhasil · 20 detik lalu
        </span>
      </>
    ),
  },
  {
    id: "cashback",
    className: "hidden sm:mt-3 sm:flex",
    delay: "2.2s",
    content: (
      <>
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <BadgePercent size={13} aria-hidden="true" />
        </span>
        <span className="text-[12.5px] text-muted">Cashback 5% masuk e-wallet</span>
      </>
    ),
  },
];

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = stageRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--px", `${(x * 12).toFixed(2)}px`);
    element.style.setProperty("--py", `${(y * 9).toFixed(2)}px`);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-32 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
          {/* KIRI: nilai + aksi */}
          <div className="min-w-0">
            <span
              className="animate-rise inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[12px] font-semibold text-accent"
              style={{ animationDelay: "40ms" }}
            >
              <Clock3 size={13} aria-hidden="true" />
              Diproses 3 detik · Buka 24 jam
            </span>

            <h1
              className="animate-rise mt-6 text-[clamp(2.3rem,1.4rem+3.8vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white"
              style={{ animationDelay: "100ms" }}
            >
              Bayar tagihan, beres{" "}
              <span className="relative inline-block text-accent">
                3 detik
                <span
                  className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-accent/50"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>

            <p
              className="animate-rise mt-5 text-[16px] leading-relaxed text-muted sm:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              Token, pulsa, BPJS, PDAM. Cashback 5%.
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{ animationDelay: "220ms" }}
            >
              <a
                href="#kategori"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-strong px-6 text-[15px] font-bold text-accent-ink shadow-[0_16px_36px_-18px_rgba(202,210,197,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-16px_rgba(202,210,197,0.55)]"
              >
                Mulai Bayar
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
              <Link
                href="/cek-transaksi"
                className="text-[13.5px] font-semibold text-muted underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Cek Transaksi
              </Link>
            </div>

            <ul
              className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-dim"
              style={{ animationDelay: "280ms" }}
            >
              {[
                { icon: Zap, label: "3 detik" },
                { icon: ShieldIcon, label: "Aman" },
                { icon: BadgePercent, label: "Cashback 5%" },
                { icon: Clock3, label: "24 jam" },
              ].map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <item.icon size={13} className="text-accent" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* KANAN: visual — mockup HP + kartu melayang */}
          <div
            ref={stageRef}
            onMouseMove={handleMove}
            className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto"
          >
            {/* Glow aksen di belakang HP */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[80px]"
              aria-hidden="true"
            />

            <div
              className="animate-rise relative"
              style={{ animationDelay: "180ms", transform: "translate3d(var(--px, 0), var(--py, 0), 0)" }}
            >
              {/* Glow aksen di belakang HP */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[80px]"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="animate-float relative mx-auto w-[212px] sm:mx-0 sm:w-[248px]">
                {/* Bingkai device: bezel tipis, pinggir metalik */}
                <div className="rounded-[2.6rem] bg-gradient-to-b from-white/25 to-white/5 p-[3px] shadow-[0_40px_90px_-38px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
                  <div className="rounded-[2.5rem] bg-ink p-[3px]">
                    <div className="relative overflow-hidden rounded-[2.25rem] bg-[#F3F8F5]">
                      {/* Dynamic Island */}
                      <div className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />

                      {/* Isi layar */}
                      <div className="px-5 pb-6 pt-11">
                        {/* App bar */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2E4548] to-[#44636A] text-[11px] font-bold text-accent">
                            N
                          </span>
                          <span className="text-[11px] font-bold tracking-tight text-ink">
                            Nivelix Game
                          </span>
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-[10px] font-bold text-muted">
                            •••
                          </span>
                        </div>

                        {/* Sukses */}
                        <div className="mt-6 text-center">
                          <span className="mx-auto inline-flex h-[58px] w-[58px] items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_12px_28px_-12px_rgba(16,140,80,0.9)]">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="m5 13 4 4 10-10" />
                            </svg>
                          </span>
                          <p className="mt-3.5 text-[11.5px] font-semibold tracking-wide text-muted">
                            PEMBAYARAN BERHASIL
                          </p>
                          <p className="mt-1.5 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                            Rp 102.500
                          </p>
                          <p className="mt-2 text-[12.5px] font-medium text-muted">
                            Token Listrik PLN 100.000
                          </p>
                        </div>

                        {/* Ringkasan */}
                        <dl className="mt-5 space-y-3 rounded-2xl bg-white p-4 text-[11.5px] shadow-[0_8px_20px_-16px_rgba(11,18,32,0.35)]">
                          {[
                            ["Metode", "QRIS"],
                            ["Waktu", "20 Sep, 14.32"],
                          ].map(([label, value]) => (
                            <div key={label} className="flex items-center justify-between gap-3">
                              <dt className="text-muted">{label}</dt>
                              <dd className="font-semibold text-ink">{value}</dd>
                            </div>
                          ))}
                          <div className="h-px bg-line" />
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-muted">Status</dt>
                            <dd className="inline-flex items-center gap-1.5 font-semibold text-[#0F8B4C]">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                              Lunas
                            </dd>
                          </div>
                        </dl>

                        {/* Tombol app */}
                        <div className="mt-4 rounded-xl bg-ink px-4 py-3 text-center text-[12px] font-bold text-body">
                          Lihat detail invoice
                        </div>
                      </div>

                      {/* Kilau layar */}
                      <div
                        className="pointer-events-none absolute -left-16 -top-10 h-64 w-32 rotate-[28deg] bg-white/25 blur-xl"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Kartu melayang — menumpuk di tepi kanan device (mobile: 2 kartu di bawah) */}
            <div className="relative z-20 mt-5 grid grid-cols-2 gap-2 sm:absolute sm:right-0 sm:top-10 sm:mt-0 sm:w-[206px] sm:grid-cols-1 sm:gap-4">
              {FLOATING_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`animate-float flex items-center gap-2.5 rounded-2xl border border-white/10 bg-panel/90 px-3.5 py-2.5 shadow-[0_20px_44px_-24px_rgba(0,0,0,0.95)] ring-1 ring-white/5 backdrop-blur-md ${card.className}`}
                  style={{ animationDelay: card.delay }}
                >
                  {card.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
