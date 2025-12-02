import type { ProvinceFeature } from "../../types";

type ProvinceSelectorProps = {
  provinces: ProvinceFeature[];
  selected: string | null;
  activeRegion: string | null;
  activeRegionName: string | null;
  onChange: (code: string | null) => void;
};

export default function ProvinceSelector({
  provinces,
  selected,
  activeRegion,
  activeRegionName,
  onChange,
}: ProvinceSelectorProps) {
  // Only show provinces for selected region
  if (activeRegion !== null) {
    provinces = provinces.filter(
      (p) => p.properties.parent_region === activeRegion
    );
  }

  return (
    <select
      className="btn"
      style={selectStyle}
      value={selected ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
    >
      <option value="">Provinces in {activeRegionName}:</option>
      {provinces.map((p) => (
        <option key={p.id} value={p.id}>
          {p.properties.prov_name}
        </option>
      ))}
    </select>
  );
}

const selectStyle: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  borderRadius: "6px",
  padding: "0.6rem 1rem",
  cursor: "pointer",
};
