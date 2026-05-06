import { Link } from "react-router-dom";
import { MoneyIsBlock } from "@/components/MoneyIsBlock";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import lifestyleImage from "@assets/shutterstock_30275155 1 (1).jpg";

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <MoneyIsBlock />

        <section id="services" className="services section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">WHAT WE DO</p>
              <h2>Strategic advice built around your real life.</h2>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Financial Planning</h3>
                <p>Create a clear roadmap for retirement, legacy, liquidity, and long-term resilience.</p>
              </article>
              <article className="card">
                <h3>Wealth Management</h3>
                <p>Access globally diversified portfolios shaped around your goals and risk profile.</p>
              </article>
              <article className="card">
                <h3>Pivotal Moments</h3>
                <p>Navigate major life transitions such as divorce, inheritance, career changes, or loss.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="why-us" className="split section">
          <div className="container split-wrap">
            <div>
              <p className="eyebrow">WHY CARRICK</p>
              <h2>Confidence in planning. Freedom in living.</h2>
              <p>
                Carrick combines technical expertise with deeply personal advisory relationships. We design wealth solutions that support
                independence, security, and purpose across every phase of your journey.
              </p>
              <p className="script">Wealth is your next chapter.</p>
              <p>
                <Link to="/why-carrick" className="text-link">
                  Why Carrick
                </Link>
                {" · "}
                <Link to="/booking" className="text-link">
                  Speak to a Wealth Manager
                </Link>
              </p>
            </div>
            <figure className="split-media">
              <img src={lifestyleImage} alt="" />
            </figure>
          </div>
        </section>

        <section id="resources" className="resources section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">RESOURCES</p>
              <h2>Learn, plan, and move forward with conviction.</h2>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Women's Wealth Journey</h3>
                <p>A stage-by-stage itinerary designed around pivotal moments in a woman's financial life.</p>
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
                  <Link to="/resources#investing-101-detail" className="text-link">
                    Read overview
                  </Link>
                </p>
              </article>
              <article className="card">
                <h3>Calculators &amp; Guides</h3>
                <p>Forecast savings needs and scenario-plan your future with easy tools.</p>
                <p className="card__link">
                  <Link to="/resources#calculators-detail" className="text-link">
                    Read overview
                  </Link>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="cta section" aria-labelledby="cta-heading">
          <div className="container cta-wrap">
            <h2 id="cta-heading">Ready to make your money work harder for your goals?</h2>
            <Link className="btn btn-primary" to="/booking">
              Book Your Consultation
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
