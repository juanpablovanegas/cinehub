import { useEffect, useState } from "react";
import { fetchDiscoverMovies } from "../services/discoverService.js";

const CACHE_KEY = "cinehub_discover_movies";

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(movies) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(movies));
  } catch {
    /* localStorage lleno o bloqueado: la sección sigue funcionando sin cache. */
  }
}

/**
 * Trae películas de una API pública al montar el componente.
 * status: "loading" | "success" | "error". fromCache indica que los
 * datos mostrados vienen de localStorage porque la petición falló.
 */
export function useDiscoverMovies() {
  const [state, setState] = useState({ status: "loading", movies: [], fromCache: false, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const movies = await fetchDiscoverMovies(controller.signal);
        writeCache(movies);
        setState({ status: "success", movies, fromCache: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        const cached = readCache();
        if (cached) {
          setState({ status: "success", movies: cached, fromCache: true, error: null });
        } else {
          setState({ status: "error", movies: [], fromCache: false, error: error.message });
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return state;
}
