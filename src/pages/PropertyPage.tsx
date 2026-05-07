import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PropertyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="prop-hero">
          <div className="container">
            <p className="prop-kicker">Property & estate structuring</p>
            <h1 className="prop-title">
              You built it.
              <br />
              Does your structure
              <br />
              <em>reflect that?</em>
            </h1>
            <p className="prop-intro">
              Most people with significant assets have a structure. A trust, a holding company,
              property in various names, offshore investments. Very few have had someone sit with
              them and confirm that the structure actually reflects their intentions, their family,
              and what they want to leave behind.
            </p>
            <p className="prop-position">
              "You have sat in enough meetings, signed enough documents, and deferred to enough
              advisers. At some point, the most valuable thing anyone can offer you is not another
              recommendation. <em>It is clarity.</em>"
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services">
          <div className="service">
            <div className="svc-num">01</div>
            <h3 className="svc-title">Property structuring</h3>
            <p className="svc-body">
              Whether you hold residential, commercial, or agricultural property, the question is
              not just what you own. But how it is held, whose name it's in, and whether that
              structure serves your estate and tax position optimally.
            </p>
            <div className="svc-details">
              <div className="svc-detail">
                <strong>Covers</strong>
                Ownership structures, transfer implications, income optimisation
              </div>
              <div className="svc-detail">
                <strong>Who this is for</strong>
                Property owners, developers, families with multiple assets
              </div>
              <div className="svc-detail">
                <strong>Outcome</strong>
                Clarity on whether your structure reflects your intentions
              </div>
            </div>
          </div>

          <div className="service">
            <div className="svc-num">02</div>
            <h3 className="svc-title">Estate planning</h3>
            <p className="svc-body">
              Estate planning is not about death. It is about ensuring that what you have built
              transfers in the way you intend. To the people you intend. Without unnecessary delay,
              cost, or confusion.
            </p>
            <div className="svc-details">
              <div className="svc-detail">
                <strong>Covers</strong>
                Wills, trusts, estate duty, liquidity planning
              </div>
              <div className="svc-detail">
                <strong>Who this is for</strong>
                Anyone with dependants, significant assets, or a business interest
              </div>
              <div className="svc-detail">
                <strong>Outcome</strong>
                An estate that transfers as you intend, not as circumstances decide
              </div>
            </div>
          </div>

          <div className="service">
            <div className="svc-num">03</div>
            <h3 className="svc-title">Trust structures</h3>
            <p className="svc-body">
              A trust is one of the most powerful tools in wealth planning. And one of the most
              misunderstood. Many people have trusts they don't fully understand, haven't reviewed
              in years, or that no longer reflect their family's current reality.
            </p>
            <div className="svc-details">
              <div className="svc-detail">
                <strong>Covers</strong>
                Trust reviews, beneficiary planning, asset protection
              </div>
              <div className="svc-detail">
                <strong>Who this is for</strong>
                Existing trust holders and those considering trust structures
              </div>
              <div className="svc-detail">
                <strong>Outcome</strong>
                A trust that works for your family. Not just exists for it
              </div>
            </div>
          </div>

          <div className="service">
            <div className="svc-num">04</div>
            <h3 className="svc-title">Succession planning</h3>
            <p className="svc-body">
              Whether you are planning a business succession, a generational wealth transfer, or
              simply ensuring your spouse could manage the financial picture alone. Succession
              planning is about giving the people you love the tools they need, before they need
              them.
            </p>
            <div className="svc-details">
              <div className="svc-detail">
                <strong>Covers</strong>
                Business succession, generational transfer, spousal preparedness
              </div>
              <div className="svc-detail">
                <strong>Who this is for</strong>
                Business owners, HNW families, couples planning long-term
              </div>
              <div className="svc-detail">
                <strong>Outcome</strong>
                A plan that protects the people who matter most
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY NOD */}
        <section className="prop-nod">
          <div className="container">
            <p className="pn-label">A note on certainty</p>
            <p className="pn-text">
              There is a difference between being told your affairs are in order. And <em>knowing</em> they are.
              Seanagh works with clients who are ready to close that gap.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="prop-cta">
          <div className="container">
            <p>Ready to look at your structure together?</p>
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
