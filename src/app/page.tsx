import Link from "next/link";
import { CategorySection } from "@/components/category-section";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowToOrder } from "@/components/how-to-order";
import { Marquee } from "@/components/marquee";
import { OrderStatus } from "@/components/order-status";
import { PromoBanner } from "@/components/promo-banner";
import { SectionHeading } from "@/components/ui";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <PromoBanner />
      </div>

      <div className="mx-auto w-full max-w-[1200px] space-y-20 px-4 py-16 sm:px-6 sm:py-20 lg:space-y-24 lg:px-8 lg:py-24">
        <CategorySection />
        <HowToOrder />

        <section id="cek-transaksi" className="scroll-mt-24">
          <SectionHeading
            title="Cek status transaksi"
            description="Masukkan nomor invoice untuk melihat status pembayaran dan progres pengiriman layanan."
            action={
              <Link
                href="/cek-transaksi"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-panel px-4 text-sm font-semibold text-body transition hover:border-accent/60 hover:text-white"
              >
                Buka halaman cek transaksi
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </Link>
            }
          />
          <div className="mt-7">
            <OrderStatus />
          </div>
        </section>

        <Testimonials />
        <Faq />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-28 sm:px-6 lg:px-8 lg:pb-24">
        <CtaBanner />
      </div>

      <SiteFooter />
    </>
  );
}
