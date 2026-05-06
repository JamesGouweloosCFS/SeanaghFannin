import { BrandLogo } from "@/components/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div>
          <BrandLogo variant="white" size="footer" alt="Carrick" />
          <p>Suite 1002, The Colosseum, 26 Century Boulevard, Century City, Cape Town</p>
        </div>
        <div>
          <p>+27 (0) 21 201 1000</p>
          <p>info@carrickwealth.com</p>
        </div>
      </div>
    </footer>
  );
}
