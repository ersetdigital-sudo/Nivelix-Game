import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock3, Gauge, ShieldCheck } from "lucide-react";
import { TransactionTracker } from "@/components/transaction-tracker";

export const metadata: Metadata = {
  title: "Cek Transaksi",
  description:
    "Lacak status pesanan Nivelix Game lewat nomor invoice: status pembayaran, progres pengiriman, dan detail transaksi.",
};

export default function CheckTransactionPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:py-12">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-dim"
      >
        <Link href="/" className="transition-colors hover:text-white">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-body">Cek Transaksi</span>
      </nav>

      {/* Hero halaman */}
      <section className="relative mt-5 overflow-hidden rounded-3xl border border-line bg-panel p-6 sm:p-8">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="text-[clamp(1.7rem,1.3rem+2vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Cek transaksi kamu
            </h1>
            <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-muted">
              Masukkan nomor invoice untuk melihat status pembayaran, progres pengiriman layanan,
              dan detail transaksi kamu. Tidak perlu login, cukup satu nomor.
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {[
              { icon: Clock3, value: "3 detik", label: "Rata-rata proses" },
              { icon: Gauge, value: "24 jam", label: "Buka setiap hari" },
              { icon: ShieldCheck, value: "4 status", label: "Pantau realtime" },
            ].map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-line bg-ink-2/60 px-3 py-3.5"
              >
                <item.icon size={16} className="text-accent" aria-hidden="true" />
                <p className="mt-2 text-[14px] font-bold text-white">{item.value}</p>
                <p className="mt-0.5 text-[11.5px] leading-tight text-dim">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-6">
        <TransactionTracker />
      </div>
    </div>
  );
}
