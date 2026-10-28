"use client";

import React, { useState } from "react";
import { SERVICES } from "../data/projects";
import { TextLink } from "./InteractiveLinks";

export default function ServicesAccordion({
  defaultOpenIndex = 0,
  showFullDetails = false,
}: {
  defaultOpenIndex?: number;
  showFullDetails?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="services-rows">
      {SERVICES.map((service, index) => {
        const isOpen = openIndex === index;
        const panelId = `service-panel-${service.id}`;
        const buttonId = `service-trigger-${service.id}`;

        return (
          <div
            key={service.id}
            className={`service-row ${isOpen ? "is--open" : ""}`}
          >
            <h3 className="service-row_heading">
              <button
                id={buttonId}
                type="button"
                className="service-row_trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="service-row_num">{service.number}</span>
                <span className="service-row_title-group">
                  <span className="service-row_title">{service.title}</span>
                  <span className="service-row_subtitle">{service.subtitle}</span>
                </span>
                <span className="service-row_icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="service-row_panel"
            >
              <div className="service-row_panel-grid">
                <div className="service-row_summary">
                  <p>{service.summary}</p>
                  {showFullDetails && (
                    <div className="service-row_scope-box">
                      <p className="service-row_label">How Scope Is Agreed</p>
                      <p>{service.howScopeIsAgreed}</p>
                    </div>
                  )}
                </div>

                <div className="service-row_columns">
                  <div>
                    <p className="service-row_label">Suitable Projects</p>
                    <ul className="service-row_list">
                      {service.suitableProjects.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="service-row_label">Potential Deliverables</p>
                    <ul className="service-row_list">
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="service-row_actions">
                <TextLink
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="editorial-link"
                >
                  Enquire regarding {service.title} →
                </TextLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
