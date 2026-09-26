import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoviePoster from "./MoviePoster.jsx";

/** Tarjeta del catálogo: toda la tarjeta abre el detalle (clic, Enter o Espacio). */
export default function MovieCard({ movie, index, favorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const [accent, setAccent] = useState(null);
  const detailPath = `/movie/${movie.id}`;

  const handleClick = (event) => {
    if (event.target.closest("a, button")) return; // los controles internos tienen su propia acción
    navigate(detailPath);
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(detailPath);
    }
  };

  return (
    <article
      className="movie-card movie-enter"
      data-movie-id={movie.id}
      tabIndex={0}
      role="link"
      style={{ "--delay": `${Math.min(index * 35, 700)}ms`, "--card-accent": accent ?? undefined }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <MoviePoster
        movie={movie}
        detailPath={detailPath}
        favorite={favorite}
        onToggleFavorite={onToggleFavorite}
        onAccent={setAccent}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
        </p>
        <div className="movie-rating">★ {movie.rating}</div>
        <p className="movie-description">{movie.description}</p>
        <Link className="movie-card-button" to={detailPath}>
          Ver película →
        </Link>
      </div>
    </article>
  );
}
