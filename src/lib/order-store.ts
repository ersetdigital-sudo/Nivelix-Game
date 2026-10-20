/**
 * Penyimpanan pesanan di perangkat pengguna (localStorage).
 *
 * Pesanan yang dibuat di halaman checkout disimpan di sini supaya
 * invoice-nya bisa langsung dicek di halaman Cek Transaksi — tanpa
 * perlu mengetik ulang nomornya.
 *
 * TODO: kalau backend sudah siap, ganti implementasi ini dengan
 *       POST /api/orders saat create & GET /api/orders/:invoice saat lookup.
 */

export type StoredOrder = {
  invoice: string;
  status: "menunggu" | "diproses" | "selesai" | "gagal";
  service: string;
  customer: string;
  amount: number;
  method: string;
  channel: string;
  createdAt: string;
};

const STORAGE_KEY = "nivelix_orders";
const MAX_ORDERS = 30;

function readAll(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: StoredOrder[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, MAX_ORDERS)));
  } catch {
    /* storage penuh atau diblokir — abaikan */
  }
}

export function saveOrder(order: StoredOrder) {
  const all = readAll().filter((row) => row.invoice !== order.invoice);
  writeAll([order, ...all]);
}

export function updateOrderStatus(invoice: string, status: StoredOrder["status"]) {
  const all = readAll();
  const index = all.findIndex((row) => row.invoice === invoice);
  if (index === -1) return;
  all[index] = { ...all[index], status };
  writeAll(all);
}

export function findLocalOrder(invoice: string): StoredOrder | null {
  const code = invoice.trim().toUpperCase();
  return readAll().find((row) => row.invoice.toUpperCase() === code) ?? null;
}

export function listLocalOrders(): StoredOrder[] {
  return readAll();
}
