import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function ForFamiliesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="fam-hero">
          <div className="container">
            <div className="fam-hero-inner">
              <div>
                <p className="fam-kicker">For families — together and apart</p>
                <h1 className="fam-title">
                  The conversation
                  <br />
                  your family
                  <br />
                  hasn't had <em>yet.</em>
                </h1>
                <p className="fam-intro">
                  Most advisers have a relationship with one person in a family. Usually the one who
                  called first. Seanagh works differently. Whether you come alone or together, the
                  goal is always the same. That everyone who matters understands what exists and
                  what happens next.
                </p>
              </div>
              <div>
                <div className="fam-eight">
                  <span className="her">She deserves to know.</span>
                  <br />
                  <span className="him">So does he.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE AUDIENCES */}
        <section className="audiences">
          <div className="audience">
            <p className="aud-tag">For her</p>
            <h3 className="aud-heading">The woman who needs to understand what she holds</h3>
            <p className="aud-emotion">
              "I've always trusted that everything is taken care of. But I wouldn't know where to
              begin if I had to."
            </p>
            <p className="aud-body">
              Whether you're preparing quietly on your own, navigating a life transition, or simply
              ready to understand the financial world around you. Seanagh creates a private,
              unhurried space to do exactly that. No assumptions. No jargon. No pressure to already
              know.
            </p>
          </div>

          <div className="audience">
            <p className="aud-tag">For him</p>
            <h3 className="aud-heading">The man who wants certainty, not just reassurance</h3>
            <p className="aud-emotion">
              "My adviser tells me everything is in order. But if I'm honest, I'm not entirely sure
              what that means."
            </p>
            <p className="aud-body">
              Significant wealth comes with an unspoken expectation that you understand it
              completely. Most people don't. And almost no one asks. Seanagh works with men who
              want to move from reassurance to genuine certainty. About their structure, their
              estate, and what they're actually leaving behind.
            </p>
          </div>

          <div className="audience">
            <p className="aud-tag">For both</p>
            <h3 className="aud-heading">Couples who want to plan together. And be prepared apart</h3>
            <p className="aud-emotion">
              "We have an adviser. But I'm not sure we've ever really sat down together and
              understood everything as a couple."
            </p>
            <p className="aud-body">
              Seanagh works with couples who want the same clarity. Together. And who understand
              that being prepared as a couple means ensuring both of you could navigate the
              financial picture alone, if you ever had to.
            </p>
          </div>
        </section>

        {/* ADVISER GAP */}
        <section className="adviser-gap">
          <div className="container">
            <p className="ag-label">The door most advisers forget to open</p>
            <p className="ag-quote">
              Most advisers manage wealth. <em>Few explain it.</em>
            </p>
            <p className="ag-body">
              There is a particular gap that exists in almost every HNW family in Southern Africa.
              The husband has an adviser. The adviser has a relationship with the husband. But when
              circumstances change. Through loss, divorce, or simply the passage of time. She is
              often alone in a room full of documents she has never been shown. Seanagh opens that
              door before it becomes urgent. For both of them.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="fam-cta">
          <div className="container">
            <p>Ready to have the conversation your family needs?</p>
            <Link className="btn-dark" to="/booking">
              Book a conversation with Seanagh
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
