import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import MovieGrid from "../components/movies/MovieGrid.jsx";
import PlanCard from "../components/plans/PlanCard.jsx";
import PlanStats from "../components/plans/PlanStats.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useFavorites } from "../hooks/useFavorites.js";
import { useMovies } from "../hooks/useMovies.js";
import { usePlans } from "../hooks/usePlans.js";

/** Ruta protegida: solo accesible con sesión iniciada (ver ProtectedRoute). */
export default function DashboardPage() {
  const { user } = useAuth();
  const { movies } = useMovies();
  const { favorites } = useFavorites();
  const { plans } = usePlans();
  useDocumentTitle("Dashboard");

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));
  const ownPlans = plans.filter((plan) => plan.ownerEmail === user.email).reverse();
  const explore = <Button variant="primary" to="/movies">Explorar películas</Button>;

  return (
    <section className="catalog-section dashboard">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TU ESPACIO</p>
          <h2>Hola, {user.name.split(" ")[0]} 👋</h2>
        </div>
        <p>Tus películas favoritas y los planes que organizas, en un solo lugar.</p>
      </div>

      <PlanStats plans={ownPlans} />

      <h3 className="dashboard-title">❤️ Tus favoritas ({favoriteMovies.length})</h3>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <EmptyState icon="💔" title="Aún no tienes favoritas" action={explore}>
          Marca películas con ♥ desde el catálogo.
        </EmptyState>
      )}

      <h3 className="dashboard-title">🍿 Planes que organizas ({ownPlans.length})</h3>
      {ownPlans.length > 0 ? (
        <div className="plans-list">
          {ownPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🎟️" title="Aún no organizas planes" action={explore}>
          Elige una película y una función para invitar a tus amigos.
        </EmptyState>
      )}
    </section>
  );
}
