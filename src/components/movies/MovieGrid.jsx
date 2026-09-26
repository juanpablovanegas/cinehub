import MovieCard from "./MovieCard.jsx";
import { useFavorites } from "../../hooks/useFavorites.js";

export default function MovieGrid({ movies }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div id="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          index={index}
          favorite={isFavorite(movie.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
