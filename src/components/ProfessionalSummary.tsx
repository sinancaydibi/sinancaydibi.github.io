// Sinan Çaydibi - 2026-02-15

import { Section } from "./Section";

interface ProfessionalSummaryProps {
  summary: string;
  title: string;
}

/** Renders the professional summary / objective section. */
export function ProfessionalSummary({ summary, title }: ProfessionalSummaryProps) {
  return (
    <Section title={title}>
      <p className="text-[15px] leading-[1.8] text-muted font-medium bg-surface/50 p-6 rounded-2xl border border-divider/50 shadow-sm transition-all hover:bg-white hover:shadow-md hover:border-accent/10">
        {summary}
      </p>
    </Section>
  );
}
