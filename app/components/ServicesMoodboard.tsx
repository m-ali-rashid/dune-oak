"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowCta } from "./InteractiveLinks";

interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  aspectClass: string;
  baseRotation: number;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "interior-design",
    number: "01",
    title: "Interior Design",
    href: "/services#interior-design",
    imageSrc: "/assets/dune-residential-kitchen.jpg",
    imageAlt:
      "Considered residential kitchen interior with white oak cabinetry and limestone apron sink",
    width: 1200,
    height: 896,
    aspectClass: "is--landscape",
    baseRotation: -4,
  },
  {
    id: "furniture-styling",
    number: "02",
    title: "Furniture & Styling",
    href: "/services#furniture-styling",
    imageSrc: "/assets/image-4.jpeg",
    imageAlt:
      "Sculptural solid oak daybed upholstered in olive leather with full-height linen drapery",
    width: 800,
    height: 1000,
    aspectClass: "is--portrait",
    baseRotation: 3,
  },
  {
    id: "hospitality-commercial",
    number: "03",
    title: "Hospitality & Commercial",
    href: "/services#hospitality-commercial",
    imageSrc: "/assets/dune-hospitality-lounge.jpg",
    imageAlt:
      "Boutique guesthouse arrival lounge with rammed earth walls, travertine host plinth, and oak joinery",
    width: 1200,
    height: 896,
    aspectClass: "is--landscape",
    baseRotation: -2,
  },
];

export default function ServicesMoodboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const entranceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magneticRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const stageEl = stageRef.current;
    if (!stageEl) return;

    const isFinePointer = () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fixed resting centers relative to the stage coordinate space
    let restingCenters: { x: number; y: number }[] = [];

    const measureRestingCenters = () => {
      const stageRect = stageEl.getBoundingClientRect();
      restingCenters = slotRefs.current.map((slotEl) => {
        if (!slotEl) return { x: 0, y: 0 };
        const slotRect = slotEl.getBoundingClientRect();
        return {
          x: slotRect.left - stageRect.left + slotRect.width / 2,
          y: slotRect.top - stageRect.top + slotRect.height / 2,
        };
      });
    };

    const ctx = gsap.context(() => {
      // 1. Initial State & Scroll Entrance Animation
      entranceRefs.current.forEach((el, i) => {
        if (!el) return;
        const targetRot = SERVICES_DATA[i].baseRotation;
        if (isReducedMotion()) {
          gsap.set(el, { opacity: 1, y: 0, rotation: targetRot });
        } else {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 45,
              rotation: targetRot * 0.4,
            },
            {
              opacity: 1,
              y: 0,
              rotation: targetRot,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stageEl,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });

      measureRestingCenters();
    }, containerRef);

    // 2. Magnetic Pointer Interaction with quickTo
    const quickSetters = magneticRefs.current.map((el) => {
      if (!el) return null;
      return {
        xTo: gsap.quickTo(el, "x", { duration: 0.55, ease: "power2.out" }),
        yTo: gsap.quickTo(el, "y", { duration: 0.55, ease: "power2.out" }),
        rotTo: gsap.quickTo(el, "rotation", {
          duration: 0.55,
          ease: "power2.out",
        }),
      };
    });

    const MAX_DISPLACEMENT = 28; // px (within 20–35px constraint)
    const MAX_ADDITIONAL_ROT = 1.4; // deg (at most 1–2°)

    const handlePointerMove = (e: PointerEvent) => {
      if (!isFinePointer() || isReducedMotion()) return;
      const stageRect = stageEl.getBoundingClientRect();
      const pointerX = e.clientX - stageRect.left;
      const pointerY = e.clientY - stageRect.top;

      // Distance falloff influence radius relative to moodboard size
      const influenceRadius = Math.max(stageRect.width * 0.55, 460);

      slotRefs.current.forEach((_, idx) => {
        const setters = quickSetters[idx];
        const center = restingCenters[idx];
        if (!setters || !center) return;

        const dx = pointerX - center.x;
        const dy = pointerY - center.y;
        const dist = Math.hypot(dx, dy);

        if (dist >= influenceRadius) {
          setters.xTo(0);
          setters.yTo(0);
          setters.rotTo(0);
          return;
        }

        // Smooth quadratic distance falloff
        const t = 1 - dist / influenceRadius;
        const falloff = t * t;

        // Pull toward pointer
        const pull = Math.min(dist, MAX_DISPLACEMENT) * falloff;
        const uX = dx / (dist || 1);
        const uY = dy / (dist || 1);

        const targetX = uX * pull;
        const targetY = uY * pull;
        const targetRot = (targetX / MAX_DISPLACEMENT) * MAX_ADDITIONAL_ROT;

        setters.xTo(targetX);
        setters.yTo(targetY);
        setters.rotTo(targetRot);
      });
    };

    const handlePointerLeave = () => {
      quickSetters.forEach((setters) => {
        if (!setters) return;
        setters.xTo(0);
        setters.yTo(0);
        setters.rotTo(0);
      });
    };

    stageEl.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    stageEl.addEventListener("pointerleave", handlePointerLeave);

    const handleResize = () => {
      measureRestingCenters();
      if (!isFinePointer()) {
        handlePointerLeave();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stageEl.removeEventListener("pointermove", handlePointerMove);
      stageEl.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="section is--services-home"
      id="services"
      aria-label="Studio services"
    >
      <div className="container">
        <div className="services-home_header">
          <h2 className="section-heading">Three ways to collaborate.</h2>
          <ArrowCta href="/services" className="editorial-link">
            Explore services
          </ArrowCta>
        </div>

        <div
          ref={stageRef}
          className="moodboard_stage"
          role="region"
          aria-label="Interactive services photographic moodboard"
        >
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                slotRefs.current[index] = el;
              }}
              className={`moodboard_slot is--slot-${index + 1}`}
            >
              <div
                ref={(el) => {
                  entranceRefs.current[index] = el;
                }}
                className="moodboard_entrance"
              >
                <div
                  ref={(el) => {
                    magneticRefs.current[index] = el;
                  }}
                  className="moodboard_magnetic"
                >
                  <Link
                    href={service.href}
                    className="moodboard_card"
                    aria-label={`Explore ${service.title} (${service.number})`}
                  >
                    <div
                      className={`moodboard_photo-wrap ${service.aspectClass}`}
                    >
                      <img
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        width={service.width}
                        height={service.height}
                        loading="lazy"
                        className="moodboard_img"
                        onLoad={() => {
                          ScrollTrigger.refresh();
                        }}
                      />
                    </div>
                    <div className="moodboard_info">
                      <span className="moodboard_num">{service.number}</span>
                      <h3 className="moodboard_title">{service.title}</h3>
                      <span className="moodboard_arrow" aria-hidden="true">
                        <span className="moodboard_arrow-icon">↗</span>
                        <span
                          className="moodboard_arrow-icon"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
