import type {
  Polygon,
  MultiPolygon,
  Point,
  Feature,
  FeatureCollection,
} from "geojson";

export type Province = {
  prov_istat_code: string; // zero-padded 3 digits
  prov_name: string;
  prov_acronym: string;
  parent_region: string; // foreign key reference to Region
  prov_poly: Polygon | MultiPolygon;
  prov_centroid: Point;
};

export type ProvinceFeatureProperties = {
  prov_name: string;
  prov_acronym: string | null;
  parent_region: string;
  prov_centroid: Point;
};

export type ProvinceFeature = Feature<
  Polygon | MultiPolygon,
  ProvinceFeatureProperties
>;

export type ProvinceFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  ProvinceFeatureProperties
>;
