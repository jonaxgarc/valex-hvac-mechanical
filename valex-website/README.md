# Valex HVAC Mechanical — Website

A premium single-page marketing site for Valex HVAC Mechanical. **Light, warm, and
airy**, with a palette drawn straight from the logo — amber-gold (heat), sky-blue (cool),
and a deep sage-green as the grounding tone. Phone-first, built to drive bookings.

Pure HTML/CSS/JS — **no build step, no dependencies**. Open `index.html` and it runs.

```
valex-website/
├── index.html   ← content + SEO + structured data
├── styles.css   ← theme tokens, layout, responsive rules, animations
├── script.js    ← reveal animations, mobile nav, counters, booking form
└── README.md    ← this file
```

The hero visual is a **recreation of the Valex logo** (split sun / snowflake / house)
built in inline SVG — crisp at any size and unmistakably yours. It's **static at the top
of the page** (sun over yellow on top, ice over blue below); as you scroll, the sky flips
so the sun and ice swap places, while the see-through house stays upright in the center.
The flip is disabled automatically for visitors who prefer reduced motion.

---

## ✅ Facts used (all confirmed by you)

| Field | Value |
|---|---|
| Business name | Valex HVAC Mechanical |
| Phone | 310 926 0495 (`tel:+13109260495`) |
| Email | valexhvacmechanical@gmail.com |
| Address | 4825 W 94th St, Inglewood, CA |
| License | 1146930 BBB |
| Experience | 25 years |
| Focus | Residential heating & cooling |
| Service area | Inglewood & Greater Los Angeles |
| Primary goal | Bookings (phone-first) |

## ⚠️ Before you go live — quick review

1. **Service-area cities** (Service Area section) — I show Inglewood + nearby examples
   (Hawthorne, Lennox, Westchester, El Segundo, Ladera Heights, Gardena) under a
   "+ Greater LA" tag. Swap in the exact cities you want to list. In `index.html`,
   search `area__tags`.
2. **ZIP code** — SEO structured data uses `90304`. Confirm it's correct for the address.
3. **Business hours** — none shown (you didn't specify). The site says "we usually
   answer." Add hours if you'd like them displayed + in the SEO data.
4. **Marketing tone** — phrases like "no pushy upsells" and "honest fixes" are voice,
   not factual claims. Tweak to taste.

No reviews, stats, guarantees, certifications, or pricing were invented.

---

## 📇 The booking form

Rebuilt to be smooth: inline validation, a loading state, a honeypot spam trap, and a
polished in-page **"Request received!"** success panel (no page reload, no jump).

**Out of the box (no setup):** on submit it opens the visitor's email app pre-filled to
`valexhvacmechanical@gmail.com`, then shows the success panel.

**Recommended — make it fully hands-free (2 min):**
1. Create a free form at <https://formspree.io> and copy your endpoint URL.
2. In `script.js`, set:
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/YOUR_ID";
   ```
   Now submissions email you directly — no email-app popup, just an instant success panel.

(Prefer Netlify Forms or another provider? Tell me and I'll wire it up.)

---

## 🚀 Hosting & domain

Any static host works (all free tiers are plenty):

- **Netlify / Vercel** — drag-and-drop the `valex-website` folder.
- **Cloudflare Pages / GitHub Pages** — connect a repo.

**Custom domain:** buy e.g. `valexhvac.com`, point DNS at your host, then update the
`https://www.valexhvac.com/` URLs in `index.html` (canonical + Open Graph + structured
data) to the real domain.

**High-impact next step:** set up a free **Google Business Profile** — for a local
service business it drives more calls than almost anything else.

> **Note on asset versions:** the CSS/JS links use `?v=4` for cache-busting. When you
> edit `styles.css` or `script.js`, bump that number (e.g. `?v=5`) so visitors' browsers
> load the new file instead of a cached copy.

---

## 🔍 SEO & ♿ accessibility (built in)

- Descriptive `<title>` + meta description (HVAC / Inglewood / Los Angeles)
- Open Graph tags for clean link previews (add a real `assets/og.jpg`, 1200×630, later)
- `HVACBusiness` JSON-LD structured data with your real NAP details
- One `h1`, ordered headings, semantic landmarks, alt/aria labels, skip-link
- Visible focus rings, keyboard-navigable, `prefers-reduced-motion` supported
- Content is visible even without JavaScript (progressive enhancement)
- No frameworks/heavy images; fonts use `display=swap`; animations use only
  `transform`/`opacity` (no layout shift) — should score very well on Lighthouse

## 🎨 Editing quick-reference

- **Colors/theme:** CSS variables at the top of `styles.css` (`--warm`, `--cool`,
  `--green`, `--bg`, etc.)
- **Text:** all in `index.html`
- **Services:** the `<article class="card">` blocks in the Services section
- **Logo:** inline SVG (a clean recreation of your hot/cold mark) in the header, hero,
  and footer. Want your exact logo image instead? Send a transparent PNG/SVG and I'll
  drop it in.
