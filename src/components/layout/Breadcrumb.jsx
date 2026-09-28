import { useLocation } from "react-router-dom";

const LABELS = {
  home: "Inicio",
  movies: "Películas",
  movie: "Detalle de película",
  functions: "Elegir función",
  "create-plan": "Crear plan",
  plan: "Plan",
  "my-plans": "Mis planes",
  profile: "Perfil",
  login: "Iniciar sesión",
  dashboard: "Dashboard",
  about: "Acerca de",
};

/** Indica visualmente en qué ruta está el usuario, usando useLocation(). */
export default function Breadcrumb() {
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean)[0] ?? "home";
  const label = LABELS[segment] ?? "Página no encontrada";

  return (
    <p className="breadcrumb" aria-live="polite">
      CineHub <span aria-hidden="true">›</span> <strong>{label}</strong>
    </p>
  );
}
