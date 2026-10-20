import { redirect } from "next/navigation";

/** Alur pembayaran lama memakai halaman checkout. */
export default async function OldPaymentPage(
  props: PageProps<"/pembayaran">,
) {
  const params = await props.searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw) query.set(key, raw);
  }
  const suffix = query.toString();
  // Tanpa param pesanan, arahkan ke katalog (halaman checkout butuh data pesanan).
  redirect(suffix ? `/checkout?${suffix}` : "/#kategori");
}
