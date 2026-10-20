"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { OperatorMark } from "@/components/operator-mark";
import { ServiceIcon, SERVICE_TONES } from "@/components/service-icon";
import type { ServiceIconName } from "@/lib/data";
import { btnGhost, btnPrimary } from "@/components/ui";
import { detectOperator, operators } from "@/lib/data";
import type { Service } from "@/lib/data";
import { digitsOnly, rupiah } from "@/lib/format";

export function ServiceForm({
  service,
  initialNumber = "",
}: {
  service: Service;
  initialNumber?: string;
}) {
  const [number, setNumber] = useState(initialNumber);
  const [productId, setProductId] = useState<string>(service.products[0]?.id ?? "");
  const [region, setRegion] = useState(service.regions?.[0] ?? "");
  const [wallet, setWallet] = useState(service.wallets?.[0]?.name ?? "");
  const [tenor, setTenor] = useState(service.tenorMonths?.[0] ?? 12);

  const operator = useMemo(
    () => (service.operatorPicker ? detectOperator(number) : null),
    [number, service.operatorPicker],
  );

  const product = service.products.find((item) => item.id === productId) ?? service.products[0];
  const adminFee = service.adminFee;
  const total = (product?.price ?? 0) + adminFee;

  const numberReady = digitsOnly(number).length >= 6;
  const canContinue = numberReady && Boolean(product);
  const query = new URLSearchParams({
    layanan: service.slug,
    layananNama: service.title,
    produk: product?.title ?? "",
    nominal: String(product?.price ?? 0),
    admin: String(adminFee),
    total: String(total),
    nomor: number.trim(),
    ...(region ? { wilayah: region } : {}),
    ...(wallet ? { dompet: wallet } : {}),
    ...(service.tenorMonths ? { tenor: String(tenor) } : {}),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
      <div className="space-y-6">
        <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
          {service.regions ? (
            <div className="mb-5">
              <label
                htmlFor="wilayah"
                className="block text-[13px] font-medium text-muted"
              >
                Pilih wilayah PDAM
              </label>
              <select
                id="wilayah"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-line bg-ink-2 px-4 py-2.5 text-[15px] text-body transition-colors focus:border-accent focus:outline-none"
              >
                {service.regions.map((item) => (
                  <option key={item} value={item} className="bg-ink-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {service.wallets ? (
            <div className="mb-5">
              <p className="text-[13px] font-medium text-muted">Pilih dompet digital</p>
              <ul className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                {service.wallets.map((item) => {
                  const active = wallet === item.name;
                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        onClick={() => setWallet(item.name)}
                        aria-pressed={active}
                        style={
                          active
                            ? {
                                borderColor: item.color,
                                backgroundColor: `${item.color}1f`,
                                boxShadow: `0 0 0 3px ${item.color}33`,
                              }
                            : undefined
                        }
                        className={`group flex w-full flex-col items-center gap-2.5 rounded-2xl border border-line bg-panel px-3 py-3 transition-colors hover:border-accent/60 ${
                          active ? "text-white" : "hover:bg-panel-2"
                        }`}
                      >
                        <span className="flex h-12 w-full items-center justify-center rounded-xl bg-white px-2.5">
                          {item.logo ? (
                            <Image
                              src={item.logo}
                              alt={item.name}
                              width={160}
                              height={44}
                              unoptimized
                              className="max-h-6 max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <span
                              className="text-[15px] font-extrabold tracking-tight"
                              style={{ color: item.color }}
                            >
                              {item.name}
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
                          {item.name}
                          {active ? (
                            <span
                              className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                              style={{ backgroundColor: item.color }}
                              aria-hidden="true"
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="3.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m5 13 4 4 10-10" />
                              </svg>
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {service.tenorMonths ? (
            <div className="mb-5">
              <p className="text-[13px] font-medium text-muted">Pilih tenor</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {service.tenorMonths.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTenor(item)}
                    aria-pressed={tenor === item}
                    className={`min-h-10 rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      tenor === item
                        ? "border-accent bg-accent-strong text-accent-ink"
                        : "border-line bg-ink-2 text-muted hover:border-accent/50 hover:text-white"
                    }`}
                  >
                    {item} bulan
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <label htmlFor="nomor" className="block text-[13px] font-medium text-muted">
            {service.numberLabel}
          </label>
          <div className="relative mt-2">
            <input
              id="nomor"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder={service.numberPlaceholder}
              inputMode={service.inputKind === "hp" ? "tel" : "numeric"}
              autoComplete="off"
              className="min-h-12 w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-[15px] text-body placeholder:text-dim transition-colors focus:border-accent focus:outline-none"
            />
            {operator ? (
              <span className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center rounded-xl border border-line bg-white px-2.5 py-1.5">
                <Image
                  src={operator.logo}
                  alt={operator.name}
                  width={120}
                  height={34}
                  unoptimized
                  className="h-4 w-auto max-w-[120px] object-contain"
                />
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-[12px] text-dim">{service.numberHint}</p>
          {service.operatorPicker && number.length > 0 && !operator ? (
            <p className="mt-2 text-[12.5px] font-medium text-amber-300">
              Operator belum terdeteksi. Periksa kembali nomor tujuan.
            </p>
          ) : null}

          {service.operatorPicker ? (
            <div className="mt-4 border-t border-line pt-4">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-dim">
                Provider yang didukung
              </p>
              <ul className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {operators.map((row) => {
                  const active = operator?.id === row.id;
                  return (
                    <li key={row.id}>
                      <div
                        title={row.name}
                        className={`flex h-14 items-center justify-center rounded-xl border bg-white px-2.5 transition ${
                          active
                            ? "border-accent shadow-[0_0_0_3px_rgba(202,210,197,0.22)]"
                            : "border-line opacity-80"
                        }`}
                      >
                        <OperatorMark
                          name={row.name}
                          logo={row.logo}
                          size={48}
                          className="h-11 w-full"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2.5 text-[11.5px] text-dim">
                Operator terdeteksi otomatis dari awalan nomor tujuan.
              </p>
            </div>
          ) : null}
        </section>

        <section>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[15.5px] font-bold text-white">
              {service.slug === "bpjs" ? "Pilih iuran" : "Pilih nominal"}
            </h2>
            <span className="text-[12.5px] text-dim">{service.products.length} pilihan</span>
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {service.products.map((item) => {
              const active = item.id === productId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setProductId(item.id)}
                    aria-pressed={active}
                    className={`card-hover flex h-full w-full flex-col rounded-2xl border p-4 text-left ${
                      active
                        ? "border-accent bg-accent/10 shadow-[0_18px_40px_-26px_rgba(255,122,0,0.9)]"
                        : "border-line bg-panel hover:-translate-y-0.5 hover:border-accent/40"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-[13.5px] font-semibold leading-snug text-white">
                        {item.title}
                      </span>
                      {item.badge ? (
                        <span className="shrink-0 rounded-md bg-accent/15 px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-accent">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-2.5 font-display text-[17px] font-extrabold tracking-[-0.02em] text-white">
                      {item.label}
                    </span>
                    {item.note ? (
                      <span className="mt-1.5 text-[11.5px] text-dim">{item.note}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
              <ServiceIcon
                  name={service.icon as ServiceIconName}
                  size={26}
                  className={`h-[26px] w-[26px] ${SERVICE_TONES[service.icon as ServiceIconName]?.ink ?? "text-accent"}`}
                />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-bold text-white">{service.title}</p>
              <p className="truncate text-[12px] text-dim">Ringkasan pesanan</p>
            </div>
          </div>

          <dl className="mt-5 space-y-3 border-t border-line pt-4 text-[13.5px]">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">{service.numberLabel}</dt>
              <dd className="max-w-[55%] break-words text-right font-medium text-white">
                {number.trim() || "—"}
              </dd>
            </div>
            {region ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Wilayah</dt>
                <dd className="max-w-[60%] text-right font-medium text-white">{region}</dd>
              </div>
            ) : null}
            {wallet ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Dompet</dt>
                <dd className="flex items-center gap-1.5 text-right font-medium text-white">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        service.wallets?.find((item) => item.name === wallet)?.color ??
                        "#CAD2C5",
                    }}
                    aria-hidden="true"
                  />
                  {wallet}
                </dd>
              </div>
            ) : null}
            {service.tenorMonths ? (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Tenor</dt>
                <dd className="text-right font-medium text-white">{tenor} bulan</dd>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Produk</dt>
              <dd className="max-w-[55%] text-right font-medium text-white">
                {product?.title ?? "—"}
              </dd>
            </div>
          </dl>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-[13.5px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-white">{rupiah(product?.price ?? 0)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Biaya admin</dt>
              <dd className="font-medium text-white">{rupiah(adminFee)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <span className="text-[13.5px] font-medium text-muted">Total</span>
            <span className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-white">
              {rupiah(total)}
            </span>
          </div>

          {canContinue ? (
            <Link
              href={`/checkout?${query.toString()}`}
              className={`${btnPrimary} mt-5 w-full`}
            >
              Lanjut ke pembayaran
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className={`${btnPrimary} mt-5 w-full`}
            >
              Lanjut ke pembayaran
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          )}

          <p className="mt-3 text-center text-[11.5px] leading-relaxed text-dim">
            {numberReady
              ? "Nomor invoice muncul setelah pembayaran."
              : "Masukkan nomor yang valid untuk melanjutkan."}
          </p>
        </div>
      </aside>
    </div>
  );
}
