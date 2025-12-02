import type { ProvinceFeatureCollection } from "../types";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// This function will fetch all provinces and
// this will be returned as a Promise containing a feature collection in the results property
export async function fetchProvinces(): Promise<ProvinceFeatureCollection> {
  const response = await fetch(`${API_BASE_URL}/provinces/`);
  const data: ProvinceFeatureCollection = await response.json();
  return data;
}
