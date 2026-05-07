import { LegalPageLayout } from "./LegalPageLayout";

const PRODUCT_PROVIDERS = [
  "Allan Gray",
  "Ashburton",
  "Boutique Collective Investments",
  "Capital International Group",
  "Capital Platforms",
  "Cavendish Trust",
  "Concept",
  "Discovery",
  "FPI",
  "Hansard",
  "IFGL",
  "iPensions",
  "IVCM",
  "Liberty",
  "MATCO",
  "Momentum",
  "Ninety One",
  "Old Mutual",
  "Old Mutual International",
  "OUTvest",
  "Overseas Trust and Pension",
  "Providence",
  "Quilter",
  "RL360",
  "Sanlam",
  "Sovereign Trust (Guernsey)",
  "Stanlib",
  "Utmost",
  "Wealth Port",
];

export function ConflictOfInterestPage() {
  return (
    <LegalPageLayout
      eyebrow="CONFLICT OF INTEREST"
      title="How we identify, manage and disclose conflicts of interest."
      lead="At Carrick Wealth, we are committed to conducting business in an ethical, transparent and professional manner. Protecting our clients' interests is our highest priority."
      lastUpdated="October 2025"
    >
      <section className="legal-section">
        <h2>What is a conflict of interest?</h2>
        <p>A conflict of interest may arise when Carrick Wealth or its representatives:</p>
        <ul className="bullet-list">
          <li>Do not act objectively in rendering financial services;</li>
          <li>Have a financial or ownership interest that may influence advice; or</li>
          <li>Have a relationship with a third party that could compromise fairness.</li>
        </ul>
        <p>Examples include:</p>
        <ul className="bullet-list">
          <li>Receiving gifts, benefits or hospitality above permitted limits;</li>
          <li>Holding ownership interests in product providers;</li>
          <li>Being incentivised to recommend one product over another.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>How we manage conflicts of interest</h2>
        <ul className="bullet-list">
          <li>
            <strong>Conflict register</strong> — all actual and potential conflicts are recorded and monitored.
          </li>
          <li>
            <strong>Disclosure</strong> — any material conflicts will be disclosed to clients in writing, including the
            nature, value (if applicable) and impact.
          </li>
          <li>
            <strong>Remuneration policy</strong> — our representatives are not incentivised to favour quantity of business
            over quality of advice, prefer one product provider over another, or prefer one product where multiple options
            are available.
          </li>
          <li>
            <strong>No sign-on bonuses</strong> — we do not offer or accept sign-on bonuses.
          </li>
          <li>
            <strong>Training &amp; awareness</strong> — all staff receive training on the FAIS General Code of Conduct and
            COI requirements.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>What we may receive</h2>
        <p>We may only receive or provide financial interest permitted under legislation, such as:</p>
        <ul className="bullet-list">
          <li>Fees for services agreed to in writing with clients;</li>
          <li>Immaterial financial interests (within statutory limits);</li>
          <li>Fair-value payments for legitimate services rendered.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>External relationships</h2>
        <ul className="bullet-list">
          <li>We only contract with reputable product providers and disclose any material business relationships to clients.</li>
          <li>Where benefits or preferred status with product suppliers exist, these will not compromise the objectivity of our advice.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Commitment to clients</h2>
        <ul className="bullet-list">
          <li>We will always put our clients' interests first.</li>
          <li>We will disclose any conflict where relevant, allowing clients to make informed decisions.</li>
          <li>We will decline to act if a conflict cannot be managed in a way that safeguards the client.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Use of third-party service providers</h2>
        <p>
          Carrick Wealth (Pty) Ltd, an authorised Category I Financial Services Provider, makes use of approved third-party
          service providers to support the delivery of discretionary investment management services. These may include,
          where applicable, portfolio administration, execution, technology, data and related support services.
        </p>
        <p>
          All third-party arrangements are subject to appropriate due diligence, formal contractual agreements and ongoing
          oversight. Notwithstanding any outsourcing or third-party involvement, Carrick Wealth retains full responsibility
          and accountability for the discretionary financial services rendered to clients.
        </p>
      </section>

      <section className="legal-section">
        <h2>Product providers</h2>
        <ul className="legal-provider-list">
          {PRODUCT_PROVIDERS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section className="legal-section">
        <h2>Contact us</h2>
        <p>
          This summary is provided for client transparency; the full Conflict of Interest Management Policy of Carrick Wealth
          is available on request. For more information, please contact{" "}
          <a className="text-link" href="mailto:info@carrick-wealth.com">info@carrick-wealth.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
