import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CheckoutFlow } from "@/components/checkout-flow";
import { getService } from "@/lib/data";
import type { ServiceIconName } from "@/lib/data";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Konfirmasi pesanan, pilih metode pembayaran QRIS, lalu selesaikan pembelian Nivelix Game.",
};

function text(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ?? "";
}

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const params = await props.searchParams;

  const nominal = Number(text(params.nominal).replace(/\D/g, "")) || 0;
  const admin = Number(text(params.admin).replace(/\D/g, "")) || 0;
  const total = Number(text(params.total).replace(/\D/g, "")) || nominal + admin;
  const layanan = text(params.layanan);

  if (!layanan || nominal <= 0) notFound();

  const service = getService(layanan);
  const layananNama = text(params.layananNama) || service?.title || "Layanan";
  const produk = text(params.produk) || service?.products?.[0]?.title || "Produk";
  const meta = text(params.wilayah) || text(params.dompet) || text(params.tenor) || undefined;

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-dim">
        <Link href="/" className="transition-colors hover:text-white">
          Beranda
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link href={`/layanan/${layanan}`} className="transition-colors hover:text-white">
          {layananNama}
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-body">Checkout</span>
      </nav>

      <h1 className="mt-5 text-[clamp(1.7rem,1.3rem+2vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
        Checkout
      </h1>
      <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
        Cek dulu pesananmu, pilih metode bayar, lalu selesaikan. Semua dalam satu invoice.
      </p>

      <div className="mt-7">
        <CheckoutFlow
          order={{
            layanan,
            layananNama,
            layananIcon: (service?.icon ?? "wallet") as ServiceIconName,
            produk,
            nominal,
            admin,
            total,
            nomor: text(params.nomor),
            meta,
          }}
        />
      </div>
    </div>
  );
}
