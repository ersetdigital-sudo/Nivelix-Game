export type ServiceIconName =
  | "bolt"
  | "phone"
  | "wifi"
  | "droplet"
  | "shield"
  | "tv"
  | "wallet"
  | "car";

export type CategoryId =
  | "listrik"
  | "pulsa-data"
  | "tagihan"
  | "ewallet"
  | "cicilan";

export type Product = {
  id: string;
  title: string;
  label: string;
  price: number;
  note?: string;
  badge?: string;
};

export type WalletOption = {
  name: string;
  /** Warna identitas dompet */
  color: string;
  /** Logo resmi, kalau ada */
  logo?: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: ServiceIconName;
  category: CategoryId;
  numberLabel: string;
  numberPlaceholder: string;
  numberHint: string;
  inputKind: "hp" | "pelanggan";
  /** Tampilkan pilihan operator (hanya relevan untuk pulsa & paket data) */
  operatorPicker?: boolean;
  adminFee: number;
  products: Product[];
  regions?: string[];
  wallets?: WalletOption[];
  tenorMonths?: number[];
};

export const services: Service[] = [
  {
    slug: "pln",
    title: "Token Listrik PLN",
    tagline: "Token listrik PLN prepaid, langsung masuk ke meter.",
    description:
      "Beli token listrik PLN untuk meter rumah, kos, atau ruko. Nominal tersedia mulai Rp 25.000 sampai Rp 1.000.000. Token dikirim ke ID pelanggan dan meter Anda setelah pembayaran terkonfirmasi.",
    icon: "bolt",
    category: "listrik",
    numberLabel: "ID Pelanggan / No. Meter",
    numberPlaceholder: "Contoh: 512340012345",
    numberHint: "Nomor meter atau ID pelanggan PLN sesuai tagihan.",
    inputKind: "pelanggan",
    adminFee: 2500,
    products: [
      { id: "pln-25", title: "Token Listrik 25.000", label: "Rp 25.000", price: 25000 },
      { id: "pln-50", title: "Token Listrik 50.000", label: "Rp 50.000", price: 50000 },
      { id: "pln-100", title: "Token Listrik 100.000", label: "Rp 100.000", price: 100000, badge: "Terlaris" },
      { id: "pln-150", title: "Token Listrik 150.000", label: "Rp 150.000", price: 150000 },
      { id: "pln-200", title: "Token Listrik 200.000", label: "Rp 200.000", price: 200000 },
      { id: "pln-300", title: "Token Listrik 300.000", label: "Rp 300.000", price: 300000 },
      { id: "pln-500", title: "Token Listrik 500.000", label: "Rp 500.000", price: 500000 },
      { id: "pln-1000", title: "Token Listrik 1.000.000", label: "Rp 1.000.000", price: 1000000 },
    ],
  },
  {
    slug: "pulsa",
    operatorPicker: true,
    title: "Pulsa",
    tagline: "Pulsa semua operator, tanpa biaya admin kejutan.",
    description:
      "Isi pulsa Telkomsel, Indosat, XL, Axis, Tri, dan Smartfren. Operator terdeteksi otomatis dari nomor HP Anda, jadi cukup masukkan nomor tujuan lalu pilih nominalnya.",
    icon: "phone",
    category: "pulsa-data",
    numberLabel: "Nomor HP Tujuan",
    numberPlaceholder: "08xx xxxx xxxx",
    numberHint: "Operator akan terdeteksi otomatis dari awalan nomor.",
    inputKind: "hp",
    adminFee: 1000,
    products: [
      { id: "pulsa-10", title: "Pulsa 10.000", label: "Rp 10.000", price: 10000 },
      { id: "pulsa-15", title: "Pulsa 15.000", label: "Rp 15.000", price: 15000 },
      { id: "pulsa-25", title: "Pulsa 25.000", label: "Rp 25.000", price: 25000, badge: "Terlaris" },
      { id: "pulsa-50", title: "Pulsa 50.000", label: "Rp 50.000", price: 50000 },
      { id: "pulsa-75", title: "Pulsa 75.000", label: "Rp 75.000", price: 75000 },
      { id: "pulsa-100", title: "Pulsa 100.000", label: "Rp 100.000", price: 100000 },
      { id: "pulsa-150", title: "Pulsa 150.000", label: "Rp 150.000", price: 150000 },
      { id: "pulsa-200", title: "Pulsa 200.000", label: "Rp 200.000", price: 200000 },
    ],
  },
  {
    slug: "paket-data",
    operatorPicker: true,
    title: "Paket Data",
    tagline: "Kuota internet untuk harian dan heavy user.",
    description:
      "Pilih paket data sesuai kebutuhan: harian untuk aktivitas ringan, atau paket 30 hari untuk pemakaian berat. Kuota berlaku sesuai ketentuan operator.",
    icon: "wifi",
    category: "pulsa-data",
    numberLabel: "Nomor HP Tujuan",
    numberPlaceholder: "08xx xxxx xxxx",
    numberHint: "Operator terdeteksi otomatis dari awalan nomor.",
    inputKind: "hp",
    adminFee: 1000,
    products: [
      { id: "data-1gb", title: "Data 1 GB / 7 Hari", label: "Rp 20.000", price: 20000 },
      { id: "data-3gb", title: "Data 3 GB / 15 Hari", label: "Rp 30.000", price: 30000 },
      { id: "data-5gb", title: "Data 5 GB / 30 Hari", label: "Rp 45.000", price: 45000, badge: "Terlaris" },
      { id: "data-10gb", title: "Data 10 GB / 30 Hari", label: "Rp 70.000", price: 70000 },
      { id: "data-15gb", title: "Data 15 GB / 30 Hari", label: "Rp 90.000", price: 90000 },
      { id: "data-20gb", title: "Data 20 GB / 45 Hari", label: "Rp 120.000", price: 120000 },
      { id: "data-unl", title: "Unlimited / 30 Hari", label: "Rp 150.000", price: 150000, note: "Batas kuota harian 20 GB" },
    ],
  },
  {
    slug: "bpjs",
    title: "BPJS Kesehatan",
    tagline: "Iuran BPJS 1 sampai 6 bulan sekaligus.",
    description:
      "Bayar iuran BPJS Kesehatan kelas 3 untuk 1 sampai 6 bulan dalam satu pembayaran. Pilih periode iuran, lalu isi NIK terdaftar. Status aktif akan berlaku setelah pembayaran terkonfirmasi.",
    icon: "shield",
    category: "tagihan",
    numberLabel: "NIK Peserta",
    numberPlaceholder: "16 digit NIK",
    numberHint: "NIK sesuai kartu BPJS peserta.",
    inputKind: "pelanggan",
    adminFee: 2000,
    products: [
      { id: "bpjs-1", title: "Iuran 1 Bulan", label: "Rp 35.000", price: 35000 },
      { id: "bpjs-2", title: "Iuran 2 Bulan", label: "Rp 70.000", price: 70000, badge: "Hemat" },
      { id: "bpjs-3", title: "Iuran 3 Bulan", label: "Rp 105.000", price: 105000 },
      { id: "bpjs-4", title: "Iuran 4 Bulan", label: "Rp 140.000", price: 140000 },
      { id: "bpjs-5", title: "Iuran 5 Bulan", label: "Rp 175.000", price: 175000 },
      { id: "bpjs-6", title: "Iuran 6 Bulan", label: "Rp 210.000", price: 210000 },
    ],
  },
  {
    slug: "pdam",
    title: "PDAM",
    tagline: "Tagihan air bersih untuk seluruh wilayah.",
    description:
      "Bayar tagihan PDAM sesuai wilayah pelanggan. Pilih kota atau kabupaten, masukkan ID pelanggan, lalu tagihan akan terverifikasi otomatis sebelum pembayaran.",
    icon: "droplet",
    category: "tagihan",
    numberLabel: "ID Pelanggan PDAM",
    numberPlaceholder: "Contoh: 1234567890",
    numberHint: "ID pelanggan tercetak di tagihan air.",
    inputKind: "pelanggan",
    adminFee: 2500,
    regions: [
      "PDAM Surya Sembada – Surabaya",
      "PDAM Tirta Wening – Semarang",
      "PDAM Kota Yogyakarta – Yogyakarta",
      "PDAM Kota Bandung – Bandung",
      "PDAM Jakarta Tirta – Jakarta",
      "PDAM Tirta Lestari – Bekasi",
      "PDAM Tirta Sejahtera – Depok",
    ],
    products: [
      { id: "pdam-1", title: "Tagihan 1 Bulan", label: "Rp 95.000", price: 95000 },
      { id: "pdam-3", title: "Tagihan 3 Bulan", label: "Rp 285.000", price: 285000, badge: "Hemat" },
      { id: "pdam-6", title: "Tagihan 6 Bulan", label: "Rp 570.000", price: 570000 },
    ],
  },
  {
    slug: "tv-internet",
    title: "TV & Internet",
    tagline: "Langganan TV kabel dan internet rumahan.",
    description:
      "Bayar tagihan TV kabel dan internet rumahan dari provider yang tersedia di wilayah Anda. Pilih paket dan masukkan nomor pelanggan.",
    icon: "tv",
    category: "tagihan",
    numberLabel: "Nomor Pelanggan",
    numberPlaceholder: "Contoh: 8871234",
    numberHint: "Nomor pelanggan dari tagihan TV atau internet.",
    inputKind: "pelanggan",
    adminFee: 2500,
    products: [
      { id: "tv-basic", title: "TV Kabel 30 Channel", label: "Rp 115.000", price: 115000 },
      { id: "tv-plus", title: "TV Kabel 90 Channel", label: "Rp 175.000", price: 175000, badge: "Terlaris" },
      { id: "net-10", title: "Internet 10 Mbps", label: "Rp 215.000", price: 215000 },
      { id: "net-20", title: "Internet 20 Mbps", label: "Rp 275.000", price: 275000 },
      { id: "net-30", title: "Internet + TV 30 Mbps", label: "Rp 385.000", price: 385000 },
    ],
  },
  {
    slug: "e-wallet",
    title: "E-Wallet",
    tagline: "Top up DANA, OVO, GoPay, dan ShopeePay.",
    description:
      "Isi saldo e-wallet dan bayar tagihan langsung dari aplikasi. Pilih dompet digital, masukkan nomor HP terdaftar, lalu pilih nominal top up.",
    icon: "wallet",
    category: "ewallet",
    numberLabel: "Nomor HP E-Wallet",
    numberPlaceholder: "08xx xxxx xxxx",
    numberHint: "Nomor HP yang terdaftar di aplikasi e-wallet.",
    inputKind: "hp",
    adminFee: 1000,
    wallets: [
      { name: "DANA", color: "#1189D6", logo: "/images/payments/dana.svg" },
      { name: "OVO", color: "#4C2A85", logo: "/images/payments/ovo.svg" },
      { name: "GoPay", color: "#00A99D", logo: "/images/payments/gopay.png" },
      { name: "ShopeePay", color: "#EE4D2D", logo: "/images/payments/shopeepay.svg" },
      { name: "LinkAja", color: "#1F8A70" },
    ],
    products: [
      { id: "ew-25", title: "Top Up 25.000", label: "Rp 25.000", price: 25000 },
      { id: "ew-50", title: "Top Up 50.000", label: "Rp 50.000", price: 50000 },
      { id: "ew-100", title: "Top Up 100.000", label: "Rp 100.000", price: 100000 },
      { id: "ew-150", title: "Top Up 150.000", label: "Rp 150.000", price: 150000 },
      { id: "ew-250", title: "Top Up 250.000", label: "Rp 250.000", price: 250000, badge: "Terlaris" },
      { id: "ew-500", title: "Top Up 500.000", label: "Rp 500.000", price: 500000 },
    ],
  },
  {
    slug: "multifinance",
    title: "Multifinance",
    tagline: "Cicilan kendaraan dan kredit tanpa ribet.",
    description:
      "Ajukan cicilan motor, mobil, atau gadget dari mitra multifinance. Tenor fleksibel, proses cepat, dan pembayaran cicilan berikutnya bisa dibayar di Nivelix Game.",
    icon: "car",
    category: "cicilan",
    numberLabel: "Nomor HP Pemohon",
    numberPlaceholder: "08xx xxxx xxxx",
    numberHint: "Nomor HP yang akan dipakai untuk tahap verifikasi.",
    inputKind: "hp",
    adminFee: 3000,
    tenorMonths: [12, 24, 36],
    products: [
      { id: "mf-motor", title: "Cicilan Motor", label: "Rp 1.200.000", price: 1200000, note: "Tenor 12–36 bulan" },
      { id: "mf-mobil", title: "Cicilan Mobil", label: "Rp 2.900.000", price: 2900000, note: "Tenor 12–36 bulan" },
      { id: "mf-hp", title: "Cicilan HP", label: "Rp 900.000", price: 900000, note: "Tenor 6–24 bulan" },
      { id: "mf-elektronik", title: "Cicilan Elektronik", label: "Rp 750.000", price: 750000, note: "Tenor 6–24 bulan" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((item) => item.slug === slug);
}

export const categoryFilters: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "listrik", label: "Listrik" },
  { id: "pulsa-data", label: "Pulsa & Data" },
  { id: "tagihan", label: "Tagihan" },
  { id: "ewallet", label: "E-Wallet" },
  { id: "cicilan", label: "Cicilan" },
];

export const categoryLabels: Record<CategoryId, string> = {
  listrik: "Listrik",
  "pulsa-data": "Pulsa & Data",
  tagihan: "Tagihan",
  ewallet: "E-Wallet",
  cicilan: "Cicilan",
};

export const marqueeItems = [
  "Token Listrik PLN",
  "Pulsa Telkomsel",
  "Paket Data Telkomsel",
  "Pulsa Indosat",
  "BPJS Kesehatan",
  "PDAM Surabaya",
  "Pulsa XL",
  "TV Kabel",
  "Internet Rumah",
  "E-Wallet DANA",
  "E-Wallet OVO",
  "GoPay Top Up",
  "ShopeePay Top Up",
  "Cicilan Motor",
  "Smartfren Pulsa",
  "Tri Data",
];

export const heroStats = [
  { value: "2jt+", label: "Transaksi selesai" },
  { value: "3 detik", label: "Rata-rata proses" },
  { value: "4.9/5", label: "Rating pelanggan" },
];

export type Operator = {
  id: string;
  name: string;
  color: string;
  /** File logo provider asli di /public/images/operators */
  logo: string;
  prefixes: string[];
  fallback: string[];
};

export const SITE_CONTACT = {
  whatsapp: "6281200000000",
  whatsappDisplay: "0812-0000-0000",
  email: "halo@nivelixgame.id",
};

export const operators: Operator[] = [
  {
    id: "telkomsel",
    logo: "/images/operators/telkomsel.png",
    name: "Telkomsel",
    color: "#E4002B",
    prefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"],
    fallback: ["082"],
  },
  {
    id: "indosat",
    logo: "/images/operators/indosat.svg",
    name: "Indosat",
    color: "#F5C400",
    prefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    fallback: [],
  },
  {
    id: "xl",
    logo: "/images/operators/xl.png",
    name: "XL",
    color: "#2E7CD6",
    prefixes: ["0817", "0818", "0819", "0859", "0877", "0878", "0879"],
    fallback: [],
  },
  {
    id: "axis",
    logo: "/images/operators/axis.jpg",
    name: "Axis",
    color: "#0E8C4A",
    prefixes: ["0831", "0832", "0833", "0838"],
    fallback: ["083"],
  },
  {
    id: "tri",
    logo: "/images/operators/tri.svg",
    name: "Tri",
    color: "#8A2BE2",
    prefixes: ["0895", "0896", "0897", "0898", "0899"],
    fallback: ["089"],
  },
  {
    id: "smartfren",
    logo: "/images/operators/smartfren.svg",
    name: "Smartfren",
    color: "#D8232A",
    prefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
    fallback: ["088"],
  },
];

export function detectOperator(number: string): Operator | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 3) return null;
  const local = digits.startsWith("62") ? `0${digits.slice(2)}` : digits;
  for (const operator of operators) {
    if (operator.prefixes.some((prefix) => local.startsWith(prefix))) return operator;
  }
  for (const operator of operators) {
    if (operator.fallback.some((prefix) => local.startsWith(prefix))) return operator;
  }
  return null;
}

export type PaymentGroup = "qris" | "ewallet" | "va";

export type PaymentMethod = {
  id: string;
  name: string;
  group: PaymentGroup;
  note: string;
  code?: string;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "qris", name: "QRIS", group: "qris", note: "Scan dengan GoPay, OVO, DANA, atau m-banking" },
  { id: "dana", name: "DANA", group: "ewallet", note: "Saldo DANA" },
  { id: "ovo", name: "OVO", group: "ewallet", note: "Saldo OVO" },
  { id: "gopay", name: "GoPay", group: "ewallet", note: "Saldo GoPay" },
  { id: "shopeepay", name: "ShopeePay", group: "ewallet", note: "Saldo ShopeePay" },
  { id: "bca", name: "BCA", group: "va", note: "Virtual Account BCA", code: "8808" },
  { id: "bri", name: "BRI", group: "va", note: "Virtual Account BRI", code: "26215" },
  { id: "mandiri", name: "Mandiri", group: "va", note: "Virtual Account Mandiri", code: "88908" },
  { id: "bni", name: "BNI", group: "va", note: "Virtual Account BNI", code: "98801" },
];

export const paymentGroups: { id: PaymentGroup; label: string; hint: string }[] = [
  { id: "qris", label: "QRIS", hint: "Sekali scan, semua aplikasi" },
  { id: "ewallet", label: "E-Wallet", hint: "DANA, OVO, GoPay, ShopeePay" },
  { id: "va", label: "Virtual Account", hint: "BCA, BRI, Mandiri, BNI" },
];

export const steps = [
  {
    title: "Pilih layanan",
    body: "Pilih kategori yang Anda butuhkan, lalu masukkan nomor pelanggan atau nomor HP tujuan.",
  },
  {
    title: "Pilih nominal",
    body: "Tentukan nominal atau paket. Operator pulsa dan paket data terdeteksi otomatis.",
  },
  {
    title: "Pilih metode bayar",
    body: "Bayar lewat QRIS, e-wallet, atau virtual account. Bukti transaksi tersimpan di invoice.",
  },
  {
    title: "Selesai dalam 3 detik",
    body: "Pesanan langsung diproses setelah pembayaran terkonfirmasi, dan bukti transaksi diterima.",
  },
];

export const testimonials = [
  {
    name: "Rina Handayani",
    city: "Surabaya",
    service: "Token Listrik PLN",
    text: "Tiap bulan saya beli token lewat sini, tinggal masukin ID meter. Invoice langsung terbit, tidak perlu reinstall aplikasi.",
  },
  {
    name: "Bagus Prasetyo",
    city: "Bandung",
    service: "Paket Data Telkomsel",
    text: "Deteksi operator-nya akurat. Tinggal ketik nomor, operator langsung kebaca, jadi tidak salah pilih paket.",
  },
  {
    name: "Siti Nurhaliza",
    city: "Jakarta",
    service: "BPJS Kesehatan",
    text: "Beli iuran 6 bulan sekali biar tidak ribet tiap bulan. Pengemasannya rapi dan struk resminya ada.",
  },
  {
    name: "Dimas Anggara",
    city: "Semarang",
    service: "PDAM Tirta Wening",
    text: "Dulu saya antre di loket pembayaran PDAM, sekarang cukup dari HP.",
  },
  {
    name: "Andi Wijaya",
    city: "Yogyakarta",
    service: "E-Wallet DANA",
    text: "Top up DANA paling sering saya pakai buat belanja. Biaya admin-nya masuk akal, tidak mahal seperti Minimarket.",
  },
  {
    name: "Melati Sari",
    city: "Makassar",
    service: "Cicilan Motor",
    text: "Simulasi cicilan tampil jelas sebelum saya apply. Tenor dan cicilannya ditulis apa adanya, jadi tidak ada kejutan.",
  },
];

export const faqs = [
  {
    q: "Berapa lama transaksi diproses?",
    a: "Rata-rata 3 detik sejak pembayaran terkonfirmasi. Untuk token listrik dan paket data, delivery bisa memakan waktu 1–5 detik tergantung antrean provider.",
  },
  {
    q: "Nomor HP saya aman tidak?",
    a: "Nomor hanya dipakai untuk memproses pesanan dan mengirim bukti transaksi. Kami tidak menjual atau membagikan nomor Anda ke pihak lain.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "QRIS, e-wallet (DANA, OVO, GoPay, ShopeePay), dan virtual account (BCA, BRI, Mandiri, BNI). Semua pembayaran diproses lewat kanal resmi masing-masing.",
  },
  {
    q: "Bagaimana kalau pembayaran gagal?",
    a: "Saldo dan virtual account Anda otomatis dilepas kembali, dan pesanan berstatus gagal tanpa memotong biaya admin. Hubungi WhatsApp kami dengan nomor invoice bila perlu bantuan.",
  },
  {
    q: "Apakah ada cashback?",
    a: "Ada cashback 5% berupa saldo e-wallet untuk transaksi tertentu. Cashback masuk maksimal 1x24 jam setelah pembayaran berhasil.",
  },
  {
    q: "Bagaimana cara cek status pesanan?",
    a: "Masukkan nomor invoice pada bagian Cek Pesanan di halaman utama. Status, waktu pembayaran, dan instruksi tagihan akan langsung tampil.",
  },
];

export const paymentChannels = [
  "QRIS",
  "DANA",
  "OVO",
  "GoPay",
  "ShopeePay",
  "BCA VA",
  "BRI VA",
  "Mandiri VA",
  "BNI VA",
  "Shopee",
  "Tokopedia",
  "Transfer Bank",
];
