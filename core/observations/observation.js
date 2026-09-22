/**
 * City Memory: Normalized Observation Contract
 */
export function createObservation({
  id = `obs_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
  entity,       // e.g., 'sensor_zone_04', 'satellite_tile_99'
  variable,     // e.g., 'surface_temperature', 'traffic_density', 'river_level'
  value,        // Numerical or categorical reading
  unit,         // e.g., 'celsius', 'count', 'meters'
  timestamp = new Date().toISOString(),
  location = { lat: 0, lon: 0 },
  source = 'unknown',
  quality = 1.0,      // Data quality score (0.0 to 1.0)
  uncertainty = 0.0   // Margin of error
} = {}) {
  if (!entity || !variable || value === undefined) {
    throw new Error("An observation requires entity, variable, and value.");
  }

  return {
    id,
    entity,
    variable,
    value,
    unit,
    timestamp,
    location,
    source,
    quality,
    uncertainty
  };
}
