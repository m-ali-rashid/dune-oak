import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import EnquiryFormClient from "../components/EnquiryFormClient";

export const metadata: Metadata = {
  title: "Enquire About a Space — Dune & Oak Interior Design Studio",
  description:
    "Prepare a project enquiry brief with your spatial requirements, desired scope, and saved project inspiration.",
};

export default function ContactPage() {
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
                  Project Dialogue &amp; Shortlist Brief
                </p>
                <h1 className="page-hero_title">Enquire About a Space</h1>
              </div>
              <div className="page-hero_intro">
                <p className="body-copy">
                  Share the location, architectural context, and desired scope for
                  your residential, hospitality, or styling project. Any projects
                  you have saved while exploring the site are attached alongside
                  your brief.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="section" aria-label="Enquiry form and shortlist">
          <div className="container">
            <EnquiryFormClient />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
