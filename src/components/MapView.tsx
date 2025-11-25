import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Plant } from '../types';
import 'leaflet/dist/leaflet.css';

// ---------- Smaller Custom Icons ----------
const steelIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; 
    box-shadow: 0 1px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 15 15" fill="white" stroke="none">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
    </svg>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8]
});

const spongeIronIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #f59e0b; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; 
    box-shadow: 0 1px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 15 15" fill="none" stroke="white" stroke-width="2">
      <rect x="3" y="3" width="9" height="9" rx="2"/>
    </svg>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8]
});

const pelletsIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; 
    box-shadow: 0 1px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 15 15" fill="white" stroke="none">
      <circle cx="7.5" cy="7.5" r="4"/>
    </svg>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8]
});

const blastFurnaceIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #8b5cf6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; 
    box-shadow: 0 1px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 15 15" fill="white" stroke="none">
      <polygon points="7.5,1 9,5 13,5 9.5,8 10.5,12 7.5,9.5 4.5,12 5.5,8 2,5 6,5"/>
    </svg>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8]
});

// ---------- Map Controller ----------
function MapController({ selectedDistrict, plants }: { selectedDistrict: string | null; plants: Plant[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedDistrict) {
      const districtPlants = plants.filter(p => p.district === selectedDistrict);
      if (districtPlants.length > 0) {
        const bounds = L.latLngBounds(
          districtPlants.map(p => [p.latitude, p.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      }
    } else {
      map.setView([22.5, 79], 5);
    }
  }, [selectedDistrict, plants, map]);

  return null;
}

// ---------- Main Map View ----------
interface MapViewProps {
  plants: Plant[];
  selectedDistrict: string | null;
  onMarkerClick?: (plant: Plant) => void;
}

export default function MapView({ plants, selectedDistrict, onMarkerClick }: MapViewProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'steel': return steelIcon;
      case 'sponge_iron': return spongeIronIcon;
      case 'pellets': return pelletsIcon;
      case 'blast_furnace': return blastFurnaceIcon;
      default: return steelIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10b981';
      case 'under_construction': return '#f59e0b';
      case 'planned': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const filteredPlants = selectedDistrict
    ? plants.filter(p => p.district === selectedDistrict)
    : plants;

  return (
    <MapContainer
      center={[22.5, 79]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedDistrict={selectedDistrict} plants={plants} />

      {filteredPlants.map((plant) => (
        <Marker
          key={plant.id}
          position={[plant.latitude, plant.longitude]}
          icon={getIcon(plant.type)}
          eventHandlers={{
            click: () => {
              setSelectedPlant(plant);
              onMarkerClick?.(plant);
            }
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-base mb-2">{plant.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{plant.type.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{plant.district}, {plant.state}</span>
                </div>
                {plant.capacity && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{plant.capacity}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className="font-medium capitalize px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: getStatusColor(plant.status) + '20',
                      color: getStatusColor(plant.status)
                    }}
                  >
                    {plant.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
