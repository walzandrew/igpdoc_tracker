import { useMap } from "react-leaflet";
import { useEffect } from "react";
import * as L from "leaflet";

type Props = {
  onReset: () => void;
};

export default function ResetViewControl({ onReset }: Props) {
  const map = useMap();

  useEffect(() => {
    // Create a custom control container
    const control = new L.Control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");

      const button = L.DomUtil.create("a", "reset-view-button", div);
      button.innerHTML = `
      <span class="reset-view-icon">🏠</span>
      <span class="reset-view-tooltip">Reset</span>
    `;

      button.href = "#";

      L.DomEvent.disableClickPropagation(button);
      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.preventDefault(e);
        onReset(); // call your map reset function
      });

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onReset]);

  return null; // this component renders no DOM itself
}
