import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useToast } from "../hooks/useToast.js";

/** Destino de ProtectedRoute cuando no hay sesión. Reutiliza AuthForm en modo "login". */
export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from ?? "/dashboard";
  useDocumentTitle("Iniciar sesión");

  const handleSuccess = (user) => {
    showToast(`👋 Hola de nuevo, ${user.name}`);
    navigate(redirectTo, { replace: true });
  };

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return (
    <section id="login" className="signup signup-section">
      <div className="section-inner">
        <p className="eyebrow">BIENVENIDO DE NUEVO</p>
        <h2>Inicia sesión</h2>
        <p className="auth-notice" role="status">
          🔒 Necesitas iniciar sesión para entrar a tu dashboard.
        </p>
        <AuthForm mode="login" onSuccess={handleSuccess} />
        <p>
          ¿Todavía no tienes cuenta? <Link to="/profile">Regístrate aquí</Link>.
        </p>
      </div>
    </section>
  );
}
