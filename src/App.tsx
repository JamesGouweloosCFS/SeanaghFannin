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
    </Routes>
  );
}
