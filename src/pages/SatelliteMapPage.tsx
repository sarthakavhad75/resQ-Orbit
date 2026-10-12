import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { SatelliteMapView } from '../components/map/SatelliteMapView';
import { MapFilters } from '../components/map/MapFilters';
import { MapLegend } from '../components/map/MapLegend';
import { IncidentDetailDrawer } from '../components/map/IncidentDetailDrawer';
import { PriorityLevel, VerificationStatus, IncidentCategory, Incident } from '../types/disaster';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Layers, MapPin, Globe2, Activity } from 'lucide-react';

export const SatelliteMapPage: React.FC<{
  onOpenTeamAssign: (incidentId: string) => void;
  onOpenEditIncident: (incident: Incident) => void;
}> = ({ onOpenTeamAssign, onOpenEditIncident }) => {
  const { 
    activeZone, 
    incidents, 
    isolatedCommunities, 
    chokePoints, 
    selectedIncident, 
    setSelectedIncident,
    verifyIncident,
    resolveIncident 
  } = useDisaster();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | 'All'>('All');
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<IncidentCategory | 'All'>('All');

  const filteredIncidents = incidents.filter(inc => {
    const matchSearch = 
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchPriority = selectedPriority === 'All' || inc.priorityLevel === selectedPriority;
    const matchVerification = selectedVerification === 'All' || inc.verificationStatus === selectedVerification;
    const matchCategory = selectedCategory === 'All' || inc.category === selectedCategory;

    return matchSearch && matchPriority && matchVerification && matchCategory;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPriority('All');
    setSelectedVerification('All');
    setSelectedCategory('All');
  };

  return (
    <div className="space-y-4 pb-12">
      <DisclaimerBanner compact />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-space-900/90 border border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-bold uppercase">
              TACTICAL GIS SATELLITE OPERATIONS
            </span>
            <span className="text-xs text-slate-400 font-mono">[{activeZone.region}]</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
            Geospatial Incident & Route Network Map
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-950 border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{filteredIncidents.length} Visible Features</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-950 border border-slate-800">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Esri / Sentinel Overlay</span>
          </div>
        </div>
      </div>

      {/* Filters Strip */}
      <MapFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedVerification={selectedVerification}
        onVerificationChange={setSelectedVerification}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReset={handleResetFilters}
        totalFiltered={filteredIncidents.length}
      />

      {/* Map + Legend Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Leaflet Map View (9 Cols) */}
        <div className="lg:col-span-9 h-[620px]">
          <SatelliteMapView
            incidents={filteredIncidents}
            isolatedCommunities={isolatedCommunities}
            chokePoints={chokePoints}
            center={activeZone.center}
            zoom={activeZone.zoom}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
            onVerifyIncident={(id) => verifyIncident(id)}
            onAssignTeam={(id) => onOpenTeamAssign(id)}
          />
        </div>

        {/* Tactical Legend & Quick Info (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <MapLegend />

          {/* Active Zone GIS Metadata */}
          <div className="p-3.5 rounded-xl bg-space-950/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-slate-200 uppercase border-b border-slate-800 pb-1">
              Sector Center Coordinates
            </div>
            <div className="text-cyan-400">
              {activeZone.center.lat.toFixed(4)}°N, {activeZone.center.lng.toFixed(4)}°E
            </div>
            <div className="text-slate-400 text-[11px]">
              Primary Satellite: <strong className="text-white">{activeZone.primarySatellite}</strong>
            </div>
            <div className="text-slate-400 text-[11px]">
              Observation Pass: <strong className="text-emerald-400">{activeZone.lastSatellitePass}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Inspection Drawer */}
      <IncidentDetailDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onVerify={(id) => verifyIncident(id)}
        onAssignTeam={(id) => onOpenTeamAssign(id)}
        onResolve={(id) => resolveIncident(id)}
        onEdit={(inc) => onOpenEditIncident(inc)}
      />
    </div>
  );
};
