import { useState } from "react";
import PlanFormActions from "./PlanFormActions.jsx";
import PlanFormField from "./PlanFormField.jsx";
import { hasPlanErrors, validatePlanFields } from "../../services/planService.js";

const EMPTY = { name: "", organizer: "", message: "" };

/** Formulario de plan: se usa para crear (/create-plan) y para editar (/plan/:id). */
export default function PlanForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "🍿 Crear plan",
  disabled = false,
  notice = null,
  organizerReadOnly = false,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [submitted, setSubmitted] = useState(false);
  const errors = validatePlanFields(values);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasPlanErrors(errors)) return;

    onSubmit(values);
    setSubmitted(false);
    setValues({ ...EMPTY, organizer: organizerReadOnly ? values.organizer : "" });
  };

  return (
    <form id="create-plan-form" noValidate onSubmit={handleSubmit}>
      <PlanFormField
        id="plan-name"
        name="name"
        label="Nombre del plan"
        type="text"
        placeholder="Ej. Noche de cine 🎬"
        maxLength={60}
        value={values.name}
        error={errors.name}
        shown={submitted}
        onChange={handleChange}
      />

      <PlanFormField
        id="organizer-name"
        name="organizer"
        label="Tu nombre"
        type="text"
        placeholder="Ej. Samuel"
        maxLength={40}
        readOnly={organizerReadOnly}
        value={values.organizer}
        error={errors.organizer}
        shown={submitted}
        onChange={handleChange}
      />

      <div className="form-group">
        <label htmlFor="plan-description">Mensaje para tus amigos</label>
        <textarea id="plan-description" name="message" placeholder="¿Quién se apunta? Vamos a ver la película y después podemos comer algo..." maxLength={300} value={values.message} onChange={handleChange} />
      </div>

      {notice && (
        <div id="create-plan-notice" className="error-message" role="alert">
          {notice}
        </div>
      )}

      <PlanFormActions onCancel={onCancel} disabled={disabled} submitLabel={submitLabel} />
    </form>
  );
}
