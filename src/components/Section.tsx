// Sinan Çaydibi - 2026-02-15

import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** Reusable section wrapper with a consistent heading style. */
export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`mb-8 print:mb-5 ${className}`}>
      <h2 className="section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}
