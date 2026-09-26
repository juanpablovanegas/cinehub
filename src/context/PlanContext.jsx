import { createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { buildPlan, buildPollPlan, closePoll, setRsvp, voteForMovie } from "../services/planService.js";

export const PlanContext = createContext(null);

const asList = (value) => (Array.isArray(value) ? value : []);

/** Planes guardados + función elegida en /functions pendiente de convertirse en plan. */
export function PlanProvider({ children }) {
  const [storedPlans, setPlans] = useLocalStorage("cinehub-plans", []);
  const [selection, setSelection] = useLocalStorage("cinehub-selection", null);
  const plans = asList(storedPlans);

  const createPlan = useCallback(
    (form, owner) => {
      const plan = buildPlan(selection, form, owner);
      setPlans((list) => [...asList(list), plan]);
      return plan;
    },
    [selection, setPlans]
  );

  const updatePlan = useCallback(
    (id, changes) =>
      setPlans((list) => asList(list).map((plan) => (plan.id === id ? { ...plan, ...changes } : plan))),
    [setPlans]
  );

  const deletePlan = useCallback(
    (id) => setPlans((list) => asList(list).filter((plan) => plan.id !== id)),
    [setPlans]
  );

  const respondToPlan = useCallback(
    (id, person, status) =>
      setPlans((list) => asList(list).map((plan) => (plan.id === id ? setRsvp(plan, person, status) : plan))),
    [setPlans]
  );

  /** Como createPlan, pero con varias películas candidatas en vez de una fija. */
  const createPlanWithPoll = useCallback(
    (candidateMovies, form, owner) => {
      const plan = buildPollPlan(selection, candidateMovies, form, owner);
      setPlans((list) => [...asList(list), plan]);
      return plan;
    },
    [selection, setPlans]
  );

  const voteMovie = useCallback(
    (id, person, movieId) =>
      setPlans((list) => asList(list).map((plan) => (plan.id === id ? voteForMovie(plan, person, movieId) : plan))),
    [setPlans]
  );

  const closeMoviePoll = useCallback(
    (id) => setPlans((list) => asList(list).map((plan) => (plan.id === id ? closePoll(plan) : plan))),
    [setPlans]
  );

  const value = useMemo(
    () => ({
      plans,
      selection,
      selectShowtime: setSelection,
      getPlan: (id) => plans.find((plan) => plan.id === id) ?? null,
      createPlan,
      updatePlan,
      deletePlan,
      respondToPlan,
      createPlanWithPoll,
      voteMovie,
      closeMoviePoll,
    }),
    [
      plans,
      selection,
      setSelection,
      createPlan,
      updatePlan,
      deletePlan,
      respondToPlan,
      createPlanWithPoll,
      voteMovie,
      closeMoviePoll,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}
