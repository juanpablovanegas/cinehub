import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useTheme } from "../../hooks/useTheme.js";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <Link className="logo" to="/home">
        CineHub
      </Link>

      <Navbar />

      <button
        id="theme-toggle"
        className="theme-button"
        type="button"
        aria-label="Cambiar tema"
        aria-pressed={isDark}
        onClick={toggleTheme}
      >
        {isDark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
      </button>
    </header>
  );
}
