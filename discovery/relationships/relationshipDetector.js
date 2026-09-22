/**
 * Discovery Engine: Cross-Variable Relationship Detector
 */
export function discoverRelationships(candidateChanges, timeWindowMs = 3600000) {
  if (!candidateChanges || candidateChanges.length < 2) return [];

  const relationships = [];

  for (let i = 0; i < candidateChanges.length; i++) {
    for (let j = i + 1; j < candidateChanges.length; j++) {
      const changeA = candidateChanges[i];
      const changeB = candidateChanges[j];

      if (changeA.variable === changeB.variable) continue;

      const timeA = new Date(changeA.timestamp).getTime();
      const timeB = new Date(changeB.timestamp).getTime();
      const timeDiff = Math.abs(timeA - timeB);

      if (timeDiff <= timeWindowMs) {
        relationships.push({
          relationshipId: `rel_${changeA.changeId}_${changeB.changeId}`,
          variables: [changeA.variable, changeB.variable],
          entities: [changeA.entity, changeB.entity],
          timeDeltaMs: timeDiff,
          confidence: Math.min(1.0, (parseFloat(changeA.confidence) + parseFloat(changeB.confidence)) / 2),
          hypothesis: `Potential co-occurrence discovered between ${changeA.variable} and ${changeB.variable}`
        });
      }
    }
  }

  return relationships;
}
