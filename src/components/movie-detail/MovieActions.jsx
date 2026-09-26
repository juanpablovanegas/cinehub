import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites.js";
import { useShare } from "../../hooks/useShare.js";
import { appUrl } from "../../utils/share.js";

export default function MovieActions({ movie, onOpenTrailer, onOpenWatch }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const share = useShare();
  const favorite = isFavorite(movie.id);

  const handleShare = () =>
    share({
      title: `${movie.title} — CineHub`,
      text: `Mira ${movie.title} en CineHub.`,
      url: appUrl(`movie/${movie.id}`),
    });

  return (
    <div className="movie-actions">
      <button
        id="trailer-button"
        type="button"
        className="trailer-btn"
        aria-label="Ver tráiler oficial"
        disabled={!movie.trailerKey}
        title={movie.trailerKey ? undefined : "Tráiler no disponible"}
        onClick={onOpenTrailer}
      >
        <span className="trailer-btn-icon" aria-hidden="true">▶</span>
        Ver tráiler
      </button>

      <button
        id="watch-button"
        type="button"
        className="watch-btn"
        aria-label="Ver película en plataformas de streaming"
        onClick={onOpenWatch}
      >
        <span aria-hidden="true">🎬</span>
        Ver película
      </button>

      <Link className="movie-action movie-action-primary" to={`/functions?movie=${movie.id}`}>
        🎟️ Ver funciones
      </Link>

      <button
        type="button"
        className={`movie-action movie-favorite${favorite ? " active" : ""}`}
        aria-pressed={favorite}
        onClick={() => toggleFavorite(movie.id)}
      >
        {favorite ? "♥ En favoritos" : "♡ Añadir a favoritos"}
      </button>

      <button type="button" className="movie-action" onClick={handleShare}>
        ↗ Compartir
      </button>

      <Link className="movie-action" to="/movies">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
