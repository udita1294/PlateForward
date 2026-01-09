import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

const LocationMarker = ({ position, setPosition, onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || null);

  useEffect(() => {
    // If we have an initial position, we don't need to auto-locate immediately unless requested
    // But for a new donation, it's nice to start at user's location
    if (!initialPosition && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
         const { latitude, longitude } = pos.coords;
         const latlng = { lat: latitude, lng: longitude };
         setPosition(latlng);
         onLocationSelect(latlng);
      });
    }
  }, []);

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 z-0 relative">
      <MapContainer
        center={position || [20.5937, 78.9629]} // Default to India center if unknown
        zoom={position ? 15 : 5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
            position={position} 
            setPosition={setPosition} 
            onLocationSelect={onLocationSelect} 
        />
      </MapContainer>
      <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow z-[1000]">
        Click on map to pin location
      </div>
    </div>
  );
};

export default LocationPicker;
