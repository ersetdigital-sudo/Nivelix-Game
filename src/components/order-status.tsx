"use client";

import { FormEvent, useState } from "react";
import { btnPrimary } from "@/components/ui";
import type { Order, OrderStatus } from "@/lib/orders";
import { rupiah } from "@/lib/format";

type Status = OrderStatus;

const STATUS_META: Record<Status, { label: string; className: string }> = {
  selesai: { label: "Selesai", className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  diproses: { label: "Sedang diproses", className: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  menunggu: { label: "Menunggu pembayaran", className: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  gagal: { label: "Gagal", className: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
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

export function OrderStatus({ variant = "panel" }: { variant?: "panel" | "inline" }) {
  const [invoice, setInvoice] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = invoice.trim().toUpperCase();
    if (!/^NXS-[A-Z0-9-]{4,}$/.test(value)) {
      setError("Format invoice belum sesuai. Format: NXS-YYMMDD-XXX");
      setOrder(null);
      setNotFound(false);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(value)}`, {
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

  const meta = order ? STATUS_META[order.status] : null;

  return (
    <div
      className={
        variant === "panel"
          ? "rounded-2xl border border-line bg-panel p-5 sm:p-6"
          : "rounded-2xl border border-line bg-panel p-5"
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="invoice" className="block text-[13px] font-medium text-muted">
            Nomor invoice
          </label>
          <input
            id="invoice"
            value={invoice}
            onChange={(event) => setInvoice(event.target.value)}
            placeholder="NXS-YYMMDD-XXX"
            inputMode="text"
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "invoice-error" : undefined}
            className={`mt-2 min-h-11 w-full rounded-xl border bg-ink-2 px-4 py-2.5 text-[15px] text-body placeholder:text-dim transition-colors focus:outline-none ${
              error ? "border-rose-500/70" : "border-line focus:border-accent"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${btnPrimary} sm:mt-[30px]`}
        >
          {loading ? "Mencari…" : "Cek Status"}
        </button>
      </form>

      {error ? (
        <p id="invoice-error" role="alert" className="mt-3 text-[13px] font-medium text-rose-300">
          {error}
        </p>
      ) : null}

      {notFound ? (
        <div className="mt-5 rounded-xl border border-line bg-ink-2 p-4">
          <p className="text-[13.5px] font-semibold text-white">Invoice tidak ditemukan</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            Periksa kembali nomor invoice yang kamu terima, atau hubungi WhatsApp kami untuk
            pengecekan manual.
          </p>
        </div>
      ) : null}

      {order && meta ? (
        <div className="mt-5 animate-pop rounded-xl border border-line bg-ink-2 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] text-dim">Invoice</p>
              <p className="font-display text-[15px] font-bold text-white">{order.invoice}</p>
            </div>
            <span
              className={`rounded-lg border px-2.5 py-1 text-[12px] font-semibold ${meta.className}`}
            >
              {meta.label}
            </span>
          </div>

          <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] text-dim">Layanan</dt>
              <dd className="text-[13.5px] font-medium text-white">{order.item}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-dim">Nomor</dt>
              <dd className="text-[13.5px] font-medium text-white">{order.number}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-dim">Total</dt>
              <dd className="text-[13.5px] font-medium text-white">{rupiah(order.total)}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-dim">Metode bayar</dt>
              <dd className="text-[13.5px] font-medium text-white">{order.method}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-dim">Waktu</dt>
              <dd className="text-[13.5px] font-medium text-white">{formatWaktu(order.createdAt)}</dd>
            </div>
          </dl>

          <ol className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:gap-6">
            {[
              { label: "Pesanan dibuat", done: true },
              { label: "Pembayaran diterima", done: order.status !== "menunggu" },
              { label: "Layanan dikirim", done: order.status === "selesai" },
            ].map((step) => (
              <li key={step.label} className="flex items-center gap-2 text-[12.5px]">
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                    step.done
                      ? "border-accent bg-accent-strong text-accent-ink"
                      : "border-line bg-panel text-transparent"
                  }`}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4 10-10" />
                  </svg>
                </span>
                <span className={step.done ? "text-body" : "text-dim"}>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
