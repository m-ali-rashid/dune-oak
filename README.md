# Dune & Oak — Concept Interior Design Studio

A complete Next.js 16 (App Router), React 19, TypeScript, and GSAP ScrollTrigger website for **Dune & Oak**, a fictional concept interior design studio focused on warm, contemporary residential interiors, boutique hospitality spaces, and tactile furniture styling.

This project preserves the distinctive editorial visual architecture and scroll choreography of the reference Webflow template (full-screen photographic opening, oversized shrinking wordmark, editorial line reveals, expanding circular photograph transition, and asymmetric scale shifts) while expanding the single-page product template into a complete six-route interior architecture studio website.

---

## Local Setup & Commands

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# TypeScript verification
npm run typecheck

# Production static export build (outputs to ./out)
npm run build
```

Because `next.config.ts` preserves `output: "export"` for static hosting compatibility, running `npm run build` generates a complete static bundle in `out/` covering all static and dynamic project routes.

---

## Site Structure & Routes

1. **`/` (Homepage — [app/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/page.tsx))**
   - Full-viewport architectural hero (`100vh`) with shrinking `DUNE & OAK` SVG wordmark.
   - Editorial opening statement (*"Space to settle in."*) and studio introduction.
   - Expanding circular photograph transition (`35em` circle to `100vw × 100vh`) shifting the palette from deep charcoal (`#262320`) to warm sand (`#EAE4DC`).
   - Three featured Concept Studies presented asymmetrically with parallax secondary imagery, shortlist buttons, and sticky background category titles.
   - Material Philosophy section, accessible Services accordion, three-step Process (*Understand, Develop, Detail*), and Enquiry call-to-action.
2. **`/projects` (Project Browsing — [app/projects/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/projects/page.tsx))**
   - Filterable index (`All Studies`, `Residential`, `Hospitality`, `Styling`, and `Saved Shortlist`) synchronized with URL query parameters (`?category=...` or `?filter=saved`).
   - Includes empty-state handling and one-click shortlist persistence.
3. **`/projects/[slug]` (Project Details — [app/projects/[slug]/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/projects/%5Bslug%5D/page.tsx))**
   - Static generation (`generateStaticParams`) for all six concept studies:
     - `/projects/arid-courtyard-residence`
     - `/projects/mesquite-house-guest-lounge`
     - `/projects/limestone-kitchen-and-larder`
     - `/projects/linen-and-oak-daybed-study`
     - `/projects/slatted-oak-tea-sanctuary`
     - `/projects/cantilevered-oak-study-alcove`
   - Includes metadata strip, large opening photograph, project brief, design approach, daylight notes, material palette table, proposed scope, keyboard-accessible image gallery, shortlist button, contextual enquiry link, and next-project navigation.
4. **`/studio` (Studio Philosophy — [app/studio/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/studio/page.tsx))**
   - Examines layout, daylight, honest material aging, and everyday usability without fabricated biographies or credentials.
5. **`/services` (Services & Scope — [app/services/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/services/page.tsx))**
   - Details *Interior Design*, *Furniture Selection & Styling*, and *Boutique Hospitality & Small Commercial Spaces*, including suitable projects, potential deliverables, and how scope is agreed without invented fixed prices or guaranteed timelines.
6. **`/contact` (Project Enquiry — [app/contact/page.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/contact/page.tsx))**
   - Accessible enquiry form with client-side validation, error states, and automatic inclusion of the visitor's saved inspiration shortlist.

---

## Editing Content & Project Data

All project studies, material palettes, studio principles, process steps, and service descriptions are centralized in:

- **[app/data/projects.ts](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/data/projects.ts)**

To add or edit a concept study, update the `PROJECTS` array in `app/data/projects.ts`. Next.js automatically generates the corresponding `/projects/[slug]` static page at build time.

---

## Shortlist Persistence & Enquiry Delivery Integration

### Saved Projects Shortlist
- Implemented in [app/components/ShortlistProvider.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/components/ShortlistProvider.tsx) using `window.localStorage` under the key `dune_and_oak_saved_projects_v1`.
- Persists across routes and browser reloads without requiring user accounts.

### Enquiry Form Delivery & Demo Flow
- Implemented in [app/components/EnquiryFormClient.tsx](file:///Users/alirashed/Projects/minimalgoods-nextjs/app/components/EnquiryFormClient.tsx).
- **Unconfigured Delivery Behavior (Default)**: Because this project uses `output: "export"` (static export) and no external mail server is configured by default, submitting a valid form never displays a fake *"Message sent"* notice. Instead, it compiles a structured **Project Enquiry Brief (`.txt`)** containing all form inputs and saved shortlist studies for immediate download or clipboard copy.
- **Connecting a Live Endpoint**: Set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` in `.env.local` to a valid POST endpoint URL to enable live JSON delivery alongside the local brief download.

---

## Image & Font Credits

- **Concept Study Visualizations (`/public/assets/dune-*.jpg`)**: Generated specifically for Dune & Oak concept studies (*Arid Courtyard Residence*, *Oak Dining Room*, *Mesquite House Guest Lounge*, *Limestone Kitchen & Walk-In Larder*, *Slatted Oak Tea Sanctuary*, and *Studio Material Table*).
- **Reference Archive Photography (`/public/assets/image3.jpg`, `image-1.jpeg`, `image-2.jpeg`, `image-4.jpeg`, `decor-image-*.jpeg`, `office-image-*.jpeg`)**: Curated interior furniture, lighting, and material detail photography retained from the original template asset archive and explicitly credited as *Reference Archive Photography — Studio Template Collection*. All unrelated watch and consumer electronics images have been removed.
- **Typography (`/public/assets/helvetica-*.otf`)**: Locally hosted *Monotype Helvetica Now Display* (Medium, Bold, and Light Italic) from the original project assets.
