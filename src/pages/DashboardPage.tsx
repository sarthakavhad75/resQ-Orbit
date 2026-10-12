import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { MetricCard } from '../components/common/MetricCard';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { VerificationBadge, AccessibilityBadge } from '../components/common/StatusBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { RadarScanner } from '../components/common/RadarScanner';
import { 
  Building2, 
  ShieldAlert, 
  Network, 
  MapPin, 
  Satellite, 
  Clock, 
  Users, 
  Activity, 
  ArrowRight, 
  Compass, 
  Scan, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const DashboardPage: React.FC<{ 
  onNavigate: (page: string) => void;
  onSelectIncident: (incident: any) => void;
}> = ({ onNavigate, onSelectIncident }) => {
  const { activeZone, incidents, isolatedCommunities, chokePoints, allZones } = useDisaster();

  const criticalCount = incidents.filter(i => i.priorityLevel === 'Critical').length;
  const highCount = incidents.filter(i => i.priorityLevel === 'High').length;
  const mediumCount = incidents.filter(i => i.priorityLevel === 'Medium').length;
  const lowCount = incidents.filter(i => i.priorityLevel === 'Low').length;

  const totalPeopleAffected = incidents.reduce((acc, curr) => acc + curr.estimatedPeopleAffected, 0);
  const severedRoadsCount = chokePoints.filter(cp => cp.status === 'Severed' || cp.status === 'Submerged').length;

  // Pie chart data for priority distribution
  const priorityChartData = [
    { name: 'Critical', value: criticalCount, color: '#ef4444' },
    { name: 'High', value: highCount, color: '#f97316' },
    { name: 'Medium', value: mediumCount, color: '#eab308' },
    { name: 'Low', value: lowCount, color: '#22c55e' },
  ].filter(d => d.value > 0);

  // Bar chart data for category breakdown
  const categoryData = [
    { name: 'Collapsed', count: incidents.filter(i => i.category === 'Collapsed Structure').length },
    { name: 'Roads/Bridges', count: incidents.filter(i => i.category === 'Blocked Road' || i.category === 'Severed Bridge').length },
    { name: 'Isolated', count: incidents.filter(i => i.category === 'Isolated Settlement').length },
    { name: 'Hospitals', count: incidents.filter(i => i.category === 'Operational Hospital').length },
    { name: 'Shelters', count: incidents.filter(i => i.category === 'Emergency Shelter').length },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Notice */}
      <DisclaimerBanner />

      {/* Emergency Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-cyan-500/30 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-red-950 border border-red-500/50 text-red-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>ACTIVE DISASTER SECTOR</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Type: <strong className="text-cyan-400">{activeZone.disasterType}</strong>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            {activeZone.name}
          </h2>

          <p className="text-xs text-slate-300 flex items-center gap-1 font-mono">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeZone.region}, {activeZone.country}</span>
            <span className="text-slate-500">•</span>
            <span>Est. At Risk: <strong className="text-white">{activeZone.totalPopulationAtRisk.toLocaleString()}</strong></span>
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>GIS Map View</span>
          </button>

          <button
            onClick={() => onNavigate('ai-analysis')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-space-950 font-bold font-display text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          >
            <Scan className="w-4 h-4" />
            <span>AI Damage Scan</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Active Incidents"
          value={incidents.length}
          subtitle="Monitored in sector"
          icon={Activity}
          variant="cyan"
        />

        <MetricCard
          title="Critical Priority"
          value={criticalCount}
          subtitle="Life-hazard urgent"
          icon={ShieldAlert}
          variant="red"
        />

        <MetricCard
          title="Estimated Casualties"
          value={totalPeopleAffected.toLocaleString()}
          subtitle="Directly affected"
          icon={Users}
          variant="orange"
        />

        <MetricCard
          title="Severed Arterials"
          value={severedRoadsCount}
          subtitle="Blocked corridors"
          icon={Building2}
          variant="orange"
        />

        <MetricCard
          title="Isolated Hamlets"
          value={isolatedCommunities.length}
          subtitle="Cut off from aid"
          icon={Network}
          variant="purple"
        />

        <MetricCard
          title="Satellite Telemetry"
          value={activeZone.lastSatellitePass}
          subtitle={activeZone.primarySatellite.split(' ')[0]}
          icon={Satellite}
          variant="emerald"
        />
      </div>

      {/* Charts & Radar Live Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Radar & Priority Breakdown (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <RadarScanner 
            size={190} 
            activeTargetsCount={incidents.length} 
            satelliteName={activeZone.primarySatellite.split(' ')[0]} 
          />

          {/* Priority Donut Chart */}
          <div className="p-4 rounded-xl bg-space-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">Triage Priority Ratio</span>
              <span className="text-cyan-400">{incidents.length} Total</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {priorityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#080e1e',
                      borderColor: '#00f2fe',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-400">Critical: {criticalCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span className="text-slate-400">High: {highCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-400">Medium: {mediumCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-400">Low: {lowCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Incident Feed & Categories Bar Chart (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Incident Category Bar Chart */}
          <div className="p-4 rounded-xl bg-space-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">Damage Categories & Lifeline Assets</span>
              <span className="text-cyan-400">AI GeoJSON Classified</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#080e1e',
                      borderColor: '#00f2fe',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Bar dataKey="count" fill="#00f2fe" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Incident Monitoring Stream */}
          <div className="p-4 rounded-xl bg-space-900/90 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Live Incident Telemetry Stream
                </h4>
              </div>

              <button
                onClick={() => onNavigate('operations')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Full Operations Grid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
              {incidents.slice(0, 4).map((incident) => (
                <div
                  key={incident.id}
                  onClick={() => onSelectIncident(incident)}
                  className="p-3 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400/60 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-cyan-400">{incident.id}</span>
                      <span className="text-slate-400">[{incident.category}]</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{incident.lastUpdated}</span>
                    </div>

                    <h5 className="font-bold text-white text-xs font-display group-hover:text-cyan-300 transition-colors">
                      {incident.title}
                    </h5>

                    <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                      {incident.suspectedDamage}
                    </p>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-end justify-between gap-1.5">
                    <PriorityBadge 
                      level={incident.priorityLevel} 
                      score={incident.priorityScore} 
                      size="sm" 
                    />
                    <div className="text-[10px] font-mono text-slate-400">
                      {incident.estimatedPeopleAffected.toLocaleString()} pax affected
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
