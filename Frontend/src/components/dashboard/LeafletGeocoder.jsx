import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import axios from "axios";

const LeafletGeocoder = ({ onLocationSelected }) => {
  const map = useMap();
  const geocoderRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || geocoderRef.current) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      showMarker: false,
      keepResult: false,
    });

    map.addControl(searchControl);
    geocoderRef.current = searchControl;

    //  Location selected from search
    map.on("geosearch/showlocation", (result) => {
      const { x, y, raw } = result.location;
      if (markerRef.current) map.removeLayer(markerRef.current);

      let placeName = raw?.name;
      if (raw?.display_name) {
        const parts = raw.display_name.split(",");
        const trimmed = parts.slice(-3).join(",").trim();
        placeName = `${placeName}, ${trimmed}`;
      }

      const newMarker = L.marker([y, x])
        .addTo(map)
        .bindPopup(placeName)
        .openPopup();
      markerRef.current = newMarker;
      map.setView([y, x], 12);

      onLocationSelected?.({ lat: y, lng: x, label: placeName });
    });

    // Click on map
    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) map.removeLayer(markerRef.current);

      let placeName = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        const data = res.data;
        if (data?.display_name) {
          placeName = placeName = data.display_name;
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
      }

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const newMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(placeName)
        .openPopup();
      markerRef.current = newMarker;

      onLocationSelected?.({ lat, lng, label: placeName });
    });

    return () => {
      if (geocoderRef.current) {
        map.removeControl(geocoderRef.current);
        geocoderRef.current = null;
      }
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }
    };
  }, [map, onLocationSelected]);

  return null;
};

export default LeafletGeocoder;
