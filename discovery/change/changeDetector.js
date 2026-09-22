/**
 * Discovery Engine: Domain-Agnostic Change Detector
 */
export function detectAnomalousShifts(observations, thresholdStdDev = 2.0) {
  if (!observations || observations.length === 0) return [];

  const grouped = observations.reduce((acc, obs) => {
    if (!acc[obs.variable]) acc[obs.variable] = [];
    acc[obs.variable].push(obs);
    return acc;
  }, {});

  const candidateChanges = [];

  for (const [variable, obsList] of Object.entries(grouped)) {
    const values = obsList.map(o => o.value);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) continue;

    obsList.forEach(obs => {
      const zScore = Math.abs((obs.value - mean) / stdDev);
      if (zScore >= thresholdStdDev) {
        candidateChanges.push({
          changeId: `chg_${obs.id}`,
          variable: obs.variable,
          entity: obs.entity,
          observedValue: obs.value,
          baselineMean: mean,
          zScore: zScore.toFixed(2),
          timestamp: obs.timestamp,
          confidence: Math.min(1.0, zScore / 4.0),
          type: 'STATISTICAL_DEVIATION'
        });
      }
    });
  }

  return candidateChanges;
}
