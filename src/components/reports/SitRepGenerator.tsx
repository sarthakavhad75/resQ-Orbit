import React from 'react';
import { DisasterZone, Incident, IsolatedCommunity, SatellitePass } from '../../types/disaster';
import { Printer, Download, FileText, Globe2, ShieldCheck, Activity, Users, AlertTriangle } from 'lucide-react';
import { exportIncidentsToCSV, exportIncidentsToGeoJSON } from '../../services/exportService';

interface SitRepGeneratorProps {
  zone: DisasterZone;
  incidents: Incident[];
  isolatedCommunities: IsolatedCommunity[];
  satellitePasses: SatellitePass[];
}

export const SitRepGenerator: React.FC<SitRepGeneratorProps> = ({
  zone,
  incidents,
  isolatedCommunities,
  satellitePasses
}) => {
  const criticalCount = incidents.filter(i => i.priorityLevel === 'Critical').length;
  const highCount = incidents.filter(i => i.priorityLevel === 'High').length;
  const verifiedCount = incidents.filter(i => i.verificationStatus === 'Field-Verified').length;
  const totalAffected = incidents.reduce((acc, curr) => acc + curr.estimatedPeopleAffected, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* SitRep Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-space-900/90 p-4 rounded-xl border border-cyan-500/20 no-print">
        <div>
          <h3 className="font-bold text-white font-display text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Official Disaster Situation Report (SitRep)
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Auto-compiled emergency operations briefing ready for field commanders & UN OCHA format
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportIncidentsToCSV(incidents, zone.name)}
            className="px-3.5 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => exportIncidentsToGeoJSON(incidents, zone)}
            className="px-3.5 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Globe2 className="w-4 h-4 text-purple-400" />
            <span>GeoJSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold font-display text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            <span>Print SitRep</span>
          </button>
        </div>
      </div>

      {/* Printable SitRep Document */}
      <div className="p-6 md:p-8 rounded-2xl bg-space-900/90 border border-slate-800 text-slate-200 space-y-6 shadow-2xl printable-document">
        {/* SitRep Document Header */}
        <div className="border-b-2 border-cyan-500/40 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-400/50 font-mono text-xs font-bold">
                RESCUESAT AI OPERATIONAL SITREP
              </span>
              <span className="text-xs font-mono text-slate-400">DOC REF: RS-EOC-{Date.now().toString().slice(-6)}</span>
            </div>
            <h2 className="text-2xl font-black font-display text-white mt-2">
              {zone.name}
            </h2>
            <p className="text-xs font-mono text-cyan-400 mt-1">
              Region: {zone.region}, {zone.country} • Disaster Type: {zone.disasterType}
            </p>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <div className="text-slate-400">Generated: <strong className="text-white">{new Date().toUTCString()}</strong></div>
            <div className="text-slate-400">Telemetry Pass: <strong className="text-cyan-400">{zone.primarySatellite.split(' ')[0]}</strong></div>
            <div className="text-slate-400">Status: <strong className="text-red-400 uppercase font-bold">{zone.status}</strong></div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            1. Tactical Situation Overview
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {zone.summary}
          </p>
        </div>

        {/* Section 2: Key Operational Metrics Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            2. High-Level Telemetry Metrics
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <div className="text-slate-400">Critical Incidents</div>
              <div className="text-xl font-bold text-red-400 mt-0.5">{criticalCount}</div>
            </div>

            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <div className="text-slate-400">High Risk Incidents</div>
              <div className="text-xl font-bold text-orange-400 mt-0.5">{highCount}</div>
            </div>

            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <div className="text-slate-400">Field-Verified</div>
              <div className="text-xl font-bold text-cyan-400 mt-0.5">{verifiedCount} / {incidents.length}</div>
            </div>

            <div className="p-3 rounded-xl bg-space-950 border border-slate-800">
              <div className="text-slate-400">Est. Casualties/Affected</div>
              <div className="text-xl font-bold text-white mt-0.5">{totalAffected.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Section 3: Critical Incidents Roster */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            3. Priority Incidents Requiring Immediate Action
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-[11px] text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2">ID</th>
                  <th className="py-2">Location & Category</th>
                  <th className="py-2">Score</th>
                  <th className="py-2">Casualties</th>
                  <th className="py-2">Access</th>
                  <th className="py-2">Assigned Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="py-2">
                    <td className="py-2 text-cyan-400 font-bold">{inc.id}</td>
                    <td className="py-2">
                      <div className="text-white font-sans font-semibold">{inc.title}</div>
                      <div className="text-[10px] text-slate-400">{inc.locationName}</div>
                    </td>
                    <td className="py-2">
                      <span className={`font-bold ${inc.priorityLevel === 'Critical' ? 'text-red-400' : 'text-orange-400'}`}>
                        {inc.priorityScore} ({inc.priorityLevel})
                      </span>
                    </td>
                    <td className="py-2 text-slate-300">{inc.estimatedPeopleAffected.toLocaleString()}</td>
                    <td className="py-2 text-slate-300">{inc.accessibility}</td>
                    <td className="py-2 text-slate-300">{inc.assignedTeam || 'None'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Isolated Communities Status */}
        {isolatedCommunities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-1">
              4. Isolated Settlements & Aerial Supply Requirements
            </h4>

            <div className="space-y-2 font-mono text-xs">
              {isolatedCommunities.map((iso) => (
                <div key={iso.id} className="p-3 rounded-lg bg-space-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-white">{iso.name} ({iso.population} people)</div>
                    <div className="text-[11px] text-slate-400">Blockage: {iso.primaryBlockage} • Days Isolated: {iso.daysIsolated}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-300 font-bold">{iso.suppliesStatus}</div>
                    <div className="text-[10px] text-slate-400">Nearest Clinic: {iso.nearestFacilityName} ({iso.nearestFacilityDistanceKm} km)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SitRep Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
          <div>RESCUESAT AI • DECISION SUPPORT SYSTEM • UN CONFIDENTIAL EOC BRIEFING</div>
          <div>Page 1 of 1 • System Checksum: SHA256-RS9948</div>
        </div>
      </div>
    </div>
  );
};
