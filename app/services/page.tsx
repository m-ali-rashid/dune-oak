import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ArrowCta, TextLink } from "../components/InteractiveLinks";
import { SERVICES, PROJECTS } from "../data/projects";

export const metadata: Metadata = {
  title: "Services & Scope — Dune & Oak Interior Design Studio",
  description:
    "Interior design, furniture selection and styling, and boutique hospitality services. Understand suitable projects, deliverables, and how scope is agreed.",
};

export default function ServicesPage() {
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
                  Disciplines, Deliverables &amp; Engagement
                </p>
                <h1 className="page-hero_title">Services &amp; Scope</h1>
              </div>
              <div className="page-hero_intro">
                <p className="body-copy">
                  We structure our work around three distinct disciplines—from
                  architectural spatial reconfiguration and custom joinery through
                  to loose furniture curation and boutique hospitality interiors.
                  Because every building shell and brief differs, scope is agreed
                  collaboratively rather than sold as rigid, pre-priced packages.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Detailed Service Sections */}
        <section className="section" aria-label="Detailed service breakdown">
          <div className="container">
            <div className="services-detailed-list">
              {SERVICES.map((service, idx) => {
                const relatedStudy = PROJECTS[idx] || PROJECTS[0];
                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="service-detail-block"
                  >
                    <div className="service-detail_header">
                      <span className="service-detail_num">
                        Discipline {service.number}
                      </span>
                      <h2 className="service-detail_title">{service.title}</h2>
                      <p className="service-detail_subtitle">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="service-detail_body">
                      <div className="service-detail_narrative">
                        <p className="body-copy">{service.summary}</p>

                        <div className="service-detail_columns">
                          <div className="service-detail_col">
                            <h3 className="service-detail_col-title">
                              Suitable Projects
                            </h3>
                            <ul className="service-row_list">
                              {service.suitableProjects.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="service-detail_col">
                            <h3 className="service-detail_col-title">
                              Potential Deliverables
                            </h3>
                            <ul className="service-row_list">
                              {service.deliverables.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="service-scope-agreement">
                          <h3 className="service-detail_col-title">
                            How Scope Is Agreed
                          </h3>
                          <p className="body-copy">{service.howScopeIsAgreed}</p>
                        </div>

                        <div className="service-detail_actions">
                          <ArrowCta
                            href={`/contact?service=${encodeURIComponent(
                              service.title
                            )}`}
                            className="btn-architectural"
                          >
                            Discuss {service.title}
                          </ArrowCta>
                          <TextLink
                            href={`/projects/${relatedStudy.slug}`}
                            className="editorial-link"
                          >
                            Related project: {relatedStudy.title} →
                          </TextLink>
                        </div>
                      </div>

                      <aside className="service-detail_visual">
                        <Link
                          href={`/projects/${relatedStudy.slug}`}
                          className="service-detail_img-link project-img-link"
                        >
                          <img
                            src={relatedStudy.heroImage.src}
                            alt={relatedStudy.heroImage.alt}
                            width={relatedStudy.heroImage.width}
                            height={relatedStudy.heroImage.height}
                            loading="lazy"
                          />
                          <span
                            className="project-img_edge-label"
                            aria-hidden="true"
                          >
                            View project ↗
                          </span>
                        </Link>
                        <p className="img-credit">
                          {relatedStudy.conceptLabel} — {relatedStudy.title}
                        </p>
                      </aside>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Agree Scope & Schedules */}
        <section
          className="section scope-governance-section"
          aria-label="How scope and schedules are structured"
        >
          <div className="container">
            <div className="section-header-split">
              <div>
                <span className="eyebrow-label">Clear Agreements</span>
                <h2 className="section-heading">
                  How scope, budgets, and timelines are established.
                </h2>
              </div>
              <p className="body-copy">
                We do not publish arbitrary fixed price tiers or promise
                guaranteed completion dates before inspecting a site and its
                structural requirements. Instead, every engagement follows three
                transparent principles.
              </p>
            </div>

            <div className="governance-grid">
              <div className="governance-cell">
                <span className="eyebrow-label">01 / Written Scope Matrix</span>
                <h3 className="narrative-subheading">
                  Defined rooms and drawing sets
                </h3>
                <p className="body-copy">
                  Before any design work begins, we map out each room in scope,
                  listing whether it requires spatial layout changes, custom
                  joinery elevations, lighting plans, or loose furniture
                  selection.
                </p>
              </div>

              <div className="governance-cell">
                <span className="eyebrow-label">02 / Staged Review Gates</span>
                <h3 className="narrative-subheading">
                  Sign-off at each phase
                </h3>
                <p className="body-copy">
                  Projects move sequentially through Spatial Direction, Material
                  &amp; Joinery Development, and Technical Documentation. You
                  review and approve physical material boards and drawings before
                  the next stage proceeds.
                </p>
              </div>

              <div className="governance-cell">
                <span className="eyebrow-label">03 / Trade &amp; Build Alignment</span>
                <h3 className="narrative-subheading">
                  Coordinated with your contractor
                </h3>
                <p className="body-copy">
                  Lead times for solid timber joinery, stone fabrication, and
                  made-to-order upholstery depend on workshop schedules. We align
                  drawing issue dates directly with your contractor or
                  cabinetmaker.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section is--enquiry-cta" aria-label="Enquire">
          <div className="container">
            <div className="enquiry-banner">
              <div className="enquiry-banner_left">
                <span className="eyebrow-label">Next Step</span>
                <h2 className="enquiry-banner_title">
                  Share your project parameters.
                </h2>
                <p className="body-copy">
                  Tell us about your space, location, and desired scope. You can
                  also attach saved projects from our portfolio to communicate the
                  material warmth and spatial character you are seeking.
                </p>
              </div>
              <div className="enquiry-banner_actions">
                <ArrowCta href="/contact" className="btn-architectural">
                  Open enquiry form
                </ArrowCta>
                <TextLink href="/projects" className="editorial-link">
                  Browse projects →
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
