import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { brandSlides } from "../data/landing";
import { themeAsset } from "../theme/assets";

const SCROLL_STEP = 340;

export function BrandSlider() {
  const { theme } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  function scrollByDir(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  }

  return (
    <div className="brand-slider">
      <div className="brand-slider__head">
        <div>
          <p className="section__eyebrow" style={{ marginBottom: "0.35rem" }}>
            In the shop
          </p>
          <h2 className="section__title" style={{ margin: 0 }}>
            Popular brands we carry
          </h2>
        </div>
        <div className="brand-slider__controls">
          <button
            type="button"
            className="brand-slider__btn"
            aria-label="Scroll brands left"
            disabled={!canPrev}
            onClick={() => scrollByDir(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="brand-slider__btn"
            aria-label="Scroll brands right"
            disabled={!canNext}
            onClick={() => scrollByDir(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="brand-slider__track-wrap">
        <div className="brand-slider__fade brand-slider__fade--left" aria-hidden />
        <div className="brand-slider__fade brand-slider__fade--right" aria-hidden />
        <div ref={trackRef} className="brand-slider__track" tabIndex={0}>
          {brandSlides.map((b) => (
            <figure key={b.label} className="brand-slide">
              <img
                src={themeAsset(theme, b.imageWarm, b.imagePurple)}
                alt={b.label}
                loading="lazy"
                width={360}
                height={160}
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
