"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import { RollingNavLink } from "./InteractiveLinks";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Enquire" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="section is--nav" aria-label="Main navigation">
      <div className="container is--nav">
        <div className="nav_top">
          <div className="nav_side nav_desktop-links">
            {NAV_LINKS.slice(0, 3).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <RollingNavLink
                  key={item.href}
                  href={item.href}
                  className={`nav_link ${active ? "is--current" : ""}`}
                  ariaCurrent={active ? "page" : undefined}
                >
                  {item.label}
                </RollingNavLink>
              );
            })}
          </div>

          <div className="nav_logo-contain">
            <Link
              className="nav_logo"
              href="/"
              aria-label="Dune & Oak home"
            >
              <Logo />
            </Link>
          </div>

          <div className="nav_side is--right nav_desktop-right">
            <RollingNavLink
              href="/contact"
              className={`nav_link nav_enquire-cta ${
                pathname === "/contact" ? "is--current" : ""
              }`}
              ariaCurrent={pathname === "/contact" ? "page" : undefined}
            >
              Enquire
            </RollingNavLink>
          </div>

          <div className="nav_mobile-controls">
            <button
              ref={toggleBtnRef}
              type="button"
              className="nav_menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          className="nav_mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="nav_mobile-drawer-inner">
            <ul className="nav_mobile-list">
              <li>
                <Link
                  href="/"
                  className={`nav_mobile-item ${pathname === "/" ? "is--current" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>00</span>
                  <span>Index</span>
                </Link>
              </li>
              {NAV_LINKS.map((item, idx) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav_mobile-item ${active ? "is--current" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>0{idx + 1}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="nav_mobile-note">
              Dune &amp; Oak — Interior Architecture &amp; Design Studio. Warm residential interiors,
              boutique hospitality, and furniture styling.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
