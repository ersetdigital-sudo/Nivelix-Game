"use client";

import type { ServiceIconName } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ServiceIcon, SERVICE_TONES } from "@/components/service-icon";
import { btnGhost, btnPrimary } from "@/components/ui";
import { digitsOnly, pad, rupiah } from "@/lib/format";

export type CheckoutOrder = {
  layanan: string;
  layananNama: string;
  layananIcon: ServiceIconName;
  produk: string;
  nominal: number;
  admin: number;
  total: number;
  nomor: string;
  meta?: string;
};

const STEPS = [
  { id: 1, label: "Konfirmasi" },
  { id: 2, label: "Pembayaran" },
  { id: 3, label: "Selesai" },
];

const CHECK_STEPS = [
  { label: "Memeriksa QRIS", hint: "Mencocokkan kode dengan invoice" },
  { label: "Konfirmasi dari bank", hint: "Menunggu Settlement QRIS" },
  { label: "Meneruskan ke provider", hint: "Kirim layanan ke nomor tujuan" },
  { label: "Layanan diproses", hint: "Selesai" },
];

const METHODS = [
  { id: "qris", name: "QRIS", note: "Scan sekali dengan semua aplikasi pembayaran", active: true },
  { id: "dana", name: "DANA", note: "Saldo DANA", active: false },
  { id: "ovo", name: "OVO", note: "Saldo OVO", active: false },
  { id: "gopay", name: "GoPay", note: "Saldo GoPay", active: false },
  { id: "shopeepay", name: "ShopeePay", note: "Saldo ShopeePay", active: false },
  { id: "bca", name: "BCA Virtual Account", note: "Transfer via mobile banking", active: false },
  { id: "bri", name: "BRI Virtual Account", note: "Transfer via mobile banking", active: false },
];

export function CheckoutFlow({ order }: { order: CheckoutOrder }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("qris");
  const [number, setNumber] = useState(order.nomor);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [payState, setPayState] = useState<"waiting" | "checking" | "accepted">("waiting");
  const [checkStep, setCheckStep] = useState(0);

  useEffect(() => {
    if (!invoice) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [invoice]);

  // Simulasi pemeriksaan pembayaran setelah pelanggan menekan "Saya sudah bayar".
  useEffect(() => {
    if (payState !== "checking") return;
    if (checkStep >= CHECK_STEPS.length) {
      setPayState("accepted");
      return;
    }
    const timer = window.setTimeout(() => setCheckStep((value) => value + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [payState, checkStep]);

  const numberValid = digitsOnly(number).length >= 6;

  function pay() {
    if (!numberValid) return;
    const now = new Date();
    const stamp = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const serial = String(Math.floor(Math.random() * 900) + 100);
    setInvoice(`NXS-${stamp}-${serial}`);
    setRemaining(15 * 60);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyInvoice() {
    if (!invoice) return;
    try {
      await navigator.clipboard.writeText(invoice);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      {/* Stepper */}
      <ol className="flex items-center gap-2 sm:gap-3">
        {STEPS.map((entry, index) => {
          const state = step > entry.id ? "done" : step === entry.id ? "current" : "todo";
          return (
            <li key={entry.id} className="flex flex-1 items-center gap-2 sm:gap-3">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12.5px] font-bold ${
                  state === "todo"
                    ? "border-line bg-panel text-dim"
                    : "border-accent bg-accent text-accent-ink"
                }`}
              >
                {state === "done" ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4 10-10" />
                  </svg>
                ) : (
                  entry.id
                )}
              </span>
              <span
                className={`hidden text-[13px] font-semibold sm:block ${
                  state === "todo" ? "text-dim" : "text-white"
                }`}
              >
                {entry.label}
              </span>
              {index < STEPS.length - 1 ? (
                <span
                  className={`h-px flex-1 ${step > entry.id ? "bg-accent/70" : "bg-line"}`}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        <div className="space-y-5">
          {/* Langkah 1 — konfirmasi */}
          {step === 1 ? (
            <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
              <h2 className="text-[15.5px] font-bold text-white">Konfirmasi pesanan</h2>
              <p className="mt-1.5 text-[13px] text-muted">
                Periksa produk dan nomor tujuan sebelum membayar.
              </p>

              <div className="mt-5 flex items-start gap-3.5 rounded-xl border border-line bg-ink-2/60 p-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <ServiceIcon
                  name={order.layananIcon}
                  size={26}
                  className={`h-[26px] w-[26px] ${SERVICE_TONES[order.layananIcon]?.ink ?? "text-accent"}`}
                />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-white">{order.produk}</p>
                  <p className="text-[12.5px] text-muted">{order.layananNama}</p>
                  {order.meta ? (
                    <p className="mt-0.5 text-[11.5px] text-dim">{order.meta}</p>
                  ) : null}
                  <p className="mt-1.5 text-[13px] font-semibold text-white">{rupiah(order.nominal)}</p>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="checkout-nomor" className="block text-[13px] font-medium text-muted">
                  Nomor tujuan
                </label>
                <input
                  id="checkout-nomor"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  inputMode="numeric"
                  placeholder="Nomor tujuan"
                  className={`mt-2 min-h-12 w-full rounded-xl border bg-ink-2 px-4 py-3 text-[15px] text-body placeholder:text-dim transition-colors focus:outline-none ${
                    numberValid ? "border-line focus:border-accent" : "border-amber-400/60"
                  }`}
                />
                {!numberValid ? (
                  <p className="mt-2 text-[12.5px] font-semibold text-amber-300">
                    Nomor tujuan belum valid, periksa lagi sebelum lanjut.
                  </p>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!numberValid}
                  className={`${btnPrimary} flex-1`}
                >
                  Lanjut ke pembayaran
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </button>
                <Link
                  href={`/layanan/${order.layanan}`}
                  className={`${btnGhost} flex-1`}
                >
                  Ubah produk
                </Link>
              </div>
            </section>
          ) : null}

          {/* Langkah 2 — metode pembayaran */}
          {step === 2 ? (
            <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[15.5px] font-bold text-white">Metode pembayaran</h2>
                <span className="rounded-lg border border-accent/40 bg-accent/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                  QRIS aktif
                </span>
              </div>
              <p className="mt-1.5 text-[13px] text-muted">
                Saat ini pembayaran memakai QRIS. E-wallet dan virtual account segera hadir.
              </p>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {METHODS.map((entry) => {
                  const active = entry.id === method;
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => entry.active && setMethod(entry.id)}
                        disabled={!entry.active}
                        aria-pressed={active}
                        className={`card-hover flex w-full items-center gap-3 rounded-xl border p-3.5 text-left ${
                          active
                            ? "border-accent bg-accent/12"
                            : entry.active
                              ? "border-line bg-ink-2 hover:-translate-y-0.5 hover:border-accent/40"
                              : "cursor-not-allowed border-line bg-ink-2 opacity-45"
                        }`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            active ? "border-accent" : "border-line"
                          }`}
                        >
                          {active ? <span className="h-2.5 w-2.5 rounded-full bg-accent" /> : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-semibold text-white">
                            {entry.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-dim">{entry.note}</span>
                        </span>
                        {!entry.active ? (
                          <span className="shrink-0 rounded-md border border-line px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-dim">
                            Segera
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <button type="button" onClick={pay} className={`${btnPrimary} flex-1`}>
                  Bayar {rupiah(order.total)}
                </button>
                <button type="button" onClick={() => setStep(1)} className={`${btnGhost} flex-1`}>
                  Kembali
                </button>
              </div>

              <p className="mt-3 text-[11.5px] leading-relaxed text-dim">
                Dengan menekan tombol bayar kamu menyetujui nominal dan nomor tujuan di ringkasan.
              </p>
            </section>
          ) : null}

          {/* Langkah 3 — selesai */}
          {step === 3 && invoice ? (
            <section className="animate-pop overflow-hidden rounded-2xl border border-accent/35 bg-panel">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-dim">
                    Nomor invoice
                  </p>
                  <p className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-white">
                    {invoice}
                  </p>
                </div>
                <span
                  className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-bold ${
                    payState === "accepted"
                      ? "border-emerald-400/40 bg-emerald-400/12 text-emerald-200"
                      : payState === "checking"
                        ? "border-sky-400/40 bg-sky-400/12 text-sky-200"
                        : "border-amber-400/40 bg-amber-400/12 text-amber-200"
                  }`}
                >
                  {payState === "accepted"
                    ? "Pembayaran diterima"
                    : payState === "checking"
                      ? "Sedang diperiksa"
                      : "Menunggu pembayaran"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3.2 2" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[12.5px] text-muted">Selesaikan pembayaran dalam</p>
                    <p className="font-display text-[22px] font-extrabold tabular-nums text-white">
                      {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyInvoice}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-ink-2 px-3.5 text-[12.5px] font-semibold text-body transition hover:border-accent/60 hover:text-white"
                >
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 13 4 4 10-10" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="11" height="11" rx="2.5" />
                      <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
                    </svg>
                  )}
                  {copied ? "Tersalin" : "Salin invoice"}
                </button>
              </div>

              {payState === "waiting" ? (
                <div className="bg-ink-2/50 px-5 py-5 sm:px-6">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <Image
                      src="/images/qris-merchant.jpg"
                      alt="Kode QRIS untuk pembayaran di Nivelix Game"
                      width={1135}
                      height={1600}
                      unoptimized
                      className="w-full max-w-[280px] rounded-lg border border-line bg-white"
                      priority
                    />
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-white">Scan QRIS di aplikasi apa pun</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Buka GoPay, OVO, DANA, atau mobile banking kamu, pilih Scan QR, lalu arahkan
                        ke kode di samping. Setelah bayar, tekan tombol di bawah supaya kami
                        langsung memeriksa.
                      </p>
                      <p className="mt-3 text-[13px] text-body">
                        Total yang harus dibayar{" "}
                        <strong className="font-display text-[18px] font-extrabold text-white">
                          {rupiah(order.total)}
                        </strong>
                      </p>
                      <p className="mt-1 text-[12.5px] text-muted">
                        {order.produk} · {number}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPayState("checking");
                      setCheckStep(0);
                    }}
                    className={`${btnPrimary} mt-5 w-full`}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Saya sudah bayar
                  </button>
                </div>
              ) : null}

              {payState === "checking" ? (
                <div className="bg-ink-2/50 px-5 py-6 sm:px-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/12 text-sky-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="animate-spin" aria-hidden="true">
                        <path d="M12 3a9 9 0 1 0 9 9" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-white">
                        Terima kasih, pembayaran Anda sedang diproses dan diperiksa
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                        Jangan tutup halaman ini dulu. Pemeriksaan biasanya selesai kurang dari 1
                        menit, dan status akan otomatis berubah.
                      </p>
                    </div>
                  </div>

                  <ol className="mt-5 space-y-3 border-t border-line pt-4">
                    {CHECK_STEPS.map((item, index) => {
                      const done = index < checkStep;
                      const current = index === checkStep;
                      return (
                        <li key={item.label} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              done
                                ? "border-emerald-400 bg-emerald-400 text-ink"
                                : current
                                  ? "border-sky-400 bg-sky-400/15 text-sky-200"
                                  : "border-line bg-ink-2 text-dim"
                            }`}
                          >
                            {done ? (
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="m5 13 4 4 10-10" />
                              </svg>
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-[13px] font-semibold ${
                                done ? "text-body" : current ? "text-white" : "text-dim"
                              }`}
                            >
                              {item.label}
                            </span>
                            <span className="block text-[11.5px] text-dim">{item.hint}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ) : null}

              {payState === "accepted" ? (
                <div className="bg-emerald-400/8 px-5 py-6 sm:px-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-white">
                        Pembayaran diterima, layanan sedang dikirim
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                        {order.produk} untuk nomor {number} akan masuk dalam hitungan detik. Bukti
                        transaksi bisa dicek di halaman Cek Transaksi.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-2.5 border-t border-line px-5 py-4 sm:flex-row sm:px-6">
                <a
                  href="https://wa.me/6281200000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnPrimary} flex-1`}
                >
                  Hubungi 0812-0000-0000
                </a>
                <Link href="/cek-transaksi" className={`${btnGhost} flex-1`}>
                  Cek status transaksi
                </Link>
              </div>

              <div className="border-t border-line px-5 py-4 sm:px-6">
                <Link
                  href="/#kategori"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition hover:underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                  Pesan layanan lain
                </Link>
              </div>
            </section>
          ) : null}
        </div>

        {/* Ringkasan order */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[14px] font-bold text-white">Ringkasan order</h2>
              {step === 1 ? (
                <Link
                  href={`/layanan/${order.layanan}`}
                  className="text-[12px] font-semibold text-accent hover:underline"
                >
                  Ubah
                </Link>
              ) : null}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-surface-2 px-3.5 py-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <ServiceIcon
                  name={order.layananIcon}
                  size={20}
                  className={`h-5 w-5 ${SERVICE_TONES[order.layananIcon]?.ink ?? "text-accent"}`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-white">{order.produk}</p>
                <p className="truncate text-[11.5px] text-dim">{order.layananNama}</p>
              </div>
              <p className="shrink-0 text-[13px] font-bold text-white">{rupiah(order.nominal)}</p>
            </div>

            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[13px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-white">{rupiah(order.nominal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Biaya admin</dt>
                <dd className="font-semibold text-white">{rupiah(order.admin)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Nomor tujuan</dt>
                <dd className="max-w-[60%] break-words text-right font-semibold text-white">
                  {number || "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
              <span className="text-[13.5px] font-semibold text-muted">Total</span>
              <span className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
                {rupiah(order.total)}
              </span>
            </div>

            <ul className="mt-5 space-y-2 border-t border-line pt-4 text-[11.5px] text-dim">
              {[
                "Pembayaran lewat kanal resmi QRIS",
                "Status pesanan bisa dilacak real-time",
                "Bukti transaksi dikirim ke nomor tujuan",
              ].map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
                    <path d="m5 13 4 4 10-10" />
                  </svg>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
