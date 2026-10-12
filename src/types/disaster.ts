export type DisasterType = 'Earthquake' | 'Flood' | 'Cyclone' | 'Landslide' | 'Tsunami' | 'Wildfire';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type VerificationStatus = 'Provisional' | 'AI-Flagged' | 'Field-Verified' | 'Resolved';

export type IncidentCategory = 
  | 'Damaged Building' 
  | 'Collapsed Structure'
  | 'Blocked Road' 
  | 'Severed Bridge' 
  | 'Isolated Settlement' 
  | 'Operational Hospital' 
  | 'Emergency Shelter' 
  | 'Rescue Team' 
  | 'Hazard Zone';

export type AccessibilityStatus = 'Accessible' | 'Partially Blocked' | 'Impassable' | 'Aerial Only';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  zoneId: string;
  title: string;
  category: IncidentCategory;
  disasterType: DisasterType;
  coordinates: Coordinates;
  locationName: string;
  suspectedDamage: string;
  estimatedPeopleAffected: number;
  accessibility: AccessibilityStatus;
  priorityLevel: PriorityLevel;
  priorityScore: number; // 0 - 100
  scoreBreakdown: {
    populationScore: number;
    damageScore: number;
    isolationScore: number;
    vulnerabilityScore: number;
    timeDecayFactor: number;
    rationale: string[];
  };
  verificationStatus: VerificationStatus;
  confidenceScore: number; // 0 - 100 (%)
  dataSource: string; // e.g., 'Sentinel-2 Multispectral'
  observationTime: string;
  lastUpdated: string;
  assignedTeam?: string;
  teamStatus?: 'En Route' | 'On Scene' | 'Standby' | 'Completed';
  notes?: string;
  isSimulated: boolean;
}

export interface DisasterZone {
  id: string;
  name: string;
  country: string;
  region: string;
  disasterType: DisasterType;
  center: Coordinates;
  zoom: number;
  declarationDate: string;
  status: 'Active Disaster' | 'Monitoring' | 'Recovery Phase';
  summary: string;
  totalPopulationAtRisk: number;
  primarySatellite: string;
  lastSatellitePass: string;
}

export interface IsolatedCommunity {
  id: string;
  zoneId: string;
  name: string;
  coordinates: Coordinates;
  population: number;
  daysIsolated: number;
  primaryBlockage: string;
  accessibility: AccessibilityStatus;
  nearestFacilityDistanceKm: number;
  nearestFacilityName: string;
  suppliesStatus: 'Critical (Under 24h)' | 'Urgent (24-48h)' | 'Moderate (3-5 days)' | 'Stable';
  airDropRequired: boolean;
  medicalUrgency: 'Extreme' | 'Elevated' | 'Standard';
  urgencyScore: number;
  verificationStatus: VerificationStatus;
}

export interface ChokePoint {
  id: string;
  name: string;
  type: 'Bridge' | 'Highway' | 'Mountain Pass' | 'Causeway';
  status: 'Severed' | 'Submerged' | 'Debris Blocked' | 'Clear';
  coordinates: Coordinates;
  alternateRouteKm: number;
  detourFeasibility: 'Possible' | 'Impractical' | 'None';
}

export interface AIDetectionItem {
  id: string;
  type: 'Structural Collapse' | 'Severe Roof Damage' | 'Flooding / Water Inundation' | 'Road Breach' | 'Debris Spread';
  confidence: number;
  severity: 'Critical' | 'Severe' | 'Moderate' | 'Minor';
  box?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] relative 0-100%
  areaEstimate?: string;
  affectedBuildings?: number;
  recommendation: string;
}

export interface AIAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  imagePreviewUrl: string;
  disasterType: DisasterType;
  analysisTimestamp: string;
  overallDamageScore: number; // 0 - 100
  estimatedStructuresDamaged: number;
  estimatedFloodedAreaSqKm?: number;
  estimatedRoadsInterrupted: number;
  detectedItems: AIDetectionItem[];
  confidenceOverall: number;
  processingTimeMs: number;
  modelArchitecture: string; // e.g., "YOLOv8-OBB + SAM Geospatial (Simulated)"
  isSimulated: boolean;
  rawSatelliteMetadata: {
    satellite: string;
    groundSamplingDistance: string;
    cloudCoverPercentage: number;
    spectralBands: string;
  };
}

export interface SatellitePass {
  id: string;
  satelliteName: string;
  agency: 'ESA Copernicus' | 'NASA / USGS' | 'DLR' | 'Maxar' | 'Planet Labs';
  sensorType: 'Optical Multispectral' | 'Synthetic Aperture Radar (SAR)' | 'High-Res Optical' | 'Thermal IR';
  resolution: string;
  lastPass: string;
  nextPass: string;
  coverageStatus: 'Complete' | 'Partial' | 'Pending Cloud Clearance';
  cloudCover: number;
  status: 'Active Orbit' | 'Calibrating' | 'Downlinking';
}

export interface EmergencyAlert {
  id: string;
  title: string;
  level: 'Critical' | 'High' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  zone: string;
  source: string;
  acknowledged: boolean;
}

export interface RescueTeam {
  id: string;
  name: string;
  agency: string;
  type: 'USAR (Heavy)' | 'Swiftwater Rescue' | 'Medevac Aviation' | 'K9 Search' | 'GIS Logistics';
  status: 'Available' | 'Deployed' | 'Resting' | 'In Transit';
  currentLocation: string;
  assignedIncidentId?: string;
  personnelCount: number;
  equipment: string[];
}

export interface PriorityWeights {
  population: number; // 0 - 1
  damageSeverity: number; // 0 - 1
  isolationUrgency: number; // 0 - 1
  vulnerability: number; // 0 - 1
  timeDecay: number; // 0 - 1
}
