/* Chequeo mínimo de la lógica pura: `npm test` (node:test, sin dependencias). */
import { test } from "node:test";
import assert from "node:assert/strict";
import { findMovie, getMovies, getShowtimes, queryMovies } from "./movieService.js";
import {
  buildPollPlan,
  closePoll,
  filterPlans,
  getPlanStats,
  getPollResults,
  getRsvpStatus,
  hasPlanErrors,
  isUpcoming,
  setRsvp,
  validatePlan,
  validatePlanFields,
  voteForMovie,
} from "./planService.js";
import { validateForm } from "../utils/validation.js";

test("catálogo: buscar, filtrar y ordenar", async () => {
  const movies = await getMovies();
  assert.equal(movies.length, 40);
  assert.deepEqual(queryMovies(movies), movies, "sin filtros conserva el orden original");
  assert.ok(queryMovies(movies, { genre: "marvel" }).every((m) => m.universe.includes("Marvel")));
  assert.ok(queryMovies(movies, { genre: "dc" }).every((m) => m.universe === "DC"));
  assert.deepEqual(queryMovies(movies, { query: "  BATMAN " }).map((m) => m.id), ["the-batman"]);
  const byTitle = queryMovies(movies, { sort: "title" }).map((m) => m.title);
  assert.deepEqual(byTitle, [...byTitle].sort((a, b) => a.localeCompare(b, "es")));
  const byRating = queryMovies(movies, { sort: "rating" });
  assert.ok(byRating[0].rating >= byRating.at(-1).rating);
  assert.equal(findMovie("SpiderMan").id, "spider-man-no-way-home", "alias legacy");
  assert.equal(findMovie("no-existe"), null);
});

test("funciones: próximos días con etiqueta en español", () => {
  const { dates } = getShowtimes(new Date(2026, 7, 21), 2);
  assert.deepEqual(dates.map((d) => d.label), ["Viernes 21 de agosto", "Sábado 22 de agosto"]);
  assert.equal(dates[1].weekday, "SÁB");
});

test("planes: RSVP, fechas, filtros y estadísticas", () => {
  const plan = { id: "p1", dateISO: "2026-09-20", rsvp: { yes: ["Ana"], maybe: [], no: [] } };
  const moved = setRsvp(plan, "Ana", "no");
  assert.deepEqual(moved.rsvp, { yes: [], maybe: [], no: ["Ana"] });
  assert.equal(getRsvpStatus(moved, "Ana"), "no");
  assert.deepEqual(plan.rsvp.yes, ["Ana"], "no muta el plan original");

  const today = new Date(2026, 8, 25);
  const future = { id: "p2", dateISO: "2026-09-26", rsvp: { yes: ["Luis"], maybe: ["Eva"], no: [] } };
  assert.equal(isUpcoming(plan, today), false);
  assert.equal(isUpcoming({ id: "legacy" }, today), true, "planes legacy sin fecha ISO");
  assert.deepEqual(filterPlans([plan, future], "upcoming", today).map((p) => p.id), ["p2"]);
  assert.deepEqual(filterPlans([plan, future], "all", today).map((p) => p.id), ["p2", "p1"]);
  assert.deepEqual(getPlanStats([moved, future]), { total: 2, yes: 1, maybe: 1, no: 1 });
  assert.equal(validatePlan({ name: " ", organizer: "x" }).field, "name");
  assert.equal(validatePlan({ name: "Cine", organizer: "Ana" }), null);
});

test("planes: validación inline por campo (campo vacío + longitud mínima)", () => {
  assert.deepEqual(validatePlanFields({ name: "", organizer: "" }), {
    name: "Escribe un nombre para el plan.",
    organizer: "Escribe tu nombre.",
  });
  const tooShort = validatePlanFields({ name: "Ab", organizer: "A" });
  assert.ok(tooShort.name.includes("al menos 3"));
  assert.ok(tooShort.organizer.includes("al menos 2"));
  assert.equal(hasPlanErrors(tooShort), true);

  const valid = validatePlanFields({ name: "Cine", organizer: "Ana" });
  assert.deepEqual(valid, { name: "", organizer: "" });
  assert.equal(hasPlanErrors(valid), false);
});

test("votación de película: votar, contar y cerrar", () => {
  const selection = { cinema: { name: "Cine X", location: "Chía" }, date: "26 sep", dateISO: "2026-09-26", time: "20:00" };
  const candidates = [
    { id: "dune", title: "Dune", genre: "Ciencia ficción", poster: "dune.jpg" },
    { id: "it", title: "It", genre: "Terror", poster: "it.jpg" },
  ];
  const plan = buildPollPlan(selection, candidates, { name: "Cine viernes", organizer: "Ana", message: "" });
  assert.equal(plan.movie, null);
  assert.equal(plan.poll.isOpen, true);
  assert.deepEqual(plan.poll.candidates.map((c) => c.id), ["dune", "it"]);

  let voted = voteForMovie(plan, "Ana", "it");
  voted = voteForMovie(voted, "Luis", "it");
  voted = voteForMovie(voted, "Eva", "dune");
  assert.deepEqual(plan.poll.votes, {}, "no muta el plan original");

  const results = getPollResults(voted);
  assert.deepEqual(results.map((r) => [r.id, r.votes]), [["it", 2], ["dune", 1]]);

  const closed = closePoll(voted);
  assert.equal(closed.movie.id, "it");
  assert.equal(closed.poll.isOpen, false);
  assert.equal(closed.poll.winnerId, "it");
  assert.equal(closePoll(closed), closed, "cerrar una votación ya cerrada no hace nada");
});

test("validación del registro (legacy)", () => {
  assert.deepEqual(validateForm("Ana", "ana@correo.com", "12345678"), { name: "", email: "", password: "" });
  const errors = validateForm("A", "sin-arroba", "123");
  assert.ok(errors.name && errors.email && errors.password);
});
