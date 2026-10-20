import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceForm } from "@/components/service-form";
import { getService, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/layanan/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage(props: PageProps<"/layanan/[slug]">) {
  const { slug } = await props.params;
  const search = await props.searchParams;
  const service = getService(slug);
  if (!service) notFound();

  const initialNumber = (Array.isArray(search.nomor) ? search.nomor[0] : search.nomor) ?? "";

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12.5px] text-dim">
        <Link href="/" className="transition-colors hover:text-white">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/#kategori" className="transition-colors hover:text-white">
          Layanan
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-body">{service.title}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
          <ServiceIcon name={service.icon} size={48} />
        </span>
        <div>
          <h1 className="text-[clamp(1.6rem,1.2rem+1.9vw,2.35rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            {service.title}
          </h1>
          <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-8 hidden lg:block">
        <div className="flex flex-wrap items-center gap-2 border-y border-line py-3">
          <span className="mr-1 text-[12px] font-medium text-dim">Layanan lain:</span>
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/layanan/${item.slug}`}
              className="rounded-lg border border-line bg-panel px-3 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:border-accent/60 hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <ServiceForm service={service} initialNumber={initialNumber} />
      </div>

      <div className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
        {[
          {
            title: "Pemrosesannya cepat",
            body: `Rata-rata selesai 3 detik. Biaya admin ${service.title} flat, apa pun nominalnya.`,
          },
          {
            title: "Bukti di invoice",
            body: "Nomor invoice otomatis dibuat begitu pembayaran terkonfirmasi.",
          },
          {
            title: "Bisa refund",
            body: "Pesanan gagal? Saldo dan virtual account otomatis dilepas kembali tanpa potongan.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-line bg-panel p-4">
            <p className="text-[13.5px] font-bold text-white">{item.title}</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
