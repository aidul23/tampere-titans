import { useEffect, useRef, useState } from "react";

// ⚽️ Drop your 5 images into public/assets and list them here.
// You can use any filenames; just update the `src` values below.
// Example names shown:
const FIXTURE_IMAGES = [
  { src: "../../assets/GroupA.png", label: "Group A" },
  { src: "../../assets/GroupB.png", label: "Group B" },
  { src: "../../assets/GroupC.png", label: "Group C" },
  { src: "../../assets/GroupD.png", label: "Group D" },
  { src: "../../assets/GroupE.png", label: "Group E" },
];

export default function FinbanglaFixtureGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef(null);

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const prev = (e) => {
    e?.stopPropagation?.();
    setIndex((i) => (i - 1 + FIXTURE_IMAGES.length) % FIXTURE_IMAGES.length);
  };
  const next = (e) => {
    e?.stopPropagation?.();
    setIndex((i) => (i + 1) % FIXTURE_IMAGES.length);
  };

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev(e);
    if (e.key === "ArrowRight") next(e);
  };

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Fixtures</h2>
        <p className="text-sm text-gray-500">Tap any image to enlarge</p>
      </header>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FIXTURE_IMAGES.map((img, i) => (
          <button
            type="button"
            key={img.src}
            onClick={() => openAt(i)}
            className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Keep full image readable: contain, not cover */}
            <div className="bg-gray-50">
              <img
                src={img.src}
                alt={img.label || `Fixture ${i + 1}`}
                loading="lazy"
                className="w-full h-64 object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <div className="absolute bottom-3 left-3 rounded-xl bg-black/60 px-3 py-1 text-sm text-white backdrop-blur">
              {img.label || `Fixture ${i + 1}`}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onKeyDown={onKeyDown}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full">
            <img
              src={FIXTURE_IMAGES[index].src}
              alt={FIXTURE_IMAGES[index].label || `Fixture ${index + 1}`}
              className="mx-auto max-h-[85vh] w-auto object-contain rounded-2xl border border-white/10"
            />

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-3 -right-3 rounded-full bg-white p-2 shadow hover:shadow-md focus:outline-none"
            >
              ✕
            </button>

            {/* Prev / Next */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white focus:outline-none"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white focus:outline-none"
            >
              ›
            </button>

            {/* Index */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {index + 1} / {FIXTURE_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
