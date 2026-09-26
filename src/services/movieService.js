/* =========================================================
   movieService — consultas y transformación del catálogo.
   Devuelve Promises (misma firma que tendrá la API del backend),
   así los componentes no cambian cuando los datos sean remotos.
   ========================================================= */

import { movies as catalog } from "../data/movies.js";
import trailerKeys from "../data/trailerKeys.json" with { type: "json" };
import { CINEMAS, MONTHS, SHOW_TIMES, WEEKDAYS } from "../data/showtimes.js";

const BASE_URL = import.meta.env?.BASE_URL ?? "/";

// Enlaces antiguos (pelicula.html?id=spiderman) → id actual del catálogo.
const ALIASES = { spiderman: "spider-man-no-way-home", batman: "the-batman" };

export const GENRE_FILTERS = [
  { value: "todas", label: "Todas" },
  { value: "marvel", label: "🦸 Marvel" },
  { value: "dc", label: "🦇 DC" },
  { value: "accion", label: "💥 Acción" },
  { value: "ciencia", label: "🚀 Ciencia ficción" },
  { value: "aventura", label: "🌎 Aventura" },
  { value: "animacion", label: "🧸 Animación" },
];

export const SORT_OPTIONS = [
  { value: "default", label: "Orden original" },
  { value: "rating", label: "⭐ Mejor calificadas" },
  { value: "year", label: "🆕 Más recientes" },
  { value: "title", label: "🔤 Nombre A-Z" },
];

const SORTERS = {
  rating: (a, b) => b.rating - a.rating,
  year: (a, b) => Number(b.year) - Number(a.year),
  title: (a, b) => a.title.localeCompare(b.title, "es"),
};

function toMovie([id, data]) {
  return {
    id,
    ...data,
    poster: data.poster ? `${BASE_URL}${data.poster}` : "",
    backdrop: data.backdrop ? `${BASE_URL}${data.backdrop}` : "",
    trailerKey: trailerKeys[id] ?? null,
  };
}

const MOVIES = Object.entries(catalog).map(toMovie);

export function getMovies() {
  return Promise.resolve(MOVIES);
}

/** Búsqueda síncrona tolerante: alias antiguos y mayúsculas. */
export function findMovie(rawId) {
  const id = String(rawId ?? "").toLowerCase().trim();
  const resolved = ALIASES[id] ?? id;
  return MOVIES.find((movie) => movie.id === resolved) ?? null;
}

export function getMovieById(id) {
  return Promise.resolve(findMovie(id));
}

function matchesGenre(movie, genre) {
  const universe = (movie.universe ?? "").toLowerCase();
  if (genre === "todas") return true;
  if (genre === "marvel") return universe.includes("marvel");
  if (genre === "dc") return universe === "dc";
  if (genre === "ciencia") return movie.genreFilter === "ciencia-ficcion";
  return movie.genreFilter === genre;
}

/** Busca, filtra y ordena sin mutar la lista original. */
export function queryMovies(movies, { query = "", genre = "todas", sort = "default" } = {}) {
  const text = query.toLowerCase().trim();
  const result = movies.filter(
    (movie) => movie.title.toLowerCase().includes(text) && matchesGenre(movie, genre)
  );
  return SORTERS[sort] ? [...result].sort(SORTERS[sort]) : result;
}

export function getTrendingMovies(movies, limit = 10) {
  return [...movies].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

const pad = (n) => String(n).padStart(2, "0");
export const toISODate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Cines, próximos `days` días y horarios para elegir una función. */
export function getShowtimes(from = new Date(), days = 4) {
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const weekday = WEEKDAYS[date.getDay()];
    const month = MONTHS[date.getMonth()];
    return {
      iso: toISODate(date),
      weekday: weekday.slice(0, 3).toUpperCase(),
      day: String(date.getDate()),
      month: month.slice(0, 3).toUpperCase(),
      label: `${weekday} ${date.getDate()} de ${month}`,
    };
  });
  return { cinemas: CINEMAS, dates, times: SHOW_TIMES };
}
