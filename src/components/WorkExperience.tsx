// Sinan Çaydibi - 2026-02-15

import type { ReactNode } from "react";
import type { Experience } from "../types/resume";
import { Favicon } from "./Favicon";
import { Section } from "./Section";

interface WorkExperienceProps {
  experience: Experience[];
  title: string;
}

const INLINE_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

/** Render `[label](url)` snippets as clickable links within bullet text. */
function renderBulletText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_LINK_REGEX)) {
    const [fullMatch, label, url] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <a
        key={`${url}-${matchIndex}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent transition-colors underline decoration-accent/40 underline-offset-2"
      >
        {label}
      </a>,
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/** Renders a single job entry. */
function ExperienceEntry({ entry }: { entry: Experience }) {
  return (
    <div className="experience-item">
      <div className="experience-dot" />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="text-base font-bold text-primary tracking-tight">{entry.role}</h3>
        <span className="text-xs font-semibold text-accent bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10 whitespace-nowrap">
          {entry.period}
        </span>
      </div>

      <p className="text-sm font-medium text-muted mb-3 inline-flex items-center gap-1.5 flex-wrap">
        {entry.companyUrl && <Favicon url={entry.companyUrl} size={14} />}
        {entry.companyUrl ? (
          <a
            href={entry.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors decoration-accent/30 underline-offset-4 decoration-1 hover:underline"
          >
            {entry.company}
          </a>
        ) : (
          <span className="text-primary/90 font-semibold">{entry.company}</span>
        )}
        {entry.location && <span className="text-muted/60 ml-1">| {entry.location}</span>}
      </p>

      {entry.promotions && (
        <p className="text-xs italic text-accent/80 mt-1 mb-2 bg-accent/5 px-2 py-1 rounded border-l-2 border-accent/30">{entry.promotions}</p>
      )}

      <ul className="space-y-2 mt-3">
        {entry.bullets.map((bullet, idx) => (
          <li
            key={idx}
            className="text-sm leading-relaxed text-muted pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/40"
          >
            {renderBulletText(bullet.text)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Work experience section listing all positions in chronological order. */
export function WorkExperience({ experience, title }: WorkExperienceProps) {
  return (
    <Section title={title}>
      <div className="mt-4">
        {experience.map((entry, idx) => (
          <ExperienceEntry key={idx} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
