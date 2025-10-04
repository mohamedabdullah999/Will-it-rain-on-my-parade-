import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "../../context/context";
import MapAutoCenter from "./MapAutoCenter";
import "leaflet/dist/leaflet.css";

import LeafletGeocoder from "./LeafletGeocoder";
const Map = ({ onLocationSelected }) => {
  const { selectedLocation } = useLocation();

  const defaultCenter = [30.0444, 31.2357];

  const currentPosition = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng]
    : defaultCenter;

  return (
    <div className="h-[300px] w-full rounded-lg shadow-md">
      <MapContainer center={defaultCenter} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <LeafletGeocoder onLocationSelected={onLocationSelected} />

        <MapAutoCenter position={currentPosition} />

        {selectedLocation && (
          <Marker position={currentPosition}>
            <Popup>{selectedLocation.label}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
