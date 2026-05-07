import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">RESOURCES</p>
            <h1>Learn, plan, and move forward with conviction.</h1>
            <p className="page-lead">
              Curated education, media, and practical tools to support your wealth journey—whether you are just getting organised or
              refining a long-term strategy.
            </p>
          </div>
        </section>

        <section className="resources section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">START HERE</p>
              <h2>Pick a path that matches where you are today.</h2>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Women's Wealth Journey</h3>
                <p>View the passport-style roadmap with suggested stages and advisor tools.</p>
                <p className="card__link">
                  <Link to="/wealth-journey" className="text-link">
                    Open journey map
                  </Link>
                </p>
              </article>
              <article className="card">
                <h3>Wealthy Her Podcast</h3>
                <p>Practical financial guidance to help women make bold, informed decisions.</p>
                <p className="card__link">
                  <Link to="/wealthy-her-podcast" className="text-link">
                    Open podcast hub
                  </Link>
                </p>
              </article>
              <article className="card">
                <h3>Investing 101 Course</h3>
                <p>Build confidence in investment fundamentals through short, accessible modules.</p>
                <p className="card__link">
                  <a className="text-link" href="#investing-101-detail">
                    Read overview
                  </a>
                </p>
              </article>
              <article className="card">
                <h3>Calculators &amp; Guides</h3>
                <p>Forecast savings needs and scenario-plan your future with easy tools.</p>
                <p className="card__link">
                  <a className="text-link" href="#calculators-detail">
                    Read overview
                  </a>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="investing-101-detail" className="resource-anchor services section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">INVESTING 101</p>
              <h2>Foundations without the jargon.</h2>
            </div>
            <p className="page-lead">
              This course is designed for busy professionals who want a structured path through risk, diversification, fees, and how
              portfolios are built to support goals—not headlines.
            </p>
            <ul className="bullet-list">
              <li>How markets reward patience and discipline over timing</li>
              <li>Reading a portfolio statement with confidence</li>
              <li>Aligning investments with time horizons and cash needs</li>
            </ul>
            <p className="page-lead page-stack">
              <Link to="/booking?source=carrick" className="text-link">
                Ask us when the next cohort opens
              </Link>
            </p>
          </div>
        </section>

        <section id="calculators-detail" className="resource-anchor services section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">CALCULATORS &amp; GUIDES</p>
              <h2>Scenario-plan with simple inputs.</h2>
            </div>
            <p className="page-lead">
              Use guides and calculators to stress-test savings rates, retirement income needs, and major purchase decisions. Pair the
              outputs with a conversation so assumptions match your real tax position and lifestyle.
            </p>
            <p className="page-lead page-stack">
              <Link to="/booking?source=carrick" className="btn btn-primary">
                Book a consultation
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
