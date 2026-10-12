import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { DisasterZone, IncidentCategory, AccessibilityStatus, VerificationStatus } from '../../types/disaster';
import { Plus, MapPin, Building2, Users } from 'lucide-react';

interface NewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeZone: DisasterZone;
  onAddNewIncident: (incidentData: any) => void;
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({
  isOpen,
  onClose,
  activeZone,
  onAddNewIncident
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IncidentCategory>('Collapsed Structure');
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState<number>(activeZone.center.lat + (Math.random() - 0.5) * 0.02);
  const [lng, setLng] = useState<number>(activeZone.center.lng + (Math.random() - 0.5) * 0.02);
  const [suspectedDamage, setSuspectedDamage] = useState('');
  const [estimatedPeopleAffected, setEstimatedPeopleAffected] = useState<number>(50);
  const [accessibility, setAccessibility] = useState<AccessibilityStatus>('Partially Blocked');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('Field-Verified');
  const [dataSource, setDataSource] = useState('Field Drone Recon & Satellite Orthomosaic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNewIncident({
      zoneId: activeZone.id,
      title,
      category,
      disasterType: activeZone.disasterType,
      coordinates: { lat: Number(lat), lng: Number(lng) },
      locationName,
      suspectedDamage,
      estimatedPeopleAffected: Number(estimatedPeopleAffected),
      accessibility,
      verificationStatus,
      confidenceScore: 95.0,
      dataSource,
      observationTime: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      isSimulated: true
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log New Disaster Incident Report"
      subtitle={`Adding field observation to ${activeZone.name}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-400 font-mono mb-1">Incident Headline / Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Collapsed 4-Story Apartment Block Near Main Square"
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IncidentCategory)}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="Collapsed Structure">Collapsed Structure</option>
              <option value="Damaged Building">Damaged Building</option>
              <option value="Blocked Road">Blocked Road</option>
              <option value="Severed Bridge">Severed Bridge</option>
              <option value="Isolated Settlement">Isolated Settlement</option>
              <option value="Operational Hospital">Operational Hospital</option>
              <option value="Emergency Shelter">Emergency Shelter</option>
              <option value="Hazard Zone">Hazard Zone</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Accessibility</label>
            <select
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value as AccessibilityStatus)}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="Accessible">Accessible</option>
              <option value="Partially Blocked">Partially Blocked</option>
              <option value="Impassable">Impassable</option>
              <option value="Aerial Only">Aerial Only</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-mono mb-1">Location Sector / Street</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="e.g., East Sector 6, near Market Crossroad"
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Latitude</label>
            <input
              type="number"
              step="0.0001"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-cyan-400 font-mono focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Longitude</label>
            <input
              type="number"
              step="0.0001"
              value={lng}
              onChange={(e) => setLng(Number(e.target.value))}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-cyan-400 font-mono focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Est. Affected</label>
            <input
              type="number"
              value={estimatedPeopleAffected}
              onChange={(e) => setEstimatedPeopleAffected(Number(e.target.value))}
              min={1}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-mono mb-1">Observed Damage Description</label>
          <textarea
            value={suspectedDamage}
            onChange={(e) => setSuspectedDamage(e.target.value)}
            placeholder="Detail damage extent, voids, rubble hazard, water level, or lifeline interruption..."
            rows={3}
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold font-display text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create & Auto-Score Incident</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
