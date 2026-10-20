import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nivelix Game — Bayar tagihan & produk digital",
    template: "%s | Nivelix Game",
  },
  description:
    "Nivelix Game: bayar token listrik PLN, pulsa, paket data, BPJS, PDAM, dan e-wallet dalam satu tempat. Diproses lewat QRIS, bukti transaksi bisa dilacak kapan saja.",
  applicationName: "Nivelix Game",
  openGraph: {
    title: "Nivelix Game — Bayar tagihan & produk digital",
    description:
      "Semua tagihan, beres dalam satu tempat. Token PLN, pulsa, data, BPJS, PDAM, e-wallet, dan cicilan.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-body">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
