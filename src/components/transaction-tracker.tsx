"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  CircleDashed,
  Copy,
  MessageCircle,
  Receipt,
  Search,
  XCircle,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/orders";
import { findLocalOrder } from "@/lib/order-store";
import { rupiah } from "@/lib/format";

type Status = OrderStatus;

const STATUS_META: Record<
  Status,
  { label: string; tone: string; desc: string; dot: string }
> = {
  selesai: {
    label: "Selesai",
    tone: "border-emerald-400/40 bg-emerald-400/12 text-emerald-200",
    desc: "Pembayaran diterima dan layanan sudah dikirim ke nomor tujuan.",
    dot: "bg-emerald-400",
  },
  diproses: {
    label: "Sedang diproses",
    tone: "border-amber-400/40 bg-amber-400/12 text-amber-200",
    desc: "Pembayaran masuk, provider sedang mengirim layanan.",
    dot: "bg-amber-400",
  },
  menunggu: {
    label: "Menunggu pembayaran",
    tone: "border-sky-400/40 bg-sky-400/12 text-sky-200",
    desc: "Invoice sudah dibuat, pembayaran belum terdeteksi.",
    dot: "bg-sky-400",
  },
  gagal: {
    label: "Gagal",
    tone: "border-rose-400/40 bg-rose-400/12 text-rose-200",
    desc: "Pembayaran tidak berhasil, saldo otomatis dikembalikan.",
    dot: "bg-rose-400",
  },
};

const STAGES = [
  { key: "dibuat", label: "Pesanan dibuat" },
  { key: "dibayar", label: "Pembayaran diterima" },
  { key: "diproses", label: "Layanan diproses" },
  { key: "selesai", label: "Selesai" },
];

const REACH: Record<Status, number> = {
  menunggu: 1,
  diproses: 3,
  selesai: 4,
  gagal: 1,
};

function formatWaktu(iso: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function TransactionTracker({ initialInvoice = "" }: { initialInvoice?: string }) {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function lookup(value: string) {
    const code = value.trim().toUpperCase();
    if (!/^NXS-[A-Z0-9-]{4,}$/.test(code)) {
      setError("Format invoice belum tepat. Format: NXS-YYMMDD-XXX");
      setOrder(null);
      setNotFound(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // 1) pesanan yang dibuat di perangkat ini (checkout)
      const local = findLocalOrder(code);
      if (local) {
        setOrder({
          invoice: local.invoice,
          status: local.status,
          item: local.service,
          number: local.customer,
          total: local.amount,
          method: local.method,
          channel: local.channel,
          createdAt: local.createdAt,
        });
        setNotFound(false);
        return;
      }

      // 2) server
      const response = await fetch(`/api/orders/${encodeURIComponent(code)}`, {
        headers: { accept: "application/json" },
      });
      if (response.ok) {
        setOrder((await response.json()) as Order);
        setNotFound(false);
      } else {
        setOrder(null);
        setNotFound(true);
      }
    } catch {
      setOrder(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void lookup(invoice);
  }

  async function copyInvoice() {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.invoice);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  // Kalau datang dari halaman checkout (?nomor=...), langsung periksa otomatis.
  useEffect(() => {
    if (!initialInvoice) return;
    void lookup(initialInvoice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialInvoice]);

  const meta = order ? STATUS_META[order.status] : null;
  const reach = order ? REACH[order.status] : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8">
      {/* Kolom kiri */}
      <div className="space-y-5">
        <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Receipt size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[15.5px] font-bold text-white">Cari invoice</h2>
              <p className="text-[12.5px] text-muted">
                Ketik nomor invoice yang Anda terima saat memesan.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim"
                aria-hidden="true"
              />
              <input
                id="invoice-tracker"
                value={invoice}
                onChange={(event) => setInvoice(event.target.value)}
                placeholder="NXS-YYMMDD-XXX"
                autoComplete="off"
                aria-invalid={error ? true : undefined}
                className={`min-h-12 w-full rounded-xl border bg-ink-2 py-3 pl-11 pr-4 text-[15px] text-body placeholder:text-dim transition-colors focus:outline-none ${
                  error ? "border-rose-400/70" : "border-line focus:border-accent"
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-strong px-5 text-sm font-semibold text-accent-ink transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Search size={15} aria-hidden="true" />
              {loading ? "Mencari…" : "Cek status"}
            </button>
          </form>

          {error ? (
            <p
              role="alert"
              className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-rose-300"
            >
              <XCircle size={14} aria-hidden="true" />
              {error}
            </p>
          ) : null}

          {notFound ? (
            <div className="mt-5 rounded-xl border border-line bg-ink-2 p-4">
              <p className="text-[13.5px] font-semibold text-white">Invoice tidak ditemukan</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                Periksa kembali nomor invoice yang kamu terima. Kalau sudah benar tapi tetap tidak
                ditemukan, hubungi WhatsApp kami dengan menyertakan nomor tersebut.
              </p>
              <Link
                href="https://wa.me/6281200000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent transition hover:underline"
              >
                <MessageCircle size={13} aria-hidden="true" />
                Hubungi 0812-0000-0000
              </Link>
            </div>
          ) : null}
        </section>

        {order && meta ? (
          <section className="animate-pop overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-dim">
                  Hasil pemeriksaan
                </p>
                <p className="mt-0.5 font-display text-[19px] font-extrabold tracking-[-0.02em] text-white">
                  {order.invoice}
                </p>
              </div>
              <span
                className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-bold ${meta.tone}`}
              >
                {meta.label}
              </span>
            </div>

            {/* Timeline horizontal */}
            <div className="border-b border-line px-5 py-5 sm:px-6">
              <ol className="grid grid-cols-4 gap-1">
                {STAGES.map((stage, index) => {
                  const done = index + 1 <= reach && order.status !== "gagal";
                  const current = index + 1 === reach && order.status !== "selesai";
                  return (
                    <li
                      key={stage.key}
                      className="relative flex flex-col items-center gap-2 text-center"
                    >
                      {index > 0 ? (
                        <span
                          className={`absolute right-1/2 top-[11px] h-0.5 w-full ${
                            done ? "bg-accent/70" : "bg-line"
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className={`relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                          done
                            ? "border-accent bg-accent text-accent-ink"
                            : current
                              ? "border-accent bg-panel text-accent"
                              : "border-line bg-ink-2 text-dim"
                        }`}
                      >
                        {done ? (
                          <Check size={12} strokeWidth={4} aria-hidden="true" />
                        ) : current ? (
                          <CircleDashed size={12} aria-hidden="true" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      <span
                        className={`text-[11px] font-medium leading-tight ${
                          done ? "text-body" : "text-dim"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-[12.5px] leading-relaxed text-muted">{meta.desc}</p>
            </div>

            {/* Detail */}
            <dl className="grid gap-x-6 gap-y-3 px-5 py-5 text-[13.5px] sm:grid-cols-2 sm:px-6">
              {[
                ["Layanan", order.item],
                ["Nomor tujuan", order.number],
                ["Total", rupiah(order.total)],
                ["Metode pembayaran", order.method],
                ["Kanal pembayaran", order.channel],
                ["Waktu pesanan", formatWaktu(order.createdAt)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11.5px] uppercase tracking-[0.1em] text-dim">{label}</dt>
                  <dd className="mt-0.5 font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-2.5 border-t border-line px-5 py-4 sm:flex-row sm:px-6">
              <button
                type="button"
                onClick={copyInvoice}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-ink-2 px-4 text-[13.5px] font-semibold text-body transition hover:border-accent/60 hover:text-white"
              >
                {copied ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Copy size={15} aria-hidden="true" />
                )}
                {copied ? "Nomor tersalin" : "Salin nomor invoice"}
              </button>
              <a
                href="https://wa.me/6281200000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-strong px-4 text-[13.5px] font-semibold text-accent-ink transition hover:bg-accent-soft"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Hubungi 0812-0000-0000
              </a>
            </div>
          </section>
        ) : null}
      </div>

      {/* Kolom kanan */}
      <aside className="space-y-5 lg:sticky lg:top-24">
        <section className="rounded-2xl border border-line bg-panel p-5">
          <h2 className="text-[14px] font-bold text-white">Cara cek transaksi</h2>
          <ol className="mt-3 space-y-3">
            {[
              "Buka halaman ini dan masukkan nomor invoice.",
              "Nomor invoice ada di layar konfirmasi pesanan.",
              "Status, progres, dan bukti transaksi langsung tampil.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-[11.5px] font-bold text-accent">
                  {index + 1}
                </span>
                <span className="text-[12.5px] leading-relaxed text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-line bg-panel p-5">
          <h2 className="text-[14px] font-bold text-white">Arti status</h2>
          <ul className="mt-3 space-y-3">
            {Object.entries(STATUS_META).map(([key, value]) => (
              <li key={key} className="flex gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${value.dot}`} />
                <span>
                  <span className="block text-[12.5px] font-semibold text-body">{value.label}</span>
                  <span className="block text-[11.5px] leading-relaxed text-dim">{value.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-dashed border-line bg-ink-2 p-5">
          <h2 className="text-[14px] font-bold text-white">Belum punya invoice?</h2>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
            Nomor invoice dibuat otomatis saat kamu menekan tombol pesan. Kalau invoice-nya hilang,
            cek riwayat chat WhatsApp kami.
          </p>
          <Link
            href="/#kategori"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-panel px-4 text-[13px] font-semibold text-body transition hover:border-accent/60 hover:text-white"
          >
            Mulai pesanan baru
          </Link>
        </section>
      </aside>
    </div>
  );
}
