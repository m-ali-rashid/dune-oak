"use client";

import React, { useState } from "react";
import { ProjectImage } from "../data/projects";

export default function ProjectGallery({
  images,
  projectTitle,
}: {
  images: ProjectImage[];
  projectTitle: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      className="project-gallery"
      role="region"
      aria-label={`${projectTitle} image gallery`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="project-gallery_header">
        <div>
          <span className="eyebrow-label">Interior &amp; Material Photography</span>
          <h2 className="section-heading">Project Gallery</h2>
        </div>

        <div className="project-gallery_controls" aria-label="Gallery navigation controls">
          <button
            type="button"
            onClick={handlePrev}
            className="gallery-ctrl-btn"
            aria-label="Previous project image"
          >
            ← Previous
          </button>
          <span className="gallery-counter" aria-live="polite">
            0{activeIndex + 1} / 0{images.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="gallery-ctrl-btn"
            aria-label="Next project image"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="project-gallery_stage">
        <figure className="project-gallery_figure">
          <div className={`project-gallery_frame is--${current.aspect}`}>
            <img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="project-gallery_active-img"
            />
          </div>
          <figcaption className="project-gallery_caption-bar">
            <p className="project-gallery_caption">{current.caption}</p>
            <p className="project-gallery_credit">{current.credit}</p>
          </figcaption>
        </figure>
      </div>

      <div
        className="project-gallery_thumbs"
        role="tablist"
        aria-label="Select project image"
      >
        {images.map((img, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={img.src + idx}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`View image ${idx + 1}: ${img.caption}`}
              onClick={() => setActiveIndex(idx)}
              className={`gallery-thumb ${isSelected ? "is--active" : ""}`}
            >
              <div className="gallery-thumb_img-wrap">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                />
              </div>
              <span className="gallery-thumb_label">Plate 0{idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
