type ToggleSwitchProps = {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function ToggleSwitch({
  value,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <div className="toggle-wrapper">
      {label && <span className="toggle-label">{label}</span>}

      <button
        type="button"
        className={`toggle-switch ${value ? "on" : "off"}`}
        onClick={() => onChange(!value)}
        aria-pressed={value}
      >
        <span className="toggle-text">{value ? "Yes" : "No"}</span>
      </button>
    </div>
  );
}
