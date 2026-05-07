import { LegalPageLayout } from "./LegalPageLayout";

export function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="TERMS OF SERVICE"
      title="The terms governing your use of this website."
      lead="By using this website, you confirm that you have read, understood, and agree to these Terms of Service, which are binding upon you. If you do not agree, you must immediately discontinue use of this website."
      lastUpdated="October 2025"
    >
      <section className="legal-section">
        <h2>Regulatory status</h2>
        <p>
          Carrick Wealth (Pty) Ltd (&ldquo;CW&rdquo;) is an authorised Financial Services Provider licensed by the Financial
          Sector Conduct Authority (FSCA) in South Africa under FSP No. 45621.
        </p>
        <p>
          Carrick Wealth is a wholly owned subsidiary of Carrick Financial Services (Pty) Ltd (CFS), registration number
          2014/102460/07, a company incorporated in South Africa.
        </p>
      </section>

      <section className="legal-section">
        <h2>Regulatory oversight</h2>
        <p>The FSCA is the market conduct regulator for financial services in South Africa. It supervises compliance with:</p>
        <ul className="bullet-list">
          <li>The Financial Advisory and Intermediary Services Act, 2002 (FAIS Act)</li>
          <li>The Financial Intelligence Centre Act, 2001 (FICA)</li>
          <li>Other applicable legislation and regulations</li>
        </ul>
        <p>As a licensed Financial Services Provider, Carrick Wealth is required to:</p>
        <ul className="bullet-list">
          <li>Act honestly, fairly, and with due skill, care and diligence</li>
          <li>Treat clients fairly in accordance with Treating Customers Fairly (TCF) principles</li>
          <li>Maintain accurate and complete records of all transactions and interactions</li>
          <li>Provide clear disclosure of information, including fees, risks and conflicts of interest</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Client relationship</h2>
        <p>
          When engaging with CW, your contractual relationship is directly with Carrick Wealth (Pty) Ltd as the licensed
          Financial Services Provider. Your appointed Wealth Manager will require you to complete a mandate or other
          contractual documentation to ensure your investment instructions and objectives are carried out in accordance with
          applicable regulations.
        </p>
      </section>

      <section className="legal-section">
        <h2>Intellectual property and use of website content</h2>
        <p>
          This website and all material, text, images, graphics, logos and other content are the property of Carrick Wealth
          or Carrick Financial Services, unless otherwise stated. All rights are reserved under South African and
          international intellectual property laws.
        </p>
        <p>
          You may view, download and print website content for personal, informational and non-commercial purposes only,
          provided that:
        </p>
        <ul className="bullet-list">
          <li>You do not alter or modify the content</li>
          <li>You retain all copyright and attribution notices</li>
          <li>You do not use the content for any unlawful purpose</li>
        </ul>
        <p>
          Any trademarks, service marks or logos displayed are the property of Carrick Wealth or CFS and may not be used
          without prior written consent.
        </p>
      </section>

      <section className="legal-section">
        <h2>Disclaimers and limitations of liability</h2>
        <p>
          This website is provided for general informational purposes only. Nothing contained herein constitutes financial,
          legal, tax or investment advice. You should obtain professional advice before making any financial decisions.
        </p>
        <p>
          While every effort has been made to ensure the accuracy of information, Carrick Wealth makes no warranties or
          representations (express or implied) regarding:
        </p>
        <ul className="bullet-list">
          <li>The accuracy, completeness or reliability of the website content</li>
          <li>The website being error-free, secure or uninterrupted</li>
          <li>The website being free from viruses or malicious code</li>
        </ul>
        <p>
          Your use of this website is at your own risk. CW, CFS and their employees, representatives or affiliates shall not
          be liable for any direct, indirect, incidental, consequential or special damages arising out of or related to the
          use of this website.
        </p>
      </section>

      <section className="legal-section">
        <h2>Links to third-party websites</h2>
        <p>
          This website may contain links to third-party websites provided for your convenience. CW and CFS make no
          warranties or representations regarding the accuracy, content or security of such third-party websites and accept
          no liability for your use of them.
        </p>
      </section>

      <section className="legal-section">
        <h2>Applicable law</h2>
        <p>
          These Terms of Service are governed by the laws of the Republic of South Africa. Any disputes arising in relation
          to the use of this website shall be subject to the jurisdiction of the South African courts.
        </p>
        <p>
          Nothing in these Terms of Service limits your right to lodge a complaint with the FAIS Ombud or any other
          competent authority under applicable law.
        </p>
      </section>

      <section className="legal-section">
        <h2>Amendments</h2>
        <p>
          CW may update these Terms of Service at any time without prior notice. Updated versions will be posted on this
          website with a revised effective date. Continued use of this website after such updates constitutes acceptance of
          the revised terms.
        </p>
      </section>
    </LegalPageLayout>
  );
}
