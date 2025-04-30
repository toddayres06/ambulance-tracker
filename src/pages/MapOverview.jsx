import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ambulanceIcon from '../assets/ambulance.png'; // keep your working icon here!

const MapOverview = () => {
  const [ambulances, setAmbulances] = useState([]);
  const markersRef = useRef({});

  const fetchAmbulances = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ambulances');
      const data = await response.json();
      setAmbulances((currentAmbulances) => {
        data.forEach((newAmbulance) => {
          const marker = markersRef.current[newAmbulance.id];
          if (marker) {
            const { lat, lng } = marker.getLatLng();
            // Simple linear interpolation
            const newLat = lat + (newAmbulance.latitude - lat) * 0.2;
            const newLng = lng + (newAmbulance.longitude - lng) * 0.2;
            marker.setLatLng([newLat, newLng]);
          }
        });
        return data; // Update state to create any new markers if needed
      });
    } catch (error) {
      console.error('Error fetching ambulances:', error);
    }
  };

  useEffect(() => {
    fetchAmbulances();
    const interval = setInterval(fetchAmbulances, 1000); // Fetch every second for smoother updates
    return () => clearInterval(interval);
  }, []);

  const customIcon = L.icon({
    iconUrl: ambulanceIcon,
    iconSize: [40, 40],
  });

  return (
    <MapContainer center={[29.7604, -95.3698]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ambulances.map((ambulance) => (
        <Marker
          key={ambulance.id}
          position={[ambulance.latitude, ambulance.longitude]}
          ref={(ref) => {
            if (ref) markersRef.current[ambulance.id] = ref;
          }}
          icon={customIcon}
        >
          <Popup>{ambulance.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapOverview;
