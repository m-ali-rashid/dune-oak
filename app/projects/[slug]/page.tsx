import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import SaveProjectButton from "../../components/SaveProjectButton";
import ProjectGallery from "../../components/ProjectGallery";
import { ArrowCta, TextLink } from "../../components/InteractiveLinks";
import {
  PROJECTS,
  getProjectBySlug,
  getNextProject,
} from "../../data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Dune & Oak",
    };
  }

  return {
    title: `${project.title} (${project.category}) — Dune & Oak`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <div className="page-shell is--light">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />

      <main id="main-content">
        {/* 1. Title & Metadata Header */}
        <header className="project-detail-header">
          <div className="container">
            <div className="project-detail-header_top">
              <TextLink
                href={`/projects?category=${encodeURIComponent(
                  project.category
                )}`}
                className="editorial-link"
              >
                ← Back to {project.category} Projects
              </TextLink>
              <span className="concept-tag">{project.conceptLabel}</span>
            </div>

            <div className="project-detail-header_title-row">
              <h1 className="project-detail_title">{project.title}</h1>
              <div className="project-detail_save">
                <SaveProjectButton
                  slug={project.slug}
                  projectTitle={project.title}
                  variant="detail"
                />
              </div>
            </div>

            <dl className="project-metadata-strip">
              <div className="project-metadata_cell">
                <dt>Discipline</dt>
                <dd>{project.category}</dd>
              </div>
              <div className="project-metadata_cell">
                <dt>Setting Context</dt>
                <dd>{project.setting}</dd>
              </div>
              <div className="project-metadata_cell">
                <dt>Spatial Scale</dt>
                <dd>{project.areaContext}</dd>
              </div>
              <div className="project-metadata_cell">
                <dt>Architecture &amp; Styling</dt>
                <dd>Dune &amp; Oak Studio</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* 2. Large Opening Photograph */}
        <section
          className="project-opening-visual"
          aria-label="Opening project photograph"
        >
          <div className="container">
            <figure className="project-opening_figure">
              <div
                className={`project-opening_img-wrap is--${project.heroImage.aspect}`}
              >
                <img
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  width={project.heroImage.width}
                  height={project.heroImage.height}
                  fetchPriority="high"
                  className="project-opening_img"
                />
              </div>
              <figcaption className="project-opening_caption">
                <span>{project.heroImage.caption}</span>
                <span className="img-credit">{project.heroImage.credit}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3. Project Brief & Design Approach */}
        <section
          className="section project-narrative-section"
          aria-label="Project brief and design approach"
        >
          <div className="container">
            <div className="project-narrative-grid">
              <div className="project-narrative_col">
                <span className="eyebrow-label">01 / Project Brief</span>
                <h2 className="narrative-subheading">
                  Spatial intent and human rhythm
                </h2>
                {project.brief.map((paragraph, idx) => (
                  <p key={idx} className="body-copy">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="project-narrative_col">
                <span className="eyebrow-label">02 / Design Approach</span>
                <h2 className="narrative-subheading">
                  Architecture, joinery, and daylight modulation
                </h2>
                {project.designApproach.map((paragraph, idx) => (
                  <p key={idx} className="body-copy">
                    {paragraph}
                  </p>
                ))}

                <div className="daylight-note-box">
                  <p className="daylight-note_label">
                    Daylight &amp; Orientation Note
                  </p>
                  <p className="daylight-note_body">
                    {project.daylightAndLayout}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Material Palette & Proposed Scope */}
        <section
          className="section project-specs-section"
          aria-label="Material palette and project scope"
        >
          <div className="container">
            <div className="project-specs-grid">
              <div className="project-specs_materials">
                <span className="eyebrow-label">03 / Material Palette</span>
                <h2 className="narrative-subheading">
                  Specified surfaces and finishes
                </h2>
                <div className="material-spec-table">
                  {project.materialPalette.map((item, idx) => (
                    <div key={item.name} className="material-spec-row">
                      <div className="material-spec_num">0{idx + 1}</div>
                      <div className="material-spec_main">
                        <h3 className="material-spec_name">{item.name}</h3>
                        <p className="material-spec_finish">
                          Finish: {item.finish}
                        </p>
                      </div>
                      <div className="material-spec_app">
                        {item.application}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-specs_scope">
                <span className="eyebrow-label">04 / Project Scope</span>
                <h2 className="narrative-subheading">
                  Architectural and interior deliverables
                </h2>
                <ul className="scope-checklist">
                  {project.proposedScope.map((scopeItem) => (
                    <li key={scopeItem}>{scopeItem}</li>
                  ))}
                </ul>

                <div className="project-specs_enquire-card">
                  <p className="eyebrow-label">Reference This Project</p>
                  <p className="body-copy">
                    Planning a space with similar daylight, joinery, or material
                    requirements? Attach <strong>{project.title}</strong> to your
                    project enquiry.
                  </p>
                  <div className="project-specs_enquire-actions">
                    <ArrowCta
                      href={`/contact?project=${encodeURIComponent(
                        project.slug
                      )}&type=${encodeURIComponent(project.category)}`}
                      className="btn-architectural"
                    >
                      Enquire with this project
                    </ArrowCta>
                    <SaveProjectButton
                      slug={project.slug}
                      projectTitle={project.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Accessible Image Gallery */}
        <section
          className="section project-gallery-section"
          aria-label="Project gallery"
        >
          <div className="container">
            <ProjectGallery
              images={project.gallery}
              projectTitle={project.title}
            />
          </div>
        </section>

        {/* 6. Next Project Navigation */}
        <nav
          className="next-project-nav"
          aria-label="Next project navigation"
        >
          <div className="container">
            <div className="next-project_inner">
              <div>
                <span className="eyebrow-label">Next Project</span>
                <p className="next-project_category">
                  {nextProject.conceptLabel}
                </p>
                <h2 className="next-project_title">
                  <Link href={`/projects/${nextProject.slug}`}>
                    {nextProject.title}
                  </Link>
                </h2>
                <p className="body-copy">{nextProject.shortDescription}</p>
                <div className="next-project_links">
                  <ArrowCta
                    href={`/projects/${nextProject.slug}`}
                    className="btn-architectural"
                  >
                    Continue to {nextProject.title}
                  </ArrowCta>
                  <TextLink href="/projects" className="editorial-link">
                    View all 06 projects
                  </TextLink>
                </div>
              </div>

              <Link
                href={`/projects/${nextProject.slug}`}
                className="next-project_preview project-img-link"
                aria-label={`Preview ${nextProject.title}`}
              >
                <div className="project-img_reveal">
                  <img
                    src={nextProject.heroImage.src}
                    alt={nextProject.heroImage.alt}
                    width={nextProject.heroImage.width}
                    height={nextProject.heroImage.height}
                    loading="lazy"
                  />
                </div>
                <span className="project-img_edge-label" aria-hidden="true">
                  View project ↗
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
