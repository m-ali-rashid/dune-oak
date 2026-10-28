import Link from "next/link";
import Logo from "../Logo";
import { RollingNavLink } from "./InteractiveLinks";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer_top">
          <div className="site-footer_brand">
            <Link href="/" className="site-footer_logo" aria-label="Dune & Oak home">
              <Logo />
            </Link>
          </div>

          <div className="site-footer_columns">
            <div className="site-footer_col">
              <p className="site-footer_heading">Navigation</p>
              <ul className="site-footer_list">
                <li><RollingNavLink href="/" className="site-footer_link">Index</RollingNavLink></li>
                <li><RollingNavLink href="/projects" className="site-footer_link">Projects</RollingNavLink></li>
                <li><RollingNavLink href="/studio" className="site-footer_link">Studio</RollingNavLink></li>
                <li><RollingNavLink href="/services" className="site-footer_link">Services</RollingNavLink></li>
              </ul>
            </div>

            <div className="site-footer_col">
              <p className="site-footer_heading">Disciplines</p>
              <ul className="site-footer_list">
                <li><RollingNavLink href="/projects?category=Residential" className="site-footer_link">Residential</RollingNavLink></li>
                <li><RollingNavLink href="/projects?category=Hospitality" className="site-footer_link">Hospitality</RollingNavLink></li>
                <li><RollingNavLink href="/projects?category=Styling" className="site-footer_link">Styling</RollingNavLink></li>
              </ul>
            </div>

            <div className="site-footer_col">
              <p className="site-footer_heading">Contact</p>
              <ul className="site-footer_list">
                <li><RollingNavLink href="/contact" className="site-footer_link">Start an enquiry</RollingNavLink></li>
                <li><RollingNavLink href="mailto:studio@duneandoak.com" className="site-footer_link">studio@duneandoak.com</RollingNavLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer_bottom">
          <p>© {new Date().getFullYear()} Dune &amp; Oak. All rights reserved.</p>
          <div className="site-footer_bottom-links">
            <RollingNavLink href="/projects" className="site-footer_link">Projects</RollingNavLink>
            <RollingNavLink href="/contact" className="site-footer_link">Enquire</RollingNavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
