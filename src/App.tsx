import { Route, Routes } from "react-router-dom";
import { BookingPage } from "./pages/BookingPage";
import { LandingPage } from "./pages/LandingPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { WealthJourneyPage } from "./pages/WealthJourneyPage";
import { WealthyHerPodcastPage } from "./pages/WealthyHerPodcastPage";
import { WhyCarrickPage } from "./pages/WhyCarrickPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/why-carrick" element={<WhyCarrickPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/wealth-journey" element={<WealthJourneyPage />} />
      <Route path="/wealthy-her-podcast" element={<WealthyHerPodcastPage />} />
    </Routes>
  );
}
