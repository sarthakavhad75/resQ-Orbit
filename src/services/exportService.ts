import { Incident, DisasterZone } from '../types/disaster';

export function exportIncidentsToCSV(incidents: Incident[], zoneName: string) {
  const headers = [
    'Incident ID',
    'Disaster Type',
    'Category',
    'Location Name',
    'Latitude',
    'Longitude',
    'Priority Level',
    'Priority Score',
    'People Affected',
    'Accessibility',
    'Verification Status',
    'Confidence Score (%)',
    'Data Source',
    'Assigned Team',
    'Last Updated',
    'Suspected Damage'
  ];

  const rows = incidents.map(inc => [
    `"${inc.id}"`,
    `"${inc.disasterType}"`,
    `"${inc.category}"`,
    `"${inc.locationName.replace(/"/g, '""')}"`,
    inc.coordinates.lat,
    inc.coordinates.lng,
    `"${inc.priorityLevel}"`,
    inc.priorityScore,
    inc.estimatedPeopleAffected,
    `"${inc.accessibility}"`,
    `"${inc.verificationStatus}"`,
    inc.confidenceScore,
    `"${inc.dataSource}"`,
    `"${inc.assignedTeam || 'Unassigned'}"`,
    `"${inc.lastUpdated}"`,
    `"${inc.suspectedDamage.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `RescueSat_SitRep_${zoneName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportIncidentsToGeoJSON(incidents: Incident[], zone: DisasterZone) {
  const geojson = {
    type: 'FeatureCollection',
    metadata: {
      platform: 'RescueSat AI Decision Support System',
      disasterZone: zone.name,
      generatedAt: new Date().toISOString(),
      activeIncidentsCount: incidents.length
    },
    features: incidents.map(inc => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [inc.coordinates.lng, inc.coordinates.lat]
      },
      properties: {
        id: inc.id,
        title: inc.title,
        category: inc.category,
        disasterType: inc.disasterType,
        priorityLevel: inc.priorityLevel,
        priorityScore: inc.priorityScore,
        estimatedPeopleAffected: inc.estimatedPeopleAffected,
        accessibility: inc.accessibility,
        verificationStatus: inc.verificationStatus,
        confidenceScore: inc.confidenceScore,
        dataSource: inc.dataSource,
        observationTime: inc.observationTime,
        assignedTeam: inc.assignedTeam || null,
        suspectedDamage: inc.suspectedDamage
      }
    }))
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geojson, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `RescueSat_Geospatial_${zone.id}_${new Date().toISOString().slice(0, 10)}.geojson`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
