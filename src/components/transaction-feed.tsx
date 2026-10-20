"use client";

import type { ServiceIconName } from "@/lib/data";
import { useEffect, useState } from "react";
import { ServiceIcon } from "@/components/service-icon";

type FeedItem = {
  id: number;
  icon: ServiceIconName;
  service: string;
  amount: string;
  ago: string;
};

const POOL: { icon: ServiceIconName; service: string; amount: string }[] = [
  { icon: "bolt", service: "Token Listrik PLN", amount: "Rp 100.000" },
  { icon: "phone", service: "Pulsa Telkomsel", amount: "Rp 25.000" },
  { icon: "wifi", service: "Paket Data 10 GB", amount: "Rp 70.000" },
  { icon: "shield", service: "BPJS Kesehatan", amount: "Rp 105.000" },
  { icon: "droplet", service: "PDAM Tirta Wening", amount: "Rp 95.000" },
  { icon: "wallet", service: "Top Up DANA", amount: "Rp 100.000" },
  { icon: "phone", service: "Pulsa Indosat", amount: "Rp 15.000" },
  { icon: "tv", service: "Internet 20 Mbps", amount: "Rp 275.000" },
];

const AGO = ["3 detik lalu", "8 detik lalu", "12 detik lalu", "20 detik lalu", "35 detik lalu"];

/**
 * Bukti sosial ringkas: satu baris transaksi terakhir yang berganti otomatis.
 * Dipakai di hero untuk menunjukkan aktivitas tanpa menambah beban visual.
 */
export function ProofTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % POOL.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const item = POOL[index];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
        <ServiceIcon name={item.icon} size={18} />
      </span>
      <p className="min-w-0 flex-1 truncate text-[12.5px] text-muted">
        <span className="font-semibold text-body">{item.service}</span> {item.amount} ·{" "}
        <span className="text-emerald-300">berhasil</span> {AGO[index]}
      </p>
    </div>
  );
}

/** Panel feed lengkap (dipakai bila butuh daftar transaksi, mis. di section terpisah). */
export function TransactionFeed() {
  const [items, setItems] = useState<FeedItem[]>(() =>
    POOL.slice(0, 5).map((entry, index) => ({
      id: index,
      icon: entry.icon,
      service: entry.service,
      amount: entry.amount,
      ago: AGO[index],
    })),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const entry = POOL[Math.floor(Math.random() * POOL.length)];
      setItems((current) => [
        {
          id: Date.now(),
          icon: entry.icon,
          service: entry.service,
          amount: entry.amount,
          ago: "baru saja",
        },
        ...current.map((item) => ({ ...item, ago: "beberapa saat lalu" })),
      ].slice(0, 5));
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-[13px] font-semibold text-white">Transaksi terbaru</p>
        <span className="text-[11.5px] text-dim">update otomatis</span>
      </div>
      <ul className="divide-y divide-line-soft">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-panel-2 ${
              index === 0 ? "animate-pop" : ""
            }`}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <ServiceIcon name={item.icon} size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-medium text-white">{item.service}</p>
              <p className="truncate text-[12px] text-dim">{item.ago}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[13.5px] font-semibold text-white">{item.amount}</p>
              <p className="text-[11.5px] font-medium text-emerald-300">Berhasil</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
