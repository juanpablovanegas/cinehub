import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getMovies } from "../services/movieService.js";

export const MovieContext = createContext(null);

const INITIAL_FILTERS = { query: "", genre: "todas", sort: "default" };

/**
 * Catálogo y filtros compartidos: lo que se escribe en el buscador del
 * inicio sigue aplicado al llegar a /movies, sin pasar props.
 */
export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      try {
        const list = await getMovies();
        if (!active) return;
        setMovies(list);
        setError(null);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMovies();
    return () => {
      active = false;
    };
  }, []);

  const setFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  }, []);

  const value = useMemo(
    () => ({ movies, loading, error, filters, setFilter }),
    [movies, loading, error, filters, setFilter]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
