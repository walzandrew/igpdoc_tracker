import { useEffect } from "react";

import BaseMap from "../components/map/BaseMap";
import { useGeoData } from "../hooks/useGeoData";
import { MapSelectionProvider } from "../context/MapSelectionContext";

export default function MapPage() {
  const { regions, provinces, loadAllGeoData, loading, error } = useGeoData();

  useEffect(() => {
    loadAllGeoData();
  }, [loadAllGeoData]);

  return (
    <MapSelectionProvider>
      <div className="page" style={{ height: "95vh", position: "relative" }}>
        <div>
          <div className="page-header">
            <h1>Exploring Italian Foods: On the Map</h1>
          </div>
        </div>
        {loading && <p>Loading map data…</p>}
        {error && <p>Error: {error}</p>}
        {!loading && regions && provinces && (
          <BaseMap regions={regions} provinces={provinces} />
        )}
      </div>
    </MapSelectionProvider>
  );
}
