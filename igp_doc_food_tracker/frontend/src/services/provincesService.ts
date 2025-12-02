import { fetchProvinces } from "../api/provincesApi";
import type { ProvinceFeature, ProvinceFeatureCollection } from "../types";

export async function getProvinceFeatures() {
  const provinceFc: ProvinceFeatureCollection = await fetchProvinces();
  const provFeatures: ProvinceFeature[] = provinceFc.features;
  return provFeatures;
}
