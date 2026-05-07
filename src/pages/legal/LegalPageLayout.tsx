import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  lastUpdated?: string;
  children: ReactNode;
};

export function LegalPageLayout({ eyebrow, title, lead, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="inner-page legal-page">
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {lead && <p>{lead}</p>}
            {lastUpdated && <p className="legal-meta">Last updated: {lastUpdated}</p>}
          </div>
        </section>

        <section className="section">
          <div className="container legal-content">{children}</div>
        </section>

        <section className="section legal-related">
          <div className="container">
            <p className="eyebrow">RELATED POLICIES</p>
            <ul className="legal-related__list">
              <li>
                <Link className="text-link" to="/legal/privacy-policy">Privacy Notice</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/complaints">Complaints Procedure</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/conflict-of-interest">Conflict of Interest</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/treating-customers-fairly">Treating Customers Fairly</Link>
              </li>
              <li>
                <Link className="text-link" to="/legal/paia">PAIA Manual</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
