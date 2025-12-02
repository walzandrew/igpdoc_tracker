import RegionSelector from "./RegionSelector";
import ProvinceSelector from "./ProvinceSelector";
import ResetViewButton from "./ResetViewButton";
import type { RegionFeature, ProvinceFeature } from "../../types";
import { useMapSelection } from "../../context/MapSelectionContext";

type MapToolbarProps = {
  regions: RegionFeature[] | null;
  provinces: ProvinceFeature[] | null;
  // selectedRegion: string | null;
  // selectedProvince: string | null;
  // activeRegionName: string | null;
  // onRegionChange: (code: string | null) => void;
  // onProvinceChange: (code: string | null) => void;
  onResetView: () => void;
};

export default function MapToolbar({
  regions,
  provinces,
  onResetView,
}: MapToolbarProps) {
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
      <ResetViewButton onResetView={onResetView} />
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
