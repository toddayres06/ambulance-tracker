import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../context/AuthContext'; // To access user data like driverId

const MapOverview = () => {
  const [position, setPosition] = useState(null);  // To store the current location
  const [error, setError] = useState(null);  // To store any geolocation errors
  const [ambulances, setAmbulances] = useState([]);
  const { user } = useAuth(); // Assuming user data contains the `driverId`

  // Send location to backend (dynamic location based on user's device)
  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      console.log('🔥 Sending location to backend:', { latitude, longitude });
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, driverId: user?.id, status: 'active' }),
      });

      if (!res.ok) throw new Error('Failed to send location');
      console.log(`Location sent: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } catch (err) {
      console.error('❌ Error sending location:', err.message);
    }
  };

  // Fetch ambulances and their locations
  const fetchAmbulances = async () => {
    try {
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/ambulances');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAmbulances(data);
      }
    } catch (err) {
      console.error('❌ Error fetching ambulances:', err);
    }
  };

  // Handle user's geolocation and send to backend
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);  // Update position state with new location
        sendLocationToBackend(latitude, longitude); // Send the updated location to backend
      },
      (err) => {
        setError('Unable to retrieve location');
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,  // Always get new data (no caching)
        timeout: 5000,  // Timeout for getting the location is 5 seconds
      }
    );
  };

  // Fetch the geolocation and set the center of the map to the user's location
  useEffect(() => {
    handleGetLocation(); // Automatically fetch location when the component loads

    fetchAmbulances(); // Fetch ambulances as well
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div>
      <button onClick={handleGetLocation}>Get Current Location</button>
      {error && <div>{error}</div>}
      <MapContainer
        center={position || [29.7604, -95.3698]} // Default to Houston if no position is available
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {ambulances.map((ambulance) => (
          <Marker key={ambulance.id} position={[ambulance.latitude, ambulance.longitude]}>
            <Popup>Ambulance ID: {ambulance.id}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapOverview;
