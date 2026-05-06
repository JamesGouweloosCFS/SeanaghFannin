import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";

type SiteHeaderProps = {
  /** When true, in-page anchors target the landing route (for /booking). */
  anchorToLanding?: boolean;
};

export function SiteHeader({ anchorToLanding = false }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const base = anchorToLanding || pathname !== "/" ? "/" : "";

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="Carrick Wealth home">
          <BrandLogo variant="blue" size="header" />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link to={`${base}#services`}>Services</Link>
          <Link to="/why-carrick">Why Carrick</Link>
          <Link to="/wealth-journey">Wealth Journey</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/wealthy-her-podcast">Wealthy Her Podcast</Link>
        </nav>
        <Link className="btn btn-primary nav-cta" to="/booking">
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
