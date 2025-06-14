// UnitTracker.js

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const UnitTracker = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  // Function to send location to backend
  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const res = await fetch('https://ambulance-tracker-7e8t.onrender.com/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude }),
      });

      if (!res.ok) throw new Error('Failed to send location');
      console.log(`Location sent: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } catch (err) {
      console.error('Error sending location:', err.message);
    }
  };

  // Fetching and updating the geolocation of the phone/device
  useEffect(() => {
    console.log('Setting up location tracking...'); // Debugging log

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        console.log('Updating location to server:', { latitude, longitude });

        // Send the location to the backend
        sendLocationToBackend(latitude, longitude);
      },
      (err) => {
        setError('Unable to retrieve location');
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      }
    );

    // Clean up when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
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
        </MapContainer>
      ) : (
        <div className="p-4">Fetching location...</div>
      )}
    </div>
  );
};

export default UnitTracker;
