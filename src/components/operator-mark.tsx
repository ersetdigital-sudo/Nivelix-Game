import Image from "next/image";

/**
 * Logo operator asli (file di /public/images/operators).
 * Logonya berupa wordmark lebar, jadi dirender di atas plat putih dengan
 * rasio aslinya dipertahankan supaya tetap terbaca di latar gelap.
 */
export function OperatorMark({
  name,
  logo,
  size = 40,
  className,
}: {
  name: string;
  logo: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-white ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo}
        alt={`Logo ${name}`}
        width={160}
        height={44}
        unoptimized
        className="max-h-[70%] max-w-[86%] object-contain"
      />
    </span>
  );
}
