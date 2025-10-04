import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapAutoCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}
