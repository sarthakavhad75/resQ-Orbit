import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Map as MapIcon, 
  Scan, 
  Network, 
  ShieldAlert, 
  FileText, 
  Info,
  ChevronRight,
  Activity,
  Layers
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onNavigate,
  collapsed = false 
}) => {
  const { incidents, isolatedCommunities, alerts } = useDisaster();

  const criticalIncidentsCount = incidents.filter(i => i.priorityLevel === 'Critical').length;
  const isolatedCount = isolatedCommunities.length;
  const activeAlertsCount = alerts.filter(a => !a.acknowledged).length;

  const navItems = [
    {
      id: 'landing',
      label: 'Home / Mission',
      icon: Home,
      badge: null
    },
    {
      id: 'dashboard',
      label: 'Emergency Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'map',
      label: 'Satellite GIS Map',
      icon: MapIcon,
      badge: incidents.length > 0 ? incidents.length : null,
      badgeColor: 'bg-cyan-900/80 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'ai-analysis',
      label: 'AI Damage Analysis',
      icon: Scan,
      badge: 'AI-CV',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/40'
    },
    {
      id: 'connectivity',
      label: 'Isolated Communities',
      icon: Network,
      badge: isolatedCount > 0 ? `${isolatedCount} Cut Off` : null,
      badgeColor: 'bg-orange-950 text-orange-300 border-orange-500/40'
    },
    {
      id: 'operations',
      label: 'Rescue Operations',
      icon: ShieldAlert,
      badge: criticalIncidentsCount > 0 ? `${criticalIncidentsCount} Critical` : null,
      badgeColor: 'bg-red-950 text-red-300 border-red-500/50'
    },
    {
      id: 'reports',
      label: 'Reports & Alerts',
      icon: FileText,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null,
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/40'
    },
    {
      id: 'about',
      label: 'About Project',
      icon: Info,
      badge: null
    },
  ];

  return (
    <aside className="w-64 bg-space-950/95 border-r border-cyan-500/20 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Top Nav Links */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center justify-between">
          <span>Command Modules</span>
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-space-850 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.15)] font-semibold'
                  : 'text-slate-300 hover:bg-space-900 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Telemetry Card */}
      <div className="p-3 border-t border-slate-800/80 bg-space-900/60">
        <div className="p-3 rounded-xl bg-space-950/80 border border-cyan-500/20 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SATELLITE MESH
            </span>
            <span className="text-cyan-400 font-semibold">99.8% ONLINE</span>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[94%]" />
          </div>

          <div className="text-[10px] text-slate-400 font-mono leading-tight">
            Sentinel-2B • Landsat-9 • TerraSAR-X Constellations In Sync
          </div>
        </div>
      </div>
    </aside>
  );
};
