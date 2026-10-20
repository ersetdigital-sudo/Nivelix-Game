import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[700px] flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-display text-[clamp(3rem,2rem+8vw,6rem)] font-extrabold leading-none tracking-[-0.04em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-[clamp(1.4rem,1.1rem+1.6vw,2rem)] font-extrabold tracking-[-0.03em] text-white">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
        Alamat yang Anda buka tidak tersedia. Kembali ke beranda atau pilih layanan yang Anda
        butuhkan.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent-strong px-5 text-sm font-semibold text-accent-ink transition hover:bg-accent-soft"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}
