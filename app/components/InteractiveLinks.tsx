"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

function canUseHoverAnimation(): boolean {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return finePointer && !reducedMotion;
}

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ==========================================================================
   1. TEXT LINK — GROWING UNDERLINE (scaleX, 0.35s, power2.out)
   Retains a thin baseline and animates a separate accent line from a short
   segment to full width without layout shift, clear of letter descenders.
   ========================================================================== */

interface TextLinkProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  variant?: "editorial" | "subtle";
}

export function TextLink({
  href,
  onClick,
  className = "",
  children,
  ariaLabel,
  variant = "editorial",
}: TextLinkProps) {
  const accentRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const initialScale = variant === "editorial" ? 0.24 : 0.18;

  useLayoutEffect(() => {
    const accentEl = accentRef.current;
    if (!accentEl) return;

    if (isReducedMotion()) {
      gsap.set(accentEl, { scaleX: initialScale, transformOrigin: "left center" });
      return;
    }

    gsap.set(accentEl, { scaleX: initialScale, transformOrigin: "left center" });

    const tl = gsap.timeline({ paused: true });
    tl.to(accentEl, {
      scaleX: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [initialScale]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.play();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.reverse();
  };

  const handleFocus = () => {
    if (isReducedMotion()) return;
    tlRef.current?.play();
  };

  const handleBlur = () => {
    if (isReducedMotion()) return;
    tlRef.current?.reverse();
  };

  const combinedClass = `text-link-grow text-link-grow--${variant} ${className}`.trim();

  const inner = (
    <>
      <span className="text-link_label">{children}</span>
      <span className="text-link_baseline" aria-hidden="true" />
      <span ref={accentRef} className="text-link_accent" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={combinedClass}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={combinedClass}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {inner}
    </button>
  );
}

/* ==========================================================================
   2. ARROW CTA / PRIMARY BUTTON — DIAGONAL ARROW LOOP (0.40s, power2.inOut)
   Fixed-size overflow-hidden arrow wrapper. Current arrow exits top-right
   while an identical arrow enters from bottom-left with a short stagger.
   ========================================================================== */

interface ArrowCtaProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function ArrowCta({
  href,
  type = "button",
  onClick,
  className = "btn-architectural",
  children,
  ariaLabel,
}: ArrowCtaProps) {
  const primaryArrowRef = useRef<HTMLSpanElement>(null);
  const cloneArrowRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const primaryEl = primaryArrowRef.current;
    const cloneEl = cloneArrowRef.current;
    if (!primaryEl || !cloneEl) return;

    gsap.set(primaryEl, { xPercent: 0, yPercent: 0 });
    gsap.set(cloneEl, { xPercent: -135, yPercent: 135 });

    if (isReducedMotion()) {
      return;
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(
      primaryEl,
      {
        xPercent: 135,
        yPercent: -135,
        duration: 0.34,
        ease: "power2.inOut",
      },
      0
    ).fromTo(
      cloneEl,
      { xPercent: -135, yPercent: 135 },
      {
        xPercent: 0,
        yPercent: 0,
        duration: 0.34,
        ease: "power2.inOut",
      },
      0.06
    );

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.play();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.reverse();
  };

  const handleFocus = () => {
    if (isReducedMotion()) return;
    tlRef.current?.play();
  };

  const handleBlur = () => {
    if (isReducedMotion()) return;
    tlRef.current?.reverse();
  };

  const combinedClass = `arrow-cta ${className}`.trim();

  const inner = (
    <>
      <span className="arrow-cta_label">{children}</span>
      <span className="arrow-cta_box" aria-hidden="true">
        <span
          ref={primaryArrowRef}
          className="arrow-cta_icon arrow-cta_icon--primary"
        >
          ↗
        </span>
        <span
          ref={cloneArrowRef}
          className="arrow-cta_icon arrow-cta_icon--clone"
        >
          ↗
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={combinedClass}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={combinedClass}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {inner}
    </button>
  );
}

/* ==========================================================================
   3. NAVIGATION — ROLLING LABEL (0.35s, power2.inOut)
   Clips label in a fixed-height wrapper. On hover/focus, moves visible text
   downward out of view by its measured height while an aria-hidden duplicate
   enters from above and settles into place.
   ========================================================================== */

interface RollingNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | undefined;
  onClick?: () => void;
}

export function RollingNavLink({
  href,
  children,
  className = "",
  ariaLabel,
  ariaCurrent,
  onClick,
}: RollingNavLinkProps) {
  const primaryRef = useRef<HTMLSpanElement>(null);
  const cloneRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const primaryEl = primaryRef.current;
    const cloneEl = cloneRef.current;
    if (!primaryEl || !cloneEl) return;

    const getTravelDistance = () => {
      const measured = primaryEl.getBoundingClientRect().height;
      if (measured > 0) return measured;
      const computed = parseFloat(window.getComputedStyle(primaryEl).lineHeight);
      return Number.isFinite(computed) && computed > 0 ? computed : 20;
    };

    gsap.set(primaryEl, { y: 0 });
    gsap.set(cloneEl, { y: () => -getTravelDistance() });

    if (isReducedMotion()) {
      return;
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(
      primaryEl,
      {
        y: () => getTravelDistance(),
        duration: 0.35,
        ease: "power2.inOut",
      },
      0
    ).fromTo(
      cloneEl,
      { y: () => -getTravelDistance() },
      {
        y: 0,
        duration: 0.35,
        ease: "power2.inOut",
      },
      0
    );

    tlRef.current = tl;

    const handleResize = () => {
      if (!tlRef.current) return;
      const progress = tlRef.current.progress();
      tlRef.current.invalidate();
      if (progress === 0) {
        gsap.set(primaryEl, { y: 0 });
        gsap.set(cloneEl, { y: -getTravelDistance() });
      } else if (progress === 1) {
        gsap.set(primaryEl, { y: getTravelDistance() });
        gsap.set(cloneEl, { y: 0 });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      tlRef.current = null;
    };
  }, [children]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.play();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canUseHoverAnimation()) return;
    tlRef.current?.reverse();
  };

  const handleFocus = () => {
    if (isReducedMotion()) return;
    tlRef.current?.play();
  };

  const handleBlur = () => {
    if (isReducedMotion()) return;
    tlRef.current?.reverse();
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={`rolling-nav-link ${className}`.trim()}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span className="rolling-nav_mask">
        <span ref={primaryRef} className="rolling-nav_line">
          {children}
        </span>
        <span
          ref={cloneRef}
          className="rolling-nav_line rolling-nav_line--clone"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
