import legacyDocument from "../valex-website/index.html?raw";

type ProjectImage = {
  page: number;
  category: "brand" | "indoor" | "outdoor" | "ductwork" | "finishing";
  label: string;
};

function projectImage(page: number): ProjectImage {
  if (page <= 3) return { page, category: "brand", label: page === 1 ? "Valex business card and official logo" : "Valex card in the field" };
  if ([8, 9, 10, 16, 17, 18, 19, 28, 29, 36].includes(page)) {
    return { page, category: "outdoor", label: "Outdoor HVAC equipment installation" };
  }
  if ([11, 20, 21, 22, 23, 24].includes(page)) {
    return { page, category: "ductwork", label: "Attic, insulation, and airflow work" };
  }
  if ([30, 31, 32, 33, 34, 35].includes(page)) {
    return { page, category: "finishing", label: "Finished vent and comfort control detail" };
  }
  return { page, category: "indoor", label: "Indoor HVAC system and ductwork installation" };
}

const projects = Array.from({ length: 39 }, (_, index) => projectImage(index + 1));

const galleryCards = projects
  .map(({ page, category, label }, index) => {
    const extension = page === 1 ? "png" : "jpg";
    return `
      <button class="gallery-card" type="button" data-gallery-card data-category="${category}" data-index="${index}" aria-label="Open photo ${page}: ${label}">
        <span class="gallery-card__image">
          <img src="/portfolio/thumbs/valex-project-${String(page).padStart(2, "0")}.webp" alt="${label}" loading="lazy" decoding="async" />
        </span>
        <span class="gallery-card__meta">
          <span>${label}</span>
          <small>Photo ${String(page).padStart(2, "0")}</small>
        </span>
        <span class="gallery-card__full" data-full-src="/portfolio/valex-project-${String(page).padStart(2, "0")}.${extension}" hidden></span>
      </button>`;
  })
  .join("");

const galleryMarkup = `
  <section class="projects section" id="projects" aria-labelledby="projects-title">
    <div class="container">
      <header class="projects__head reveal" data-reveal>
        <div>
          <p class="eyebrow">Real Valex work</p>
          <h2 class="section__title" id="projects-title">Built clean. Finished right.</h2>
        </div>
        <p class="section__sub">Browse actual Valex HVAC installations across Greater Los Angeles—from attic air handlers and insulated ductwork to rooftop equipment and finished room vents.</p>
      </header>
      <div class="gallery-filters" role="group" aria-label="Filter project photos">
        <button type="button" class="is-active" data-gallery-filter="all">All <span>39</span></button>
        <button type="button" data-gallery-filter="indoor">Indoor systems</button>
        <button type="button" data-gallery-filter="outdoor">Outdoor equipment</button>
        <button type="button" data-gallery-filter="ductwork">Attics &amp; airflow</button>
        <button type="button" data-gallery-filter="finishing">Finished details</button>
        <button type="button" data-gallery-filter="brand">Valex identity</button>
      </div>
      <div class="gallery-grid" data-gallery-grid>
        ${galleryCards}
      </div>
      <p class="gallery-count" aria-live="polite" data-gallery-count>Showing all 39 photos</p>
    </div>
  </section>
  <dialog class="gallery-lightbox" data-gallery-lightbox aria-label="Project photo viewer">
    <button class="gallery-lightbox__close" type="button" data-gallery-close aria-label="Close photo viewer">×</button>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" data-gallery-prev aria-label="Previous photo">‹</button>
    <figure>
      <img data-gallery-image alt="" />
      <figcaption>
        <span data-gallery-caption></span>
        <small data-gallery-position></small>
      </figcaption>
    </figure>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" data-gallery-next aria-label="Next photo">›</button>
  </dialog>`;

const bodyMatch = legacyDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const originalBody = bodyMatch?.[1] ?? legacyDocument;
const bodyMarkup = originalBody
  .replaceAll(
    '<a href="#why">Why Valex</a>',
    '<a href="#projects">Projects</a><a href="#why">Why Valex</a>',
  )
  .replace('<section class="section book" id="book">', `${galleryMarkup}<section class="section book" id="book">`);

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/styles.css?v=6" />
      <link rel="stylesheet" href="/gallery.css?v=1" />
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <script src="/legacy/script.js?v=6" defer />
      <script src="/gallery.js?v=1" defer />
    </>
  );
}
