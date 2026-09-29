import Button from "../common/Button.jsx";

/** Botones de cancelar/enviar de PlanForm, con o sin handler de cancelación. */
export default function PlanFormActions({ onCancel, disabled, submitLabel }) {
  return (
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
  );
}
