import { SectionHeading } from "@/components/ui";
import { steps } from "@/lib/data";

export function HowToOrder() {
  return (
    <section id="cara-order" className="scroll-mt-24">
      <SectionHeading
        title="Cara order dalam empat langkah"
        description="Tidak ada formulir panjang, tidak perlu registrasi akun. Masukkan nomor, pilih nominal, bayar."
      />

      <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative overflow-hidden rounded-2xl border border-line bg-panel p-5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-strong text-[13px] font-bold text-accent-ink">
                {index + 1}
              </span>
              <h3 className="text-[15px] font-bold text-white">{step.title}</h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{step.body}</p>
            {index < steps.length - 1 ? (
              <span
                className="absolute -right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 rotate-45 border-r border-t border-line bg-panel xl:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
