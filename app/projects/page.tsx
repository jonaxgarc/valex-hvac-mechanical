import type { Metadata } from "next";
import LegacyScripts from "../LegacyScripts";

export const metadata: Metadata = {
  title: "HVAC Projects | Valex HVAC Mechanical",
  description: "Browse real Valex HVAC installations across Greater Los Angeles.",
  alternates: { canonical: "/projects" },
};

type Category = "brand" | "indoor" | "outdoor" | "ductwork" | "finishing";

function details(page: number): { category: Category; label: string } {
  if (page <= 3) return { category: "brand", label: "Valex identity in the field" };
  if ([8, 9, 10, 16, 17, 18, 19, 28, 29, 36].includes(page)) {
    return { category: "outdoor", label: "Outdoor HVAC equipment installation" };
  }
  if ([11, 20, 21, 22, 23, 24].includes(page)) {
    return { category: "ductwork", label: "Attic, insulation, and airflow work" };
  }
  if ([30, 31, 32, 33, 34, 35].includes(page)) {
    return { category: "finishing", label: "Finished vent and comfort control detail" };
  }
  return { category: "indoor", label: "Indoor HVAC system installation" };
}

const projects = Array.from({ length: 39 }, (_, index) => {
  const page = index + 1;
  return { page, ...details(page) };
});

export default function ProjectsPage() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles.css?v=6" />
      <link rel="stylesheet" href="/gallery.css?v=3" />

      <a className="skip-link" href="#projects-main">Skip to projects</a>
      <header className="site-header" id="top" data-header>
        <div className="container header__inner">
          <a className="brand" href="/" aria-label="Valex HVAC Mechanical home">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__name">VALEX</span>
              <span className="brand__sub">HVAC MECHANICAL</span>
            </span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#why">About</a>
            <a href="/projects" aria-current="page">Projects</a>
            <a href="/#area">Service Area</a>
            <a href="/#book">Contact</a>
          </nav>
          <div className="header__cta">
            <a className="btn btn--ghost btn--phone" href="tel:+13109260495">Call (310) 926-0495</a>
            <a className="btn btn--primary" href="/#book">Book a Service</a>
          </div>
          <button className="nav-toggle" data-nav-toggle aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
            <span /><span /><span />
          </button>
        </div>
        <div className="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
          <nav aria-label="Mobile">
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#why">About</a>
            <a href="/projects" aria-current="page">Projects</a>
            <a href="/#area">Service Area</a>
            <a href="/#book">Contact</a>
          </nav>
          <div className="mobile-nav__cta">
            <a className="btn btn--primary btn--block" href="/#book">Book a Service</a>
            <a className="btn btn--ghost btn--block" href="tel:+13109260495">Call (310) 926-0495</a>
          </div>
        </div>
      </header>
      <div className="scrim" data-scrim hidden />

      <main className="projects-page" id="projects-main">
        <section className="projects-page-hero">
          <div className="container projects-page-hero__inner">
            <div>
              <p className="eyebrow">Real Valex work</p>
              <h1>Projects built for comfort.</h1>
            </div>
            <p>Explore real residential HVAC installations across Greater Los Angeles—from indoor systems and insulated ductwork to outdoor equipment and finished room details.</p>
          </div>
        </section>

        <section className="projects section" aria-labelledby="projects-title">
          <div className="container">
            <header className="projects__head">
              <div>
                <p className="eyebrow">39 project photos</p>
                <h2 className="section__title" id="projects-title">Built clean. Finished right.</h2>
              </div>
              <p className="section__sub">Choose a category, then click any project to see the full-size photo.</p>
            </header>
            <div className="gallery-filters" role="group" aria-label="Filter project photos">
              <button type="button" className="is-active" data-gallery-filter="all">All <span>39</span></button>
              <button type="button" data-gallery-filter="indoor">Indoor systems</button>
              <button type="button" data-gallery-filter="outdoor">Outdoor equipment</button>
              <button type="button" data-gallery-filter="ductwork">Attics &amp; airflow</button>
              <button type="button" data-gallery-filter="finishing">Finished details</button>
              <button type="button" data-gallery-filter="brand">Valex identity</button>
            </div>
            <div className="gallery-grid" data-gallery-grid>
              {projects.map(({ page, category, label }, index) => {
                const number = String(page).padStart(2, "0");
                const extension = page === 1 ? "png" : "jpg";
                return (
                  <button className="gallery-card" type="button" data-gallery-card data-category={category} data-index={index} aria-label={`Open photo ${page}: ${label}`} key={page}>
                    <span className="gallery-card__image">
                      <img src={`/portfolio/thumbs/valex-project-${number}.webp`} alt={label} loading={page <= 6 ? "eager" : "lazy"} decoding="async" />
                    </span>
                    <span className="gallery-card__meta">
                      <span>{label}</span>
                      <small>Photo {number}</small>
                    </span>
                    <span className="gallery-card__full" data-full-src={`/portfolio/valex-project-${number}.${extension}`} hidden />
                  </button>
                );
              })}
            </div>
            <p className="gallery-count" aria-live="polite" data-gallery-count>Showing all 39 photos</p>
          </div>
        </section>

        <section className="projects-cta">
          <div className="container projects-cta__inner">
            <div>
              <p className="eyebrow">Planning your own project?</p>
              <h2>Let’s make your home comfortable.</h2>
            </div>
            <a className="btn btn--primary btn--lg" href="/#book">Book a Service</a>
          </div>
        </section>
      </main>

      <footer className="site-footer projects-footer">
        <div className="container footer__bar">
          <span>© 2026 Valex HVAC Mechanical</span>
          <a href="tel:+13109260495">(310) 926-0495</a>
          <span>CA License #1146930 BBB</span>
        </div>
      </footer>

      <dialog className="gallery-lightbox" data-gallery-lightbox aria-label="Project photo viewer">
        <button className="gallery-lightbox__close" type="button" data-gallery-close aria-label="Close photo viewer">×</button>
        <button className="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" data-gallery-prev aria-label="Previous photo">‹</button>
        <figure>
          <img data-gallery-image alt="" />
          <figcaption><span data-gallery-caption /><small data-gallery-position /></figcaption>
        </figure>
        <button className="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" data-gallery-next aria-label="Next photo">›</button>
      </dialog>

      <LegacyScripts sources={["/legacy/script.js?v=7", "/gallery.js?v=3"]} />
    </>
  );
}
