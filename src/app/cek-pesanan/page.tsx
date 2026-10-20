import { redirect } from "next/navigation";

/** Halaman lama dialihkan ke Cek Transaksi baru. */
export default function OldCheckPage() {
  redirect("/cek-transaksi");
}
