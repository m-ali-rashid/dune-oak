import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ArrowCta, TextLink } from "../components/InteractiveLinks";
import { STUDIO_PRINCIPLES, PROCESS_STEPS } from "../data/projects";

export const metadata: Metadata = {
  title: "Studio Philosophy — Dune & Oak Interior Design Studio",
  description:
    "How Dune & Oak approaches spatial layout, directional daylight, solid oak and stone materials, and everyday use across residential and boutique hospitality projects.",
};

export default function StudioPage() {
  return (
    <div className="page-shell is--light">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />

      <main id="main-content">
        <header className="page-hero">
          <div className="container">
            <div className="page-hero_grid">
              <div>
                <p className="eyebrow-label">
                  The Studio — Spatial &amp; Material Philosophy
                </p>
                <h1 className="page-hero_title">
                  Quiet architecture built for daily life.
                </h1>
              </div>
              <div className="page-hero_intro">
                <p className="body-copy">
                  Dune &amp; Oak is an interior design practice dedicated to
                  warm, contemporary residential interiors, intimate hospitality
                  spaces, and tactile furniture styling. Our name reflects a
                  recurring dialogue in our work: the sun-washed mineral calm of
                  desert landscapes paired with the structural permanence and
                  craft of solid oak.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Asymmetric editorial image + studio thesis */}
        <section className="section" aria-label="Studio perspective">
          <div className="container">
            <div className="studio-editorial-split">
              <figure className="studio-editorial_figure">
                <img
                  src="/assets/dune-dining-oak.jpg"
                  alt="Solid white oak dining table and chairs beside tall linen-draped courtyard windows"
                  width={1376}
                  height={768}
                  className="studio-editorial_img"
                />
                <figcaption className="img-credit">
                  Dining room threshold in wire-brushed white oak, honed
                  limestone, and unbleached Belgian linen.
                </figcaption>
              </figure>

              <div className="studio-editorial_text">
                <span className="eyebrow-label">Design Thesis</span>
                <h2 className="narrative-subheading">
                  Why we design from floor plan and daylight before decoration.
                </h2>
                <p className="body-copy">
                  Many contemporary interiors feel visually loud yet physically
                  uncomfortable: over-lit ceilings, synthetic surfaces that age
                  poorly, and furniture chosen for isolated camera angles rather
                  than human posture.
                </p>
                <p className="body-copy">
                  We begin every project by removing visual noise. Before selecting
                  a single luminaire or fabric swatch, we examine how morning and
                  afternoon light enters the building shell, where circulation
                  paths cross, and how built-in timber joinery can absorb daily
                  storage so rooms remain calm without effort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Four core pillars: Layout, Daylight, Materials, Everyday Use */}
        <section
          className="section studio-pillars-section"
          aria-label="Core architectural principles"
        >
          <div className="container">
            <div className="section-header-split">
              <div>
                <span className="eyebrow-label">Four Pillars</span>
                <h2 className="section-heading">
                  Layout, daylight, materials, and everyday use.
                </h2>
              </div>
              <p className="body-copy">
                Rather than chasing seasonal trends, every Dune &amp; Oak project
                is evaluated against four practical criteria.
              </p>
            </div>

            <div className="principles-grid">
              {STUDIO_PRINCIPLES.map((item) => (
                <article key={item.number} className="principle-row">
                  <div className="principle-row_num">{item.number}</div>
                  <h3 className="principle-row_title">{item.title}</h3>
                  <p className="principle-row_body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Material Atelier & Working Approach */}
        <section
          className="section studio-atelier-section"
          id="process"
          aria-label="Material palette and working method"
        >
          <div className="container">
            <div className="materials-grid">
              <div className="materials-grid_content">
                <span className="eyebrow-label">Working Approach</span>
                <h2 className="section-heading">
                  Natural materials evaluated in real light.
                </h2>
                <p className="body-copy">
                  A timber finish or stone slab never reads in isolation. Warm
                  desert sunlight shifts oak toward honey and amber, whereas cool
                  northern light draws out grey mineral undertones in limestone
                  and lime render.
                </p>
                <p className="body-copy">
                  During design development, we assemble physical material boards
                  combining quarter-sawn oak, unfilled travertine, hand-troweled
                  plaster, and woven linen or wool—evaluating how they sit
                  together in morning, midday, and evening lamp light.
                </p>

                <dl className="material-list">
                  <div className="material-list_row">
                    <dt>01 / Solid White Oak</dt>
                    <dd>
                      Quarter-sawn and wire-brushed timber finished with matte
                      plant oils or soap—used for ceiling joists, kitchen
                      joinery, and low platform seating that can be refinished
                      rather than replaced.
                    </dd>
                  </div>
                  <div className="material-list_row">
                    <dt>02 / Honed Limestone &amp; Travertine</dt>
                    <dd>
                      Open-pore and honed calcareous stones that diffuse sharp
                      daylight and ground high-traffic thresholds, kitchen sinks,
                      and hospitality reception plinths.
                    </dd>
                  </div>
                  <div className="material-list_row">
                    <dt>03 / Mineral Lime Plaster</dt>
                    <dd>
                      Hand-troweled sand and clay renders that soften room
                      acoustics, regulate humidity, and eliminate the flat glare
                      of standard acrylic drywall paint.
                    </dd>
                  </div>
                  <div className="material-list_row">
                    <dt>04 / Undyed Linen &amp; Melange Wool</dt>
                    <dd>
                      Heavyweight Belgian flax drapery, raw jute weaves, and
                      olive-toned wool cushions that temper reverberation in
                      timber-and-stone rooms.
                    </dd>
                  </div>
                </dl>

                <ol className="studio-method-list">
                  {PROCESS_STEPS.map((step) => (
                    <li key={step.step}>
                      <strong>
                        {step.step} — {step.phase}:
                      </strong>{" "}
                      {step.description}
                    </li>
                  ))}
                </ol>

                <div className="studio-atelier_links">
                  <ArrowCta href="/services" className="btn-architectural">
                    Explore services &amp; scope
                  </ArrowCta>
                  <TextLink href="/projects" className="editorial-link">
                    View selected projects →
                  </TextLink>
                </div>
              </div>

              <div className="materials-grid_visual">
                <img
                  src="/assets/dune-material-study.jpg"
                  alt="Material palette of white oak block, porous travertine slab, raw linen cloth, and stoneware bowl"
                  width={896}
                  height={1200}
                  loading="lazy"
                  className="materials-grid_img"
                />
                <p className="img-credit">
                  Dune &amp; Oak Material Table — Oiled White Oak, Unfilled
                  Travertine, Raw Flax, and Sand Stoneware.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry CTA */}
        <section
          className="section is--enquiry-cta"
          aria-label="Start a project enquiry"
        >
          <div className="container">
            <div className="enquiry-banner">
              <div className="enquiry-banner_left">
                <span className="eyebrow-label">Collaborate With Us</span>
                <h2 className="enquiry-banner_title">
                  Begin a conversation about your space.
                </h2>
                <p className="body-copy">
                  Whether you are planning an architectural renovation, a small
                  hospitality room, or cohesive furniture styling, share your
                  project parameters and saved inspiration to prepare a studio
                  enquiry brief.
                </p>
              </div>
              <div className="enquiry-banner_actions">
                <ArrowCta href="/contact" className="btn-architectural">
                  Enquire about a space
                </ArrowCta>
                <TextLink href="/services" className="editorial-link">
                  View service deliverables →
                </TextLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
