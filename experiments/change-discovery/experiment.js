import { createObservation } from '../../core/observations/observation.js';
import { detectAnomalousShifts } from '../../discovery/change/changeDetector.js';

const mockCityData = [
  createObservation({ entity: 'zone_a', variable: 'ambient_temp', value: 24, unit: 'C' }),
  createObservation({ entity: 'zone_a', variable: 'ambient_temp', value: 25, unit: 'C' }),
  createObservation({ entity: 'zone_a', variable: 'ambient_temp', value: 24.5, unit: 'C' }),
  createObservation({ entity: 'zone_a', variable: 'ambient_temp', value: 38, unit: 'C' }),
  createObservation({ entity: 'sensor_12', variable: 'traffic_flow', value: 100, unit: 'cars/min' }),
  createObservation({ entity: 'sensor_12', variable: 'traffic_flow', value: 105, unit: 'cars/min' }),
  createObservation({ entity: 'sensor_12', variable: 'traffic_flow', value: 12, unit: 'cars/min' })
];

console.log("=== Running EcoGuardian Discovery Engine Test ===");
const discoveredChanges = detectAnomalousShifts(mockCityData, 1.2);

console.log(`Discovered ${discoveredChanges.length} candidate changes humans didn't explicitly flag:\n`);
console.log(JSON.stringify(discoveredChanges, null, 2));
