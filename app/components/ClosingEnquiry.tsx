"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowCta } from "./InteractiveLinks";

export default function ClosingEnquiry() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (
        !line1Ref.current ||
        !line2Ref.current ||
        !ctaRef.current ||
        !sectionRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Heading lines reveal upward through mask
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
        },
        0
      );

      // Reveal CTA shortly afterward
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        0.35
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section is--enquiry-cta"
      id="enquire"
      aria-label="Project enquiry"
    >
      <div className="container">
        <div className="enquiry-unboxed">
          <div className="enquiry-unboxed_left">
            <h2 className="enquiry-unboxed_heading">
              <span className="enquiry-line_wrap">
                <span ref={line1Ref} className="enquiry-line_inner">
                  Your space.
                </span>
              </span>
              <span className="enquiry-line_wrap">
                <span ref={line2Ref} className="enquiry-line_inner">
                  Let’s talk.
                </span>
              </span>
            </h2>
          </div>

          <div ref={ctaRef} className="enquiry-unboxed_actions">
            <ArrowCta
              href="/contact"
              className="btn-architectural enquiry-cta_btn"
            >
              Start an enquiry
            </ArrowCta>
          </div>
        </div>
      </div>
    </section>
  );
}
