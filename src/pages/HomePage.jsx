import HomeHero from "../components/home/HomeHero.jsx";
import TrendingSection from "../components/home/TrendingSection.jsx";
import DiscoverSection from "../components/home/DiscoverSection.jsx";
import PlansPreview from "../components/home/PlansPreview.jsx";
import FaqSection from "../components/home/FaqSection.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

/** Portada: búsqueda, tendencias, descubrimientos (API pública), planes y FAQ. */
export default function HomePage() {
  useDocumentTitle();

  return (
    <>
      <HomeHero />
      <TrendingSection />
      <DiscoverSection />
      <PlansPreview />
      <FaqSection />
    </>
  );
}
