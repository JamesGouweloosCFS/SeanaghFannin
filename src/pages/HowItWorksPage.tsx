import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hiw-hero">
          <div className="container">
            <p className="hiw-kicker">The wealth passport journey</p>
            <h1 className="hiw-title">
              From fog to <em>full clarity</em>
            </h1>
            <p className="hiw-intro">
              Everyone who walks through this door is capable and considered. What they are looking
              for is a space where the questions they've been carrying quietly. Sometimes for years.
              Are finally welcome.
            </p>
          </div>
        </section>

        {/* PREAMBLE */}
        <section className="hiw-preamble">
          <div className="hiw-p-block">
            <p className="hiw-p-who">For her</p>
            <p className="hiw-p-text">
              That question is often: "What would I do if I had to manage all of this alone?" Not
              because the answer is beyond them. But because the conversation was never extended to
              them. The wealth existed. The meetings happened. The decisions were made. She was
              simply not the one in the room.
            </p>
          </div>

          <div className="hiw-p-block">
            <p className="hiw-p-who">For him</p>
            <p className="hiw-p-text">
              The question sounds different but lands in the same place: "I should really know this
              by now." The expectation was that wealth and the knowledge of how to manage it would
              arrive together. It rarely does. And so he sits across from an adviser, nods at the
              right moments, signs what is placed in front of him. And privately wonders whether
              any of it is doing what he intended.
            </p>
          </div>

          <div className="hiw-p-block hiw-p-bridge">
            <p className="hiw-p-text hiw-p-italic">
              Nobody asks. Not because the question is wrong. But because asking feels like
              admitting something.
            </p>
          </div>

          <div className="hiw-p-block">
            <p className="hiw-p-text">
              The Wealth Passport journey is designed for exactly this. Not to teach. Not to
              correct. Simply to sit with you, look at what you hold together, and make sure you
              leave understanding what you came in with.
            </p>
          </div>
        </section>

        {/* STAGES */}
        <section className="stages">
          <div className="stage">
            <div className="stage-num">
              <span className="stage-numeral">01</span>
              <div className="stage-line"></div>
            </div>
            <div className="stage-body">
              <p className="stage-tag">The first conversation</p>
              <h3 className="stage-heading">We listen before we lead</h3>
              <p className="stage-text">
                Your first meeting is not a sales pitch. It is a private, confidential conversation
                where we seek to understand your situation, your concerns, and what clarity would
                mean for your life. There is no obligation, no pressure, and no assumptions made
                about what you already know.
              </p>
              <div className="stage-details">
                <div className="detail-chip">
                  <strong>Format</strong>
                  45–60 min private call or in-person
                </div>
                <div className="detail-chip">
                  <strong>Outcome</strong>
                  A clear picture of where you stand
                </div>
                <div className="detail-chip">
                  <strong>Who attends</strong>
                  You and Seanagh only
                </div>
                <div className="detail-chip">
                  <strong>Cost</strong>
                  No charge for the first conversation
                </div>
              </div>
            </div>
          </div>

          <div className="stage">
            <div className="stage-num">
              <span className="stage-numeral">02</span>
              <div className="stage-line"></div>
            </div>
            <div className="stage-body">
              <p className="stage-tag">The passport audit</p>
              <h3 className="stage-heading">A complete map of what you hold</h3>
              <p className="stage-text">
                We work with you to create a comprehensive picture of your financial world.
                Investments, structures, trusts, property, liquidity, income, and any gaps. Many
                clients tell us this is the first time they have seen everything in one place.
              </p>
              <div className="stage-details">
                <div className="detail-chip">
                  <strong>Covers</strong>
                  Assets, liabilities, structures, income
                </div>
                <div className="detail-chip">
                  <strong>Duration</strong>
                  2–3 weeks with your input
                </div>
                <div className="detail-chip">
                  <strong>Delivered as</strong>
                  Your personal Wealth Passport document
                </div>
                <div className="detail-chip">
                  <strong>Includes</strong>
                  Tax overview and liquidity analysis
                </div>
              </div>
            </div>
          </div>

          <div className="stage">
            <div className="stage-num">
              <span className="stage-numeral">03</span>
              <div className="stage-line"></div>
            </div>
            <div className="stage-body">
              <p className="stage-tag">The clarity session</p>
              <h3 className="stage-heading">Understanding how your wealth works</h3>
              <p className="stage-text">
                Once you have your passport, we walk through it together. We explain how each asset
                generates income, what the tax implications are, and where there may be risk or
                opportunity. No nodding required. This session is yours to lead.
              </p>
              <div className="stage-details">
                <div className="detail-chip">
                  <strong>Format</strong>
                  Structured walkthrough, 90 min
                </div>
                <div className="detail-chip">
                  <strong>Goal</strong>
                  Confident understanding, not overwhelm
                </div>
                <div className="detail-chip">
                  <strong>Tools</strong>
                  Plain-language summaries, no jargon
                </div>
                <div className="detail-chip">
                  <strong>Follow-up</strong>
                  Written notes sent within 48 hours
                </div>
              </div>
            </div>
          </div>

          <div className="stage">
            <div className="stage-num">
              <span className="stage-numeral">04</span>
            </div>
            <div className="stage-body">
              <p className="stage-tag">Ongoing partnership</p>
              <h3 className="stage-heading">Advisory that grows with you</h3>
              <p className="stage-text">
                For those who wish to continue, we offer ongoing financial planning, tax
                optimisation, estate planning, and investment advisory. Tailored to clients who
                want to stay informed and in control. Sometimes that means one person. Sometimes it
                means two.
              </p>
              <div className="stage-details">
                <div className="detail-chip">
                  <strong>Services</strong>
                  Tax, investments, estate, expatriate
                </div>
                <div className="detail-chip">
                  <strong>Cadence</strong>
                  Quarterly reviews as a minimum
                </div>
                <div className="detail-chip">
                  <strong>Model</strong>
                  Relationship-based, not transactional
                </div>
                <div className="detail-chip">
                  <strong>Access</strong>
                  Direct line to Seanagh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROMISE STRIP */}
        <section className="promise-strip">
          <div className="promise-item">
            <p className="promise-label">Our promise</p>
            <p className="promise-text">"No question is too basic. No situation is too complicated."</p>
          </div>
          <div className="promise-item">
            <p className="promise-label">Our approach</p>
            <p className="promise-text">
              "We translate complexity into decisions you can make with confidence."
            </p>
          </div>
          <div className="promise-item">
            <p className="promise-label">Our commitment</p>
            <p className="promise-text">
              "Your clarity is not a by-product of our work. It is the work."
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="hiw-cta">
          <div className="container">
            <p>Ready to begin your journey with Seanagh?</p>
            <Link className="btn-dark" to="/booking">
              Book your first conversation
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
