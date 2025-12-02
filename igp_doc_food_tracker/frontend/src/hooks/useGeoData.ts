// src/hooks/useGeoData.ts
import { useContext } from "react";

import { GeoDataContext } from "../context/GeoDataContext";

export function useGeoData() {
  return useContext(GeoDataContext);
}
