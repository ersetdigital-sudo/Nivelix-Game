import Link from "next/link";

export function CtaBanner() {
  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#26393b] via-[#35504f] to-[#223437] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/55 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.7rem,1.2rem+2.2vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              Siap bereskan tagihan hari ini?
            </h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-white/95">
              Pilih layanan, masukkan nomor, bayar lewat QRIS. Struk digital sampai sebelum Anda
              selesai menyimpan aplikasi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#kategori"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-strong px-6 text-sm font-bold text-accent-ink transition hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Mulai Bayar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/cek-transaksi"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/45 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Cek Transaksi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
