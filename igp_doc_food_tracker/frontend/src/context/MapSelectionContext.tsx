import { createContext, useContext, useState } from "react";

type MapSelectionContextType = {
  activeRegion: string | null;
  activeRegionName: string | null;
  activeProvince: string | null;
  activeProvinceName: string | null;
  setActiveRegion: (code: string | null) => void;
  setActiveProvince: (code: string | null) => void;
  setActiveRegionName: (name: string | null) => void;
  setActiveProvinceName: (name: string | null) => void;
};

export const MapSelectionContext = createContext<MapSelectionContextType>({
  activeRegion: null,
  activeRegionName: "Italy",
  activeProvince: null,
  activeProvinceName: null,
  setActiveRegion: () => {},
  setActiveProvince: () => {},
  setActiveRegionName: () => {},
  setActiveProvinceName: () => {},
});

export function MapSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeRegion, setActiveRegion] = useState<string | null>("ITALY");
  const [activeRegionName, setActiveRegionName] = useState<string | null>(
    "Italy"
  );
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [activeProvinceName, setActiveProvinceName] = useState<string | null>(
    null
  );

  return (
    <MapSelectionContext.Provider
      value={{
        activeRegion,
        activeRegionName,
        activeProvince,
        activeProvinceName,
        setActiveRegion,
        setActiveRegionName,
        setActiveProvince,
        setActiveProvinceName,
      }}
    >
      {children}
    </MapSelectionContext.Provider>
  );
}

export function useMapSelection() {
  return useContext(MapSelectionContext);
}
