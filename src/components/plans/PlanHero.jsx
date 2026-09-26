import PosterImage from "../common/PosterImage.jsx";
import { getPlanPoster } from "../../services/planService.js";

/** Cabecera del plan. `children` recibe acciones extra (p. ej. editar). */
export default function PlanHero({ plan, children }) {
  const details = [
    ["🎬 Película", plan.movie.title],
    ["📍 Cine", `${plan.cinema.name} · ${plan.cinema.location}`],
    ["📅 Fecha", plan.date],
    ["🕐 Hora", plan.time],
    ["👤 Organizador", plan.organizer],
  ];

  return (
    <section className="plan-hero-card">
      <div className="plan-poster" id="plan-poster">
        <PosterImage src={getPlanPoster(plan)} alt={`Póster de ${plan.movie.title}`} />
      </div>

      <div>
        <span className="plan-status">🍿 PLAN DE CINE</span>
        <h1 id="plan-title">{plan.name}</h1>
        <p id="plan-message" className="plan-message">
          {plan.message || "¡Nos vemos en el cine! 🍿"}
        </p>

        <div className="plan-details">
          {details.map(([label, value]) => (
            <div key={label} className="detail-box">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}
