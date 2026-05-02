// Sinan Çaydibi - 2026-02-16

/**
 * Open browser print-to-PDF flow for the resume.
 *
 * This keeps text selectable and preserves real hyperlinks in the output
 * PDF, unlike rasterized screenshot-based generation.
 *
 * @param _element  Unused placeholder to keep call sites stable.
 * @param filename  Suggested PDF filename (used as temporary document title).
 */
export async function generateResumePdf(
  _element: HTMLElement,
  filename: string,
): Promise<void> {
  await document.fonts.ready;

  const root = document.documentElement;
  const previousTitle = document.title;
  document.title = filename.replace(/\.pdf$/i, "");
  root.classList.add("pdf-export");

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    document.title = previousTitle;
    root.classList.remove("pdf-export");
  };

  // Restore title and temporary export class once print flow ends.
  window.addEventListener("afterprint", cleanup, { once: true });

  // Wait one frame so title/style updates are applied before print dialog opens.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  window.print();

  // Fallback for environments where `afterprint` is unreliable.
  setTimeout(cleanup, 3000);
}


export function toResumeFilename(name: string): string {
  return `${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;
}
