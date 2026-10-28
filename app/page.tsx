"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ServicesMoodboard from "./components/ServicesMoodboard";
import MaterialsSection from "./components/MaterialsSection";
import ProcessSection from "./components/ProcessSection";
import ClosingEnquiry from "./components/ClosingEnquiry";
import { TextLink, ArrowCta } from "./components/InteractiveLinks";
import { PROJECTS } from "./data/projects";

const featuredStudies = PROJECTS.filter((p) => p.featured);

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // 1. Oversized wordmark shrinks into sticky navigation on scroll
        gsap.from(".nav_logo", {
          y: "-90%",
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".section.is--hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // 2. Editorial opening statement mask reveal
        gsap.utils.toArray<HTMLElement>(".header_text-move").forEach((el) =>
          gsap.to(el, {
            y: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "-100% top",
              end: "30% top",
              scrub: 0.8,
            },
          })
        );

        // 3. Expanding circular photograph transition & palette shift
        const navEl = document.querySelector<HTMLElement>(".section.is--nav");
        const wrapEl = document.querySelector<HTMLElement>(".sticky-circle_wrap");
        const stageEl = document.querySelector<HTMLElement>(".sticky-circle");
        const revealEl = document.querySelector<HTMLElement>(".sticky-circle_element");

        const syncNavOffset = () => {
          const navH = navEl ? Math.round(navEl.getBoundingClientRect().height) : 72;
          document.documentElement.style.setProperty("--nav-offset", `${navH}px`);
          return navH;
        };

        syncNavOffset();

        const getInitialClipPath = () => {
          const rect = (revealEl || stageEl)?.getBoundingClientRect();
          const w = rect?.width || window.innerWidth;
          const h = rect?.height || window.innerHeight;
          const minDim = Math.min(w, h);
          const diameter = Math.min(minDim * 0.62, 520);
          const insetX = Math.max(0, (w - diameter) / 2);
          const insetY = Math.max(0, (h - diameter) / 2);
          const radius = diameter / 2;
          return `inset(${insetY.toFixed(1)}px ${insetX.toFixed(1)}px round ${radius.toFixed(1)}px)`;
        };

        if (wrapEl && revealEl) {
          gsap.fromTo(
            revealEl,
            { clipPath: () => getInitialClipPath() },
            {
              clipPath: "inset(0px 0px round 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: wrapEl,
                start: () => `top top+=${syncNavOffset()}`,
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // 4. Featured project section — constant-ratio horizontal background category title movement
        const gridContainer = document.querySelector<HTMLElement>(".container.is--grid");
        const textWrapEl = document.querySelector<HTMLElement>(".grid_text-wrap");
        const textListEl = document.querySelector<HTMLElement>(".grid_text-list");
        const itemEls = gsap.utils.toArray<HTMLElement>(".grid_text-item");
        const titleEls = gsap.utils.toArray<HTMLElement>(".grid_text-title");
        const imgWrapEls = gsap.utils.toArray<HTMLElement>(".study-feature_primary");

        if (
          gridContainer &&
          textWrapEl &&
          textListEl &&
          itemEls.length > 0 &&
          imgWrapEls.length === itemEls.length
        ) {
          const BASE_OPACITY = 0.13;
          // Opacity timeline kept strictly separate from positional movement
          const opacityTl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
          });
          const xSetters = itemEls.map((el) => gsap.quickSetter(el, "x", "px"));

          interface CategorySegment {
            startX: number;
            direction: 1 | -1;
            movementStart: number;
            requiredScrollDistance: number;
          }

          let segments: CategorySegment[] = [];
          let sharedTravelRatio = 0.5;
          let scrollStartDoc = 0;
          let totalScrollDist = 1;

          const getTitleMetricsVP = () => {
            const vh = window.innerHeight;
            const padBottom =
              parseFloat(window.getComputedStyle(textWrapEl).paddingBottom) ||
              vh * 0.18;
            const titleH = titleEls[0]?.offsetHeight || vh * 0.16;
            const titleBottomVP = vh - padBottom;
            const titleTopVP = titleBottomVP - titleH;
            const titleCenterVP = (titleTopVP + titleBottomVP) / 2;
            return { vh, titleH, titleTopVP, titleBottomVP, titleCenterVP };
          };

          const updatePositions = (scrollPosition: number) => {
            for (let i = 0; i < segments.length; i++) {
              const seg = segments[i];
              const distance = gsap.utils.clamp(
                0,
                seg.requiredScrollDistance,
                scrollPosition - seg.movementStart
              );
              const x = seg.startX + seg.direction * distance * sharedTravelRatio;
              xSetters[i](x);
            }
          };

          const measureAndBuildCategoryAnimation = () => {
            const N = itemEls.length;
            const scrollY = window.scrollY;
            const vw =
              document.documentElement.clientWidth || window.innerWidth;

            opacityTl.clear();

            // Reset transforms and inline font-size before measuring bounds
            gsap.set(itemEls, { x: 0, y: 0, yPercent: 0 });
            titleEls.forEach((el) => el.style.removeProperty("font-size"));

            // If any title is wider than the viewport, reduce its responsive font size enough to fit
            const maxTitleW = Math.max(
              ...titleEls.map((el) => el.scrollWidth || 0)
            );
            const maxAllowedW = vw * 0.88;
            if (maxTitleW > maxAllowedW && maxTitleW > 0 && titleEls[0]) {
              const currentFS = parseFloat(
                window.getComputedStyle(titleEls[0]).fontSize
              );
              const scaledFS = currentFS * (maxAllowedW / maxTitleW);
              titleEls.forEach((el) => {
                el.style.fontSize = `${scaledFS.toFixed(2)}px`;
              });
            }

            const { vh, titleH, titleTopVP, titleCenterVP } =
              getTitleMetricsVP();

            // Calculate exact viewport-edge stopping limits from rendered text bounds and available viewport width
            const limits = titleEls.map((el) => {
              const r = el.getBoundingClientRect();
              const leftStop = -r.left;
              const rightStop = vw - r.right;
              return {
                minX: Math.min(leftStop, rightStop),
                maxX: Math.max(leftStop, rightStop),
              };
            });

            const imgMetrics = imgWrapEls.map((el) => {
              const r = el.getBoundingClientRect();
              return {
                height: r.height,
                centerDoc: r.top + scrollY + r.height / 2,
              };
            });

            const containerRect = gridContainer.getBoundingClientRect();
            const containerTopDoc = containerRect.top + scrollY;
            const containerBottomDoc = containerRect.bottom + scrollY;

            scrollStartDoc = containerTopDoc - titleTopVP;
            const scrollEndDoc = containerBottomDoc - vh;
            totalScrollDist = Math.max(400, scrollEndDoc - scrollStartDoc);

            const toTime = (docScrollY: number) =>
              gsap.utils.clamp(0, totalScrollDist, docScrollY - scrollStartDoc);

            // Compute handover scroll coordinates behind each project image b = 1 .. N-1
            const sFadeStart: number[] = [scrollStartDoc];
            const sFadeEnd: number[] = [scrollStartDoc];

            for (let b = 1; b < N; b++) {
              const m = imgMetrics[b];
              const sMid = m.centerDoc - titleCenterVP;
              const halfCover = Math.max(
                (m.height - titleH) * 0.42,
                Math.min(m.height, titleH) * 0.35,
                45
              );
              const fadeHalf = Math.max(24, halfCover * 0.55);
              sFadeStart[b] = sMid - fadeHalf;
              sFadeEnd[b] = sMid + fadeHalf;
            }

            // Compute one shared constant travelRatio across all categories so every 100px of scroll produces identical horizontal travel
            const rawSegments = limits.map((lim, i) => {
              const direction: 1 | -1 = i % 2 === 0 ? 1 : -1;
              const startX = direction === 1 ? lim.minX : lim.maxX;
              const endX = direction === 1 ? lim.maxX : lim.minX;
              const horizontalTravelDistance = Math.abs(endX - startX);
              const movementStart = i === 0 ? scrollStartDoc : sFadeEnd[i];
              const movementDeadline =
                i < N - 1 ? sFadeStart[i + 1] : scrollEndDoc;
              const availableScroll = Math.max(
                120,
                movementDeadline - movementStart
              );
              return {
                startX,
                direction,
                horizontalTravelDistance,
                movementStart,
                availableScroll,
              };
            });

            sharedTravelRatio =
              0.15 *
              Math.max(
                0.35,
                ...rawSegments.map(
                  (s) => s.horizontalTravelDistance / s.availableScroll
                )
              );

            segments = rawSegments.map((s) => ({
              startX: s.startX,
              direction: s.direction,
              movementStart: s.movementStart,
              requiredScrollDistance:
                sharedTravelRatio > 0
                  ? s.horizontalTravelDistance / sharedTravelRatio
                  : 0,
            }));

            // Build opacity-only timeline for category handovers
            opacityTl.to({}, { duration: totalScrollDist }, 0);
            for (let i = 0; i < N; i++) {
              const item = itemEls[i];
              if (i === 0) {
                opacityTl.set(item, { opacity: BASE_OPACITY }, 0);
              } else {
                const tInStart = toTime(sFadeStart[i]);
                const tInEnd = toTime(sFadeEnd[i]);
                opacityTl.set(item, { opacity: 0 }, 0);
                opacityTl.set(item, { opacity: 0 }, tInStart);
                opacityTl.to(
                  item,
                  {
                    opacity: BASE_OPACITY,
                    duration: Math.max(10, tInEnd - tInStart),
                    ease: "none",
                  },
                  tInStart
                );
              }

              if (i < N - 1) {
                const b = i + 1;
                const tOutStart = toTime(sFadeStart[b]);
                const tOutEnd = toTime(sFadeEnd[b]);
                opacityTl.to(
                  item,
                  {
                    opacity: 0,
                    duration: Math.max(10, tOutEnd - tOutStart),
                    ease: "none",
                  },
                  tOutStart
                );
              }
            }

            updatePositions(scrollY);
          };

          measureAndBuildCategoryAnimation();

          ScrollTrigger.create({
            trigger: gridContainer,
            start: () => {
              const { titleTopVP } = getTitleMetricsVP();
              return `top top+=${Math.round(titleTopVP)}`;
            },
            end: "bottom bottom",
            scrub: true,
            animation: opacityTl,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              measureAndBuildCategoryAnimation();
              opacityTl.progress(self.progress);
              updatePositions(scrollStartDoc + self.progress * totalScrollDist);
            },
            onUpdate: (self) => {
              updatePositions(scrollStartDoc + self.progress * totalScrollDist);
            },
          });
        }

        // 5. Featured project images restrained size reveal
        const projectCardLinks = gsap.utils.toArray<HTMLElement>(
          ".study-feature_img-link"
        );
        projectCardLinks.forEach((linkEl) => {
          const revealEl =
            linkEl.querySelector<HTMLElement>(".project-img_reveal");
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
                trigger: linkEl,
                start: "top 90%",
                end: "top 45%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, root);

      return () => ctx.revert();
    });

    let refreshInitHandler: (() => void) | null = null;
    const navEl = document.querySelector<HTMLElement>(".section.is--nav");
    if (navEl) {
      refreshInitHandler = () => {
        const navH = Math.round(navEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--nav-offset", `${navH}px`);
      };
      refreshInitHandler();
      ScrollTrigger.addEventListener("refreshInit", refreshInitHandler);
    }

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    return () => {
      if (refreshInitHandler) {
        ScrollTrigger.removeEventListener("refreshInit", refreshInitHandler);
      }
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      mm.revert();
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("color");
    };
  }, []);

  return (
    <div ref={root} className="home-root">
      <a className="skip-link" href="#discover">
        Skip to content
      </a>

      {/* 1. Full-screen photographic opening */}
      <div
        className="section is--hero"
        aria-label="Sunlit courtyard living room with solid white oak ceiling beams and honed travertine table"
      >
        <img
          className="hero_img"
          src="/assets/dune-hero-courtyard.jpg"
          alt="Sunlit living room opening onto a limestone courtyard with white oak ceiling beams, linen upholstery, and travertine coffee table"
          width={1376}
          height={768}
          fetchPriority="high"
        />
      </div>

      <div className="wrapper">
        <Navigation />

        <main>
          {/* 2. Opening statement + Expanding circular photograph transition */}
          <section className="section is--header" id="discover">
            <div className="container is--header">
              <h1 className="sr-only">Space to settle in.</h1>
              <div className="header_text" aria-hidden="true">
                {["Space", "to settle", "in."].map((text, i) => (
                  <div className="header_text-wrap" key={text}>
                    <div
                      className={`header_text-move${i === 2 ? " is--last" : ""}`}
                    >
                      <span
                        className={`display-line ${
                          i === 1 ? "is--alt-text" : ""
                        }`}
                      >
                        {text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="studio-intro_block">
                <ArrowCta href="/studio" className="editorial-link">
                  Meet the studio
                </ArrowCta>
              </div>

              <div className="sticky-circle_wrap">
                <div className="sticky-circle">
                  <div className="sticky-circle_element">
                    <img
                      className="sticky-circle_img"
                      src="/assets/dune-dining-oak.jpg"
                      alt="Serene dining space with a solid white oak dining table, sculpted timber chairs, and full-height linen drapery"
                      width={1376}
                      height={768}
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Featured Projects — Asymmetric presentation with sticky editorial background title */}
          <section
            className="section is--grid"
            id="collections"
            aria-label="Featured interior projects"
          >
            <div className="container is--grid">
              <div className="grid_text-wrap" aria-hidden="true">
                <div className="grid_text-list">
                  {featuredStudies.map((study, i) => (
                    <div
                      key={study.slug}
                      className={`grid_text-item${i === 0 ? " is--active" : ""}`}
                    >
                      <p className="grid_text-title">{study.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid_wrapper-contain">
                {featuredStudies.map((study, index) => {
                  const isReversed = index % 2 === 1;

                  return (
                    <article
                      className={`grid_wrapper study-feature${isReversed ? " is--reversed" : ""}${index === featuredStudies.length - 1 ? " is--alt" : ""}`}
                      key={study.slug}
                      id={study.slug}
                      aria-label={study.title}
                    >
                      <div className="study-feature_header">
                        <p
                          className="study-feature_static-category"
                          aria-hidden="true"
                        >
                          {study.category}
                        </p>
                        <h2 className="study-feature_title">
                          <Link href={`/projects/${study.slug}`}>
                            <span className="sr-only">{study.category}: </span>
                            {study.title}
                          </Link>
                        </h2>
                      </div>

                      <div
                        className={`study-feature_asymmetric${isReversed ? " is--reversed" : ""}`}
                      >
                        <div className="study-feature_primary">
                          <Link
                            href={`/projects/${study.slug}`}
                            className="study-feature_img-link project-img-link"
                          >
                            <div className="project-img_reveal">
                              <img
                                className="study-feature_img"
                                src={study.heroImage.src}
                                alt={study.heroImage.alt}
                                width={study.heroImage.width}
                                height={study.heroImage.height}
                                loading="lazy"
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
                        </div>

                        <div className="study-feature_secondary">
                          <div className="study-feature_links">
                            <TextLink
                              href={`/projects/${study.slug}`}
                              className="editorial-link"
                            >
                              View project details →
                            </TextLink>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="explore-all_bar">
                <ArrowCta href="/projects" className="btn-architectural">
                  All projects
                </ArrowCta>
              </div>
            </div>
          </section>

          {/* 5. Material Section */}
          <MaterialsSection />

          {/* 6. Services Section */}
          {/* 6. Services Moodboard Section */}
          <ServicesMoodboard />

          {/* 7. Process Section */}
          <ProcessSection />

          {/* 8. Closing Enquiry Section */}
          <ClosingEnquiry />
        </main>

        <Footer />
      </div>
    </div>
  );
}
