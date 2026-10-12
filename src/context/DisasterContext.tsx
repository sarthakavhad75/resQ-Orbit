import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DisasterZone, 
  Incident, 
  IsolatedCommunity, 
  ChokePoint, 
  RescueTeam, 
  EmergencyAlert, 
  PriorityWeights,
  PriorityLevel,
  VerificationStatus,
  IncidentCategory
} from '../types/disaster';
import { 
  MOCK_DISASTER_ZONES, 
  MOCK_INCIDENTS, 
  MOCK_ISOLATED_COMMUNITIES, 
  MOCK_CHOKE_POINTS, 
  MOCK_RESCUE_TEAMS, 
  MOCK_ALERTS 
} from '../services/mockDisasterData';
import { DEFAULT_PRIORITY_WEIGHTS, calculatePriorityScore } from '../services/priorityEngine';

interface DisasterContextType {
  activeZone: DisasterZone;
  allZones: DisasterZone[];
  incidents: Incident[];
  allZoneIncidents: Incident[];
  isolatedCommunities: IsolatedCommunity[];
  chokePoints: ChokePoint[];
  rescueTeams: RescueTeam[];
  alerts: EmergencyAlert[];
  priorityWeights: PriorityWeights;
  selectedIncident: Incident | null;
  activeFilter: {
    search: string;
    priority: PriorityLevel | 'All';
    verification: VerificationStatus | 'All';
    category: IncidentCategory | 'All';
  };
  audioAlertsEnabled: boolean;
  
  // Actions
  selectZone: (zoneId: string) => void;
  setSelectedIncident: (incident: Incident | null) => void;
  verifyIncident: (incidentId: string) => void;
  assignTeamToIncident: (incidentId: string, teamName: string) => void;
  resolveIncident: (incidentId: string) => void;
  updateIncident: (incident: Incident) => void;
  addNewIncident: (incident: Omit<Incident, 'id' | 'lastUpdated' | 'priorityScore' | 'scoreBreakdown' | 'priorityLevel'>) => void;
  updateWeights: (newWeights: PriorityWeights) => void;
  acknowledgeAlert: (alertId: string) => void;
  setFilter: (filter: Partial<DisasterContextType['activeFilter']>) => void;
  toggleAudioAlerts: () => void;
  resetAllToDefaults: () => void;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allZones] = useState<DisasterZone[]>(MOCK_DISASTER_ZONES);
  const [activeZoneId, setActiveZoneId] = useState<string>(MOCK_DISASTER_ZONES[0].id);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [isolatedCommunities, setIsolatedCommunities] = useState<IsolatedCommunity[]>(MOCK_ISOLATED_COMMUNITIES);
  const [chokePoints, setChokePoints] = useState<ChokePoint[]>(MOCK_CHOKE_POINTS);
  const [rescueTeams, setRescueTeams] = useState<RescueTeam[]>(MOCK_RESCUE_TEAMS);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(MOCK_ALERTS);
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>(DEFAULT_PRIORITY_WEIGHTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [audioAlertsEnabled, setAudioAlertsEnabled] = useState<boolean>(true);

  const [activeFilter, setActiveFilter] = useState<{
    search: string;
    priority: PriorityLevel | 'All';
    verification: VerificationStatus | 'All';
    category: IncidentCategory | 'All';
  }>({
    search: '',
    priority: 'All',
    verification: 'All',
    category: 'All',
  });

  const activeZone = allZones.find(z => z.id === activeZoneId) || allZones[0];

  // Incidents for current zone
  const currentZoneIncidents = incidents.filter(inc => inc.zoneId === activeZone.id);
  const currentZoneIsolated = isolatedCommunities.filter(iso => iso.zoneId === activeZone.id);

  const selectZone = (zoneId: string) => {
    setActiveZoneId(zoneId);
    setSelectedIncident(null);
  };

  const setFilter = (newFilter: Partial<DisasterContextType['activeFilter']>) => {
    setActiveFilter(prev => ({ ...prev, ...newFilter }));
  };

  const verifyIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const nextStatus: VerificationStatus = inc.verificationStatus === 'Provisional' ? 'AI-Flagged' : 'Field-Verified';
        return {
          ...inc,
          verificationStatus: nextStatus,
          lastUpdated: 'Just now'
        };
      }
      return inc;
    }));

    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => prev ? { ...prev, verificationStatus: 'Field-Verified', lastUpdated: 'Just now' } : null);
    }
  };

  const assignTeamToIncident = (incidentId: string, teamName: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          assignedTeam: teamName,
          teamStatus: 'En Route',
          lastUpdated: 'Just now'
        };
      }
      return inc;
    }));

    setRescueTeams(prev => prev.map(team => {
      if (team.name === teamName) {
        return {
          ...team,
          status: 'Deployed',
          assignedIncidentId: incidentId
        };
      }
      return team;
    }));

    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => prev ? { ...prev, assignedTeam: teamName, teamStatus: 'En Route' } : null);
    }
  };

  const resolveIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          verificationStatus: 'Resolved',
          teamStatus: 'Completed',
          lastUpdated: 'Just now'
        };
      }
      return inc;
    }));

    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => prev ? { ...prev, verificationStatus: 'Resolved', teamStatus: 'Completed' } : null);
    }
  };

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(prev => prev.map(inc => inc.id === updatedIncident.id ? updatedIncident : inc));
    if (selectedIncident?.id === updatedIncident.id) {
      setSelectedIncident(updatedIncident);
    }
  };

  const addNewIncident = (newIncData: Omit<Incident, 'id' | 'lastUpdated' | 'priorityScore' | 'scoreBreakdown' | 'priorityLevel'>) => {
    // Calculate initial score using engine
    let damageSeverityRating: 'Total Collapse' | 'Heavy Structural' | 'Moderate Damage' | 'Infrastructure Severed' | 'Minor Hazard' = 'Moderate Damage';
    if (newIncData.category === 'Collapsed Structure') damageSeverityRating = 'Total Collapse';
    else if (newIncData.category === 'Blocked Road' || newIncData.category === 'Severed Bridge') damageSeverityRating = 'Infrastructure Severed';
    else if (newIncData.category === 'Damaged Building') damageSeverityRating = 'Heavy Structural';

    const scored = calculatePriorityScore({
      peopleAffected: newIncData.estimatedPeopleAffected,
      damageSeverityRating,
      accessibility: newIncData.accessibility,
      isHospitalOrLifeline: newIncData.category === 'Operational Hospital',
    }, priorityWeights);

    const newIncident: Incident = {
      ...newIncData,
      id: `INC-USR-${Date.now().toString().slice(-4)}`,
      priorityScore: scored.score,
      priorityLevel: scored.level,
      scoreBreakdown: scored.breakdown,
      lastUpdated: 'Just now',
    };

    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncident(newIncident);
  };

  const updateWeights = (newWeights: PriorityWeights) => {
    setPriorityWeights(newWeights);
    // Recalculate scores for all incidents with new weights
    setIncidents(prev => prev.map(inc => {
      let damageSeverityRating: 'Total Collapse' | 'Heavy Structural' | 'Moderate Damage' | 'Infrastructure Severed' | 'Minor Hazard' = 'Moderate Damage';
      if (inc.category === 'Collapsed Structure') damageSeverityRating = 'Total Collapse';
      else if (inc.category === 'Blocked Road' || inc.category === 'Severed Bridge') damageSeverityRating = 'Infrastructure Severed';
      else if (inc.category === 'Damaged Building') damageSeverityRating = 'Heavy Structural';

      const scored = calculatePriorityScore({
        peopleAffected: inc.estimatedPeopleAffected,
        damageSeverityRating,
        accessibility: inc.accessibility,
        isHospitalOrLifeline: inc.category === 'Operational Hospital',
      }, newWeights);

      return {
        ...inc,
        priorityScore: scored.score,
        priorityLevel: scored.level,
        scoreBreakdown: scored.breakdown
      };
    }));
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
  };

  const toggleAudioAlerts = () => {
    setAudioAlertsEnabled(prev => !prev);
  };

  const resetAllToDefaults = () => {
    setIncidents(MOCK_INCIDENTS);
    setPriorityWeights(DEFAULT_PRIORITY_WEIGHTS);
    setAlerts(MOCK_ALERTS);
  };

  return (
    <DisasterContext.Provider value={{
      activeZone,
      allZones,
      incidents: currentZoneIncidents,
      allZoneIncidents: incidents,
      isolatedCommunities: currentZoneIsolated,
      chokePoints,
      rescueTeams,
      alerts,
      priorityWeights,
      selectedIncident,
      activeFilter,
      audioAlertsEnabled,
      selectZone,
      setSelectedIncident,
      verifyIncident,
      assignTeamToIncident,
      resolveIncident,
      updateIncident,
      addNewIncident,
      updateWeights,
      acknowledgeAlert,
      setFilter,
      toggleAudioAlerts,
      resetAllToDefaults,
    }}>
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) throw new Error('useDisaster must be used within a DisasterProvider');
  return context;
};
