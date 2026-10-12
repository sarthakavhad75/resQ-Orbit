import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Incident, IsolatedCommunity, ChokePoint } from '../../types/disaster';
import { PriorityBadge } from '../common/PriorityBadge';
import { VerificationBadge, AccessibilityBadge } from '../common/StatusBadge';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  Hospital, 
  Home, 
  Truck, 
  Compass, 
  Maximize2,
  Eye,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

// Center updater hook
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

interface SatelliteMapViewProps {
  incidents: Incident[];
  isolatedCommunities: IsolatedCommunity[];
  chokePoints: ChokePoint[];
  center: { lat: number; lng: number };
  zoom: number;
  onSelectIncident: (incident: Incident) => void;
  onVerifyIncident: (incidentId: string) => void;
  onAssignTeam: (incidentId: string) => void;
}

export const SatelliteMapView: React.FC<SatelliteMapViewProps> = ({
  incidents,
  isolatedCommunities,
  chokePoints,
  center,
  zoom,
  onSelectIncident,
  onVerifyIncident,
  onAssignTeam
}) => {
  const [mapLayer, setMapLayer] = useState<'satellite' | 'dark' | 'osm'>('satellite');
  const [showChokePoints, setShowChokePoints] = useState<boolean>(true);
  const [showHazardCircles, setShowHazardCircles] = useState<boolean>(true);

  // Custom marker creators using L.divIcon
  const createIncidentMarker = (incident: Incident) => {
    let pulseClass = 'marker-pulse-medium';
    let iconChar = '⚠️';

    if (incident.priorityLevel === 'Critical') {
      pulseClass = 'marker-pulse-critical';
    } else if (incident.priorityLevel === 'High') {
      pulseClass = 'marker-pulse-high';
    } else if (incident.priorityLevel === 'Low') {
      pulseClass = 'marker-pulse-low';
    }

    if (incident.category === 'Operational Hospital') iconChar = '🏥';
    else if (incident.category === 'Emergency Shelter') iconChar = '⛺';
    else if (incident.category === 'Collapsed Structure') iconChar = '💥';
    else if (incident.category === 'Blocked Road' || incident.category === 'Severed Bridge') iconChar = '🚧';
    else if (incident.category === 'Isolated Settlement') iconChar = '🏔️';
    else if (incident.category === 'Hazard Zone') iconChar = '🌊';

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="${pulseClass}">
          <span style="font-size: 13px; transform: scale(1.1);">${iconChar}</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  const createIsolatedMarker = (iso: IsolatedCommunity) => {
    return L.divIcon({
      className: 'custom-isolated-marker',
      html: `
        <div style="background: #a855f7; border: 2px solid white; box-shadow: 0 0 15px #c084fc; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: white;">
          🏕️
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -13]
    });
  };

  // Map Tile URLs
  const tileLayers = {
    // Esri World Imagery (High-Res Satellite)
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    },
    // CartoDB Dark Matter (High-tech tactical dark mode)
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    // Standard OSM
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      {/* Map Layer Switcher Floating Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <div className="bg-space-950/90 backdrop-blur-md p-1.5 rounded-xl border border-cyan-500/30 shadow-xl flex gap-1 font-mono text-xs">
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mapLayer === 'satellite' 
                ? 'bg-cyan-500 text-space-950 font-bold shadow-[0_0_10px_#00f2fe]' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Satellite</span>
          </button>
          <button
            onClick={() => setMapLayer('dark')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mapLayer === 'dark' 
                ? 'bg-cyan-500 text-space-950 font-bold shadow-[0_0_10px_#00f2fe]' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Tactical Dark</span>
          </button>
          <button
            onClick={() => setMapLayer('osm')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mapLayer === 'osm' 
                ? 'bg-cyan-500 text-space-950 font-bold shadow-[0_0_10px_#00f2fe]' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Street</span>
          </button>
        </div>

        <div className="bg-space-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-cyan-500/30 shadow-xl flex items-center justify-between text-xs font-mono text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showHazardCircles} 
              onChange={(e) => setShowHazardCircles(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            <span>Hazard Zones</span>
          </label>
        </div>
      </div>

      {/* Primary Leaflet Container */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController center={[center.lat, center.lng]} zoom={zoom} />

        <TileLayer
          attribution={tileLayers[mapLayer].attribution}
          url={tileLayers[mapLayer].url}
          maxZoom={19}
        />

        {/* Hazard Impact Radius Rings */}
        {showHazardCircles && (
          <>
            <Circle
              center={[center.lat, center.lng]}
              radius={1800}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.08,
                weight: 1.5,
                dashArray: '6, 6'
              }}
            />
            <Circle
              center={[center.lat, center.lng]}
              radius={3800}
              pathOptions={{
                color: '#f97316',
                fillColor: '#f97316',
                fillOpacity: 0.04,
                weight: 1,
                dashArray: '4, 4'
              }}
            />
          </>
        )}

        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.coordinates.lat, incident.coordinates.lng]}
            icon={createIncidentMarker(incident)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-3 space-y-3 min-w-[260px] max-w-[320px] text-slate-100">
                <div className="flex items-start justify-between gap-2 border-b border-slate-700/80 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">{incident.id}</span>
                    <h4 className="font-bold text-sm text-white font-display leading-tight">{incident.title}</h4>
                  </div>
                  <PriorityBadge level={incident.priorityLevel} score={incident.priorityScore} size="sm" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-300 leading-snug line-clamp-2">
                    {incident.suspectedDamage}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <VerificationBadge status={incident.verificationStatus} size="sm" />
                    <AccessibilityBadge status={incident.accessibility} size="sm" />
                  </div>
                </div>

                <div className="bg-space-900 p-2 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Affected:</span>
                    <span className="text-white font-semibold">{incident.estimatedPeopleAffected.toLocaleString()} pax</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Coordinates:</span>
                    <span className="text-cyan-400">{incident.coordinates.lat.toFixed(4)}, {incident.coordinates.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>AI Confidence:</span>
                    <span className="text-emerald-400 font-semibold">{incident.confidenceScore}%</span>
                  </div>
                  {incident.assignedTeam && (
                    <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                      <span>Assigned Unit:</span>
                      <span className="text-cyan-300 truncate max-w-[140px]">{incident.assignedTeam}</span>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons in Popup */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectIncident(incident)}
                    className="flex-1 py-1 px-2 rounded-md bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  {incident.verificationStatus !== 'Field-Verified' && (
                    <button
                      onClick={() => onVerifyIncident(incident.id)}
                      className="py-1 px-2 rounded-md bg-emerald-950 border border-emerald-500/50 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                      title="Verify with field report"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>
                  )}

                  {!incident.assignedTeam && (
                    <button
                      onClick={() => onAssignTeam(incident.id)}
                      className="py-1 px-2 rounded-md bg-blue-950 border border-blue-500/50 hover:bg-blue-900 text-blue-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                      title="Assign Rescue Team"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Assign</span>
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Isolated Communities Markers */}
        {isolatedCommunities.map((iso) => (
          <Marker
            key={iso.id}
            position={[iso.coordinates.lat, iso.coordinates.lng]}
            icon={createIsolatedMarker(iso)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-3 space-y-2 min-w-[240px] text-slate-100 font-mono text-xs">
                <div className="border-b border-purple-500/40 pb-1.5 flex items-center justify-between">
                  <h4 className="font-bold text-purple-300 text-sm">{iso.name}</h4>
                  <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-500/40 text-[10px]">
                    ISOLATED
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <p><strong>Population:</strong> {iso.population} people</p>
                  <p><strong>Cut Off For:</strong> {iso.daysIsolated} days</p>
                  <p><strong>Blockage:</strong> {iso.primaryBlockage}</p>
                  <p><strong>Supplies:</strong> <span className="text-red-400 font-semibold">{iso.suppliesStatus}</span></p>
                  {iso.airDropRequired && (
                    <p className="text-amber-300 font-bold">⚠️ Aerial Supply Drop Required</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
