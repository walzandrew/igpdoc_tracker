import { GeoJSON, useMap } from "react-leaflet";

import type { RegionFeature } from "../../types";
import {
  inactiveRegionStyle,
  activeRegionStyle,
  hoverRegionStyle,
} from "./baseMapStyles";
import { useMapSelection } from "../../context/MapSelectionContext";

type RegionLayerProps = {
  regions: RegionFeature[];
};

export default function RegionLayer({ regions }: RegionLayerProps) {
  // Need to reference the current map to use its dom event handlers
  const map = useMap();

  // need to reference the context to use its state
  const {
    activeRegion,
    setActiveRegion,
    setActiveProvince,
    setActiveRegionName,
    setActiveProvinceName,
  } = useMapSelection();

  // style is recomputed for each feature, using current activeRegion
  const styleFn = (feature: any) => {
    const code = feature.id;
    return code === activeRegion ? activeRegionStyle : inactiveRegionStyle;
  };

  const onEachFeature = (feature: any, layer: any) => {
    const { reg_name, reg_centroid } = feature.properties;
    const code = feature.id;

    layer.bindPopup(`
      <strong>${reg_name}</strong><br/>
    `);

    layer.on({
      mouseover: () => {
        layer.setStyle(hoverRegionStyle);
      },
      mouseout: () => {
        const isActive = activeRegion === code;
        layer.setStyle(isActive ? activeRegionStyle : inactiveRegionStyle);
      },
      click: () => {
        layer.openPopup();
      },
      dblclick: () => {
        setActiveRegion(code); // tells parent which region is active
        setActiveRegionName(reg_name);
        setActiveProvinceName(null);

        // need to also clear the active province
        setActiveProvince(null);

        if (reg_centroid?.coordinates) {
          const [lng, lat] = reg_centroid.coordinates;
          map.setView([lat, lng], 8, { animate: true });
        }
      },
    });
  };

  return (
    <GeoJSON
      key={activeRegion ?? "none"} // force remount when activeRegion changes
      data={regions as any}
      style={styleFn}
      onEachFeature={onEachFeature}
    />
  );
}
