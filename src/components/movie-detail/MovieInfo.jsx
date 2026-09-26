/** Ficha de la película. `children` (las acciones) va entre las etiquetas y los datos extra. */
export default function MovieInfo({ movie, children }) {
  const meta = [`📅 ${movie.year}`, `🎬 ${movie.genre}`, `⏱️ ${movie.duration}`];
  const extra = [
    ["Director", movie.director || "No disponible"],
    ["Universo", movie.universe || "CineHub"],
    ["Calidad", movie.quality || "HD"],
  ];

  return (
    <div className="movie-info">
      <div className="movie-kicker">{movie.genre}</div>
      <h1 id="movie-title" className="movie-title">
        {movie.title}
      </h1>

      <div className="movie-meta">
        {meta.map((item) => (
          <span key={item} className="movie-meta-item">
            {item}
          </span>
        ))}
        <span className="movie-meta-item movie-rating">⭐ {movie.rating}</span>
      </div>

      <p className="movie-description">{movie.description}</p>

      <div className="movie-tags">
        {movie.tags?.map((tag) => (
          <span key={tag} className="movie-tag">
            {tag}
          </span>
        ))}
      </div>

      {children}

      <div className="movie-extra">
        {extra.map(([label, value]) => (
          <div key={label} className="movie-extra-card">
            <span className="movie-extra-label">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
