import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import mockUnits from '../data/mockUnits';

const MapOverview = () => {
  const [liveUnit, setLiveUnit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveLocation = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/location');
        if (!res.ok) throw new Error('Failed to fetch latest location');
        const data = await res.json();
        setLiveUnit([data.latitude, data.longitude]);
      } catch (err) {
        console.error('Error fetching live unit location:', err);
        setError('Unable to fetch live unit location');
      }
    };

    fetchLiveLocation();
    const intervalId = setInterval(fetchLiveLocation, 5000);

    return () => clearInterval(intervalId); // Cleanup when unmounting
  }, []);

  const liveUnitIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="h-screen w-full p-4">
      <h2 className="text-2xl font-bold mb-4">All Units Overview</h2>

      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}

      <MapContainer
        center={liveUnit || [29.7604, -95.3698]}
        zoom={10}
        className="h-[80vh] w-full rounded-xl shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Static mock units */}
        {mockUnits.map((unit) => (
          <Marker
            key={unit.id}
            position={[unit.coordinates.lat, unit.coordinates.lng]}
          >
            <Popup>
              <strong>Unit {unit.id}</strong><br />
              Status: {unit.status}<br />
              Location: {unit.location}
            </Popup>
          </Marker>
        ))}

        {/* Live moving unit */}
        {liveUnit && (
          <Marker
            position={liveUnit}
            icon={liveUnitIcon}
          >
            <Popup>
              <strong>Live Unit</strong><br />
              Latitude: {liveUnit[0].toFixed(4)}<br />
              Longitude: {liveUnit[1].toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapOverview;
