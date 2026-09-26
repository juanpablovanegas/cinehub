/* =========================================================
   planService — reglas de negocio de los planes (funciones puras).
   La persistencia la hace PlanContext con useLocalStorage.
   ========================================================= */

import { findMovie, toISODate } from "./movieService.js";

export const RSVP_OPTIONS = [
  { key: "yes", label: "Sí", icon: "✅", button: "✅ Sí, voy", className: "status-yes" },
  { key: "maybe", label: "Tal vez", icon: "🤔", button: "🤔 Tal vez", className: "status-maybe" },
  { key: "no", label: "No", icon: "❌", button: "❌ No puedo", className: "status-no" },
];

/** Resumen de la película guardado dentro del plan (como en el prototipo). */
export function toPlanMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    duration: movie.duration,
    rating: movie.rating,
    genres: movie.genre ? [movie.genre] : [],
    image: movie.poster,
  };
}

export function validatePlan({ name = "", organizer = "" }) {
  if (!name.trim()) return { field: "name", message: "Escribe un nombre para el plan." };
  if (!organizer.trim()) return { field: "organizer", message: "Escribe tu nombre." };
  return null;
}

export function buildPlan(selection, form, owner = null, now = new Date()) {
  const organizer = form.organizer.trim();
  return {
    id: `cinehub-${now.getTime()}`,
    name: form.name.trim(),
    organizer,
    ownerEmail: owner?.email ?? null,
    message: form.message.trim(),
    movie: selection.movie,
    cinema: selection.cinema,
    date: selection.date,
    dateISO: selection.dateISO,
    time: selection.time,
    createdAt: now.toISOString(),
    rsvp: { yes: [organizer], maybe: [], no: [] },
  };
}

/** Planes sin dueño (creados antes del login) los puede gestionar cualquiera. */
export function canManagePlan(plan, user) {
  return !plan.ownerEmail || plan.ownerEmail === user?.email;
}

export function getRsvpStatus(plan, person) {
  return RSVP_OPTIONS.find(({ key }) => plan.rsvp?.[key]?.includes(person))?.key ?? null;
}

/** Devuelve un plan nuevo donde `person` solo aparece en la lista `status`. */
export function setRsvp(plan, person, status) {
  const rsvp = {};
  for (const { key } of RSVP_OPTIONS) {
    rsvp[key] = (plan.rsvp?.[key] ?? []).filter((name) => name !== person);
  }
  rsvp[status].push(person);
  return { ...plan, rsvp };
}

/** Planes antiguos sin fecha ISO se consideran próximos (igual que el prototipo). */
export function isUpcoming(plan, today = new Date()) {
  return !plan.dateISO || plan.dateISO >= toISODate(today);
}

export function filterPlans(plans, filter = "all", today = new Date()) {
  const matches = {
    all: () => true,
    upcoming: (plan) => isUpcoming(plan, today),
    past: (plan) => !isUpcoming(plan, today),
  }[filter];
  return plans.filter(matches).reverse(); // los más recientes primero
}

export function getPlanStats(plans) {
  const count = (key) => plans.reduce((total, plan) => total + (plan.rsvp?.[key]?.length ?? 0), 0);
  return { total: plans.length, yes: count("yes"), maybe: count("maybe"), no: count("no") };
}

export function getPlanPoster(plan) {
  return findMovie(plan.movie?.id)?.poster ?? plan.movie?.image ?? "";
}

export function getShareText(plan) {
  return [
    `🍿 ${plan.name}`,
    `🎬 ${plan.movie.title}`,
    `📍 ${plan.cinema.name} - ${plan.cinema.location}`,
    `📅 ${plan.date}`,
    `🕐 ${plan.time}`,
    plan.message,
    "¿Quién se apunta?",
  ].filter(Boolean).join("\n");
}

/* =========================================================
   Votación de película — cuando el grupo no se pone de acuerdo,
   el organizador propone varias candidatas y cada invitado vota.
   `plan.movie` queda en null hasta que se cierra la votación.
   ========================================================= */

/** Plan sin película fija, con una lista de candidatas para votar. */
export function buildPollPlan(selection, candidateMovies, form, owner = null, now = new Date()) {
  const organizer = form.organizer.trim();
  return {
    id: `cinehub-${now.getTime()}`,
    name: form.name.trim(),
    organizer,
    ownerEmail: owner?.email ?? null,
    message: form.message.trim(),
    movie: null,
    cinema: selection.cinema,
    date: selection.date,
    dateISO: selection.dateISO,
    time: selection.time,
    createdAt: now.toISOString(),
    rsvp: { yes: [organizer], maybe: [], no: [] },
    poll: {
      candidates: candidateMovies.map(toPlanMovie),
      votes: {}, // { [person]: movieId } — un voto por persona, se puede cambiar
      isOpen: true,
      winnerId: null,
    },
  };
}

/** Registra (o cambia) el voto de `person` por `movieId`. No muta el plan. */
export function voteForMovie(plan, person, movieId) {
  if (!plan.poll) return plan;
  return { ...plan, poll: { ...plan.poll, votes: { ...plan.poll.votes, [person]: movieId } } };
}

/** Candidatas con su conteo de votos, ordenadas de más a menos votada. */
export function getPollResults(plan) {
  if (!plan.poll) return [];
  const tally = new Map(plan.poll.candidates.map((candidate) => [candidate.id, 0]));
  for (const movieId of Object.values(plan.poll.votes)) {
    if (tally.has(movieId)) tally.set(movieId, tally.get(movieId) + 1);
  }
  return plan.poll.candidates
    .map((candidate) => ({ ...candidate, votes: tally.get(candidate.id) ?? 0 }))
    .sort((a, b) => b.votes - a.votes);
}

/** Cierra la votación: la candidata más votada pasa a ser `plan.movie`. */
export function closePoll(plan) {
  if (!plan.poll?.isOpen) return plan;
  const [winner] = getPollResults(plan);
  if (!winner) return plan;
  const { id, title, year, duration, rating, genres, image } = winner;
  const movie = { id, title, year, duration, rating, genres, image };
  return { ...plan, movie, poll: { ...plan.poll, isOpen: false, winnerId: winner.id } };
}
