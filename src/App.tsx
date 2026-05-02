import { useEffect, useRef, useState } from "react";
import { resumeDataEN, resumeDataTR, translations } from "./data/resume";
import {
  DownloadButton,
  Header,
  ProfessionalSummary,
  WorkExperience,
  EducationSection,
  Skills,
  Certifications,
} from "./components";
import { generateResumePdf, toResumeFilename } from "./lib/generatePdf";

export default function App() {
  const [lang, setLang] = useState<"en" | "tr">("tr");
  const data = lang === "en" ? resumeDataEN : resumeDataTR;
  const t = translations[lang];

  const { name, title, summary, contact, experience, education, skills, certifications } =
    data;

  const hasAutoDownloaded = useRef(false);

  useEffect(() => {
    if (hasAutoDownloaded.current) return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("download")) return;

    hasAutoDownloaded.current = true;

    const timer = setTimeout(async () => {
      const page = document.querySelector(".page") as HTMLElement | null;
      if (!page) return;
      await generateResumePdf(page, toResumeFilename(name));
    }, 1500);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <>
      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 print:hidden">
        <div className="flex items-center gap-1 bg-surface/80 backdrop-blur-md border border-divider rounded-full p-1 shadow-sm">
          <button
            onClick={() => setLang("tr")}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
              lang === "tr"
                ? "bg-accent text-white shadow-md"
                : "text-muted hover:text-primary"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
              lang === "en"
                ? "bg-accent text-white shadow-md"
                : "text-muted hover:text-primary"
            }`}
          >
            ENG
          </button>
        </div>
      </div>

      <DownloadButton name={name} label={t.download} />

      <div className="page max-w-5xl mx-auto my-8 bg-white shadow-2xl rounded-xl overflow-hidden border border-divider/50 transition-all duration-500 hover:shadow-accent/10">
        <div className="px-8 py-10 sm:px-12 sm:py-12 md:px-16 md:py-14 print:px-4 print:py-5 print:shadow-none print:rounded-none print:border-none print:my-0">
          <Header name={name} title={title} contact={contact} />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] print:grid-cols-[1fr_250px] gap-x-12 print:gap-x-8 gap-y-8 print:gap-y-0">
            {/* ---- Main column ---- */}
            <div className="space-y-8 print:space-y-4">
              <ProfessionalSummary title={t.professionalSummary} summary={summary} />
              <WorkExperience title={t.workExperience} experience={experience} />
            </div>

            {/* ---- Sidebar ---- */}
            <aside className="space-y-8 print:space-y-4">
              <Skills title={t.skills} skills={skills} />
              <EducationSection title={t.education} education={education} />
              {certifications && certifications.length > 0 && (
                <Certifications
                  title={t.certifications}
                  certifications={certifications}
                />
              )}
            </aside>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          .page {
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
          }
        }
      `,
        }}
      />
    </>
  );
}
