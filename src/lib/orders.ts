export type OrderStatus = "selesai" | "diproses" | "menunggu" | "gagal";

export type Order = {
  invoice: string;
  status: OrderStatus;
  /** Nama produk / layanan */
  item: string;
  /** Nomor tujuan */
  number: string;
  /** Total dibayar (angka) */
  total: number;
  /** Metode pembayaran */
  method: string;
  /** Kanal pembayaran, mis. "QRIS (GoPay)" */
  channel: string;
  /** Waktu pesanan dibuat (ISO) */
  createdAt: string;
};

/**
 * Sumber data pesanan.
 *
 * TODO: ganti isi array di bawah dengan query ke database atau API partner.
 *     `findOrder` sudah disiapkan sebagai titik penggantiannya — dipanggil dari
 *     route handler `GET /api/orders/[invoice]`.
 */
const ORDERS: Order[] = [
  {
    invoice: "NXS-25092024-001",
    status: "selesai",
    item: "Token Listrik PLN 100.000",
    number: "ID Pelanggan 512340012345",
    total: 102500,
    method: "QRIS",
    channel: "QRIS (mobile banking)",
    createdAt: "2026-09-20T14:32:00+07:00",
  },
  {
    invoice: "NXS-25092024-002",
    status: "diproses",
    item: "Paket Data Telkomsel 10 GB / 30 Hari",
    number: "0812****4417",
    total: 72000,
    method: "QRIS",
    channel: "QRIS (GoPay)",
    createdAt: "2026-09-20T15:08:00+07:00",
  },
  {
    invoice: "NXS-25092024-003",
    status: "menunggu",
    item: "BPJS Kesehatan 3 Bulan",
    number: "NIK 3273****0012",
    total: 107000,
    method: "QRIS",
    channel: "QRIS (scan)",
    createdAt: "2026-09-20T15:21:00+07:00",
  },
  {
    invoice: "NXS-25092024-004",
    status: "gagal",
    item: "Pulsa 50.000",
    number: "0857****9032",
    total: 51000,
    method: "QRIS",
    channel: "QRIS (mobile banking)",
    createdAt: "2026-09-20T13:04:00+07:00",
  },
];

export async function findOrder(invoice: string): Promise<Order | null> {
  const code = invoice.trim().toUpperCase();
  return ORDERS.find((order) => order.invoice.toUpperCase() === code) ?? null;
}
