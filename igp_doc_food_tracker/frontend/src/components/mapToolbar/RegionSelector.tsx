import type { RegionFeature } from "../../types";

type RegionSelectorProps = {
  regions: RegionFeature[] | null;
  selected: string | null;
  onChange: (code: string | null) => void;
};

export default function RegionSelector({
  regions,
  selected,
  onChange,
}: RegionSelectorProps) {
  return (
    <select
      className="btn"
      style={selectStyle}
      value={selected ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
    >
      <option value="">All Regions</option>
      {regions !== null ? (
        regions.map((r) => (
          <option key={r.id} value={r.id}>
            {r.properties.reg_name}
          </option>
        ))
      ) : (
        <option value="">Loading...</option>
      )}
    </select>
  );
}

const selectStyle: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  borderRadius: "6px",
  padding: "0.6rem 1rem",
  cursor: "pointer",
};
