// Sinan Çaydibi - 2026-02-15

import type { ReactNode } from "react";
import { Mail, MapPin, Github, Linkedin, Globe } from "lucide-react";
import type { ContactInfo } from "../types/resume";

interface HeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
}

/** Top section of the resume: centered name, title, and contact links. */
export function Header({ name, title, contact }: HeaderProps) {
  const iconSize = 13;
  const linkClass = "hover:text-accent transition-colors flex items-center gap-1.5";

  const items: ReactNode[] = [];

  if (contact.email) {
    items.push(
      <a key="email" href={`mailto:${contact.email}`} className={linkClass}>
        <Mail size={iconSize} />
        <span>{contact.email}</span>
      </a>,
    );
  }

  if (contact.portfolio) {
    items.push(
      <a
        key="portfolio"
        href={contact.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Globe size={iconSize} />
        <span>{contact.portfolio.replace(/^https?:\/\//, "")}</span>
      </a>,
    );
  } else if (contact.linkedin) {
    const url = contact.linkedin.startsWith("http")
      ? contact.linkedin
      : `https://linkedin.com/in/${contact.linkedin}`;
    items.push(
      <a
        key="linkedin"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Linkedin size={iconSize} />
        <span>
          {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
        </span>
      </a>,
    );
  }

  if (contact.github) {
    const url = contact.github.startsWith("http")
      ? contact.github
      : `https://github.com/${contact.github}`;
    items.push(
      <a
        key="github"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Github size={iconSize} />
        <span>{contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</span>
      </a>,
    );
  }

  if (contact.location) {
    items.push(
      <div key="location" className="flex items-center gap-1.5">
        <MapPin size={iconSize} />
        <span>{contact.location}</span>
      </div>,
    );
  }

  return (
    <header className="mb-10 print:mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-1">{name}</h1>
      <p className="text-lg sm:text-xl font-medium text-muted/80 mb-4 tracking-tight">
        {title}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted/70">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center">
            {item}
          </div>
        ))}
      </div>
    </header>
  );
}
