import EmptyState from "../common/EmptyState.jsx";
import { useDiscoverMovies } from "../../hooks/useDiscoverMovies.js";
import { useReveal } from "../../hooks/useReveal.js";

/** Sección alimentada por una API pública real (fetch + async/await + cache offline). */
export default function DiscoverSection() {
  const { status, movies, fromCache, error } = useDiscoverMovies();
  const [ref, revealClass] = useReveal();

  return (
    <section ref={ref} id="descubre" className={`catalog-section discover-section ${revealClass}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">DESCUBRE</p>
          <h2>Clásicos de animación</h2>
        </div>
        <p>Traídos en vivo desde una API pública, para que también descubras algo fuera del catálogo de CineHub.</p>
      </div>

      {status === "loading" && (
        <div className="discover-loading" role="status" aria-label="Cargando descubrimientos">
          <span className="discover-spinner" aria-hidden="true" />
          <p>Cargando desde la API...</p>
        </div>
      )}

      {status === "error" && (
        <EmptyState icon="📡" title="No pudimos cargar las películas">
          Intenta nuevamente en unos segundos. Detalle: {error}
        </EmptyState>
      )}

      {status === "success" && (
        <>
          {fromCache && (
            <p className="discover-cache-banner" role="status">
              📦 Showing saved data — no se pudo conectar con la API, esto es lo último que guardamos.
            </p>
          )}
          <div className="discover-grid">
            {movies.map((movie) => (
              <article key={movie.id} className="discover-card">
                <img src={movie.image} alt={movie.title} loading="lazy" />
                <div className="discover-card-body">
                  <h3>{movie.title}</h3>
                  <p className="discover-meta">
                    {movie.year} {movie.rating ? `· ★ ${movie.rating.toFixed(1)}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
