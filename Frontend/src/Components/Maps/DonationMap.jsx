import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DonationMap = ({ lat, lng, popupText }) => {
  if (!lat || !lng) return <div className="text-gray-500 text-sm italic">Location not available</div>;

  const position = [lat, lng];

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="h-48 w-full rounded-lg overflow-hidden border border-gray-300 z-0">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {popupText || "Donation Location"}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <button 
        onClick={handleGetDirections}
        className="text-sm text-blue-600 hover:text-blue-800 underline self-start flex items-center gap-1"
      >
        <span>📍</span> Get Directions
      </button>
    </div>
  );
};

export default DonationMap;
