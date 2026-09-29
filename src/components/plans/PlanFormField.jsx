/** Input de texto con label y validación inline, para PlanForm. */
export default function PlanFormField({ id, name, label, value, error, shown, onChange, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        aria-invalid={Boolean(shown && error)}
        aria-describedby={shown && error ? errorId : undefined}
        onChange={onChange}
        {...inputProps}
      />
      {shown && error && <p id={errorId} className="field-error">{error}</p>}
    </div>
  );
}
