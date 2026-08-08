import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "netlify-dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "public"), output, { recursive: true });

let home = await readFile(path.join(root, "valex-website", "index.html"), "utf8");
home = home
  .replace('href="styles.css?v=5"', 'href="/legacy/styles.css?v=6"\n  />\n  <link rel="stylesheet" href="/gallery.css?v=3"')
  .replace('src="script.js?v=4"', 'src="/legacy/script.js?v=7"');
await writeFile(path.join(output, "index.html"), home, "utf8");

const details = (page) => {
  if (page <= 3) return ["brand", "Valex identity in the field"];
  if ([8, 9, 10, 16, 17, 18, 19, 28, 29, 36].includes(page)) return ["outdoor", "Outdoor HVAC equipment installation"];
  if ([11, 20, 21, 22, 23, 24].includes(page)) return ["ductwork", "Attic, insulation, and airflow work"];
  if ([30, 31, 32, 33, 34, 35].includes(page)) return ["finishing", "Finished vent and comfort control detail"];
  return ["indoor", "Indoor HVAC system installation"];
};

const cards = Array.from({ length: 39 }, (_, index) => {
  const page = index + 1;
  const number = String(page).padStart(2, "0");
  const extension = page === 1 ? "png" : "jpg";
  const [category, label] = details(page);
  return `<button class="gallery-card" type="button" data-gallery-card data-category="${category}" data-index="${index}" aria-label="Open photo ${page}: ${label}">
    <span class="gallery-card__image"><img src="/portfolio/thumbs/valex-project-${number}.webp" alt="${label}" loading="${page <= 6 ? "eager" : "lazy"}" decoding="async"></span>
    <span class="gallery-card__meta"><span>${label}</span><small>Photo ${number}</small></span>
    <span class="gallery-card__full" data-full-src="/portfolio/valex-project-${number}.${extension}" hidden></span>
  </button>`;
}).join("\n");

const projects = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HVAC Projects | Valex HVAC Mechanical</title>
  <meta name="description" content="Browse real Valex HVAC installations across Greater Los Angeles.">
  <link rel="canonical" href="https://valexhvac.com/projects/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>document.documentElement.className += " js";</script>
  <link rel="stylesheet" href="/legacy/styles.css?v=6">
  <link rel="stylesheet" href="/gallery.css?v=3">
</head>
<body>
  <a class="skip-link" href="#projects-main">Skip to projects</a>
  <header class="site-header" id="top" data-header>
    <div class="container header__inner">
      <a class="brand" href="/" aria-label="Valex HVAC Mechanical home"><span class="brand__mark" aria-hidden="true"></span><span class="brand__text"><span class="brand__name">VALEX</span><span class="brand__sub">HVAC MECHANICAL</span></span></a>
      <nav class="nav" aria-label="Primary"><a href="/">Home</a><a href="/#services">Services</a><a href="/#why">About</a><a href="/#book">Contact</a><a class="nav__projects" href="/projects/" aria-current="page">Viewing Projects <span aria-hidden="true">✓</span></a></nav>
      <div class="header__cta"><a class="btn btn--ghost btn--phone" href="tel:+13109260495"><span>☎&ensp; Call (310) 926-0495</span></a><a class="btn btn--primary" href="/#book">Book a Service</a></div>
      <button class="nav-toggle" data-nav-toggle aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span><span></span></button>
    </div>
    <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden><nav aria-label="Mobile"><a href="/">Home</a><a href="/#services">Services</a><a href="/#why">About</a><a href="/#book">Contact</a><a class="nav__projects" href="/projects/" aria-current="page">Viewing Projects ✓</a></nav><div class="mobile-nav__cta"><a class="btn btn--primary btn--block" href="/#book">Book a Service</a><a class="btn btn--ghost btn--block" href="tel:+13109260495">Call (310) 926-0495</a></div></div>
  </header>
  <div class="scrim" data-scrim hidden></div>
  <main class="projects-page" id="projects-main">
    <section class="projects-page-hero"><div class="container projects-page-hero__inner"><div><p class="eyebrow">Real Valex work</p><h1>Projects built for comfort.</h1></div><p>Explore real residential HVAC installations across Greater Los Angeles—from indoor systems and insulated ductwork to outdoor equipment and finished room details.</p></div></section>
    <section class="projects section" aria-labelledby="projects-title"><div class="container">
      <header class="projects__head"><div><p class="eyebrow">39 project photos</p><h2 class="section__title" id="projects-title">Built clean. Finished right.</h2></div><p class="section__sub">Choose a category, then click any project to see the full-size photo.</p></header>
      <div class="gallery-filters" role="group" aria-label="Filter project photos"><button type="button" class="is-active" data-gallery-filter="all">All <span>39</span></button><button type="button" data-gallery-filter="indoor">Indoor systems</button><button type="button" data-gallery-filter="outdoor">Outdoor equipment</button><button type="button" data-gallery-filter="ductwork">Attics &amp; airflow</button><button type="button" data-gallery-filter="finishing">Finished details</button><button type="button" data-gallery-filter="brand">Valex identity</button></div>
      <div class="gallery-grid" data-gallery-grid>${cards}</div><p class="gallery-count" aria-live="polite" data-gallery-count>Showing all 39 photos</p>
    </div></section>
    <section class="projects-cta"><div class="container projects-cta__inner"><div><p class="eyebrow">Planning your own project?</p><h2>Let’s make your home comfortable.</h2></div><a class="btn btn--primary btn--lg" href="/#book">Book a Service</a></div></section>
  </main>
  <footer class="site-footer projects-footer"><div class="container footer__bar"><span>© 2026 Valex HVAC Mechanical</span><a href="tel:+13109260495">(310) 926-0495</a><span>CA License #1146930 BBB</span></div></footer>
  <dialog class="gallery-lightbox" data-gallery-lightbox aria-label="Project photo viewer"><button class="gallery-lightbox__close" type="button" data-gallery-close aria-label="Close photo viewer">×</button><button class="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" data-gallery-prev aria-label="Previous photo">‹</button><figure><img data-gallery-image alt=""><figcaption><span data-gallery-caption></span><small data-gallery-position></small></figcaption></figure><button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" data-gallery-next aria-label="Next photo">›</button></dialog>
  <script src="/legacy/script.js?v=7" defer></script><script src="/gallery.js?v=3" defer></script>
</body></html>`;

await mkdir(path.join(output, "projects"), { recursive: true });
await writeFile(path.join(output, "projects", "index.html"), projects, "utf8");
await writeFile(path.join(output, "_redirects"), "/projects /projects/ 301\n/* /index.html 404\n", "utf8");

console.log(`Netlify static site generated at ${output}`);
