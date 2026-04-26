import { Link } from "react-router-dom";
import { BrandSlider } from "../components/BrandSlider";
import { SITE } from "../config/site";
import { useTheme } from "../context/ThemeContext";
import { heroImages, otherProductCategories, showcaseCategories } from "../data/landing";
import { themeAsset } from "../theme/assets";

export function Home() {
  const { theme } = useTheme();
  const heroSrc = themeAsset(theme, heroImages.warm, heroImages.purple);
  const heroBg = `url(${heroSrc})`;

  return (
    <>
      <section className="hero-parallax" aria-labelledby="hero-heading">
        <div
          key={theme}
          className="hero-parallax__bg"
          style={{
            backgroundImage: heroBg,
          }}
        />
        <div className="hero-parallax__inner">
          <p className="hero-parallax__kicker">{SITE.area}</p>
          <h1 id="hero-heading">Your neighborhood vape &amp; smoke destination.</h1>
          <p className="hero-parallax__lede">
            Premium disposables, glass, juice lines, and the accessories you actually want—
            with staff who know the gear. Online ordering is on pause; visit us in person.
          </p>
          <div className="hero-parallax__actions">
            <Link className="btn btn--primary" to="/contact">
              Contact us
            </Link>
            <Link className="btn btn--ghost" to="/apply">
              Apply for a job
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight-top section--categories">
        <div className="section__inner">
          <p className="section__eyebrow">On the shelf</p>
          <h2 className="section__title">Shop the categories customers ask for first</h2>

          <div className="cat-grid">
            {showcaseCategories.map((c) => (
              <article key={c.title} className="cat-card">
                <img
                  key={`${c.title}-${theme}`}
                  className="cat-card__img"
                  src={themeAsset(theme, c.imageWarm, c.imagePurple)}
                  alt={c.alt}
                  loading="lazy"
                />
                <h3 className="cat-card__title">{c.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="section__inner">
          <p className="section__eyebrow">Also stocked</p>
          <h2 className="section__title">Other products we carry</h2>
          <p className="section__lede">
            A snapshot of departments on the floor—stop in for the full wall of options.
          </p>
          <div className="other-grid">
            {otherProductCategories.map((name) => (
              <div key={name} className="other-tile">
                <span>{name}</span>
                <span aria-hidden>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="section__inner">
          <BrandSlider />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="section__inner">
          <p className="section__eyebrow">Why Cottonwoods</p>
          <h2 className="section__title">Our core beliefs</h2>
          <p className="section__lede">
            Straight talk, clean displays, and products we stand behind—built for regulars and
            first-timers alike.
          </p>
          <div className="beliefs">
            <article className="belief-card">
              <h3>Quality that earns repeats</h3>
              <p>
                We stock reputable vape lines, solid glass, and accessories that hold up to
                daily use—no mystery counter junk.
              </p>
            </article>
            <article className="belief-card">
              <h3>Service that fits you</h3>
              <p>
                Whether you want a quick grab-and-go or a walkthrough of coils, pods, and nic
                strengths, we take the time to get it right.
              </p>
            </article>
            <article className="belief-card">
              <h3>A fair in-store experience</h3>
              <p>
                Clear pricing, ID checks where required, and a chill vibe. Ask questions—that is
                what we are here for.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
