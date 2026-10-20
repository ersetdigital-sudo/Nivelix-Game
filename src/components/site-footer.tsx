import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { services } from "@/lib/data";

const HELP_LINKS = [
  { label: "Cara Order", href: "/#cara-order" },
  { label: "Cek Transaksi", href: "/cek-transaksi" },
  { label: "Metode Pembayaran", href: "/#pembayaran" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <BrandLogo size={36} className="h-9 w-auto" />
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted">
              Layer pembayaran tagihan harian: listrik, pulsa, data, BPJS, PDAM, sampai cicilan.
              Satu akun, semua beres.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["QRIS", "DANA", "OVO", "GoPay", "ShopeePay"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-line bg-panel px-2.5 py-1 text-[11.5px] font-medium text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Layanan</h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Bantuan</h3>
            <ul className="mt-4 space-y-2.5">
              {HELP_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Hubungi kami</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39a9.87 9.87 0 0 0 4.69 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z" />
                  </svg>
                </span>
                <a href="https://wa.me/6281200000000" className="transition-colors hover:text-white">
                  0812-0000-0000
                  <span className="mt-0.5 block text-xs text-dim">WhatsApp, 매일 08.00–22.00</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="m3.5 6.5 8.5 6 8.5-6" />
                  </svg>
                </span>
                <a href="mailto:halo@nivelixgame.id" className="transition-colors hover:text-white">
                  halo@nivelixgame.id
                  <span className="mt-0.5 block text-xs text-dim">Balasan maksimal 1 jam kerja</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nivelix Game. Harga pada situs ini masih contoh dan dapat berubah.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Privasi</span>
            <span>Syarat &amp; Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
