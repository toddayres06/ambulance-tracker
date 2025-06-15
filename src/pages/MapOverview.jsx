import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const MapOverview = () => {
  const { user } = useAuth();  // Assuming user data contains driverId (adjust based on your context structure)
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
    if (!user) {
      console.error('❌ No user data found, cannot send location');
      return;
    }

    const driverId = user.id;  // Assuming user object has the driverId (adjust based on your context structure)

    try {
      console.log('🔥 Sending location to backend:', { latitude, longitude, driverId, status });
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, status, driverId }),  // Include driverId
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
    setPosition([latitude, longitude]);
    console.log('Updating location to server:', { latitude, longitude });
    sendLocationToBackend(latitude, longitude); // Send precise location
  },
  (err) => {
    setError('Unable to retrieve location');
    console.error(err);
  },
  {
    enableHighAccuracy: true, // Ensure high accuracy
    maximumAge: 1000, // No caching, always fetch new data
    timeout: 5000, // Timeout for getting the location is 5 seconds
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
