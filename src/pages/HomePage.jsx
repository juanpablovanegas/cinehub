import HomeHero from "../components/home/HomeHero.jsx";
import TrendingSection from "../components/home/TrendingSection.jsx";
import PlansPreview from "../components/home/PlansPreview.jsx";
import FaqSection from "../components/home/FaqSection.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

/** Portada: búsqueda, películas en tendencia, planes recientes y preguntas frecuentes. */
export default function HomePage() {
  useDocumentTitle();

  return (
    <>
      <HomeHero />
      <TrendingSection />
      <PlansPreview />
      <FaqSection />
    </>
  );
}
