"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, ProjectCategory } from "../data/projects";
import { useShortlist } from "./ShortlistProvider";
import SaveProjectButton from "./SaveProjectButton";
import { ArrowCta, TextLink } from "./InteractiveLinks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FilterValue = "All" | ProjectCategory | "Saved";

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "All", label: "All Projects" },
  { value: "Residential", label: "Residential" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Styling", label: "Styling" },
  { value: "Saved", label: "Saved Shortlist" },
];

export default function ProjectsBrowserClient() {
  const { savedSlugs, isLoaded, clearSaved } = useShortlist();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      const filterParam = params.get("filter");

      if (filterParam === "saved") {
        setActiveFilter("Saved");
      } else if (
        categoryParam === "Residential" ||
        categoryParam === "Hospitality" ||
        categoryParam === "Styling"
      ) {
        setActiveFilter(categoryParam);
      } else {
        setActiveFilter("All");
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const handleFilterChange = (next: FilterValue) => {
    setActiveFilter(next);
    if (typeof window !== "undefined") {
      const url =
        next === "All"
          ? "/projects"
          : next === "Saved"
          ? "/projects?filter=saved"
          : `/projects?category=${encodeURIComponent(next)}`;
      window.history.replaceState(null, "", url);
    }
  };

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Saved") {
      return isLoaded && savedSlugs.includes(project.slug);
    }
    return project.category === activeFilter;
  });

  const savedCount = isLoaded ? savedSlugs.length : 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-entry_img-wrap");
      cards.forEach((cardEl) => {
        const revealEl =
          cardEl.querySelector<HTMLElement>(".project-img_reveal");
        if (!revealEl) return;
        const getStartMask = () =>
          window.innerWidth <= 767
            ? "inset(5% 3% 5% 3%)"
            : "inset(10% 6% 10% 6%)";
        gsap.fromTo(
          revealEl,
          { clipPath: getStartMask },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: cardEl,
              start: "top 90%",
              end: "top 45%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, [filteredProjects]);

  return (
    <div className="projects-browser">
      {/* Filter Bar */}
      <div
        className="filter-bar"
        role="toolbar"
        aria-label="Filter projects by discipline"
      >
        <div className="filter-bar_buttons">
          {FILTER_OPTIONS.map((opt) => {
            const isSelected = activeFilter === opt.value;
            const count =
              opt.value === "All"
                ? PROJECTS.length
                : opt.value === "Saved"
                ? savedCount
                : PROJECTS.filter((p) => p.category === opt.value).length;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleFilterChange(opt.value)}
                aria-pressed={isSelected}
                className={`filter-btn ${isSelected ? "is--active" : ""}`}
              >
                <span className="filter-btn_label">{opt.label}</span>
                <span className="filter-btn_count">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="filter-bar_status" aria-live="polite">
          Showing {filteredProjects.length} of {PROJECTS.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state" role="status">
          <p className="eyebrow-label">No Matching Projects</p>
          <h2 className="empty-state_title">
            {activeFilter === "Saved"
              ? "Your inspiration shortlist is currently empty."
              : `No projects found under "${activeFilter}".`}
          </h2>
          <p className="body-copy">
            {activeFilter === "Saved"
              ? "While exploring residential, hospitality, or styling projects, use the “Save Project” button to gather rooms and material palettes into your shortlist. Saved projects persist across visits and attach automatically to your project enquiry."
              : "Reset the discipline filter to view all six architectural and styling projects."}
          </p>
          <div className="empty-state_actions">
            <ArrowCta
              type="button"
              className="btn-architectural"
              onClick={() => handleFilterChange("All")}
            >
              View all projects (06)
            </ArrowCta>
          </div>
        </div>
      ) : (
        <>
          {activeFilter === "Saved" && savedCount > 0 && (
            <div className="shortlist-banner">
              <div>
                <p className="eyebrow-label">Saved Inspiration Shortlist</p>
                <p className="body-copy">
                  You have {savedCount} saved{" "}
                  {savedCount === 1 ? "project" : "projects"}. These will be
                  included automatically when you prepare an enquiry brief.
                </p>
              </div>
              <div className="shortlist-banner_actions">
                <ArrowCta href="/contact" className="btn-architectural">
                  Include shortlist in enquiry
                </ArrowCta>
                <TextLink
                  onClick={clearSaved}
                  className="text-button"
                  variant="subtle"
                >
                  Clear shortlist
                </TextLink>
              </div>
            </div>
          )}

          <div className="projects-editorial-list">
            {filteredProjects.map((project, index) => {
              const layoutVariant =
                index % 3 === 0
                  ? "is--wide-left"
                  : index % 3 === 1
                  ? "is--portrait-right"
                  : "is--offset-center";

              return (
                <article
                  key={project.slug}
                  className={`project-entry ${layoutVariant}`}
                >
                  <div className="project-entry_visual">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="project-entry_img-wrap project-img-link"
                    >
                      <div className="project-img_reveal">
                        <img
                          src={project.heroImage.src}
                          alt={project.heroImage.alt}
                          width={project.heroImage.width}
                          height={project.heroImage.height}
                          loading={index < 2 ? "eager" : "lazy"}
                          className="project-entry_img"
                          onLoad={() => ScrollTrigger.refresh()}
                        />
                      </div>
                      <span
                        className="project-img_edge-label"
                        aria-hidden="true"
                      >
                        View project ↗
                      </span>
                    </Link>
                    <p className="project-entry_credit">
                      {project.heroImage.credit}
                    </p>
                  </div>

                  <div className="project-entry_details">
                    <div className="project-entry_meta-top">
                      <span className="concept-tag">{project.conceptLabel}</span>
                      <span className="project-entry_category">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="project-entry_title">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>

                    <p className="project-entry_context">
                      {project.setting} — {project.areaContext}
                    </p>

                    <p className="project-entry_description">
                      {project.shortDescription}
                    </p>

                    <div className="project-entry_palette">
                      <span className="project-entry_palette-label">
                        Key Materials:
                      </span>
                      <span>
                        {project.materialPalette.map((m) => m.name).join(" · ")}
                      </span>
                    </div>

                    <div className="project-entry_actions">
                      <TextLink
                        href={`/projects/${project.slug}`}
                        className="editorial-link"
                      >
                        View project &amp; material palette →
                      </TextLink>
                      <SaveProjectButton
                        slug={project.slug}
                        projectTitle={project.title}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
