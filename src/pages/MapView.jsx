import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mockUnits from '../data/mockUnits';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  useEffect(() => {
    document.title = 'Live Map View';
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer center={[29.7604, -95.3698]} zoom={10} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {mockUnits.map((unit) => (
          <Marker
            key={unit.id}
            position={[unit.coordinates.lat, unit.coordinates.lng]}
          >
            <Popup>
              <strong>Unit:</strong> {unit.id} <br />
              <strong>Status:</strong> {unit.status} <br />
              <strong>Location:</strong> {unit.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
