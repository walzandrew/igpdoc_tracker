import { createContext, useState, useCallback, type ReactNode } from "react";

import { getRegionFeatures } from "../services/regionsService";
import { getProvinceFeatures } from "../services/provincesService";
import type { RegionFeature, ProvinceFeature } from "../types";
import type { GeoDataContextValue } from "../types/context";

export const GeoDataContext = createContext<GeoDataContextValue>({
  regions: null,
  provinces: null,
  loading: false,
  error: null,
  loadAllGeoData: async () => {},
});

export function GeoDataProvider({ children }: { children: ReactNode }) {
  const [regions, setRegions] = useState<RegionFeature[] | null>(null);
  const [provinces, setProvinces] = useState<ProvinceFeature[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAllGeoData = useCallback(async () => {
    // If already loaded, skip
    if (regions && provinces) return;

    setLoading(true);
    setError(null);

    try {
      const [regionsData, provincesData] = await Promise.all([
        getRegionFeatures(),
        getProvinceFeatures(),
      ]);

      setRegions(regionsData);
      setProvinces(provincesData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [regions, provinces]);

  return (
    <GeoDataContext.Provider
      value={{ regions, provinces, loading, error, loadAllGeoData }}
    >
      {children}
    </GeoDataContext.Provider>
  );
}
