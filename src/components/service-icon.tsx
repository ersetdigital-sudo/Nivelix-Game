import {
  Car,
  Droplet,
  ShieldCheck,
  Smartphone,
  Tv,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceIconName } from "@/lib/data";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  bolt: Zap,
  phone: Smartphone,
  wifi: Wifi,
  droplet: Droplet,
  shield: ShieldCheck,
  tv: Tv,
  wallet: Wallet,
  car: Car,
};

/**
 * Ikon layanan (8 kategori).
 * Bentuknya SVG garis — tajam di semua ukuran, tanpa gradient/filter,
 * jadi tidak bisa "rusak" seperti ikon clay yang pakai paint server.
 */
export function ServiceIcon({
  name,
  size = 24,
  className,
  strokeWidth = 1.8,
}: {
  name: ServiceIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = ICONS[name] ?? Zap;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}

/** Warna tile per layanan supaya 8 kategori gampang dipindai sekilas. */
export const SERVICE_TONES: Record<
  ServiceIconName,
  { tile: string; ink: string; label: string }
> = {
  bolt: {
    tile: "bg-amber-400/12",
    ink: "text-amber-300",
    label: "Listrik",
  },
  phone: {
    tile: "bg-blue-400/12",
    ink: "text-blue-300",
    label: "Pulsa",
  },
  wifi: {
    tile: "bg-teal-400/12",
    ink: "text-teal-300",
    label: "Data",
  },
  droplet: {
    tile: "bg-sky-400/12",
    ink: "text-sky-300",
    label: "Air bersih",
  },
  shield: {
    tile: "bg-emerald-400/12",
    ink: "text-emerald-300",
    label: "BPJS",
  },
  tv: {
    tile: "bg-violet-400/12",
    ink: "text-violet-300",
    label: "TV & Internet",
  },
  wallet: {
    tile: "bg-indigo-400/12",
    ink: "text-indigo-300",
    label: "E-Wallet",
  },
  car: {
    tile: "bg-rose-400/12",
    ink: "text-rose-300",
    label: "Cicilan",
  },
};
