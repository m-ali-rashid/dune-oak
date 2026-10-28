"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowCta } from "./InteractiveLinks";

interface ProcessStep {
  number: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Listen.",
    imageSrc: "/assets/dune-tea-sanctuary.jpg",
    imageAlt:
      "Tranquil interior sanctuary observed in warm natural light with slatted timber screen and travertine low table",
    caption: "Site observation, orientation, and spatial atmosphere",
  },
  {
    number: "02",
    title: "Plan.",
    imageSrc: "/assets/dune-process-plan.jpg",
    imageAlt:
      "Architectural floor plans, elevation drawings, brass scale ruler, and drafting pencil on a timber worktable",
    caption: "Architectural floor plans, spatial proportions, and material layout",
  },
  {
    number: "03",
    title: "Detail.",
    imageSrc: "/assets/dune-process-detail.jpg",
    imageAlt:
      "Precision mortise-and-tenon solid white oak timber joinery abutting a honed travertine slab and linen fabric",
    caption: "Bespoke joinery craftsmanship, stone transitions, and tactile materiality",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop sticky interactive process sequence
    mm.add(
      "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
      () => {
        const steps = stepRefs.current.filter(Boolean) as HTMLElement[];
        const imageWraps = imgWrapRefs.current.filter(Boolean) as HTMLElement[];
        const sectionEl = sectionRef.current;
        if (steps.length !== 3 || imageWraps.length !== 3 || !sectionEl) return;

        const COLOR_ACTIVE = "#262320";
        const COLOR_MUTED = "#635D55";

        const getNavHeight = () => {
          const navEl = document.querySelector<HTMLElement>(".section.is--nav");
          if (navEl) {
            const rect = navEl.getBoundingClientRect();
            if (rect.height > 0) return Math.round(rect.height);
          }
          const cssNavH = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--nav-offset")
          );
          if (Number.isFinite(cssNavH) && cssNavH > 0) return Math.round(cssNavH);
          return 72;
        };

        const syncNavHeight = () => {
          const h = getNavHeight();
          sectionEl.style.setProperty("--process-nav-h", `${h}px`);
          return h;
        };

        // Measure navigation height immediately
        syncNavHeight();

        // Initial state:
        // Step 0 active, steps 1 & 2 muted
        gsap.set(steps[0], { color: COLOR_ACTIVE, opacity: 1 });
        gsap.set([steps[1], steps[2]], { color: COLOR_MUTED, opacity: 0.5 });

        // Stationary photographs: no scale, slide, stretch, or opacity fading.
        // Image 0 base layer: fully visible at z-index 1.
        // Images 1 & 2: clipped at bottom edge (inset 100% 0% 0% 0%), fully opaque underneath.
        gsap.set(imageWraps[0], {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        gsap.set([imageWraps[1], imageWraps[2]], {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        // Scoped timeline pinning the process section directly below the navigation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: () => `top ${syncNavHeight()}px`,
            end: "+=100%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Handover 1: Listen -> Plan (0.12 to 0.44)
        // Plan reveals upward from bottom edge to top edge over stationary Listen underneath
        tl.fromTo(
          imageWraps[1],
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.32, ease: "none" },
          0.12
        );
        tl.to(
          steps[0],
          { color: COLOR_MUTED, opacity: 0.5, duration: 0.2, ease: "none" },
          0.18
        ).to(
          steps[1],
          { color: COLOR_ACTIVE, opacity: 1, duration: 0.2, ease: "none" },
          0.18
        );

        // Handover 2: Plan -> Detail (0.56 to 0.88)
        // Detail reveals upward from bottom edge to top edge over stationary Plan underneath
        tl.fromTo(
          imageWraps[2],
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.32, ease: "none" },
          0.56
        );
        tl.to(
          steps[1],
          { color: COLOR_MUTED, opacity: 0.5, duration: 0.2, ease: "none" },
          0.62
        ).to(
          steps[2],
          { color: COLOR_ACTIVE, opacity: 1, duration: 0.2, ease: "none" },
          0.62
        );

        // Hold Detail active until unpinning (0.88 to 1.00)
        tl.to({}, { duration: 0.12 }, 0.88);

        const handleResize = () => {
          syncNavHeight();
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          tl.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section is--process"
      id="process"
      aria-label="Design process"
    >
      <div className="container">
        <div className="process-editorial_grid">
          {/* Left Column: 3 Steps + CTA */}
          <div className="process-editorial_left">
            <ol ref={listRef} className="process-editorial_list">
              {PROCESS_STEPS.map((step, idx) => (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="process-editorial_item"
                >
                  <span className="process-editorial_num">
                    {step.number} /
                  </span>
                  <h3 className="process-editorial_title">{step.title}</h3>

                  {/* Mobile-only compact visual */}
                  <div className="process-editorial_mobile-visual">
                    <img
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      width={896}
                      height={1200}
                      loading="lazy"
                      className="process-editorial_mobile-img"
                    />
                    <p className="img-credit">{step.caption}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="process-editorial_cta-wrap">
              <ArrowCta
                href="/studio#process"
                className="btn-architectural"
              >
                Our full process
              </ArrowCta>
            </div>
          </div>

          {/* Right Column: Sticky Photographic Frame (Desktop) */}
          <div className="process-editorial_right">
            <div className="process-editorial_sticky-frame">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    imgWrapRefs.current[idx] = el;
                  }}
                  className="process-editorial_img-wrap"
                  style={{ zIndex: idx + 1 }}
                >
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    width={896}
                    height={1200}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="process-editorial_img"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                  <p className="img-credit process-editorial_credit">
                    {step.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
