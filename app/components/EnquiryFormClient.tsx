"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import { useShortlist } from "./ShortlistProvider";
import { ArrowCta, TextLink } from "./InteractiveLinks";

interface FormValues {
  name: string;
  email: string;
  location: string;
  projectType: string;
  scope: string;
  budget: string;
  timing: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  projectType?: string;
  scope?: string;
  timing?: string;
  description?: string;
}

const PROJECT_TYPES = [
  "Residential — Full Home or Renovation",
  "Residential — Single Room / Kitchen / Joinery",
  "Boutique Hospitality — Guesthouse / Lounge / Dining",
  "Small Commercial / Studio / Atelier",
  "Furniture Selection & Object Styling Only",
];

const SCOPE_OPTIONS = [
  "Interior Design (Spatial planning, surfaces & custom joinery)",
  "Furniture Selection & Styling (Loose furniture, drapery & lighting)",
  "Boutique Hospitality & Small Commercial Direction",
  "Combined Architecture, Joinery & Furniture Scope",
];

const TIMING_OPTIONS = [
  "Early planning — reviewing architectural drawings",
  "Ready to begin within 1–3 months",
  "Starting in 3–6 months",
  "Exploring future possibilities (6+ months)",
];

const BUDGET_OPTIONS = [
  "Prefer to discuss after scope review",
  "Focused room styling & furniture curation",
  "Multi-room interior & joinery commission",
  "Full-property architectural & interior scope",
];

export default function EnquiryFormClient() {
  const { savedSlugs, isLoaded, toggleSaved, removeSaved } = useShortlist();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    location: "",
    projectType: "",
    scope: "",
    budget: BUDGET_OPTIONS[0],
    timing: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [compiledBrief, setCompiledBrief] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "submitting" | "delivered" | "brief_ready" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);

  // Pre-populate from URL query parameters (?project=slug, ?service=title, ?type=category)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const projectParam = params.get("project");
    const serviceParam = params.get("service");
    const typeParam = params.get("type");

    setValues((prev) => {
      const next = { ...prev };

      if (serviceParam && !prev.scope) {
        const matchedScope = SCOPE_OPTIONS.find((s) =>
          s.toLowerCase().includes(serviceParam.toLowerCase())
        );
        if (matchedScope) next.scope = matchedScope;
      }

      if (typeParam && !prev.projectType) {
        const matchedType = PROJECT_TYPES.find((t) =>
          t.toLowerCase().includes(typeParam.toLowerCase())
        );
        if (matchedType) next.projectType = matchedType;
      }

      return next;
    });

    if (projectParam && isLoaded && !savedSlugs.includes(projectParam)) {
      const exists = PROJECTS.some((p) => p.slug === projectParam);
      if (exists) {
        toggleSaved(projectParam);
      }
    }
  }, [isLoaded, savedSlugs, toggleSaved]);

  const savedProjects = PROJECTS.filter((p) => savedSlugs.includes(p.slug));

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
    }
    if (!values.location.trim()) {
      nextErrors.location = "Please share the project city, region, or site context.";
    }
    if (!values.projectType) {
      nextErrors.projectType = "Please select a project type.";
    }
    if (!values.scope) {
      nextErrors.scope = "Please select the primary scope you are considering.";
    }
    if (!values.timing) {
      nextErrors.timing = "Please indicate your desired timing.";
    }
    if (!values.description.trim() || values.description.trim().length < 20) {
      nextErrors.description =
        "Please provide a short description of your space, architectural stage, or goals (at least 20 characters).";
    }
    return nextErrors;
  };

  const formatBriefDocument = (): string => {
    const dateStr = new Date().toISOString().split("T")[0];
    const inspirationLines =
      savedProjects.length > 0
        ? savedProjects
            .map(
              (p, i) =>
                `  ${i + 1}. ${p.title} (${p.conceptLabel})\n     Setting: ${
                  p.setting
                }\n     Key Materials: ${p.materialPalette
                  .map((m) => m.name)
                  .join(", ")}`
            )
            .join("\n\n")
        : "  None selected (No projects attached from shortlist)";

    return [
      "====================================================================",
      "DUNE & OAK — PROJECT ENQUIRY BRIEF",
      `Date: ${dateStr}`,
      "====================================================================",
      "",
      "1. CLIENT & SITE DETAILS",
      `Name:              ${values.name.trim()}`,
      `Email:             ${values.email.trim()}`,
      `Project Location:  ${values.location.trim()}`,
      "",
      "2. PROJECT PARAMETERS",
      `Project Type:      ${values.projectType}`,
      `Proposed Scope:    ${values.scope}`,
      `Indicative Budget: ${values.budget || "Not specified"}`,
      `Desired Timing:    ${values.timing}`,
      "",
      "3. SPATIAL BRIEF & DESCRIPTION",
      values.description.trim(),
      "",
      "4. SAVED INSPIRATION SHORTLIST",
      inspirationLines,
      "",
      "====================================================================",
      "Dune & Oak Interior Design Studio",
      "Residential Interiors · Boutique Hospitality · Furniture Styling",
      "====================================================================",
    ].join("\n");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      el?.focus();
      return;
    }

    const briefText = formatBriefDocument();
    setCompiledBrief(briefText);

    const configuredEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
    if (configuredEndpoint) {
      setDeliveryStatus("submitting");
      try {
        const response = await fetch(configuredEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            savedShortlist: savedProjects.map((p) => ({
              slug: p.slug,
              title: p.title,
              category: p.category,
            })),
          }),
        });
        if (response.ok) {
          setDeliveryStatus("delivered");
        } else {
          setDeliveryStatus("error");
        }
      } catch {
        setDeliveryStatus("error");
      }
    } else {
      setDeliveryStatus("brief_ready");
    }
  };

  const handleDownloadBrief = () => {
    if (!compiledBrief) return;
    const blob = new Blob([compiledBrief], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = values.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    link.href = url;
    link.download = `dune-and-oak-enquiry-brief-${safeName || "project"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyBrief = async () => {
    if (!compiledBrief) return;
    try {
      await navigator.clipboard.writeText(compiledBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <div className="enquiry-layout">
      <div className="enquiry-layout_form-col">
        <div className="demo-notice-box" role="note">
          <p className="eyebrow-label">Initial Project Brief</p>
          <p className="body-copy">
            Every commission begins with a written review of your floor plan,
            natural light orientation, and desired scope. Complete the details
            below to compile a structured{" "}
            <strong>Project Enquiry Brief (.txt)</strong> incorporating your
            saved inspiration shortlist for initial studio review.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="enquiry-form"
          aria-label="Project enquiry form"
        >
          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="field-name" className="form-label">
                01 / Your Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "error-name" : undefined}
                placeholder="Clara Vance"
                className="form-input"
              />
              {errors.name && (
                <p id="error-name" className="form-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="field-email" className="form-label">
                02 / Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "error-email" : undefined}
                placeholder="clara@domain.com"
                className="form-input"
              />
              {errors.email && (
                <p id="error-email" className="form-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="field-location" className="form-label">
                03 / Project Location <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-location"
                name="location"
                type="text"
                required
                value={values.location}
                onChange={(e) => {
                  setValues({ ...values, location: e.target.value });
                  if (errors.location)
                    setErrors({ ...errors, location: undefined });
                }}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "error-location" : undefined}
                placeholder="City, region, or architectural setting"
                className="form-input"
              />
              {errors.location && (
                <p id="error-location" className="form-error" role="alert">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="field-projectType" className="form-label">
                04 / Project Type <span aria-hidden="true">*</span>
              </label>
              <select
                id="field-projectType"
                name="projectType"
                required
                value={values.projectType}
                onChange={(e) => {
                  setValues({ ...values, projectType: e.target.value });
                  if (errors.projectType)
                    setErrors({ ...errors, projectType: undefined });
                }}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={
                  errors.projectType ? "error-projectType" : undefined
                }
                className="form-select"
              >
                <option value="">Select project type…</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p id="error-projectType" className="form-error" role="alert">
                  {errors.projectType}
                </p>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="field-scope" className="form-label">
                05 / Primary Scope <span aria-hidden="true">*</span>
              </label>
              <select
                id="field-scope"
                name="scope"
                required
                value={values.scope}
                onChange={(e) => {
                  setValues({ ...values, scope: e.target.value });
                  if (errors.scope) setErrors({ ...errors, scope: undefined });
                }}
                aria-invalid={Boolean(errors.scope)}
                aria-describedby={errors.scope ? "error-scope" : undefined}
                className="form-select"
              >
                <option value="">Select required scope…</option>
                {SCOPE_OPTIONS.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope}
                  </option>
                ))}
              </select>
              {errors.scope && (
                <p id="error-scope" className="form-error" role="alert">
                  {errors.scope}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="field-timing" className="form-label">
                06 / Desired Timing <span aria-hidden="true">*</span>
              </label>
              <select
                id="field-timing"
                name="timing"
                required
                value={values.timing}
                onChange={(e) => {
                  setValues({ ...values, timing: e.target.value });
                  if (errors.timing)
                    setErrors({ ...errors, timing: undefined });
                }}
                aria-invalid={Boolean(errors.timing)}
                aria-describedby={errors.timing ? "error-timing" : undefined}
                className="form-select"
              >
                <option value="">Select timing horizon…</option>
                {TIMING_OPTIONS.map((timing) => (
                  <option key={timing} value={timing}>
                    {timing}
                  </option>
                ))}
              </select>
              {errors.timing && (
                <p id="error-timing" className="form-error" role="alert">
                  {errors.timing}
                </p>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="field-budget" className="form-label">
              07 / Indicative Investment / Budget Context (Optional)
            </label>
            <select
              id="field-budget"
              name="budget"
              value={values.budget}
              onChange={(e) => setValues({ ...values, budget: e.target.value })}
              className="form-select"
            >
              {BUDGET_OPTIONS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="field-description" className="form-label">
              08 / Space Description, Daylight &amp; Brief{" "}
              <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="field-description"
              name="description"
              rows={5}
              required
              value={values.description}
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
                if (errors.description)
                  setErrors({ ...errors, description: undefined });
              }}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "error-description" : "desc-helper"
              }
              placeholder="Describe the architectural shell, approximate room dimensions, natural light orientation, and how you want the space to function…"
              className="form-textarea"
            />
            <p id="desc-helper" className="form-helper">
              Minimum 20 characters. Include any existing timber, stone, or
              architectural details.
            </p>
            {errors.description && (
              <p id="error-description" className="form-error" role="alert">
                {errors.description}
              </p>
            )}
          </div>

          <div className="form-submit-row">
            <ArrowCta type="submit" className="btn-architectural">
              Prepare Project Enquiry Brief
            </ArrowCta>
          </div>
        </form>

        {/* Compiled Brief Output Panel */}
        {deliveryStatus === "brief_ready" && compiledBrief && (
          <section
            className="compiled-brief-panel"
            aria-live="polite"
            aria-label="Compiled project enquiry brief"
          >
            <div className="compiled-brief_header">
              <div>
                <span className="concept-tag">
                  Project Enquiry Brief Prepared
                </span>
                <h2 className="narrative-subheading">
                  Your structured project brief is ready to download.
                </h2>
                <p className="body-copy">
                  Your project details and saved inspiration shortlist have been
                  compiled into a formatted studio brief below. Download a copy
                  for your records or copy the text directly to share with your
                  project team.
                </p>
              </div>
              <div className="compiled-brief_actions">
                <ArrowCta
                  type="button"
                  onClick={handleDownloadBrief}
                  className="btn-architectural"
                >
                  Download Brief (.txt)
                </ArrowCta>
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="gallery-ctrl-btn"
                >
                  {copied ? "Copied to Clipboard ✓" : "Copy Brief Text"}
                </button>
              </div>
            </div>

            <pre className="compiled-brief_pre">{compiledBrief}</pre>
          </section>
        )}

        {deliveryStatus === "delivered" && (
          <div className="compiled-brief-panel" role="status">
            <span className="concept-tag">Enquiry Received</span>
            <h2 className="narrative-subheading">
              Your project brief has been received by our studio.
            </h2>
            <p className="body-copy">
              You may also download a copy of your brief for your records.
            </p>
            <ArrowCta
              type="button"
              onClick={handleDownloadBrief}
              className="btn-architectural"
            >
              Download Copy (.txt)
            </ArrowCta>
          </div>
        )}

        {deliveryStatus === "error" && (
          <div className="compiled-brief-panel" role="alert">
            <span className="concept-tag">Offline Brief Copy</span>
            <h2 className="narrative-subheading">
              Your project brief has been saved locally.
            </h2>
            <p className="body-copy">
              We were unable to reach the online enquiry service, so your full
              brief has been preserved below for immediate download.
            </p>
            <ArrowCta
              type="button"
              onClick={handleDownloadBrief}
              className="btn-architectural"
            >
              Download Brief (.txt)
            </ArrowCta>
          </div>
        )}
      </div>

      {/* Right Column: Saved Inspiration Shortlist */}
      <aside
        className="enquiry-layout_shortlist-col"
        aria-label="Saved inspiration shortlist"
      >
        <div className="shortlist-panel">
          <span className="eyebrow-label">09 / Attached Inspiration</span>
          <h2 className="narrative-subheading">
            Saved Projects ({savedProjects.length})
          </h2>
          <p className="body-copy">
            Projects saved while browsing are automatically included in your
            enquiry brief to communicate preferred materials, joinery details,
            and lighting mood.
          </p>

          {savedProjects.length === 0 ? (
            <div className="shortlist-panel_empty">
              <p>No projects currently saved.</p>
              <TextLink href="/projects" className="editorial-link">
                Browse projects to add inspiration →
              </TextLink>
            </div>
          ) : (
            <ul className="shortlist-panel_list">
              {savedProjects.map((project) => (
                <li key={project.slug} className="shortlist-item">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="shortlist-item_thumb project-img-link"
                  >
                    <img
                      src={project.heroImage.src}
                      alt={project.heroImage.alt}
                      width={project.heroImage.width}
                      height={project.heroImage.height}
                    />
                  </Link>
                  <div className="shortlist-item_info">
                    <span className="shortlist-item_cat">
                      {project.category}
                    </span>
                    <TextLink
                      href={`/projects/${project.slug}`}
                      className="shortlist-item_title"
                      variant="subtle"
                    >
                      {project.title}
                    </TextLink>
                    <TextLink
                      onClick={() => removeSaved(project.slug)}
                      className="shortlist-item_remove"
                      ariaLabel={`Remove ${project.title} from shortlist`}
                      variant="subtle"
                    >
                      Remove
                    </TextLink>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="shortlist-panel_quick-add">
            <p className="eyebrow-label">Add Project to Brief</p>
            <div className="shortlist-quick-buttons">
              {PROJECTS.map((project) => {
                const selected = savedSlugs.includes(project.slug);
                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => toggleSaved(project.slug)}
                    aria-pressed={selected}
                    className={`quick-add-btn ${selected ? "is--selected" : ""}`}
                  >
                    <span>{selected ? "■" : "+"}</span>
                    <span>{project.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
