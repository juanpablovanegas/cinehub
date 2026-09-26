import EmptyState from "../components/common/EmptyState.jsx";
import MovieFilters from "../components/movies/MovieFilters.jsx";
import MovieGrid from "../components/movies/MovieGrid.jsx";
import MovieSearch from "../components/movies/MovieSearch.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useMovies } from "../hooks/useMovies.js";
import { useReveal } from "../hooks/useReveal.js";

/** Catálogo completo con búsqueda, filtros y orden. */
export default function MoviesPage() {
  const { results, loading } = useMovies();
  const [ref, revealClass] = useReveal();
  const plural = results.length === 1 ? "" : "s";
  useDocumentTitle("Películas");

  return (
    <section ref={ref} id="peliculas" className={`catalog-section ${revealClass}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">EXPLORAR CATÁLOGO</p>
          <h2>Películas</h2>
        </div>
        <p>Explora películas de Marvel, DC, ciencia ficción, acción, aventura y animación.</p>
      </div>

      <MovieSearch className="catalog-search" />
      <MovieFilters />

      <p id="results-count" aria-live="polite">
        {loading ? (
          "Cargando películas..."
        ) : (
          <>
            <strong>{results.length}</strong> película{plural} encontrada{plural}
          </>
        )}
      </p>

      {!loading && results.length > 0 && <MovieGrid movies={results} />}
      {!loading && results.length === 0 && (
        <EmptyState id="no-results" title="No encontramos esa película">
          Intenta con otro nombre, género o personaje.
        </EmptyState>
      )}
    </section>
  );
}
