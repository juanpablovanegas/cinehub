import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const LINKS = [
  { to: "/home", label: "Inicio" },
  { to: "/movies", label: "Películas" },
  { to: "/my-plans", label: "Mis planes" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav aria-label="Navegación principal">
      <ul className="nav-list">
        {LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to}>{label}</NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/profile">{user ? `👤 ${user.name.split(" ")[0]}` : "Registro"}</NavLink>
        </li>
        <li>
          <NavLink to="/about">Acerca de</NavLink>
        </li>
      </ul>
    </nav>
  );
}
