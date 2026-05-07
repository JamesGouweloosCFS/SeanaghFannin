import { Route, Routes } from "react-router-dom";
import { BookingPage } from "./pages/BookingPage";
import { SeanaughFanninLanding } from "./pages/SeanaughFanninLanding";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { ForFamiliesPage } from "./pages/ForFamiliesPage";
import { PropertyPage } from "./pages/PropertyPage";
import { LettersPage } from "./pages/LettersPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { WealthJourneyPage } from "./pages/WealthJourneyPage";
import { WealthyHerPodcastPage } from "./pages/WealthyHerPodcastPage";
import { WhyCarrickPage } from "./pages/WhyCarrickPage";
import { LandingPage } from "./pages/LandingPage";
import { PrivacyPolicyPage } from "./pages/legal/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/legal/CookiePolicyPage";
import { TermsOfServicePage } from "./pages/legal/TermsOfServicePage";
import { ComplaintsPage } from "./pages/legal/ComplaintsPage";
import { ConflictOfInterestPage } from "./pages/legal/ConflictOfInterestPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SeanaughFanninLanding />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/for-families" element={<ForFamiliesPage />} />
      <Route path="/property" element={<PropertyPage />} />
      <Route path="/letters" element={<LettersPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/why-carrick" element={<WhyCarrickPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/wealth-journey" element={<WealthJourneyPage />} />
      <Route path="/wealthy-her-podcast" element={<WealthyHerPodcastPage />} />
      <Route path="/carrick" element={<LandingPage />} />
      <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/legal/cookie-policy" element={<CookiePolicyPage />} />
      <Route path="/legal/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/legal/complaints" element={<ComplaintsPage />} />
      <Route path="/legal/conflict-of-interest" element={<ConflictOfInterestPage />} />
    </Routes>
  );
}
