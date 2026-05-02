// Sinan Çaydibi - 2026-02-15

import type { SkillGroup } from "../types/resume";
import { Section } from "./Section";

interface SkillsProps {
  skills: SkillGroup[];
  title: string;
}

/** Renders technology / skills grouped by category. */
export function Skills({ skills, title }: SkillsProps) {
  return (
    <Section title={title}>
      <div className="space-y-6">
        {skills.map((group, idx) => (
          <div key={idx} className="group">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted mb-2.5 transition-colors group-hover:text-accent">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-block rounded-md bg-surface px-3 py-1 text-[13px] font-medium text-primary/80 border border-divider transition-all duration-300 hover:border-accent/40 hover:bg-white hover:shadow-sm hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
