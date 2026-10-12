import React from 'react';
import { Modal } from '../common/Modal';
import { useDisaster } from '../../context/DisasterContext';
import { MapPin, Globe2, Activity, Users, ShieldAlert, Check } from 'lucide-react';

interface AreaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AreaSelectorModal: React.FC<AreaSelectorModalProps> = ({ isOpen, onClose }) => {
  const { allZones, activeZone, selectZone, allZoneIncidents } = useDisaster();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Active Disaster Operation Zone"
      subtitle="Switch tactical geospatial view, satellite passes, and incident telemetry"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allZones.map((zone) => {
          const isSelected = zone.id === activeZone.id;
          const zoneIncidents = allZoneIncidents.filter(i => i.zoneId === zone.id);
          const criticalCount = zoneIncidents.filter(i => i.priorityLevel === 'Critical').length;

          return (
            <div
              key={zone.id}
              onClick={() => {
                selectZone(zone.id);
                onClose();
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/80 to-space-900 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.2)]'
                  : 'bg-space-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-space-900'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                      <Globe2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white font-display leading-snug">
                        {zone.name}
                      </h4>
                      <p className="text-xs text-cyan-400/90 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {zone.region}, {zone.country}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="p-1 rounded-full bg-cyan-500 text-space-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {zone.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{zone.totalPopulationAtRisk.toLocaleString()} at risk</span>
                </div>

                <div className="flex items-center gap-2">
                  {criticalCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40">
                      {criticalCount} Critical
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {zoneIncidents.length} Incidents
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
