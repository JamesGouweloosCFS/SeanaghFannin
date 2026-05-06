import { BOOKING_PAGE_PUBLIC_URL, MICROSOFT_BOOKINGS_URL, shouldUseBookingsIframe } from "@/config/booking";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import bookingImage from "@assets/shutterstock_30275155 (1).png";

export function BookingPage() {
  const bookingsEmbed = shouldUseBookingsIframe();

  return (
    <>
      <SiteHeader anchorToLanding />
      <main className="booking-main">
        <section className="booking-hero">
          <div className="container">
            <p className="eyebrow">COMPLIMENTARY CONSULTATION</p>
            <h1>Book your private wealth planning session.</h1>
            <p>Meet with a Carrick adviser to define your goals and receive a tailored next-step strategy.</p>
          </div>
        </section>

        <section className="section">
          <div className="container booking-layout">
            <aside className="booking-panel" aria-labelledby="expect-heading">
              <figure>
                <img src={bookingImage} alt="" />
              </figure>
              <h2 id="expect-heading">What to expect</h2>
              <ul>
                <li>45-minute discovery call with a wealth manager</li>
                <li>Review of your current financial position and priorities</li>
                <li>Clear recommendations on planning and investment actions</li>
              </ul>
              <p className="booking-note">All consultations are confidential and obligation-free.</p>
            </aside>

            <div className="booking-embed-wrap">
              <h2 className="booking-embed-heading">Choose a time</h2>
              <p className="booking-embed-intro">
                {bookingsEmbed
                  ? "Select an available slot below. The calendar is hosted securely by Microsoft."
                  : "Continue to Microsoft Bookings to pick a slot. If the calendar does not appear in-page, add this page’s URL to your Microsoft 365 Bookings allowed sites, then redeploy or refresh."}
              </p>
              {bookingsEmbed ? (
                <div className="booking-embed">
                  <iframe
                    title="Book an appointment with Carrick Wealth"
                    src={MICROSOFT_BOOKINGS_URL}
                    width="100%"
                    height="100%"
                    scrolling="yes"
                  />
                </div>
              ) : (
                <div className="booking-open-card">
                  <a
                    className="btn btn-primary booking-open-btn"
                    href={MICROSOFT_BOOKINGS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open booking calendar
                  </a>
                  <p className="booking-embed-note">
                    Allow this page in Microsoft Bookings (parent site for the embed):{" "}
                    <a className="text-link" href={BOOKING_PAGE_PUBLIC_URL}>
                      {BOOKING_PAGE_PUBLIC_URL}
                    </a>
                    . On Firebase Hosting ({BOOKING_PAGE_PUBLIC_URL.replace("/booking", "")}) the in-page calendar loads automatically when
                    Microsoft permits framing. Set <code className="booking-code">VITE_BOOKINGS_EMBED=true</code> in{" "}
                    <code className="booking-code">.env.local</code> to force the iframe locally, or{" "}
                    <code className="booking-code">VITE_BOOKINGS_EMBED=false</code> to always use a new tab.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
