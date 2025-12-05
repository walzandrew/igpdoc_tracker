import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import MapToolbar from "../mapToolbar/MapToolbar";
import MapSidebar from "../mapSidebar/mapSidebar";
import RegionLayer from "./RegionLayer";
import { ProvinceLayer } from "./ProvinceLayer";
import type { RegionFeature, ProvinceFeature } from "../../types";
import { ITALY_BOUNDS, startingZoom, startingCenter } from "./mapConstants";
import { useMapSelection } from "../../context/MapSelectionContext";
import { useFoodFilters } from "../../context/FoodFiltersContext";
import ResetViewControl from "../mapControls/resetViewControl";

type Props = {
  regions: RegionFeature[] | null;
  provinces: ProvinceFeature[] | null;
};

type ZoomControllerProps = {
  activeRegion: string | null;
  regions: RegionFeature[];
  startingZoom: number;
  startingCenter: L.LatLngExpression;
};

export default function BaseMap({ regions, provinces }: Props) {
  const { setFilters } = useFoodFilters();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    activeRegion,
    setActiveRegion,
    setActiveRegionName,
    setActiveProvince,
    setActiveProvinceName,
  } = useMapSelection();

  // This is a very useful bit of design, keep in mind
  function RegionZoomController({
    activeRegion,
    regions,
    startingZoom,
    startingCenter,
  }: ZoomControllerProps) {
    const map = useMap();

    useEffect(() => {
      if (activeRegion === "ITALY") {
        map.setView(startingCenter, startingZoom, { animate: true });
        setActiveRegionName("Italy");
      } else {
        const region = regions.find((r) => r.id === activeRegion);
        if (!region) return;

        const centroid = region.properties.reg_centroid;
        setActiveRegionName(region.properties.reg_name);

        if (!centroid || !centroid.coordinates) return;

        const [lon, lat] = centroid.coordinates;
        map.setView([lat, lon], 7.5, { animate: true });
      }
    }, [activeRegion, regions, map]);

    return null; // controller component — no UI
  }

  const returnToItalyZoom = () => {
    setActiveRegion("ITALY");
    setActiveRegionName("Italy");
    setActiveProvince(null);
    setActiveProvinceName(null);
    setFilters((prev) => ({
      ...prev,
      region: null,
      province: null,
      page: 1,
    }));
  };

  function toggleOpen() {
    setSidebarOpen(sidebarOpen ? false : true);
  }

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <MapToolbar regions={regions} provinces={provinces} />
      <div className="map-container" style={{ position: "relative" }}>
        <MapContainer
          center={startingCenter}
          zoom={startingZoom}
          minZoom={startingZoom}
          style={{ height: "70vh", width: "100%" }}
          maxBounds={ITALY_BOUNDS}
          doubleClickZoom={false}
        >
          <ResetViewControl onReset={returnToItalyZoom} />
          <RegionZoomController
            startingZoom={startingZoom}
            startingCenter={startingCenter}
            activeRegion={activeRegion}
            regions={regions ?? []}
          />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {regions && <RegionLayer regions={regions} />}
          {provinces && <ProvinceLayer provinces={provinces} />}
        </MapContainer>
      </div>
      <MapSidebar open={sidebarOpen} toggleOpenClose={toggleOpen}></MapSidebar>
    </div>
  );
}
