import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BOOKING_PAGE_PUBLIC_URL, MICROSOFT_BOOKINGS_URL, shouldUseBookingsIframe } from "@/config/booking";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import bookingImage from "@assets/shutterstock_30275155 (1).png";

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  hearAbout: string;
  situations: string[];
  assetValue: string;
  priorities: string[];
  priorityNote: string;
  format: string;
  timeOfDay: string;
  earliestDate: string;
  timezone: string;
  considerations: string;
};

export function BookingPage() {
  const [params] = useSearchParams();
  const source = params.get("source");

  if (source === "carrick") {
    return <CarrickBooking />;
  }

  return <SeanaughBooking />;
}

function CarrickBooking() {
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

const initialFormData: BookingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  hearAbout: "",
  situations: [],
  assetValue: "",
  priorities: [],
  priorityNote: "",
  format: "",
  timeOfDay: "",
  earliestDate: "",
  timezone: "",
  considerations: "",
};

const STEP_LABELS = ["About you", "Your situation", "Your priorities", "Your meeting"];

function SeanaughBooking() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<BookingFormData>(initialFormData);

  const update = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: "situations" | "priorities", v: string) =>
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(v) ? prev[key].filter((x) => x !== v) : [...prev[key], v],
    }));

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    try {
      localStorage.setItem("seanagh_booking_request", JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
      }));
    } catch {
      // Storage unavailable; submission still proceeds
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <SiteHeader />
        <main>
          <section className="sb-confirm">
            <div className="container">
              <div className="sb-confirm-card">
                <div className="sb-confirm-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="24" cy="24" r="22" />
                    <path d="M14 24l8 8 14-16" />
                  </svg>
                </div>
                <h1 className="sb-confirm-title">Your request has been received</h1>
                <p className="sb-confirm-body">
                  Thank you, {data.firstName || "for reaching out"}. Seanagh will be in touch within
                  one business day to confirm a time that works for both of you.
                </p>
                <Link to="/" className="btn-dark">
                  Return to home
                </Link>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="sb-hero">
          <div className="container">
            <p className="sb-tag">Financial clarity</p>
            <p className="sb-kicker">Book a private conversation</p>
            <h1 className="sb-title">Your first conversation starts here</h1>
            <div className="sb-eight">
              <span className="her">She deserves to know.</span>
              <span className="him">So does he.</span>
            </div>
            <p className="sb-body">
              Everything you share is strictly confidential. Seanagh reads each request personally
              and responds within one business day.
            </p>
            <ul className="sb-assurance">
              <li>Strictly confidential</li>
              <li>No obligation</li>
              <li>Response within one business day</li>
              <li>In-person or virtual</li>
              <li>Direct contact with Seanagh</li>
            </ul>
          </div>
        </section>

        <section className="sb-form-section">
          <div className="container">
            <ol className="sb-progress" aria-label="Form progress">
              {STEP_LABELS.map((label, i) => (
                <li
                  key={label}
                  className={`sb-step${i === step ? " current" : ""}${i < step ? " done" : ""}`}
                >
                  <span className="sb-step-num">{i + 1}</span>
                  <span className="sb-step-label">{label}</span>
                </li>
              ))}
            </ol>

            <div className="sb-form">
              {step === 0 && <Step1 data={data} update={update} />}
              {step === 1 && <Step2 data={data} update={update} toggle={toggle} />}
              {step === 2 && <Step3 data={data} update={update} toggle={toggle} />}
              {step === 3 && <Step4 data={data} update={update} />}

              <div className="sb-actions">
                {step > 0 && (
                  <button type="button" className="btn-ghost" onClick={back}>
                    ← Back
                  </button>
                )}
                {step < 3 ? (
                  <button type="button" className="btn-primary" onClick={next}>
                    Continue →
                  </button>
                ) : (
                  <button type="button" className="btn-primary" onClick={submit}>
                    Submit request
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

type StepProps = {
  data: BookingFormData;
  update: <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => void;
};

type StepWithToggleProps = StepProps & {
  toggle: (key: "situations" | "priorities", v: string) => void;
};

function Step1({ data, update }: StepProps) {
  return (
    <div className="sb-step-content">
      <h2 className="sb-step-title">About you</h2>
      <div className="sb-grid-2">
        <div className="sb-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="country">Country of residence</label>
          <input
            id="country"
            type="text"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="hearAbout">How did you hear about us</label>
          <input
            id="hearAbout"
            type="text"
            value={data.hearAbout}
            onChange={(e) => update("hearAbout", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

const SITUATIONS = [
  { value: "first_time", label: "Managing wealth independently for the first time" },
  { value: "divorce", label: "Going through, or recently completed, divorce" },
  { value: "loss", label: "Widowed or experienced significant loss" },
  { value: "estate", label: "Want to understand estate, ensure family prepared" },
  { value: "inheritance", label: "Inherited a significant asset" },
  { value: "expat", label: "Expat or planning relocation" },
  { value: "business", label: "Run a business, want to align personal and business affairs" },
  { value: "clarity", label: "Want to understand my position more clearly" },
  { value: "partner", label: "Want to come with my partner" },
];

const ASSET_RANGES = [
  "Under R5 million",
  "R5 million – R10 million",
  "R10 million – R25 million",
  "R25 million – R50 million",
  "R50 million – R100 million",
  "Over R100 million",
];

function Step2({ data, toggle, update }: StepWithToggleProps) {
  return (
    <div className="sb-step-content">
      <h2 className="sb-step-title">Your situation</h2>
      <p className="sb-step-intro">Which best describes your situation? Select all that apply.</p>
      <div className="sb-checkboxes">
        {SITUATIONS.map((s) => (
          <label key={s.value} className={`sb-checkbox${data.situations.includes(s.value) ? " checked" : ""}`}>
            <input
              type="checkbox"
              checked={data.situations.includes(s.value)}
              onChange={() => toggle("situations", s.value)}
            />
            <span>{s.label}</span>
          </label>
        ))}
      </div>

      <div className="sb-field">
        <label htmlFor="assetValue">Approximate value of total assets</label>
        <select
          id="assetValue"
          value={data.assetValue}
          onChange={(e) => update("assetValue", e.target.value)}
        >
          <option value="">Select range</option>
          {ASSET_RANGES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const PRIORITIES = [
  { value: "ownership", label: "Understanding ownership and structure" },
  { value: "liquidity", label: "Liquidity and income day-to-day" },
  { value: "tax", label: "Tax planning" },
  { value: "estate", label: "Estate and succession" },
  { value: "property", label: "Property structuring" },
  { value: "investment", label: "Investment growth" },
  { value: "expat", label: "Expatriate planning" },
  { value: "guidance", label: "Uncertain, need guidance" },
];

function Step3({ data, toggle, update }: StepWithToggleProps) {
  return (
    <div className="sb-step-content">
      <h2 className="sb-step-title">Your priorities</h2>
      <p className="sb-step-intro">What matters most to you right now?</p>
      <div className="sb-checkboxes">
        {PRIORITIES.map((p) => (
          <label key={p.value} className={`sb-checkbox${data.priorities.includes(p.value) ? " checked" : ""}`}>
            <input
              type="checkbox"
              checked={data.priorities.includes(p.value)}
              onChange={() => toggle("priorities", p.value)}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </div>

      <div className="sb-field">
        <label htmlFor="priorityNote">Anything you would like Seanagh to know?</label>
        <textarea
          id="priorityNote"
          rows={4}
          value={data.priorityNote}
          onChange={(e) => update("priorityNote", e.target.value)}
        />
      </div>
    </div>
  );
}

function Step4({ data, update }: StepProps) {
  return (
    <div className="sb-step-content">
      <h2 className="sb-step-title">Your meeting</h2>

      <div className="sb-field">
        <label>Preferred format</label>
        <div className="sb-radio-group">
          {[
            { value: "video", label: "Video call" },
            { value: "jnb", label: "In-person Johannesburg" },
            { value: "ct", label: "In-person Cape Town" },
            { value: "phone", label: "Phone call" },
          ].map((opt) => (
            <label key={opt.value} className={`sb-radio${data.format === opt.value ? " checked" : ""}`}>
              <input
                type="radio"
                name="format"
                value={opt.value}
                checked={data.format === opt.value}
                onChange={(e) => update("format", e.target.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="sb-field">
        <label>Preferred time of day</label>
        <div className="sb-radio-group">
          {[
            { value: "morning", label: "Morning" },
            { value: "midday", label: "Midday" },
            { value: "afternoon", label: "Afternoon" },
            { value: "flexible", label: "Flexible" },
          ].map((opt) => (
            <label key={opt.value} className={`sb-radio${data.timeOfDay === opt.value ? " checked" : ""}`}>
              <input
                type="radio"
                name="timeOfDay"
                value={opt.value}
                checked={data.timeOfDay === opt.value}
                onChange={(e) => update("timeOfDay", e.target.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="sb-grid-2">
        <div className="sb-field">
          <label htmlFor="earliestDate">Earliest available date</label>
          <input
            id="earliestDate"
            type="date"
            value={data.earliestDate}
            onChange={(e) => update("earliestDate", e.target.value)}
          />
        </div>
        <div className="sb-field">
          <label htmlFor="timezone">Time zone</label>
          <select
            id="timezone"
            value={data.timezone}
            onChange={(e) => update("timezone", e.target.value)}
          >
            <option value="">Select</option>
            <option value="SAST">SAST (South Africa)</option>
            <option value="GMT">GMT</option>
            <option value="BST">BST</option>
            <option value="EST">EST</option>
            <option value="GST">GST (Gulf)</option>
            <option value="AEST">AEST (Australia)</option>
          </select>
        </div>
      </div>

      <div className="sb-field">
        <label htmlFor="considerations">Scheduling considerations</label>
        <textarea
          id="considerations"
          rows={3}
          value={data.considerations}
          onChange={(e) => update("considerations", e.target.value)}
        />
      </div>
    </div>
  );
}
