import { useNavigate } from "react-router-dom";
import MovieSearch from "../movies/MovieSearch.jsx";

const FEATURES = ["🎬 +100 películas", "⭐ Ratings", "❤️ Favoritos", "🔥 Marvel", "🚀 Ciencia ficción", "🌙 Dark mode"];

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <p className="eyebrow">CINEHUB · EXPERIENCIA DE CINE</p>
        <h1>
          ¿QUÉ QUIERES
          <br />
          <span>VER HOY?</span>
        </h1>
        <p className="hero-copy">
          Descubre más de 100 películas, encuentra tus favoritas y prepara tu próxima salida al cine.
        </p>

        {/* La búsqueda vive en MovieContext: al enviar, /movies ya muestra los resultados. */}
        <MovieSearch onSubmit={() => navigate("/movies")} />

        <div className="hero-features">
          {FEATURES.map((feature) => (
            <span key={feature} className="hero-feature">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
