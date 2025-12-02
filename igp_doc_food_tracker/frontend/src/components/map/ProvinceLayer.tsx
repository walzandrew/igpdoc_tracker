import { GeoJSON } from "react-leaflet";

import type { ProvinceFeature } from "../../types";
import {
  childrenProvinceStyle,
  hoverRegionStyle,
  provinceActiveStyle,
} from "./baseMapStyles";
import { useMapSelection } from "../../context/MapSelectionContext";

type Props = {
  provinces: ProvinceFeature[];
};

export function ProvinceLayer({ provinces }: Props) {
  // Unpack the active region and active province from context
  const {
    activeRegion,
    setActiveProvince,
    activeProvince,
    setActiveProvinceName,
  } = useMapSelection();

  // Filter down the provinces
  const visibleProvinces =
    activeRegion === null
      ? [] // no provinces shown unless region selected
      : provinces.filter((p) => p.properties.parent_region === activeRegion);
  return (
    <>
      {visibleProvinces.map((prov) => (
        <GeoJSON
          key={prov.id}
          data={prov.geometry}
          style={
            prov.id === activeProvince
              ? provinceActiveStyle
              : childrenProvinceStyle
          }
          eventHandlers={{
            click: () => {
              setActiveProvince(String(prov.id));
              setActiveProvinceName(prov.properties.prov_name);
            },
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle(hoverRegionStyle);
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle(
                prov.id === activeProvince
                  ? hoverRegionStyle
                  : childrenProvinceStyle
              );
            },
          }}
        />
      ))}
    </>
  );
}
