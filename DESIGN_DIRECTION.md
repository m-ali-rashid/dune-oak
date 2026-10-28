# DESIGN_DIRECTION — Dune & Oak

## 1. Studio Concept & Brand Positioning

**Dune & Oak** is a concept interior design studio focused on warm, contemporary residential interiors, boutique hospitality spaces, and architectural furniture styling. The studio name pairs the quiet, sun-washed softness of desert mineral landscapes (*Dune*) with the structural honesty, grain, and craft of solid timber joinery (*Oak*).

All projects presented across the website are explicitly identified as **Concept Studies**—speculative spatial, daylight, and material investigations rather than fabricated completed commissions, client testimonials, awards, or team biographies.

---

## 2. Preserving the Reference Architecture & Motion

The existing repository recreates a distinctive editorial Webflow template. Rather than discarding its architecture for a conventional multi-card SaaS/agency template, we preserve and adapt its core spatial and interactive principles:

1. **Full-Screen Photographic Opening**: A 100vh architectural courtyard living space opening that anchors the page before text enters.
2. **Oversized Wordmark Shrinking into Navigation**: The custom `DUNE & OAK` SVG wordmark begins spanning the viewport above the sticky navigation bar and smoothly scrubs (`gsap.from(".nav_logo", ...)`) into its compact center-header position as the hero scrolls away.
3. **Strong Editorial Typography & Mask Reveals**: Locally hosted *Monotype Helvetica Now Display* (Medium, Bold, and Light Italic) set at bold editorial display scales with tight tracking (`-0.04em`), paired with scroll-scrubbed line reveals (`.header_text-move`) for the opening statement *"Space to settle in."*
4. **Expanding Circular Photograph Transition**: The signature `.sticky-circle_wrap` (300vh scroll track) expands a circular architectural frame (`35em` diameter circle to `100vw × 100vh` full-bleed frame) while transitioning the page palette between deep charcoal (`#262320`) and warm sand/ivory (`#EAE4DC`).
5. **Asymmetric Photography & Generous Whitespace**: Project studies and visual essays use deliberate scale contrasts (5/7 and 7/5 column splits, staggered vertical offsets, portrait vs. landscape pairings, and sticky section titles) rather than uniform 3-column card grids.
6. **Reduced-Motion & Mobile Discipline**: All GSAP ScrollTrigger scrub animations are wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, with clean `ctx.revert()` teardown and static CSS fallbacks for reduced-motion users.

---

## 3. Visual Direction & Anti-AI-Slop Guardrails

### Color Palette
- **Warm Sand / Ivory (`--bg-sand`: `#EAE4DC`)**: Primary daylight surface.
- **Linen Alabaster (`--bg-ivory`: `#F3EFEA`)**: Secondary subtle surface for editorial insets and form controls.
- **Deep Umber Charcoal (`--ink-charcoal`: `#262320`)**: Primary typographic ink and dark-mode scroll transition surface.
- **Muted Stone (`--ink-muted`: `#635D55`)**: Secondary metadata, captions, and reference notes.
- **Muted Olive (`--accent-olive`: `#5A634C`)**: Restrained architectural accent used for concept study indicators, active filter states, and saved shortlist markers.
- **Hairline Rule (`--rule-color`: `rgba(38, 35, 32, 0.22)`)**: Exposed `1px solid` structural dividers defining rows, metadata tables, and layout columns.

### Typography
- **Display & Headings**: `'Monotype helvetica now display'` (`500` Medium and `700` Bold), locally hosted in `/public/assets/`.
- **Editorial Accent**: `'Monotype helvetica now display lt it'` (`400` Light Italic), used sparingly for structural contrast in primary display titles—never sprinkled randomly inside sentences.
- **Readable Body Scale**: Body copy uses comfortable `clamp(1rem, 1.05vw, 1.15rem)` sizing (`60ch–68ch` measure) so long-form studio narratives, project briefs, and form labels remain effortless to read across desktop and mobile.

### Patterns Explicitly Avoided
- Zero gradients, glowing blobs, glassmorphism, or backdrop blur cards.
- Zero repetitive 3-column feature cards or equal-height bordered boxes.
- Zero decorative icons, floating badges, fake counters, or testimonial carousels.
- Zero banned AI-slop copy ("Elevate your space", "Where luxury meets innovation", "Bespoke solutions", "Curated excellence").
- No pill-shaped buttons everywhere; interactive controls use crisp architectural rectangles and exposed hairline rules.

---

## 4. Information Architecture & Visitor Journey

The site guides visitors through a clear four-step journey:
**Understand the studio → Explore relevant projects → Save inspiration → Enquire about a space.**

1. **`/` (Homepage)**:
   - Full-viewport hero + oversized shrinking `DUNE & OAK` wordmark.
   - Opening statement: *"Space to settle in."* + concise studio introduction.
   - Expanding circular photograph transition into warm sand palette.
   - Three featured Concept Studies presented asymmetrically with sticky category index and parallax depth, plus direct save-to-shortlist controls and link to `/projects`.
   - Material Philosophy section examining Raw White Oak, Honed Travertine, Lime Plaster, and Undyed Linen.
   - Services presented as accessible editorial rows/accordions.
   - Concise three-step process: *01 Understand*, *02 Develop*, *03 Detail*.
   - Editorial enquiry invitation and structured footer.
2. **`/projects` (Project Browsing)**:
   - Filterable index (`All`, `Residential`, `Hospitality`, `Styling`, plus `Saved (N)` shortlist view) synchronized with the URL query string (`?category=...`).
   - Staggered editorial layout with varied image aspect ratios, concept labels, material summaries, and empty states.
3. **`/projects/[slug]` (Project Detail)**:
   - Six complete Concept Studies with transparent reference photography credits, project brief, spatial & daylight approach, tactile material palette, proposed scope, interactive keyboard-accessible image gallery, shortlist toggle, enquiry link pre-populated with the project, and next-project navigation.
4. **`/studio` (Studio Philosophy)**:
   - Detailed examination of spatial layout, daylight orientation, honest material aging, and everyday rituals—without invented founder biographies or fabricated credentials.
5. **`/services` (Services & Scope)**:
   - Editorial breakdown of *Interior Design*, *Furniture Selection & Styling*, and *Boutique Hospitality & Small Commercial Spaces*—detailing suitable projects, deliverables, and how scope is agreed without invented fixed prices or guaranteed timelines.
6. **`/contact` (Project Enquiry & Shortlist Brief)**:
   - Accessible enquiry form (Name, Email, Project Location, Project Type, Scope, Optional Indicative Budget, Desired Timing, Description, and attached Saved Inspiration Shortlist).
   - Because `next.config.ts` uses `output: "export"` (static export) and no external mail server credentials are configured, submitting a valid form prepares a clearly labelled **Structured Enquiry Brief** (`.txt` download + one-click clipboard copy) unless `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is configured, never falsely claiming "Message sent" without actual delivery.
