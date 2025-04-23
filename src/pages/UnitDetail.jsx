import { useParams } from 'react-router-dom';
import mockUnits from '../data/mockUnits';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const UnitDetail = () => {
  const { id } = useParams();
  const unit = mockUnits.find((u) => u.id.toString() === id);

  if (!unit) return <div>Unit not found</div>;

  const { coordinates } = unit;

  // Optional: Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Unit {unit.id}</h2>
      <p className="mb-2"><strong>Status:</strong> {unit.status}</p>
      <p className="mb-4"><strong>Location:</strong> {unit.location}</p>

      {coordinates && (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
            <Popup>
              Unit {unit.id} — {unit.status}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default UnitDetail;
