import { PriorityLevel, PriorityWeights } from '../types/disaster';

export const DEFAULT_PRIORITY_WEIGHTS: PriorityWeights = {
  population: 0.30,
  damageSeverity: 0.30,
  isolationUrgency: 0.20,
  vulnerability: 0.20,
  timeDecay: 0.00 // decay factor multiplier
};

export interface PriorityCalculationResult {
  score: number; // 0 - 100
  level: PriorityLevel;
  breakdown: {
    populationScore: number;
    damageScore: number;
    isolationScore: number;
    vulnerabilityScore: number;
    timeDecayFactor: number;
    rationale: string[];
  };
}

/**
 * Transparent Priority Calculation Engine
 * 
 * Formula:
 * RawScore = (w_pop * PopScore) + (w_dmg * DamageScore) + (w_iso * IsolationScore) + (w_vuln * VulnScore)
 * FinalScore = Math.min(100, Math.max(0, RawScore * DecayFactor))
 */
export function calculatePriorityScore(
  params: {
    peopleAffected: number;
    damageSeverityRating: 'Total Collapse' | 'Heavy Structural' | 'Moderate Damage' | 'Infrastructure Severed' | 'Minor Hazard' | 'Safe/Staging';
    accessibility: 'Accessible' | 'Partially Blocked' | 'Impassable' | 'Aerial Only';
    hasVulnerablePopulations?: boolean; // Elderly, children, hospital patients, pregnant
    hoursSinceObservation?: number;
    isHospitalOrLifeline?: boolean;
  },
  weights: PriorityWeights = DEFAULT_PRIORITY_WEIGHTS
): PriorityCalculationResult {
  const rationale: string[] = [];

  // 1. Population Score (0 - 100 scale)
  let popNorm = 0;
  if (params.peopleAffected >= 2000) popNorm = 100;
  else if (params.peopleAffected >= 500) popNorm = 85;
  else if (params.peopleAffected >= 100) popNorm = 70;
  else if (params.peopleAffected >= 20) popNorm = 50;
  else popNorm = Math.min(40, params.peopleAffected * 2);

  const popScore = popNorm * weights.population;
  if (params.peopleAffected > 100) {
    rationale.push(`High estimated affected density (~${params.peopleAffected.toLocaleString()} individuals).`);
  }

  // 2. Damage Severity Score (0 - 100 scale)
  let dmgNorm = 0;
  switch (params.damageSeverityRating) {
    case 'Total Collapse':
      dmgNorm = 100;
      rationale.push('Total structural collapse with probable voids / trapped survivors.');
      break;
    case 'Heavy Structural':
      dmgNorm = 85;
      rationale.push('Severe structural degradation and immediate collapse hazard.');
      break;
    case 'Infrastructure Severed':
      dmgNorm = 80;
      rationale.push('Arterial transport or bridge lifeline severed.');
      break;
    case 'Moderate Damage':
      dmgNorm = 55;
      rationale.push('Moderate exterior/roof damage; shelter integrity degraded.');
      break;
    case 'Minor Hazard':
      dmgNorm = 25;
      break;
    case 'Safe/Staging':
      dmgNorm = 10;
      break;
  }
  const damageScore = dmgNorm * weights.damageSeverity;

  // 3. Isolation Score (0 - 100 scale)
  let isoNorm = 0;
  switch (params.accessibility) {
    case 'Aerial Only':
      isoNorm = 100;
      rationale.push('Geographically isolated; ground routes impassable (requires air-drop / helicopter winch).');
      break;
    case 'Impassable':
      isoNorm = 85;
      rationale.push('Ground convoy blocked by heavy debris or severed bridge.');
      break;
    case 'Partially Blocked':
      isoNorm = 50;
      rationale.push('Restricted single-lane or off-road vehicle access only.');
      break;
    case 'Accessible':
      isoNorm = 15;
      break;
  }
  const isolationScore = isoNorm * weights.isolationUrgency;

  // 4. Vulnerability Score (0 - 100 scale)
  let vulnNorm = 30;
  if (params.isHospitalOrLifeline) {
    vulnNorm = 100;
    rationale.push('Critical healthcare/lifeline facility with medical dependency.');
  } else if (params.hasVulnerablePopulations) {
    vulnNorm = 80;
    rationale.push('High concentration of vulnerable persons (infants, elderly, or critical trauma).');
  }
  const vulnerabilityScore = vulnNorm * weights.vulnerability;

  // 5. Time Factor (Freshness / urgency decay or escalation)
  const hours = params.hoursSinceObservation || 1;
  // If no rescue in 48 hours, urgency escalates
  const timeEscalation = hours > 24 ? 1.05 : 1.0;

  const totalWeighted = (popScore + damageScore + isolationScore + vulnerabilityScore) * timeEscalation;
  const finalScore = Math.round(Math.min(100, Math.max(5, totalWeighted)));

  // Category Assignment
  let level: PriorityLevel = 'Low';
  if (finalScore >= 80) level = 'Critical';
  else if (finalScore >= 60) level = 'High';
  else if (finalScore >= 35) level = 'Medium';
  else level = 'Low';

  return {
    score: finalScore,
    level,
    breakdown: {
      populationScore: Math.round(popScore),
      damageScore: Math.round(damageScore),
      isolationScore: Math.round(isolationScore),
      vulnerabilityScore: Math.round(vulnerabilityScore),
      timeDecayFactor: timeEscalation,
      rationale: rationale.length > 0 ? rationale : ['Standard triage monitoring parameters.']
    }
  };
}
