import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapOverview = () => {
  const [position, setPosition] = useState(null);  // To store the user's current location
  const [ambulances, setAmbulances] = useState([]);  // To store ambulance data
  const [error, setError] = useState(null);  // To store any errors

  // Fetch all ambulances and update positions
  const fetchAmbulances = async () => {
    try {
      console.log('🔍 Fetching ambulances...');
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/ambulances'); // Assuming this is your endpoint
      const data = await res.json();

      if (Array.isArray(data)) {
        console.log('✅ Fetched ambulances:', data);
        setAmbulances(data);  // Store the fetched ambulances' positions
      } else {
        console.error('❌ Invalid data format', data);
      }
    } catch (err) {
      console.error('❌ Error fetching ambulances:', err);
    }
  };

  // Send location to the backend
  const sendLocationToBackend = async (latitude, longitude, status = 'active') => {
    try {
      console.log('🔥 Sending location to backend:', { latitude, longitude });
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, status }),
      });

      if (!res.ok) throw new Error('Failed to send location');
      console.log(`Location sent: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } catch (err) {
      console.error('❌ Error sending location:', err.message);
    }
  };

  // Fetch the geolocation and set the center of the map to the user's location
  useEffect(() => {
    console.log('Setting up location tracking...'); // 👈 Add this line to track the setup

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);  // Update position state with current location
        console.log('Updating location to server:', { latitude, longitude });

        // Send location to backend
        sendLocationToBackend(latitude, longitude);
      },
      (err) => {
        setError('Unable to retrieve location');
        console.error(err); // Log the error in case of failure
      },
      {
        enableHighAccuracy: true, // Get the most accurate location possible
        maximumAge: 10000, // Accept location data that is up to 10 seconds old
        timeout: 30000, // Increase timeout to 30 seconds to avoid unnecessary timeouts
      }
    );

    // Clean up when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []); // Only run on mount, cleanup on unmount

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>; // Display any geolocation errors
  }

  return (
    <div className="h-screen">
      {position ? (
        <MapContainer center={position} zoom={16} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
          {ambulances.map((ambulance) => (
            <Marker key={ambulance.id} position={[ambulance.latitude, ambulance.longitude]}>
              <Popup>Ambulance ID: {ambulance.id}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="p-4">Fetching location...</div> // Show loading if no position
      )}
    </div>
  );
};

export default MapOverview;
