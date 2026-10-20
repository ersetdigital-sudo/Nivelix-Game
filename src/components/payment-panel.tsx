"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ServiceIcon, SERVICE_TONES } from "@/components/service-icon";
import type { ServiceIconName } from "@/lib/data";
import { btnGhost, btnPrimary } from "@/components/ui";
import { getService, paymentGroups, paymentMethods, SITE_CONTACT } from "@/lib/data";
import type { PaymentGroup } from "@/lib/data";
import { digitsOnly, pad, rupiah } from "@/lib/format";

type OrderPayload = {
  layanan: string;
  layananNama: string;
  produk: string;
  nominal: number;
  admin: number;
  total: number;
  nomor: string;
  wilayah?: string;
  dompet?: string;
  tenor?: string;
};

export function PaymentPanel({ order }: { order: OrderPayload }) {
  const [methodId, setMethodId] = useState<string>("qris");
  const [invoice, setInvoice] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(15 * 60);
  const [copied, setCopied] = useState(false);

  const method = paymentMethods.find((item) => item.id === methodId) ?? paymentMethods[0];
  const service = getService(order.layanan);
  const expired = remaining <= 0;

  useEffect(() => {
    if (!invoice) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [invoice]);

  const grouped = useMemo(
    () =>
      paymentGroups.map((group) => ({
        ...group,
        methods: paymentMethods.filter((item) => item.group === group.id),
      })),
    [],
  );

  const vaNumber = useMemo(() => {
    const base = (method.code ?? "8808") + invoice?.replace(/\D/g, "").slice(-8).padStart(8, "0");
    return base;
  }, [method.code, invoice]);

  function startPayment() {
    const now = new Date();
    const stamp = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const random = String(Math.floor(Math.random() * 900) + 100);
    setInvoice(`NXS-${stamp}-${random}`);
    setRemaining(15 * 60);
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
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
      <div className="space-y-6">
        {!invoice ? (
          <>
            <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[15.5px] font-bold text-white">Pilih metode pembayaran</h2>
                <span className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                  QRIS aktif
                </span>
              </div>
              <p className="mt-1.5 text-[13px] text-muted">
                Saat ini pembayaran memakai QRIS. Metode e-wallet dan virtual account segera hadir.
              </p>

              <div className="mt-5 space-y-5">
                {grouped.map((group) => (
                  <fieldset key={group.id}>
                    <legend className="text-[12.5px] font-semibold text-muted">
                      {group.label}
                      <span className="ml-2 font-normal text-dim">{group.hint}</span>
                    </legend>
                    <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                      {group.methods.map((item) => {
                        const active = item.id === methodId;
                        const disabled = item.id !== "qris";
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setMethodId(item.id)}
                            aria-pressed={active}
                            disabled={disabled}
                            title={disabled ? "Metode ini sedang dinonaktifkan" : undefined}
                            className={`card-hover flex items-center gap-3 rounded-xl border p-3.5 text-left ${
                              active
                                ? "border-accent bg-accent/10"
                                : disabled
                                  ? "cursor-not-allowed border-line bg-ink-2 opacity-45"
                                  : "border-line bg-ink-2 hover:-translate-y-0.5 hover:border-accent/40"
                            }`}
                          >
                            <span
                              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                active ? "border-accent" : "border-line"
                              }`}
                            >
                              {active ? (
                                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                              ) : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13.5px] font-semibold text-white">
                                {item.name}
                              </span>
                              <span className="block truncate text-[11.5px] text-dim">{item.note}</span>
                            </span>
                            {disabled ? (
                              <span className="shrink-0 rounded-md border border-line px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-dim">
                                Segera
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="animate-pop rounded-2xl border border-accent/35 bg-panel p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[12px] text-dim">Nomor invoice</p>
                <p className="font-display text-[19px] font-extrabold tracking-[-0.02em] text-white">
                  {invoice}
                </p>
              </div>
              <button
                type="button"
                onClick={copyInvoice}
                className="rounded-lg border border-line bg-ink-2 px-3 py-2 text-[12.5px] font-semibold text-body transition hover:border-accent/60 hover:text-white"
              >
                {copied ? "Tersalin" : "Salin invoice"}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-ink-2 p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CAD2C5" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.2 2" />
                </svg>
              </span>
              <div>
                <p className="text-[12.5px] text-muted">Selesaikan pembayaran dalam</p>
                <p
                  className={`font-display text-[22px] font-extrabold tracking-[-0.02em] tabular-nums ${
                    remaining <= 60 ? "text-rose-300" : "text-white"
                  }`}
                >
                  {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-line bg-ink-2 p-5">
              {expired ? (
                <p className="text-[13.5px] font-medium text-rose-300">
                  Waktu pembayaran habis. Buat invoice baru untuk melanjutkan.
                </p>
              ) : method.group === "va" ? (
                <>
                  <p className="text-[13px] text-muted">
                    Transfer ke Virtual Account {method.name}
                  </p>
                  <p className="mt-2 font-display text-[24px] font-extrabold tracking-[0.02em] text-white tabular-nums">
                    {vaNumber}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                    transferring <strong className="font-semibold text-white">{rupiah(order.total)}</strong>{" "}
                    dan masukkan nomor invoice sebagai berita acara. Pembayaran terdeteksi otomatis.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                  <Image
                    src="/images/qris-merchant.jpg"
                    alt="Kode QRIS untuk pembayaran di Nivelix Game"
                    width={1135}
                    height={1600}
                    unoptimized
                    className="w-full max-w-[300px] rounded-lg border border-line bg-white"
                    priority
                  />
                  <div>
                    <p className="text-[13.5px] font-semibold text-white">
                      {method.group === "qris"
                        ? "Scan QRIS di aplikasi apa pun"
                        : `Bayar lewat ${method.name}`}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                      {method.group === "qris"
                        ? "Buka GoPay, OVO, DANA, atau mobile banking Anda, pilih Scan QR, lalu arahkan ke kode di atas."
                        : `Buka aplikasi ${method.name}, pilih menu Scan QR atau Transfer ke merchant, lalu pindai kode di samping.`}
                    </p>
                    <p className="mt-3 text-[13px] text-body">
                      Total yang harus dibayar{" "}
                      <strong className="font-display text-[17px] font-extrabold text-white">
                        {rupiah(order.total)}
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={`https://wa.me/${SITE_CONTACT.whatsapp}?text=${encodeURIComponent(
                  `Halo Nivelix Game, saya sudah membayar invoice ${invoice} sebesar ${rupiah(order.total)}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimary} flex-1`}
              >
                Hubungi {SITE_CONTACT.whatsappDisplay}
              </a>
              <button
                type="button"
                onClick={startPayment}
                className={`${btnGhost} flex-1`}
              >
                Buat invoice baru
              </button>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-dim">
              Ini simulasi pembayaran: tidak ada uang yang benar-benar berpindah. Status pesanan
              dapat dicek di halaman Cek Transaksi.
            </p>
          </section>
        )}
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
              <ServiceIcon
                name={(service?.icon ?? "wallet") as ServiceIconName}
                size={26}
                className={`h-[26px] w-[26px] ${
                  SERVICE_TONES[(service?.icon ?? "wallet") as ServiceIconName]?.ink ?? "text-accent"
                }`}
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-bold text-white">
                {order.layananNama || service?.title || "Pesanan"}
              </p>
              <p className="truncate text-[12px] text-dim">Ringkasan pesanan</p>
            </div>
          </div>

          <dl className="mt-5 space-y-3 border-t border-line pt-4 text-[13.5px]">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Produk</dt>
              <dd className="max-w-[58%] text-right font-medium text-white">
                {order.produk || "—"}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Nomor</dt>
              <dd className="max-w-[58%] break-words text-right font-medium text-white">
                {order.nomor || "—"}
              </dd>
            </div>
            {order.wilayah ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Wilayah</dt>
                <dd className="max-w-[58%] text-right font-medium text-white">{order.wilayah}</dd>
              </div>
            ) : null}
            {order.dompet ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Dompet</dt>
                <dd className="text-right font-medium text-white">{order.dompet}</dd>
              </div>
            ) : null}
            {order.tenor ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Tenor</dt>
                <dd className="text-right font-medium text-white">{order.tenor} bulan</dd>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Metode</dt>
              <dd className="text-right font-medium text-white">{method.name}</dd>
            </div>
          </dl>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-[13.5px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-white">{rupiah(order.nominal)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Biaya admin</dt>
              <dd className="font-medium text-white">{rupiah(order.admin)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <span className="text-[13.5px] font-medium text-muted">Total</span>
            <span className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-white">
              {rupiah(order.total)}
            </span>
          </div>

          {!invoice ? (
            <button
              type="button"
              onClick={startPayment}
              className={`${btnPrimary} mt-5 w-full`}
            >
              Bayar {rupiah(order.total)}
            </button>
          ) : null}

          <Link
            href="/cek-transaksi"
            className="mt-3 block text-center text-[12.5px] font-medium text-muted transition-colors hover:text-white"
          >
            Cek status pesanan
          </Link>
        </div>
      </aside>
    </div>
  );
}
