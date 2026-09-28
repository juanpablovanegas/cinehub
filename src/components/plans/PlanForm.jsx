import { useState } from "react";
import Button from "../common/Button.jsx";
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
      <div className="form-group">
        <label htmlFor="plan-name">Nombre del plan</label>
        <input
          id="plan-name"
          name="name"
          type="text"
          placeholder="Ej. Noche de cine 🎬"
          maxLength={60}
          value={values.name}
          aria-invalid={Boolean(submitted && errors.name)}
          aria-describedby={submitted && errors.name ? "plan-name-error" : undefined}
          onChange={handleChange}
        />
        {submitted && errors.name && <p id="plan-name-error" className="field-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="organizer-name">Tu nombre</label>
        <input
          id="organizer-name"
          name="organizer"
          type="text"
          placeholder="Ej. Samuel"
          maxLength={40}
          readOnly={organizerReadOnly}
          value={values.organizer}
          aria-invalid={Boolean(submitted && errors.organizer)}
          aria-describedby={submitted && errors.organizer ? "organizer-name-error" : undefined}
          onChange={handleChange}
        />
        {submitted && errors.organizer && <p id="organizer-name-error" className="field-error">{errors.organizer}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="plan-description">Mensaje para tus amigos</label>
        <textarea id="plan-description" name="message" placeholder="¿Quién se apunta? Vamos a ver la película y después podemos comer algo..." maxLength={300} value={values.message} onChange={handleChange} />
      </div>

      {notice && (
        <div id="create-plan-notice" className="error-message" role="alert">
          {notice}
        </div>
      )}

      <div className="create-actions">
        {onCancel ? (
          <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        ) : (
          <Button variant="secondary" to="/movies">Cancelar</Button>
        )}
        <Button variant="primary" type="submit" disabled={disabled}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
