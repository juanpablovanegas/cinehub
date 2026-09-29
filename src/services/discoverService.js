/* =========================================================
   discoverService — consumo de una API pública real (Studio Ghibli,
   sin API key) para la sección "Descubre" del inicio. A diferencia de
   movieService (catálogo curado local), esta sí viaja por la red.
   ========================================================= */

const DISCOVER_API = "https://ghibliapi.vercel.app/films";

function toDiscoverMovie(film) {
  return {
    id: film.id,
    title: film.title,
    description: film.description,
    year: film.release_date,
    rating: film.rt_score ? Number(film.rt_score) / 10 : null,
    image: film.image,
  };
}

/** Trae películas desde la API pública. Lanza si la respuesta falla. */
export async function fetchDiscoverMovies(signal) {
  // El CDN de la API cachea la respuesta (con el header CORS del origen que la
  // pidió primero) por URL exacta, sin tener en cuenta el Origin real. Sin este
  // parámetro, un request hecho en desarrollo puede "envenenar" el cache y
  // bloquear por CORS a cualquier otro origen (p. ej. GitHub Pages) después.
  const response = await fetch(`${DISCOVER_API}?_=${Date.now()}`, { signal });
  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }
  const films = await response.json();
  return films.slice(0, 8).map(toDiscoverMovie);
}
