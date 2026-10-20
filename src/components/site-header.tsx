"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const NAV = [
  { label: "PLN", href: "/layanan/pln" },
  { label: "Pulsa", href: "/layanan/pulsa" },
  { label: "BPJS", href: "/layanan/bpjs" },
  { label: "PDAM", href: "/layanan/pdam" },
  { label: "Flash Sale", href: "/#flash-sale" },
  { label: "Cara Order", href: "/#cara-order" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-ink/85 backdrop-blur-xl"
          : "border-transparent bg-ink/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Nivelix Game, beranda">
          <BrandLogo size={34} className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  active ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#kategori"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line bg-panel px-4 text-sm font-semibold text-body transition hover:border-accent/60 hover:text-white sm:min-h-11 sm:px-5"
          >
            Bayar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-body transition hover:border-accent/60 hover:text-white lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t border-line bg-ink/97 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto grid max-w-[1200px] grid-cols-2 gap-1.5 px-4 py-4 sm:px-6" aria-label="Navigasi mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-line bg-panel px-3 py-2.5 text-sm font-medium text-body transition hover:border-accent/60 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
