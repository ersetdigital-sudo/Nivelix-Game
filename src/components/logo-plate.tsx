import Image from "next/image";

/**
 * Logo merek (operator / dompet digital / kanal pembayaran).
 *
 * Logo aslinya berbentuk wordmark lebar (mis. DANA 382×109, ShopeePay 188×36).
 * Kalau dipaksa masuk kotak persegi, logonya mengecil jadi tak terbaca.
 * Karena itu logo dirender di atas "plat" putih dengan rasio aslinya
 * dipertahankan (object-contain), jadi selalu jelas di atas latar gelap.
 */
export function LogoPlate({
  src,
  alt,
  className = "",
  imgClassName = "max-h-5 max-w-full object-contain",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <span
      className={`flex items-center justify-center overflow-hidden bg-white ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={44}
        unoptimized
        className={imgClassName}
      />
    </span>
  );
}
