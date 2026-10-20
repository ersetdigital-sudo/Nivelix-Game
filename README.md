# Nivelix Game (Versi 1)

Website PPOB (pembayaran tagihan & produk digital) — Next.js 16 (App Router) + Tailwind CSS v4, bahasa Indonesia, dark mode.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produksi
npm start
```

Versi kedua (katalog + step-form, tema terang) ada di proyek terpisah: `../nexa-v2` (port 3200).

## Struktur

```
src/
  app/
    layout.tsx              # font, metadata, header sticky
    page.tsx                # beranda
    layanan/[slug]/page.tsx # halaman detail layanan (8 layanan)
    checkout/page.tsx       # checkout 3 langkah (konfirmasi → bayar → selesai)
    pembayaran/page.tsx     # redirect ke /checkout
    cek-transaksi/page.tsx  # cek transaksi (timeline + panel samping)
    cek-pesanan/page.tsx    # redirect ke /cek-transaksi
    icon.svg                # favicon
  components/
    brand-logo.tsx          # logo "Nivelix Game" (versi putih) — SVG inline
    clay-icons.tsx          # 8 icon kategori 3D clay + badge operator
    checkout-flow.tsx       # alur checkout 3 langkah + ringkasan order
    transaction-tracker.tsx # komponen Cek Transaksi (timeline + status)
    hero.tsx, transaction-feed.tsx, marquee.tsx, promo-banner.tsx,
    category-section.tsx, how-to-order.tsx, order-status.tsx,
    testimonials.tsx, faq.tsx, cta-banner.tsx, site-header.tsx,
    site-footer.tsx, service-form.tsx, payment-panel.tsx, ui.tsx
  lib/
    data.ts                 # SEMUA konten & harga ada di sini
    format.ts               # format rupiah
```

## Gaya visual

- **Dark Slate Grey `#354F52`** = latar utama, **Ash Grey `#CAD2C5`** = aksen (tombol, badge, glow).
- Semua token warna ada di `src/app/globals.css` (blok `@theme`):

  | Token | Hex | Dipakai untuk |
  |---|---|---|
  | `--color-ink` | `#354F52` | latar halaman |
  | `--color-panel` | `#3A5457` | kartu / panel |
  | `--color-line` | `#4A6467` | border |
  | `--color-accent` | `#CAD2C5` | aksen, ikon, link |
  | `--color-accent-strong` | `#CAD2C5` | isi tombol |
  | `--color-accent-ink` | `#22373A` | teks di atas tombol |
  | `--color-body` | `#E4E9DF` | teks utama |
  | `--color-muted` | `#C3CEC0` | teks sekunder |
  | `--color-dim` | `#BEC9B9` | teks tersier |

- Kontras terukur: body 7,1:1 · muted 5,0:1 · dim 4,7:1 · aksen 5,2:1 · teks tombol 8,1:1 (semua ≥ 4,5:1).
- Icon 3D clay memakai palet bone/ash (`#F0EDE1 → #D2CCB9 → #9DA292`) supaya tetap terbaca di atas
  latar slate (`src/components/clay-icons.tsx`).
- Latar grid halus, glow lembut, dan animasi hover tetap ada.
- Font: Plus Jakarta Sans (judul) + Inter (teks), self-hosted lewat `next/font`.
- Semua halaman responsif; diuji tanpa scroll horizontal pada 390 px.

## Alur checkout (pola marketplace, tanpa keranjang)

Karena ini produk PPOB (bayar satu tagihan per transaksi), **tidak ada keranjang**. Tapi strukturnya
mengikuti pola marketplace:

```
/layanan/{slug}  →  isi nomor + pilih nominal
      ↓  "Lanjut ke pembayaran"
/checkout        →  ① Konfirmasi  →  ② Pembayaran  →  ③ Selesai
                        │                │                │
                        └ ringkasan order lengket (desktop) ┘
```

- **Stepper** di atas: nomor tahap + garis progres, tahap yang sudah selesai berubah jadi centang.
- **① Konfirmasi**: kartu produk, nomor tujuan bisa diedit, tombol "Ubah produk" → balik ke halaman layanan.
- **② Pembayaran**: daftar metode (QRIS aktif, sisanya "Segera"), tombol bayar menampilkan total.
- **③ Selesai**: nomor invoice, countdown 15 menit, foto QRIS merchant, tombol salin invoice,
  hubungi WhatsApp, dan "Cek status transaksi" → `/cek-transaksi`.
- **Ringkasan order** (sticky di desktop): produk, subtotal, biaya admin, nomor tujuan, total, dan
  3 poin jaminan (kanal resmi, status realtime, bukti ke nomor tujuan).
- Halaman lama `/pembayaran` me-redirect ke `/checkout` (parameter diteruskan).

## Logo provider & pembayaran (asli)

- Logo operator asli: `public/images/operators/` — `telkomsel.png`, `indosat.svg`, `xl.png`,
  `axis.jpg`, `tri.svg` (wordmark "Three", Wikimedia Commons), `smartfren.svg`.
- Logo kanal pembayaran: `public/images/payments/` — `qris.png` (di-crop dari foto merchant),
  `dana.svg`, `ovo.svg`, `gopay.png`, `shopeepay.svg`, `bca.svg`, `bri.svg`, `bni.svg`,
  `mandiri.svg`, `alfamart.svg`, `indomaret.png`.
- Dipakai di halaman layanan (baris "Provider yang didukung", operator terdeteksi) dan di tile
  metode pembayaran. Path-nya ada di `src/lib/data.ts` (`operators[].logo`) dan
  `src/components/clay-icons.tsx` (`OperatorMark`).

## Dompet digital (warna merek)

Pilih dompet di halaman E-Wallet memakai **warna + logo asli** masing-masing brand:

| Dompet | Warna | Logo |
|---|---|---|
| DANA | `#1189D6` biru | ✅ `payments/dana.svg` |
| OVO | `#4C2A85` ungu | ✅ `payments/ovo.svg` |
| GoPay | `#00A99D` teal | ✅ `payments/gopay.png` |
| ShopeePay | `#EE4D2D` oranye | ✅ `payments/shopeepay.svg` |
| LinkAja | `#1F8A70` hijau | inisial (logo resmi belum ada di aset) |

Setiap dompet ditampilkan sebagai **kartu logo**: logo asli di atas plat putih dengan rasio
aslinya dipertahankan (bukan dipaksa kotak — logo DANA/OVO/ShopeePay itu wordmark lebar, kalau
dipaksa kotak jadi tak terbaca). Dompet terpilih: border + tint warna brand + centang.

## Logo operator hanya di Pulsa & Paket Data

Baris "Provider yang didukung" + deteksi operator **hanya muncul** di layanan yang memang
pakai nomor HP prepaid: **Pulsa** dan **Paket Data**. E-Wallet & Multifinance tidak menampilkan
operator (nomornya bukan nomor prepaid).

Dikendalikan flag `operatorPicker` di `src/lib/data.ts` → `services[].operatorPicker`.

## Tombol "Saya sudah bayar" (v1)

Di langkah 3 checkout, tombol **"Saya sudah bayar"** mengganti panel QR dengan state verifikasi:

```
Menunggu pembayaran  →  Saya sudah bayar  →  Sedang diperiksa  →  Pembayaran diterima
```

- Judul: "Terima kasih, pembayaran Anda sedang diproses dan diperiksa".
- 4 checkpoint: Memeriksa QRIS → Konfirmasi dari bank → Meneruskan ke provider → Layanan diproses.
- Badge invoice berubah: Menunggu pembayaran (amber) → Sedang diperiksa (biru) → Pembayaran diterima (hijau).
- Verifikasi memakai **timer lokal** (simulasi). Ganti dengan polling ke `/api/orders/{invoice}`
  begitu backend siap.

## Cek Transaksi

Halaman `/cek-transaksi` (v1) sengaja **berbeda struktur** dari halaman Cek Transaksi di v2
(`../nexa-v2/src/app/cek-transaksi`), supaya keduanya tidak kembar:

| | v1 (`/cek-transaksi`) | v2 |
|---|---|---|
| Layout | Dua kolom: panel utama + sidebar lengket | Satu kartu di tengah |
| Hasil | Timeline 4 tahap (dibuat → dibayar → diproses → selesai) + detail + aksi salin/hubungi | Kartu status + timeline ringkas |
| Helper | Panel "Cara cek transaksi", "Arti status" (4 status), "Belum punya invoice?" | Panel status di bawah form |
| Judul | "Cek transaksi kamu" + hero strip 3 statistik | "Cek Transaksi" polos |

### Sumber data (siap produksi)

Pencarian invoice **tidak lagi memakai data contoh di UI**. Alurnya:

```
UI (/cek-transaksi, panel di beranda)
   → fetch GET /api/orders/{invoice}
        → src/lib/orders.ts  → findOrder()  ← GANTI DI SINI dengan query database/API partner
```

- Invoice yang tidak ada mengembalikan **404** → UI menampilkan "Invoice tidak ditemukan"
  (bukan data karangan).
- Placeholder input: `NXS-YYMMDD-XXX` (format, bukan nomor demo).
- `src/lib/orders.ts` masih berisi 4 baris seed supaya alur bisa dicoba; hapus array `ORDERS`
  setelah backend siap.

Halaman lama `/cek-pesanan` me-redirect ke `/cek-transaksi`.

## Ganti harga (semua contoh)

Semua nominal, biaya admin, FAQ, testimoni, dan operator ada di **`src/lib/data.ts`**:

- `services[]` → tiap layanan punya `adminFee` dan `products[]` (`price` = angka, `label` = teks tampilan).
  Ubah `price` untuk nilai perhitungan, `label` untuk teks yang tampil (mis. "Rp 25.000").
- `operators[]` + `detectOperator()` → awalan nomor HP (tabel prefix sudah diverifikasi):

  | Operator | Awalan |
  |---|---|
  | Telkomsel | 0811, 0812, 0813, 0821, 0822, 0823, 0851, 0852, 0853 |
  | Indosat | 0814, 0815, 0816, 0855, 0856, 0857, 0858 |
  | XL | 0817, 0818, 0819, 0859, 0877, 0878, 0879 |
  | Axis | 0831, 0832, 0833, 0838 |
  | Tri | 0895, 0896, 0897, 0898, 0899 |
  | Smartfren | 0881, 0882, 0883, 0884, 0885, 0886, 0887, 0888, 0889 |

- `paymentMethods[]` → nama metode + kode virtual account.
- `heroStats`, `steps`, `faqs`, `testimonials`, `marqueeItems` → teks marketing.

## Ganti logo & icon dengan brand kit

- **Logo**: `src/components/nexa-logo.tsx` (SVG inline, selalu tampil di editor & website publik).
  Ganti isi `<svg>` dengan file SVG brand kit Anda — cukup pertahankan viewBox `0 0 160 40`.
  Favicon: `src/app/icon.svg`.
- **Icon kategori 3D clay**: `src/components/clay-icons.tsx`. Delapan ikon (bolt, phone, wifi, droplet, shield, tv, wallet, car) digambar sebagai SVG dengan gradient + drop shadow, tanpa CDN.
  Untuk mengganti ke aset PNG/3D asli: taruh file di `public/`, lalu ubah komponen untuk memakai `<Image>`.
- **Logo operator**: `OperatorMark` di `clay-icons.tsx` masih placeholder (huruf awal + warna merek).
  Ganti dengan logo operator asli dari brand kit Anda.

## Kode QRIS

Gambar QRIS merchant disimpan lokal di **`public/images/qris-merchant.jpg`** (1135×1600, foto asli dari
Cloudinary). Dipakai di halaman pembayaran setelah invoice dibuat, dan di-render dengan
`next/image` + `unoptimized` supaya piksel QR tetap tajam dan bisa discan.

Untuk mengganti QRIS (merchant atau NMID lain), cukup replace file tersebut — sama untuk
`nexa-v2/public/images/qris-merchant.jpg`.

Saat ini **hanya QRIS yang aktif**; e-wallet (DANA, OVO, GoPay, ShopeePay) dan virtual account
(BCA, BRI, Mandiri, BNI) sengaja dimatikan (`disabled` + label "Segera"). Mengaktifkannya lagi:
ubah filter `item.id !== "qris"` di `src/components/payment-panel.tsx` (dan `channel.id !== "qris"`
di `nexa-v2/src/components/checkout-form.tsx`).

## Simulasi

Harga, invoice, status pesanan, dan pembayaran masih simulasi (tidak ada API pembayaran).

Formulir tidak lagi meminta nomor WhatsApp. Tombol bantuan memakai nomor konstan
`SITE_CONTACT.whatsapp` di `src/lib/data.ts`.
