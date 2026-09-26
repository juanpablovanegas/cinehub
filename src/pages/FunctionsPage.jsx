import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import Button from "../components/common/Button.jsx";
import BookingSummary from "../components/functions/BookingSummary.jsx";
import SelectedMovie from "../components/functions/SelectedMovie.jsx";
import ShowtimeStep from "../components/functions/ShowtimeStep.jsx";
import { CinemaOptions, DateOptions, TimeOptions } from "../components/functions/ShowtimeOptions.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useMovie } from "../hooks/useMovie.js";
import { usePlans } from "../hooks/usePlans.js";
import { getShowtimes } from "../services/movieService.js";
import { toPlanMovie } from "../services/planService.js";

/** Paso 1 del flujo de plan: elegir cine, fecha y hora (/functions?movie=id). */
export default function FunctionsPage() {
  const [searchParams] = useSearchParams();
  const { movie, notFound } = useMovie(searchParams.get("movie") || "interstellar");
  const { selectShowtime } = usePlans();
  const navigate = useNavigate();
  const [showtimes] = useState(() => getShowtimes());
  const [choice, setChoice] = useState({ cinema: null, date: null, time: null });
  const choose = (key) => (value) => setChoice((current) => ({ ...current, [key]: value }));
  useDocumentTitle(movie ? `Funciones de ${movie.title}` : "Funciones");

  const handleContinue = () => {
    selectShowtime({
      movie: toPlanMovie(movie),
      cinema: choice.cinema,
      date: choice.date.label,
      dateISO: choice.date.iso,
      time: choice.time,
    });
    navigate("/create-plan");
  };

  return (
    <div className="showtimes-page">
      <div className="showtimes-container">
        <Link to="/movies" className="back-link">← Volver al catálogo</Link>

        {notFound && (
          <EmptyState title="Película no encontrada" action={<Button variant="primary" to="/movies">Ver catálogo</Button>}>
            Selecciona una película desde el catálogo para consultar sus funciones.
          </EmptyState>
        )}

        {movie && (
          <>
            <SelectedMovie movie={movie} />
            <ShowtimeStep number="01" kicker="PRIMER PASO" title="Elige un cine">
              <CinemaOptions cinemas={showtimes.cinemas} selected={choice.cinema} onSelect={choose("cinema")} />
            </ShowtimeStep>
            <ShowtimeStep number="02" kicker="SEGUNDO PASO" title="Selecciona una fecha">
              <DateOptions dates={showtimes.dates} selected={choice.date} onSelect={choose("date")} />
            </ShowtimeStep>
            <ShowtimeStep number="03" kicker="TERCER PASO" title="Elige un horario">
              <TimeOptions times={showtimes.times} selected={choice.time} onSelect={choose("time")} />
            </ShowtimeStep>
            <BookingSummary movie={movie} {...choice} onContinue={handleContinue} />
          </>
        )}
      </div>
    </div>
  );
}
