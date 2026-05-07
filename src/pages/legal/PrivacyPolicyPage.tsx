import { LegalPageLayout } from "./LegalPageLayout";

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="PRIVACY NOTICE"
      title="How we protect and process your personal information."
      lead="Carrick Wealth (FSP 45621) is committed to protecting your personal information in line with the Protection of Personal Information Act, 2013 (POPIA), the EU General Data Protection Regulation (GDPR) and applicable regulations."
      lastUpdated="October 2025"
    >
      <div className="legal-callout">
        <p>
          By accessing and using this website and/or our services, you provide your express and voluntary consent to the
          processing of your personal information by Carrick on the basis set out in this Privacy Notice. If you do not consent,
          please discontinue use of this website and our services.
        </p>
      </div>

      <section className="legal-section">
        <h2>Introduction</h2>
        <p>
          This Privacy Notice explains how we collect, process, share, and protect your personal information. By using our
          services, engaging with us, or visiting our website, you consent to the processing of your personal information as
          described in this notice.
        </p>
        <p>
          For more detail, please refer to the Carrick Group Privacy Notice and Data Protection Statement, which applies
          across the Group and is available on request.
        </p>
      </section>

      <section className="legal-section">
        <h2>What information we collect</h2>
        <ul className="bullet-list">
          <li>Identity details (name, ID/passport number, date of birth)</li>
          <li>Contact information (address, email, phone number)</li>
          <li>Financial information (bank details, policy and investment numbers)</li>
          <li>Employment or company details</li>
          <li>Online identifiers (cookies, device details, IP address)</li>
          <li>Any correspondence or preferences shared with us</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>How we collect your information</h2>
        <ul className="bullet-list">
          <li>Directly from you (through forms, calls, emails or meetings)</li>
          <li>From third parties with your consent (such as product providers)</li>
          <li>Automatically via our website and digital platforms (cookies, CRM activity)</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Why we process your information</h2>
        <p>We process personal information only for lawful and specific purposes, including:</p>
        <ul className="bullet-list">
          <li>Providing financial and intermediary services</li>
          <li>Meeting our legal and regulatory obligations</li>
          <li>Performing a contract with you</li>
          <li>Protecting your legitimate interests</li>
          <li>Marketing services (only with your consent)</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Lawful basis (GDPR)</h2>
        <p>
          For data subjects in the European Economic Area and the United Kingdom, we rely on one or more of the following
          lawful bases under Article 6 of the GDPR: your consent, the performance of a contract, compliance with a legal
          obligation, the protection of vital interests, and our legitimate interests (where these are not overridden by your
          rights and freedoms).
        </p>
      </section>

      <section className="legal-section">
        <h2>Direct marketing</h2>
        <p>
          We only send direct marketing communications with your explicit consent, as required by POPIA and GDPR. You may
          withdraw your consent at any time by contacting us at{" "}
          <a className="text-link" href="mailto:info@carrick-wealth.com">info@carrick-wealth.com</a> or by using the
          unsubscribe option in any communication.
        </p>
      </section>

      <section className="legal-section">
        <h2>Data retention</h2>
        <p>We keep personal information only as long as necessary to:</p>
        <ul className="bullet-list">
          <li>Fulfil the purposes for which it was collected, or</li>
          <li>Meet legal, contractual, or regulatory obligations.</li>
        </ul>
        <p>Where possible, information may be de-identified for statistical or research purposes.</p>
      </section>

      <section className="legal-section">
        <h2>Your rights</h2>
        <p>You have the right to:</p>
        <ul className="bullet-list">
          <li>Access or request correction or deletion of your personal data (by submitting Form 2 under POPIA)</li>
          <li>Object to processing (by submitting Form 1 under POPIA)</li>
          <li>Restrict or object to processing, and to data portability (under GDPR)</li>
          <li>Withdraw consent at any time, without affecting the lawfulness of processing already carried out</li>
          <li>Lodge a complaint with the Information Regulator of South Africa or your relevant EU/UK supervisory authority</li>
          <li>Be notified if your data is compromised in a breach</li>
        </ul>
        <p>
          To exercise any of these rights, contact{" "}
          <a className="text-link" href="mailto:info@carrick-wealth.com">info@carrick-wealth.com</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>Cookies and website use</h2>
        <p>
          We use cookies to enhance your browsing experience. You can manage your preferences through our cookie banner or
          your browser settings. See our{" "}
          <a className="text-link" href="/legal/cookie-policy">Cookie Policy</a> for full details.
        </p>
      </section>

      <section className="legal-section">
        <h2>Security</h2>
        <p>
          We implement appropriate physical, technical, and organisational safeguards to protect your personal information.
          Where we use third-party service providers, we require them to apply equivalent security standards.
        </p>
      </section>

      <section className="legal-section">
        <h2>Cross-border processing</h2>
        <p>
          Your information may be processed or stored outside South Africa through Carrick Group systems or service
          providers. All cross-border transfers comply with POPIA and, where relevant, GDPR Chapter V — supported by
          appropriate safeguards such as Standard Contractual Clauses or adequacy decisions.
        </p>
      </section>

      <section className="legal-section">
        <h2>Updates to this Privacy Notice</h2>
        <p>
          We may update this notice from time to time. Updates will be published on our website and will take effect upon
          publication.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact us</h2>
        <p>
          This Privacy Notice is a summary prepared for client transparency. The full Carrick Group Privacy Notice and Data
          Protection Statement is available on request. For queries, please contact{" "}
          <a className="text-link" href="mailto:info@carrick-wealth.com">info@carrick-wealth.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
