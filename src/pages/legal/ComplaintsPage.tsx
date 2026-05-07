import { LegalPageLayout } from "./LegalPageLayout";

export function ComplaintsPage() {
  return (
    <LegalPageLayout
      eyebrow="COMPLAINTS PROCEDURE"
      title="If something is not right, we want to know about it."
      lead="At Carrick Wealth (Pty) Ltd, FSP No. 45621, we are committed to handling every complaint fairly, openly and without unnecessary delay — always with your best interests at heart."
      lastUpdated="October 2025"
    >
      <section className="legal-section">
        <h2>Our commitment</h2>
        <ul className="bullet-list">
          <li>Take every complaint seriously and deal with it fairly.</li>
          <li>Give you clear reasons if your complaint cannot be upheld.</li>
          <li>Offer appropriate redress, compensation or goodwill gestures without undue delay.</li>
          <li>Use feedback from complaints to continually improve our services and client outcomes.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>How to lodge a complaint</h2>
        <p>You may lodge a complaint in writing through any of the following channels:</p>
        <ul className="bullet-list">
          <li>
            Email:{" "}
            <a className="text-link" href="mailto:compliance@carrickfs.com">compliance@carrickfs.com</a>
          </li>
        </ul>
        <p>
          If a complaint is initially made telephonically, we will request that you submit the details in writing. When
          submitting a complaint, please include the following information:
        </p>
        <ul className="bullet-list">
          <li>Full name and surname</li>
          <li>ID number / policy number (if applicable)</li>
          <li>Contact details (postal address, telephone, email)</li>
          <li>Name of your financial Wealth Manager</li>
          <li>Product provider and type of product</li>
          <li>Brief details of the complaint</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Acknowledgement of complaint</h2>
        <ul className="bullet-list">
          <li>All complaints will be acknowledged in writing within 24 hours of receipt.</li>
          <li>You will receive a complaint reference number and the contact details of the person assigned to your complaint.</li>
          <li>Complaints are recorded in our internal complaints register.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Resolution process</h2>
        <ul className="bullet-list">
          <li>Complaints will be investigated fairly, transparently and without delay.</li>
          <li>We will attempt to resolve all complaints within 30 business days, depending on the complexity.</li>
          <li>You will be kept updated on progress, and any delays will be explained.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Escalation of complaints</h2>
        <p>
          If you are not satisfied with the outcome, your complaint may be escalated internally for further review. Details of
          this process will be provided to you in writing. If a complaint remains unresolved after 6 weeks, or if you are
          dissatisfied with the outcome, you may refer the matter to the relevant Ombud.
        </p>
      </section>

      <section className="legal-section">
        <h2>External Ombud contact details</h2>
        <div className="legal-card">
          <h3>FAIS Ombud</h3>
          <ul className="bullet-list">
            <li>Postal: P.O. Box 74571, Lynnwood Ridge, 0040</li>
            <li>Tel: 012 762 5000 / 0860 663 247</li>
            <li>
              Email:{" "}
              <a className="text-link" href="mailto:info@faisombud.co.za">info@faisombud.co.za</a>
            </li>
            <li>
              Website:{" "}
              <a className="text-link" href="https://www.faisombud.co.za" target="_blank" rel="noopener noreferrer">
                www.faisombud.co.za
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="legal-section">
        <h2>Contact us</h2>
        <p>
          For transparency, this page provides only a summary. For the full Carrick Wealth Complaints Management Policy,
          please contact{" "}
          <a className="text-link" href="mailto:info@carrick-wealth.com">info@carrick-wealth.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
