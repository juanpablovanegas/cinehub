import { useState } from "react";
import { Link } from "react-router-dom";
import { extractPalette } from "../../utils/palette.js";
import { fallbackPoster } from "../../utils/poster.js";

/** Póster de la tarjeta: estado, botón de favorito y vista previa al pasar el mouse. */
export default function MoviePoster({ movie, detailPath, favorite, onToggleFavorite, onAccent }) {
  const [src, setSrc] = useState(movie.poster);

  const handleLoad = () => extractPalette(src).then((palette) => onAccent(palette.primary));

  const handleFavorite = (event) => {
    event.stopPropagation();
    onToggleFavorite(movie.id);
  };

  return (
    <div className="movie-poster-wrapper">
      <img
        src={src}
        alt={`Portada de ${movie.title}`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={() => setSrc(fallbackPoster(movie))}
      />

      {movie.status && (
        <span className="movie-status" data-status={movie.status}>
          {movie.status}
        </span>
      )}

      <button
        type="button"
        className={`favorite-btn${favorite ? " is-favorite" : ""}`}
        aria-label={`Añadir ${movie.title} a favoritos`}
        aria-pressed={favorite}
        onClick={handleFavorite}
      >
        {favorite ? "♥" : "♡"}
      </button>

      <div className="movie-card-overlay">
        <div className="card-overlay-meta" aria-hidden="true">
          <p className="card-overlay-title">{movie.title}</p>
          <div className="card-overlay-badges">
            <span className="card-overlay-rating">★ {movie.rating}</span>
            <span className="card-overlay-genre">{movie.genre}</span>
          </div>
        </div>
        <div className="card-overlay-actions">
          <Link className="card-overlay-btn card-overlay-trailer" to={`${detailPath}?autotrailer=1`}>
            <span aria-hidden="true">▶</span> Tráiler
          </Link>
          <Link className="card-overlay-btn" to={detailPath}>
            <span aria-hidden="true">🎬</span> Ver película
          </Link>
        </div>
      </div>
    </div>
  );
}
