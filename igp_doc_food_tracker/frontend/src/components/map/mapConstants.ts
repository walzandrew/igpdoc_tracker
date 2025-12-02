import L, { LatLng } from "leaflet";

export const ITALY_BOUNDS: L.LatLngBoundsExpression = [
  [36.0, 6.0], // Southwest corner (Sicily/Sardinia)
  [47.2, 19.0], // Northeast corner (Alto Adige)
];

export const startingZoom = 5.4;

export const startingCenter: L.LatLngExpression = [41.8719, 12.5674];

export const boundsViscosity = 0.8;
