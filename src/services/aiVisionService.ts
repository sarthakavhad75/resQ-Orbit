import { AIAnalysisResult, DisasterType } from '../types/disaster';

export interface SamplePresetImage {
  id: string;
  title: string;
  disasterType: DisasterType;
  description: string;
  previewUrl: string;
  satelliteSensor: string;
  locationName: string;
  resolution: string;
}

export const SAMPLE_PRESET_IMAGES: SamplePresetImage[] = [
  {
    id: 'sample-eq-antakya',
    title: 'Kahramanmaraş M7.8 Urban Collapse Zone',
    disasterType: 'Earthquake',
    description: 'Post-event 0.3m optical imagery showing pancake collapses, rubble debris spread, and blocked boulevards.',
    previewUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d27575db?auto=format&fit=crop&w=1200&q=80',
    satelliteSensor: 'WorldView-3 Panchromatic Sharpened',
    locationName: 'Antakya Central Urban Quad',
    resolution: '0.3m GSD'
  },
  {
    id: 'sample-flood-valencia',
    title: 'Valencia Turia Flash Inundation Basin',
    disasterType: 'Flood',
    description: 'Multi-temporal SAR and optical composite showing submerged ravines, stranded vehicle concentrations, and bridge scour.',
    previewUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    satelliteSensor: 'Sentinel-1C SAR + Sentinel-2 MSI',
    locationName: 'Paiporta - Sedaví Ravine Delta',
    resolution: '10m Multi-spectral'
  },
  {
    id: 'sample-landslide-wayanad',
    title: 'Wayanad Mountainous Debris Flow & Scar',
    disasterType: 'Landslide',
    description: 'High-altitude multi-spectral pass capturing the 6km mudflow track, washed bridge, and submerged tea estate quarters.',
    previewUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    satelliteSensor: 'PlanetScope Dove-R 8-Band',
    locationName: 'Chooralmala - Mundakkai Basin',
    resolution: '3.0m High-Cadence'
  },
  {
    id: 'sample-cyclone-mocha',
    title: 'Cyclone Mocha Storm Surge & Coastal Shearing',
    disasterType: 'Cyclone',
    description: 'Post-landfall imagery with severe roof damage indexing, inundated saltwater marshes, and severed jetty access.',
    previewUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    satelliteSensor: 'Landsat-9 OLI-2 Thermal / SWIR',
    locationName: 'Sittwe Coastal Peninsula',
    resolution: '15m Multispectral'
  }
];

export async function analyzeSatelliteImage(
  imageSrc: string,
  fileName: string,
  fileSize: string,
  disasterType: DisasterType,
  isSimulatedDemo: boolean = true
): Promise<AIAnalysisResult> {
  // Simulate AI inference latency with realistic computer vision timeline (1.8s - 2.4s)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (disasterType === 'Earthquake') {
    return {
      id: `AI-SCAN-${Date.now()}`,
      fileName,
      fileSize,
      imagePreviewUrl: imageSrc,
      disasterType: 'Earthquake',
      analysisTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      overallDamageScore: 89,
      estimatedStructuresDamaged: 42,
      estimatedRoadsInterrupted: 7,
      confidenceOverall: 94.6,
      processingTimeMs: 2140,
      modelArchitecture: 'YOLOv8x-OBB + Segment Anything Geospatial (SAM-Geo v2)',
      isSimulated: isSimulatedDemo,
      rawSatelliteMetadata: {
        satellite: 'Sentinel-2B / WorldView-3 Synthetic Blend',
        groundSamplingDistance: '0.35m GSD',
        cloudCoverPercentage: 8.4,
        spectralBands: 'B2(Blue), B3(Green), B4(Red), B8(NIR), B12(SWIR-2)'
      },
      detectedItems: [
        {
          id: 'DET-EQ-01',
          type: 'Structural Collapse',
          confidence: 97.2,
          severity: 'Critical',
          box: [22, 18, 54, 46], // [ymin, xmin, ymax, xmax] %
          affectedBuildings: 14,
          areaEstimate: '18,500 m²',
          recommendation: 'Immediate Heavy USAR deployment; acoustic listening required.'
        },
        {
          id: 'DET-EQ-02',
          type: 'Severe Roof Damage',
          confidence: 91.8,
          severity: 'Severe',
          box: [58, 52, 85, 84],
          affectedBuildings: 28,
          areaEstimate: '32,000 m²',
          recommendation: 'Structural tagging (RED - Unsafe for occupancy); evacuate surrounding perimeter.'
        },
        {
          id: 'DET-EQ-03',
          type: 'Road Breach',
          confidence: 94.0,
          severity: 'Critical',
          box: [40, 48, 62, 60],
          areaEstimate: '450m linear highway',
          recommendation: 'Deploy heavy bulldozers to clear arterial rubble corridor.'
        }
      ]
    };
  } else if (disasterType === 'Flood') {
    return {
      id: `AI-SCAN-${Date.now()}`,
      fileName,
      fileSize,
      imagePreviewUrl: imageSrc,
      disasterType: 'Flood',
      analysisTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      overallDamageScore: 84,
      estimatedStructuresDamaged: 115,
      estimatedFloodedAreaSqKm: 14.8,
      estimatedRoadsInterrupted: 12,
      confidenceOverall: 96.1,
      processingTimeMs: 1980,
      modelArchitecture: 'DeepLabV3+ ResNet101 Water Index Segmentation',
      isSimulated: isSimulatedDemo,
      rawSatelliteMetadata: {
        satellite: 'Sentinel-1C Synthetic Aperture Radar (SAR VV+VH)',
        groundSamplingDistance: '10.0m GSD',
        cloudCoverPercentage: 0.0, // Radar penetrates clouds
        spectralBands: 'C-Band Radar Polarimetry VV / VH Coherence'
      },
      detectedItems: [
        {
          id: 'DET-FL-01',
          type: 'Flooding / Water Inundation',
          confidence: 98.4,
          severity: 'Critical',
          box: [15, 12, 75, 88],
          areaEstimate: '14.8 km² submerged',
          affectedBuildings: 92,
          recommendation: 'Deploy swiftwater rescue boats & amphibious transport.'
        },
        {
          id: 'DET-FL-02',
          type: 'Road Breach',
          confidence: 93.7,
          severity: 'Critical',
          box: [48, 25, 68, 65],
          areaEstimate: '3 bridges submerged / scour detected',
          recommendation: 'Close arterial underpasses; reroute emergency traffic via elevated northern loop.'
        }
      ]
    };
  } else if (disasterType === 'Landslide') {
    return {
      id: `AI-SCAN-${Date.now()}`,
      fileName,
      fileSize,
      imagePreviewUrl: imageSrc,
      disasterType: 'Landslide',
      analysisTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      overallDamageScore: 92,
      estimatedStructuresDamaged: 36,
      estimatedRoadsInterrupted: 4,
      confidenceOverall: 93.8,
      processingTimeMs: 2210,
      modelArchitecture: 'GeoAI UNet-Morphological Landslide Scar Classifier',
      isSimulated: isSimulatedDemo,
      rawSatelliteMetadata: {
        satellite: 'PlanetScope Dove-R (3m) + Cartosat-3 Optical',
        groundSamplingDistance: '3.0m GSD',
        cloudCoverPercentage: 14.2,
        spectralBands: 'Red-Edge, NIR-1, NIR-2, NDVI Difference Matrix'
      },
      detectedItems: [
        {
          id: 'DET-LS-01',
          type: 'Debris Spread',
          confidence: 96.0,
          severity: 'Critical',
          box: [10, 30, 90, 68],
          areaEstimate: '5.2 km mudflow path',
          affectedBuildings: 36,
          recommendation: 'Air-lift K9 search teams; erect safety geophones for secondary slides.'
        },
        {
          id: 'DET-LS-02',
          type: 'Road Breach',
          confidence: 98.1,
          severity: 'Critical',
          box: [45, 42, 58, 56],
          areaEstimate: '100m bridge washed away',
          recommendation: 'Deploy Bailey bridge military engineering battalion.'
        }
      ]
    };
  } else {
    // Cyclone / Default
    return {
      id: `AI-SCAN-${Date.now()}`,
      fileName,
      fileSize,
      imagePreviewUrl: imageSrc,
      disasterType: 'Cyclone',
      analysisTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      overallDamageScore: 81,
      estimatedStructuresDamaged: 240,
      estimatedFloodedAreaSqKm: 8.3,
      estimatedRoadsInterrupted: 9,
      confidenceOverall: 92.4,
      processingTimeMs: 1890,
      modelArchitecture: 'Multi-Modal Cyclone Wind & Surge Damage Estimator',
      isSimulated: isSimulatedDemo,
      rawSatelliteMetadata: {
        satellite: 'NASA Landsat-9 + Sentinel-3 OLCI',
        groundSamplingDistance: '15.0m GSD',
        cloudCoverPercentage: 22.0,
        spectralBands: 'Coastal Aerosol, SWIR, NDWI, Thermal Infrared'
      },
      detectedItems: [
        {
          id: 'DET-CY-01',
          type: 'Severe Roof Damage',
          confidence: 94.2,
          severity: 'Severe',
          box: [20, 20, 80, 80],
          affectedBuildings: 210,
          areaEstimate: '4.8 km² footprint',
          recommendation: 'Emergency tarpaulin air-drops & generator fuel delivery.'
        },
        {
          id: 'DET-CY-02',
          type: 'Flooding / Water Inundation',
          confidence: 91.0,
          severity: 'Severe',
          box: [60, 15, 92, 85],
          areaEstimate: '8.3 km² tidal surge',
          recommendation: 'Distribute clean water purification kits; cholera prophylactic staging.'
        }
      ]
    };
  }
}
