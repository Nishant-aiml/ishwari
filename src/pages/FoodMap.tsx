import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';

// Define types for our data
interface LocationData {
  lat: number;
  lng: number;
  intensity: number;
  title: string;
  waste?: string;
  demand?: string;
}

// Fix Leaflet default marker icon issue
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Dummy data
const wasteData: LocationData[] = [
  { lat: 18.5204, lng: 73.8567, intensity: 0.8, title: 'Restaurant A', waste: '50kg/day' },
  { lat: 18.5304, lng: 73.8467, intensity: 0.6, title: 'Hotel B', waste: '30kg/day' },
  { lat: 18.5104, lng: 73.8667, intensity: 0.4, title: 'Supermarket C', waste: '40kg/day' },
  { lat: 18.5404, lng: 73.8367, intensity: 0.7, title: 'Restaurant D', waste: '45kg/day' },
  { lat: 18.5154, lng: 73.8617, intensity: 0.5, title: 'Hotel E', waste: '35kg/day' },
];

const demandData: LocationData[] = [
  { lat: 18.5254, lng: 73.8517, intensity: 0.7, title: 'NGO X', demand: '45kg/day' },
  { lat: 18.5354, lng: 73.8417, intensity: 0.5, title: 'Food Bank Y', demand: '35kg/day' },
  { lat: 18.5154, lng: 73.8617, intensity: 0.3, title: 'Community Center Z', demand: '25kg/day' },
  { lat: 18.5454, lng: 73.8317, intensity: 0.6, title: 'Shelter A', demand: '40kg/day' },
  { lat: 18.5204, lng: 73.8567, intensity: 0.4, title: 'Food Bank B', demand: '30kg/day' },
];

// Map bounds for Pune
const PUNE_BOUNDS: L.LatLngBoundsExpression = [
  [18.4, 73.7], // Southwest coordinates
  [18.6, 73.9]  // Northeast coordinates
];

const MapBoundsSetter: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    map.setMaxBounds(PUNE_BOUNDS);
    map.fitBounds(PUNE_BOUNDS);
  }, [map]);
  return null;
};

const FoodMap: React.FC = () => {
  const [showWaste, setShowWaste] = useState<boolean>(true);
  const center: [number, number] = [18.5204, 73.8567]; // Pune center coordinates

  const points = (showWaste ? wasteData : demandData).map(point => [
    point.lat,
    point.lng,
    point.intensity
  ]) as [number, number, number][];

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Food {showWaste ? 'Waste' : 'Demand'} Distribution Map
        </h2>
        <button
          onClick={() => setShowWaste(!showWaste)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Show {showWaste ? 'Demand' : 'Waste'} Data
        </button>
      </div>

      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          maxZoom={18}
          minZoom={12}
          zoomControl={true}
        >
          <MapBoundsSetter />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <HeatmapLayer
            points={points}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => m[2]}
            radius={20}
            max={1.0}
            minOpacity={0.3}
            gradient={showWaste ? { 0.4: 'blue', 0.6: 'yellow', 0.8: 'red' } : { 0.4: 'yellow', 0.6: 'lime', 0.8: 'green' }}
          />

          {(showWaste ? wasteData : demandData).map((point, index) => (
            <Marker 
              key={index} 
              position={[point.lat, point.lng]}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                  <p className="text-sm">
                    {showWaste ? `Waste: ${point.waste}` : `Demand: ${point.demand}`}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Location: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            {showWaste ? 'Waste Sources' : 'Demand Centers'}
          </h3>
          <ul className="space-y-2">
            {(showWaste ? wasteData : demandData).map((point, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                {point.title} - {showWaste ? point.waste : point.demand}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Legend</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>🔴 High {showWaste ? 'Waste' : 'Demand'} Area</p>
            <p>🟡 Medium {showWaste ? 'Waste' : 'Demand'} Area</p>
            <p>🔵 Low {showWaste ? 'Waste' : 'Demand'} Area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMap;
