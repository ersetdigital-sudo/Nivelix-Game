"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui";
import { faqs } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24">
      <SectionHeading
        title="Pertanyaan yang sering masuk"
        description="Kalau tidak ada di sini, WhatsApp kami siap membantu di jam kerja."
      />

      <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
        {faqs.map((item, index) => {
          const expanded = open === index;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : index)}
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-panel-2"
                >
                  <span className="text-[14.5px] font-semibold text-white">{item.q}</span>
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-transform duration-200 ${
                      expanded ? "rotate-45 border-accent/60 text-accent" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${index}`}
                hidden={!expanded}
                className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
