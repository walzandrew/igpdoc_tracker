import RegionSelector from "./RegionSelector";
import ProvinceSelector from "./ProvinceSelector";
import type { RegionFeature, ProvinceFeature } from "../../types";
import { useMapSelection } from "../../context/MapSelectionContext";

type MapToolbarProps = {
  regions: RegionFeature[] | null;
  provinces: ProvinceFeature[] | null;
};

export default function MapToolbar({ regions, provinces }: MapToolbarProps) {
  // need to reference the context to use its state
  const {
    activeRegion,
    activeProvince,
    activeRegionName,
    setActiveRegion,
    setActiveProvince,
  } = useMapSelection();

  return (
    <div className="map-toolbar" style={toolbarStyle}>
      <RegionSelector
        regions={regions}
        selected={activeRegion}
        onChange={setActiveRegion}
      />
      {activeRegion !== "ITALY" && provinces && provinces?.length > 0 && (
        <ProvinceSelector
          activeRegion={activeRegion}
          activeRegionName={activeRegionName}
          provinces={provinces}
          selected={activeProvince}
          onChange={setActiveProvince}
        />
      )}
    </div>
  );
}

const toolbarStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginBottom: "1rem",
  alignItems: "center",
};
