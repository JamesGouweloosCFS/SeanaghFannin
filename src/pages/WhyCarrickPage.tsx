import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import lifestyleImage from "@assets/shutterstock_30275155 1 (1).jpg";

export function WhyCarrickPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">WHY CARRICK</p>
            <h1>Wealth planning that respects the full picture of your life.</h1>
            <p className="page-lead">
              Carrick brings global investment capability together with advice that stays personal. You get clarity on what matters
              today, and a strategy that still makes sense when life changes course.
            </p>
          </div>
        </section>

        <section className="services section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">WHAT SETS US APART</p>
              <h2>Technical depth, human context, and a long-term partnership.</h2>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Integrated planning</h3>
                <p>Investments, liquidity, estate considerations, and offshore options are discussed as one plan—not isolated products.</p>
              </article>
              <article className="card">
                <h3>Built for pivotal moments</h3>
                <p>Whether you are scaling a career, restructuring after divorce, inheriting wealth, or planning retirement, we help you act with confidence.</p>
              </article>
              <article className="card">
                <h3>Global reach, direct access</h3>
                <p>Access diversified portfolios and international thinking, with a dedicated team you can reach when decisions cannot wait.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="split section">
          <div className="container split-wrap">
            <div>
              <p className="eyebrow">YOUR NEXT CHAPTER</p>
              <h2>Independence, security, and purpose.</h2>
              <p className="page-lead">
                We believe wealth should fund the life you want—not add complexity. Our role is to translate markets and regulations into
                choices you understand and own.
              </p>
              <p className="script">Wealth is your next chapter.</p>
              <Link to="/booking" className="btn btn-primary">
                Book a consultation
              </Link>
            </div>
            <figure className="split-media">
              <img src={lifestyleImage} alt="" />
            </figure>
          </div>
        </section>

        <section className="cta section" aria-labelledby="why-carrick-cta">
          <div className="container cta-wrap">
            <h2 id="why-carrick-cta">Explore tools and stories while you decide on next steps.</h2>
            <Link className="btn btn-secondary" to="/resources">
              View resources
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
