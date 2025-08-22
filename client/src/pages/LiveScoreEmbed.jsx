import { useState } from "react";

/**
 * Drop-in responsive iframe for Score7 (or any scoreboard embed).
 *
 * Props:
 * - src: full embed URL
 * - title: accessible title for screen readers
 * - className: extra Tailwind classes for the wrapper
 */
export default function LiveScoreEmbed({
  src = "https://www.score7.io/embed/tournaments/finnbangla2025/stages/18846895?showName=true&theme=auto",
  title = "Finn-Bangla Football Tournament 2025",
  className = "",
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full aspect-[16/9] ${className}`}>
      {/* Loading state overlay */}
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center rounded-2xl border border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-gray-500">
            <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" aria-hidden>
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.25" />
              <path d="M22 12a10 10 0 0 0-10-10" fill="none" stroke="currentColor" strokeWidth="4" />
            </svg>
            <span>Loading live scores…</span>
          </div>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-2xl border border-gray-200 shadow-sm"
      />
    </div>
  );
}
