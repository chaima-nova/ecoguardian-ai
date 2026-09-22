import { createObservation } from '../../core/observations/observation.js';
import { detectAnomalousShifts } from '../../discovery/change/changeDetector.js';
import { discoverRelationships } from '../../discovery/relationships/relationshipDetector.js';

const now = new Date().toISOString();

const cityWideData = [
  createObservation({ entity: 'zone_north', variable: 'surface_temp', value: 22, timestamp: now }),
  createObservation({ entity: 'zone_north', variable: 'surface_temp', value: 23, timestamp: now }),
  createObservation({ entity: 'bus_route_4', variable: 'transit_delay', value: 2, unit: 'mins', timestamp: now }),
  createObservation({ entity: 'bus_route_4', variable: 'transit_delay', value: 3, unit: 'mins', timestamp: now }),

  createObservation({ entity: 'zone_north', variable: 'surface_temp', value: 41, timestamp: now }),
  createObservation({ entity: 'bus_route_4', variable: 'transit_delay', value: 35, unit: 'mins', timestamp: now })
];

console.log("=== Running Relationship Discovery Experiment ===");

const changes = detectAnomalousShifts(cityWideData, 1.2);
console.log(`\n1. Discovered ${changes.length} anomalous changes.`);

const relationships = discoverRelationships(changes);
console.log(`\n2. Discovered ${relationships.length} candidate cross-domain relationships:\n`);
console.log(JSON.stringify(relationships, null, 2));
