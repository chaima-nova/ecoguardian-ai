import { createObservation } from '../../core/observations/observation.js';
import { detectAnomalousShifts } from '../../discovery/change/changeDetector.js';
import { discoverRelationships } from '../../discovery/relationships/relationshipDetector.js';
import { generateForesightSignal } from '../../foresight/forecasting/forecast.js';

const now = new Date().toISOString();

// Simulated multi-domain observations
const cityReadings = [
  createObservation({ entity: 'district_3', variable: 'surface_temp', value: 25, timestamp: now }),
  createObservation({ entity: 'district_3', variable: 'surface_temp', value: 43, timestamp: now }),
  createObservation({ entity: 'grid_substation_9', variable: 'power_load', value: 120, unit: 'MW', timestamp: now }),
  createObservation({ entity: 'grid_substation_9', variable: 'power_load', value: 340, unit: 'MW', timestamp: now })
];

// Mock historical city memory analogs
const historicalAnalogs = [
  {
    name: "2024 Urban Heat & Grid Overload Event",
    precursorVariables: ["surface_temp", "power_load"],
    historicalOutcome: "High probability of localized power grid strain or transformer failure"
  }
];

console.log("=== Running End-to-End Foresight Pipeline Test ===");

// 1. Discover changes
const changes = detectAnomalousShifts(cityReadings, 1.0);
console.log(`\n1. Discovered Changes: ${changes.length}`);

// 2. Discover relationships
const relationships = discoverRelationships(changes);
console.log(`2. Discovered Cross-Domain Relationships: ${relationships.length}`);

// 3. Generate foresight signal
const foresight = generateForesightSignal(relationships, historicalAnalogs);
console.log("\n3. Generated Probabilistic Foresight Signal:\n");
console.log(JSON.stringify(foresight, null, 2));
