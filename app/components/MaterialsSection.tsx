"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowCta } from "./InteractiveLinks";

export default function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const isMobile = window.innerWidth <= 767;
      const yDistance = isMobile ? -15 : -30;

      if (!frameRef.current || !revealRef.current || !imgRef.current) return;

      // 1. Bottom-to-top curtain reveal
      gsap.fromTo(
        revealRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 90%",
            end: () => `+=${Math.round(window.innerHeight * 1)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Gentle upward internal image movement across the visible scroll range
      gsap.fromTo(
        imgRef.current,
        { y: 0 },
        {
          y: yDistance,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 90%",
            end: "bottom 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // 3. Editorial text entrance sequence (total ~0.8s, power2.out, once per mount)
      if (headingRef.current && labelsRef.current && ctaRef.current) {
        const textTrigger =
          isMobile && contentRef.current
            ? contentRef.current
            : sectionRef.current || frameRef.current;

        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: textTrigger,
            start: isMobile ? "top 85%" : "top 80%",
            once: true,
          },
        });

        textTl
          .fromTo(
            headingRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0
          )
          .fromTo(
            labelsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.15
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.3
          );
      }

      // 4. Sequential material highlighting & growing underline (Oak → Stone → Plaster → Linen)
      const itemEls = gsap.utils.toArray<HTMLElement>(
        labelsRef.current?.querySelectorAll(".material-item") || []
      );
      const underlineEls = gsap.utils.toArray<HTMLElement>(
        labelsRef.current?.querySelectorAll(".material-underline") || []
      );

      if (
        itemEls.length === 4 &&
        underlineEls.length === 4 &&
        labelsRef.current
      ) {
        const COLOR_ACTIVE = "#262320";
        const COLOR_MUTED = "#635D55";

        // Initial state: Oak active and growing from left; others muted with underline hidden
        gsap.set(itemEls[0], { color: COLOR_ACTIVE });
        gsap.set([itemEls[1], itemEls[2], itemEls[3]], { color: COLOR_MUTED });

        gsap.set(underlineEls[0], {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "left center",
        });
        gsap.set([underlineEls[1], underlineEls[2], underlineEls[3]], {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        });

        const highlightTl = gsap.timeline({
          scrollTrigger: {
            trigger: labelsRef.current,
            start: isMobile ? "top 80%" : "top 72%",
            end: isMobile ? "top 25%" : "top 25%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1 (Oak):
        // Underline grows 0% -> 100% (0.00 -> 0.08), holds full width until 0.18
        highlightTl.to(
          underlineEls[0],
          { scaleX: 1, ease: "none", duration: 0.08 },
          0
        );
        // Handover to Stone (0.18 -> 0.25):
        // Oak fades out its underline and color becomes muted
        highlightTl.to(
          itemEls[0],
          { color: COLOR_MUTED, ease: "none", duration: 0.07 },
          0.18
        );
        highlightTl.to(
          underlineEls[0],
          { opacity: 0, ease: "none", duration: 0.07 },
          0.18
        );
        // Stone becomes charcoal and its underline grows 0% -> 100%
        highlightTl.to(
          itemEls[1],
          { color: COLOR_ACTIVE, ease: "none", duration: 0.07 },
          0.18
        );
        highlightTl.set(underlineEls[1], { opacity: 1 }, 0.18);
        highlightTl.fromTo(
          underlineEls[1],
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 0.07 },
          0.18
        );

        // Stage 2 (Stone):
        // Holds full width and active color until 0.43
        // Handover to Plaster (0.43 -> 0.50):
        // Stone fades out its underline and color becomes muted
        highlightTl.to(
          itemEls[1],
          { color: COLOR_MUTED, ease: "none", duration: 0.07 },
          0.43
        );
        highlightTl.to(
          underlineEls[1],
          { opacity: 0, ease: "none", duration: 0.07 },
          0.43
        );
        // Plaster becomes charcoal and its underline grows 0% -> 100%
        highlightTl.to(
          itemEls[2],
          { color: COLOR_ACTIVE, ease: "none", duration: 0.07 },
          0.43
        );
        highlightTl.set(underlineEls[2], { opacity: 1 }, 0.43);
        highlightTl.fromTo(
          underlineEls[2],
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 0.07 },
          0.43
        );

        // Stage 3 (Plaster):
        // Holds full width and active color until 0.68
        // Handover to Linen (0.68 -> 0.75):
        // Plaster fades out its underline and color becomes muted
        highlightTl.to(
          itemEls[2],
          { color: COLOR_MUTED, ease: "none", duration: 0.07 },
          0.68
        );
        highlightTl.to(
          underlineEls[2],
          { opacity: 0, ease: "none", duration: 0.07 },
          0.68
        );
        // Linen becomes charcoal and its underline grows 0% -> 100%
        highlightTl.to(
          itemEls[3],
          { color: COLOR_ACTIVE, ease: "none", duration: 0.07 },
          0.68
        );
        highlightTl.set(underlineEls[3], { opacity: 1 }, 0.68);
        highlightTl.fromTo(
          underlineEls[3],
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 0.07 },
          0.68
        );

        // Stage 4 (Linen):
        // Holds full width and charcoal to end of range (0.75 -> 1.00)
        highlightTl.to({}, { duration: 0.25 }, 0.75);
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section is--materials"
      id="materials"
      aria-label="Material philosophy"
    >
      <div className="container">
        <div className="materials-grid">
          <div className="materials-grid_visual">
            <div className="materials-frame" ref={frameRef}>
              <div className="materials-reveal" ref={revealRef}>
                <img
                  ref={imgRef}
                  src="/assets/dune-material-study.jpg"
                  alt="Tactile studio palette of oiled white oak timber, porous travertine stone, raw linen cloth, and stoneware vessel"
                  width={896}
                  height={1200}
                  loading="lazy"
                  className="materials-img"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
            </div>
            <p className="img-credit">
              Dune &amp; Oak Material Library
            </p>
          </div>

          <div className="materials-grid_content" ref={contentRef}>
            <h2 className="section-heading" ref={headingRef}>
              Materials that feel right.
            </h2>

            <div
              ref={labelsRef}
              className="materials-simple-labels"
              aria-label="Core palette"
            >
              <span className="material-item">
                Oak
                <span className="material-underline" aria-hidden="true" />
              </span>
              <span className="separator" aria-hidden="true">
                /
              </span>
              <span className="material-item">
                Stone
                <span className="material-underline" aria-hidden="true" />
              </span>
              <span className="separator" aria-hidden="true">
                /
              </span>
              <span className="material-item">
                Plaster
                <span className="material-underline" aria-hidden="true" />
              </span>
              <span className="separator" aria-hidden="true">
                /
              </span>
              <span className="material-item">
                Linen
                <span className="material-underline" aria-hidden="true" />
              </span>
            </div>

            <div className="materials-grid_cta" ref={ctaRef}>
              <ArrowCta href="/studio" className="btn-architectural">
                Our approach
              </ArrowCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
