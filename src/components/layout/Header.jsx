import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useTheme } from "../../hooks/useTheme.js";
import { useOnlineStatus } from "../../hooks/useOnlineStatus.js";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const online = useOnlineStatus();

  return (
    <header className="site-header">
      <Link className="logo" to="/home">
        CineHub
      </Link>

      <Navbar />

      <span className="connectivity-badge" role="status" aria-live="polite">
        {online ? "🟢 En línea" : "🔴 Sin conexión"}
      </span>

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
