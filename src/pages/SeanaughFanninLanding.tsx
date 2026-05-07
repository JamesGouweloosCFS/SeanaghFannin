import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import passportImage from "@assets/shutterstock_30275155 1 (1).jpg";

export function SeanaughFanninLanding() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="seanagh-hero">
          <div className="hero-left">
            <p className="overline">Seanagh Fannin</p>
            <h1 className="headline">
              Wealth understood
              <br />
              on your own
              <br />
              <em>terms.</em>
            </h1>
            <p className="subhead">
              Financial clarity for women — and men — ready to see the full picture and make
              confident decisions from it.
            </p>
            <div className="eight-words">
              <span className="her">She deserves to know.</span>
              &nbsp;&nbsp;
              <span className="him">So does he.</span>
            </div>
            <div className="cta-row">
              <Link className="btn-primary" to="/booking">
                Request your passport
              </Link>
              <Link to="/how-it-works" className="btn-ghost">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M6 8h5M8.5 6l2.5 2-2.5 2" />
                </svg>
                How it works
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="passport-card">
              <p className="card-label">A Wealth Passport by Seanagh Fannin</p>
              <h2 className="card-title">
                Every financial
                <br />
                partnership eventually
                <br />
                falls to one.
              </h2>
              <p className="card-sub">Clarity is not a luxury. It is a right.</p>
              <div className="card-divider"></div>
              <p className="card-quote">
                For many women, wealth has long been a collective endeavour. A dialogue, not a
                monologue. This passport is designed to help you understand what you have, how it
                works, and what comes next.
              </p>
              <div className="card-stamp">
                <div className="card-stamp-inner">
                  Seanagh
                  <br />
                  Fannin
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND POSITION */}
        <section className="brand-position">
          <div className="container">
            <p className="bp-label">Why people come to Seanagh</p>
            <p className="bp-text">
              Most people with significant wealth have <em>nodded through conversations they didn't fully follow,</em> trusted systems they've never seen, and quietly hoped it would all be fine. Seanagh Fannin is the person you call when you're ready to stop hoping.<em> And start knowing.</em>
            </p>
          </div>
        </section>

        {/* THREE PILLARS */}
        <section className="pillars">
          <div className="container-full">
            <div className="pillar">
              <div className="pillar-num">01</div>
              <div className="pillar-title">Understand what you hold</div>
              <p className="pillar-body">
                A complete, clear picture of your assets, structures, and how they work together.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-num">02</div>
              <div className="pillar-title">Know how it generates income</div>
              <p className="pillar-body">Liquidity, income flows, and day-to-day financial independence. Demystified.</p>
            </div>
            <div className="pillar">
              <div className="pillar-num">03</div>
              <div className="pillar-title">Decide with confidence</div>
              <p className="pillar-body">
                No pressure, no rushing. Just the clarity to move forward on your own authority.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER BAR */}
        <section className="footer-bar">
          <div className="container-full">
            <p>Seanagh Fannin · Private financial advisory · A Carrick Wealth practice</p>
            <Link to="/booking" className="book-link">
              Book a private conversation →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
