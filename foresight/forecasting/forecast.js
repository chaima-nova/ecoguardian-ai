/**
 * Foresight Engine: Probabilistic Scenario & Precursor Evaluator
 */
export function generateForesightSignal(relationships, historicalAnalogs = []) {
  if (!relationships || relationships.length === 0) return null;

  // Extract variables involved in discovered co-occurrences
  const activeVariables = Array.from(
    new Set(relationships.flatMap(r => r.variables))
  );

  // Evaluate candidate matching analogs from historical city memory
  const matchedAnalogs = historicalAnalogs.filter(analog =>
    analog.precursorVariables.every(v => activeVariables.includes(v))
  );

  const highestConfidence = Math.max(...relationships.map(r => r.confidence), 0);

  return {
    forecastId: `forc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    targetDomain: activeVariables.join(" + "),
    horizon: "24h-72h",
    predictedOutcome: matchedAnalogs.length > 0 
      ? matchedAnalogs[0].historicalOutcome 
      : "Unprecedented multi-variable pattern observed",
    probability: (highestConfidence * 0.85).toFixed(2),
    supportingSignals: relationships.map(r => ({
      hypothesis: r.hypothesis,
      confidence: r.confidence
    })),
    historicalAnalogs: matchedAnalogs.map(a => a.name),
    uncertainty: (1.0 - highestConfidence).toFixed(2),
    alternativeExplanations: [
      "Sensor calibration shift",
      "Localized temporary infrastructure disruption"
    ],
    dataGaps: ["Real-time soil saturation", "Micro-climate station density"],
    status: "CANDIDATE_FORESIGHT_SIGNAL"
  };
}
