// Sinan Çaydibi - 2026-02-15

import type { Education } from "../types/resume";
import { Favicon } from "./Favicon";
import { Section } from "./Section";

interface EducationSectionProps {
  education: Education[];
  title: string;
}

/** Renders academic history entries. */
export function EducationSection({ education, title }: EducationSectionProps) {
  return (
    <Section title={title}>
      <div className="space-y-6">
        {education.map((entry, idx) => (
          <div key={idx} className="group">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-accent tracking-wider">
                {entry.period}
              </span>
              <h3 className="text-base font-bold text-primary leading-snug group-hover:text-accent transition-colors">
                {entry.degree}
              </h3>
            </div>
            <p className="text-sm font-medium text-muted mt-2 inline-flex items-center gap-1.5 transition-all">
              {entry.institutionUrl && <Favicon url={entry.institutionUrl} size={14} />}
              {entry.institutionUrl ? (
                <a
                  href={entry.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {entry.institution}
                </a>
              ) : (
                entry.institution
              )}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
