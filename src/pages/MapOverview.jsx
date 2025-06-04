import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ambulanceIcon from '../assets/ambulance.png';

const MapOverview = () => {
  const [ambulances, setAmbulances] = useState([]);
  const markersRef = useRef({});  // Use a ref to track marker instances

  // Fetch ambulances and update their positions
  const fetchAmbulances = async () => {
    try {
      const response = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/ambulances');
      
      // Check if the response is valid
      if (!response.ok) {
        throw new Error('Failed to fetch ambulances: ' + response.statusText);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setAmbulances((currentAmbulances) => {
          // Update each ambulance's position if the coordinates have changed
          data.forEach((newAmbulance) => {
            const marker = markersRef.current[newAmbulance.id];
            if (marker) {
              // Get the current position of the marker
              const { lat, lng } = marker.getLatLng();
              // Calculate the new position (linear interpolation)
              const newLat = lat + (newAmbulance.latitude - lat) * 0.2;
              const newLng = lng + (newAmbulance.longitude - lng) * 0.2;
              marker.setLatLng([newLat, newLng]);  // Update the marker's position
            }
          });
          return data;  // Return updated ambulance list to trigger re-render if new ambulances are added
        });
      } else {
        console.error('Expected an array but received:', data);
        setAmbulances([]);  // Optionally set it to empty if not an array
      }
    } catch (error) {
      console.error('Error fetching ambulances:', error);
    }
  };

  useEffect(() => {
    fetchAmbulances();
    const interval = setInterval(fetchAmbulances, 1000); // Fetch every second for smoother updates
    return () => clearInterval(interval);
  }, []); // Run this effect once when the component mounts

  // Custom ambulance marker icon
  const customIcon = L.icon({
    iconUrl: ambulanceIcon,
    iconSize: [40, 40],  // Resize the ambulance icon
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
          position={[ambulance.latitude, ambulance.longitude]}  // Use the initial position
          ref={(ref) => {
            if (ref) markersRef.current[ambulance.id] = ref;  // Store marker reference
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
