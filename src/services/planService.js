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
