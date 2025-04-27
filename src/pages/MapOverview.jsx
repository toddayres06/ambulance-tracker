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
        console.error(err);
        setError('Unable to fetch live unit location');
      }
    };

    fetchLiveLocation();

    const interval = setInterval(fetchLiveLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full p-4">
      <h2 className="text-2xl font-bold mb-4">All Units Overview</h2>
      {error && (
    <div className="text-red-500 mb-2">{error}</div>
    )}

      <MapContainer
        center={[29.7604, -95.3698]} // Houston, TX
        zoom={10}
        className="h-[80vh] w-full rounded-xl shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {liveUnit && (
          <Marker
            position={liveUnit}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>Live Unit</strong><br />
              Latitude: {liveUnit[0].toFixed(4)}<br />
              Longitude: {liveUnit[1].toFixed(4)}
            </Popup>
          </Marker>
        )}

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
      </MapContainer>
    </div>
  );
};

export default MapOverview;
