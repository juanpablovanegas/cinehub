import { useMemo } from "react";
import Button from "../common/Button.jsx";
import MovieGrid from "../movies/MovieGrid.jsx";
import { useMovies } from "../../hooks/useMovies.js";
import { useReveal } from "../../hooks/useReveal.js";
import { getTrendingMovies } from "../../services/movieService.js";

export default function TrendingSection() {
  const { movies, loading } = useMovies();
  const [ref, revealClass] = useReveal();
  const trending = useMemo(() => getTrendingMovies(movies, 10), [movies]);

  return (
    <section ref={ref} id="peliculas" className={`catalog-section ${revealClass}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">EN TENDENCIA</p>
          <h2>Populares</h2>
        </div>
        <p>Las más populares de CineHub. Explora el catálogo completo de Marvel, DC, ciencia ficción, acción, aventura y animación.</p>
      </div>

      {loading ? <p id="results-count">Cargando películas...</p> : <MovieGrid movies={trending} />}

      <div className="section-cta">
        <Button variant="primary" to="/movies">
          Ver catálogo completo →
        </Button>
      </div>
    </section>
  );
}
