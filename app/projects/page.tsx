import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProjectsBrowserClient from "../components/ProjectsBrowserClient";
import { ArrowCta, TextLink } from "../components/InteractiveLinks";

export const metadata: Metadata = {
  title: "Projects — Dune & Oak Interior Design Studio",
  description:
    "Explore six interior architecture, boutique hospitality, and furniture styling projects in solid white oak, travertine, lime plaster, and raw linen.",
};

export default function ProjectsPage() {
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
                  Selected Works — Architecture, Hospitality &amp; Styling
                </p>
                <h1 className="page-hero_title">Projects</h1>
              </div>
              <div className="page-hero_intro">
                <p className="body-copy">
                  Each project below reflects our commitment to floor plan calm,
                  natural daylight modulation, custom oak joinery, and honest
                  stone and textile detailing. Save individual projects to build
                  an inspiration shortlist for your enquiry.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="section" aria-label="Filterable projects">
          <div className="container">
            <ProjectsBrowserClient />
          </div>
        </section>

        <section
          className="section is--enquiry-cta is--no-border"
          aria-label="Enquire"
        >
          <div className="container">
            <div className="enquiry-banner">
              <div className="enquiry-banner_left">
                <span className="eyebrow-label">Have a Specific Floor Plan?</span>
                <h2 className="enquiry-banner_title">
                  Bring your saved projects into an enquiry brief.
                </h2>
                <p className="body-copy">
                  Whether you are reconfiguring a private residence, planning a
                  small guesthouse, or furnishing an existing room, any projects
                  you save here will be attached to your enquiry automatically.
                </p>
              </div>
              <div className="enquiry-banner_actions">
                <ArrowCta href="/contact" className="btn-architectural">
                  Enquire about a space
                </ArrowCta>
                <TextLink href="/services" className="editorial-link">
                  Review services &amp; scope →
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
