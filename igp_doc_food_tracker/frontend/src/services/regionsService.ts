import { fetchRegions } from "../api/regionsApi";
import type { RegionFeature, RegionFeatureCollection } from "../types";

export async function getRegionFeatures() {
  const regionFc: RegionFeatureCollection = await fetchRegions();
  const regFeatures: RegionFeature[] = regionFc.features;
  return regFeatures;
}
