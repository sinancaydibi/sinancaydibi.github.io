// Sinan Çaydibi - 2026-02-15

import type { Certification } from "../types/resume";
import { Section } from "./Section";
import { Award } from "lucide-react";

interface CertificationsProps {
  certifications: Certification[];
  title: string;
}

/** Renders courses and certifications. */
export function Certifications({ certifications, title }: CertificationsProps) {
  return (
    <Section title={title}>
      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <div key={idx} className="group flex items-start gap-3">
            <div className="mt-1 p-1.5 rounded-lg bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
              <Award size={14} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary leading-snug group-hover:text-accent transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-muted mt-0.5">
                {cert.issuer}
                {cert.date && (
                  <span className="ml-1.5 text-divider">&middot; {cert.date}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
