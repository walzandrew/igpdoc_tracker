import type {
  Polygon,
  MultiPolygon,
  Point,
  Feature,
  FeatureCollection,
} from "geojson";

export type Region = {
  reg_istat_code: string; // zero-padded 2 digits
  reg_name: string;
  reg_acronym?: string | null;
  geom_simplified: Polygon | MultiPolygon;
  reg_centroid: Point;
};

export type RegionFeatureProperties = {
  reg_istat_code: string;
  reg_name: string;
  reg_acronym: string | null;
  reg_centroid: Point;
};

export type RegionFeature = Feature<
  Polygon | MultiPolygon,
  RegionFeatureProperties
>;

export type RegionFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  RegionFeatureProperties
>;
