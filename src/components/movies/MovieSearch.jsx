import { useEffect, useRef } from "react";
import { useMovies } from "../../hooks/useMovies.js";

/** Buscador del catálogo. Ctrl + K lo enfoca y Escape lo desenfoca. */
export default function MovieSearch({ onSubmit, className = "" }) {
  const { filters, results, setQuery } = useMovies();
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const input = inputRef.current;
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.focus();
        input.select();
      }
      if (event.key === "Escape" && document.activeElement === input) input.blur();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const query = filters.query.trim();
  const count = results.length;
  const status = query
    ? `${count} ${count === 1 ? "película coincide" : "películas coinciden"} con "${query}"`
    : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className={`search-form ${className}`.trim()} role="search" onSubmit={handleSubmit}>
      <label htmlFor="search">Buscar película</label>
      <div className="search-row">
        <input
          ref={inputRef}
          id="search"
          type="search"
          placeholder="🔎 Avengers, Batman, Interstellar..."
          autoComplete="off"
          value={filters.query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn" type="submit">
          Buscar
        </button>
      </div>
      <p className="search-hint">
        Presiona <strong>Ctrl + K</strong> para enfocar el buscador.
      </p>
      <p id="search-status" className="search-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
