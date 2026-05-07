import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function LettersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="letters-hero">
          <div className="container">
            <p className="letters-kicker">Two letters</p>
            <h1 className="letters-title">
              The conversations
              <br />
              most people never
              <br />
              <em>quite have.</em>
            </h1>
            <p className="letters-intro">
              These are not documents. They are starting points. Read the one that speaks to where
              you are. Or share the one that speaks to someone you love.
            </p>
          </div>
        </section>

        {/* LETTERS */}
        <section className="letters-grid">
          <div className="letter-card dark">
            <div className="lc-label">A letter to her husband</div>
            <div className="lc-salutation">To the man who has built something worth protecting.</div>
            <div className="lc-body">
              <p>You are not reading this because something has gone wrong.</p>
              <p>You are reading this because someone who loves you wanted you to.</p>
              <p>
                She is not afraid of you, or your finances, or the future. She is afraid of a
                morning she can picture too clearly. A morning when she is alone, and the calls
                need to be made, and she doesn't know who to call. She is afraid not of grief, but
                of confusion arriving at the same time as grief. That is a particular kind of
                cruelty, and it is entirely preventable.
              </p>
              <p>
                She is not asking you to talk about death. <span className="lc-gold">She is asking you to talk about what you've built.</span> Where
                it lives. How it works. What it would take for her to feel certain. Not just
                reassured, but actually certain. That she would know what to do.
              </p>
              <p>
                You have worked hard. You have, in all likelihood, an adviser. You have structures
                in place. But has anyone ever sat with both of you. Together. And made sure she
                understood it as well as you do?
              </p>
              <p>
                Most advisers never think to ask. That is not a criticism. It is simply a gap. And
                it is the gap that Seanagh Fannin has spent her career learning to close.
              </p>
              <p>
                This is not a conversation about fear. <span className="lc-gold">It is a conversation about love. Expressed practically.</span> The most useful
                thing you can do for the person you love is to make sure that, if the day ever
                comes, she is not left guessing.
              </p>
              <p>
                One conversation. That is all she is asking for. And if you find, in that
                conversation, that there are things you also didn't fully understand. <em>You will be in very good company.</em>
              </p>
            </div>
            <div className="lc-close">With respect for what you've built, and care for who you're building it for.</div>
            <div className="lc-sig">Seanagh Fannin</div>
            <div className="lc-cta">
              <Link className="lc-btn-dark" to="/booking">
                Book a conversation →
              </Link>
            </div>
          </div>

          <div className="letter-card light">
            <div className="lc-label">A letter to his family</div>
            <div className="lc-salutation">
              To the man who built something. And quietly suspects there is more he should
              understand about it.
            </div>
            <div className="lc-body">
              <p>You have built something. Or inherited something. Or found yourself, through the particular circumstances of your life, responsible for something substantial.</p>
              <p>
                And somewhere along the way, the expectation formed. In you, or around you. <em>That you should already understand it completely.</em>
              </p>
              <p>
                So you sat in the meetings. You listened to the presentations. You asked enough
                questions to seem engaged, but not too many that you might appear lost. You signed
                what was placed in front of you. You trusted the people who seemed to know more
                than you did. <em>And quietly, privately, you wondered whether any of it was doing what you intended.</em>
              </p>
              <p>
                <em>"I should really know this by now."</em> Seanagh hears this from almost every client. Men and
                women alike. It is never said by people who don't care. <span className="lc-gold-light">It is said by people who care deeply, and who have simply never been in a room where the conversation was built around them.</span>
              </p>
              <p>
                And certainty. Real certainty, not reassurance. Is what Seanagh's practice is built
                around. Not teaching. Not advising from across the table. Not another meeting where
                you nod and sign and leave with less certainty than you arrived with. Simply sitting
                with you, looking at what you hold, and making sure you leave understanding it in a
                way you never quite have before.
              </p>
              <p><em>Asking is not admitting something. It is the beginning of knowing.</em></p>
            </div>
            <div className="lc-close">With no judgment, and a great deal of respect.</div>
            <div className="lc-sig">Seanagh Fannin</div>
            <div className="lc-cta">
              <Link className="lc-btn" to="/booking">
                Book a conversation →
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="letters-footer">
          <div className="container-full">
            <p className="lf-text">Both letters are yours to keep. And to share.</p>
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
