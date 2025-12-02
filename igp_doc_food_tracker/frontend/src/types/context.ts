import type { RegionFeature } from "./region";
import type { ProvinceFeature } from "./province";

import type { FoodIndex } from "./index";

export type FoodIndexContextType = {
  index: FoodIndex[];
  validIds: string[];
  loading: boolean;
  error: string | null;
};

export type GeoDataContextValue = {
  regions: RegionFeature[] | null;
  provinces: ProvinceFeature[] | null;
  loading: boolean;
  error: string | null;
  loadAllGeoData: () => Promise<void>;
};
