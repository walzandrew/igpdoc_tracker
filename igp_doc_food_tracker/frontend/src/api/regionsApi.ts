import type { RegionFeatureCollection } from "../types";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// This function will fetch all regions and
// this will be returned as a Promise containing a feature collection in the results property
export async function fetchRegions(): Promise<RegionFeatureCollection> {
  const response = await fetch(`${API_BASE_URL}/regions/`);
  const data: RegionFeatureCollection = await response.json();
  return data;
}
