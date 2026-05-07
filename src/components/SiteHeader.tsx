import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";

type SiteHeaderProps = {
  /** When true, in-page anchors target the landing route (for /booking). */
  anchorToLanding?: boolean;
};

export function SiteHeader({ anchorToLanding = false }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const isSeanagh = ["/", "/how-it-works", "/for-families", "/property", "/letters", "/booking"].some(
    (path) => pathname === path
  );

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="Seanagh Fannin home">
          <BrandLogo variant="blue" size="header" />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {isSeanagh ? (
            <>
              <Link to="/" className={pathname === "/" ? "active" : ""}>
                Home
              </Link>
              <Link to="/how-it-works" className={pathname === "/how-it-works" ? "active" : ""}>
                How It Works
              </Link>
              <Link to="/for-families" className={pathname === "/for-families" ? "active" : ""}>
                For Families
              </Link>
              <Link to="/property" className={pathname === "/property" ? "active" : ""}>
                Property &amp; Estate
              </Link>
              <Link to="/letters" className={pathname === "/letters" ? "active" : ""}>
                Letters
              </Link>
            </>
          ) : (
            <>
              <Link to="/carrick#services">Services</Link>
              <Link to="/why-carrick">Why Carrick</Link>
              <Link to="/wealth-journey">Wealth Journey</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/wealthy-her-podcast">Wealthy Her Podcast</Link>
            </>
          )}
        </nav>
        <Link className="btn btn-primary nav-cta" to="/booking">
          Book {isSeanagh ? "Conversation" : "Consultation"}
        </Link>
      </div>
    </header>
  );
}
