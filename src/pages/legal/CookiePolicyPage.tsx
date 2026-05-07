import { LegalPageLayout } from "./LegalPageLayout";

export function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="COOKIE POLICY"
      title="How we use cookies on this website."
      lead="Carrick Wealth uses cookies to provide you with a more personalised, responsive service and to ensure that our website functions effectively. This Cookie Notice forms part of our Privacy Notice."
      lastUpdated="October 2025"
    >
      <section className="legal-section">
        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the site to recognise your
          device, remember your preferences (such as location, language and display settings), and improve your browsing
          experience.
        </p>
      </section>

      <section className="legal-section">
        <h2>What types of cookies do we use?</h2>
        <ul className="bullet-list">
          <li>
            <strong>Strictly necessary cookies</strong> — required for the website to function (security, log-in, navigation).
          </li>
          <li>
            <strong>Performance and analytics cookies</strong> — help us understand how visitors use the site so we can improve
            it (for example, Google Analytics, Adobe).
          </li>
          <li>
            <strong>Functional cookies</strong> — remember your preferences and settings to make your visits smoother.
          </li>
          <li>
            <strong>Advertising cookies</strong> — may be used (with your consent) to deliver more relevant ads through
            providers such as Google Ads.
          </li>
        </ul>
        <p>
          Cookies may be session-based (deleted when you close your browser) or persistent (remain until expiry or deletion).
        </p>
      </section>

      <section className="legal-section">
        <h2>Why do we use cookies?</h2>
        <ul className="bullet-list">
          <li>Recognise your device and save you re-entering information</li>
          <li>Analyse which pages and features are most popular</li>
          <li>Ensure the website operates securely and efficiently</li>
          <li>Improve our marketing and communications</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Third-party cookies and cross-border use</h2>
        <p>
          We make use of third-party service providers (for example, Google Analytics, Google Ads, Adobe). These providers
          may process your information outside South Africa. Their privacy notices explain how they use data and how you can
          opt out:
        </p>
        <ul className="bullet-list">
          <li>
            <a className="text-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a className="text-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Policy
            </a>
          </li>
          <li>
            <a className="text-link" href="https://www.adobe.com/privacy.html" target="_blank" rel="noopener noreferrer">
              Adobe Privacy
            </a>
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>How to manage cookies</h2>
        <p>
          You can control or delete cookies through our cookie consent banner (shown the first time you visit) or your
          browser settings. Most browsers allow you to block cookies entirely, delete existing ones, or set preferences for
          specific sites. Please note that blocking certain cookies may affect website functionality.
        </p>
        <p>For guidance, visit:</p>
        <ul className="bullet-list">
          <li>
            <a className="text-link" href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">
              AboutCookies.org
            </a>
          </li>
          <li>
            <a className="text-link" href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
              AllAboutCookies.org
            </a>
          </li>
        </ul>
        <p>
          You may change your preferences at any time by clicking the &ldquo;Cookie preferences&rdquo; link in the site footer.
        </p>
      </section>

      <section className="legal-section">
        <h2>Updates to this Cookie Notice</h2>
        <p>
          We may update this Cookie Notice from time to time. Any changes will be posted on this page with a revised date.
          We encourage you to review this notice periodically.
        </p>
      </section>
    </LegalPageLayout>
  );
}
