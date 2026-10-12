import { SatellitePass } from '../types/disaster';
import { MOCK_SATELLITE_PASSES } from './mockDisasterData';

export function getActiveSatellitePasses(): SatellitePass[] {
  return MOCK_SATELLITE_PASSES;
}

export function getNextConstellationPassInfo(zoneName: string) {
  return {
    nextPassInMinutes: 42,
    constellation: 'Copernicus Sentinel-2B',
    sensorType: 'Multispectral 13-Band (VNIR/SWIR)',
    orbitalVelocityKmS: 7.45,
    altitudeKm: 786,
    groundCoverageKm: '290 km swath',
    statusText: 'Telemetry Lock Active — Downlinking to Maspalomas Ground Station'
  };
}
