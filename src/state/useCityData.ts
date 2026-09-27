/**
 * ---------------------------------------------------------------------------
 * EcoGuardian AI — Application State Hooks
 * ---------------------------------------------------------------------------
 * Thin React hooks that call the data-access layer and expose a consistent
 * { state, data, message, isLive } shape to UI components. Components should
 * never call `src/api` directly — always go through these hooks so caching,
 * refetching, or a future global store can be introduced in one place.
 * ---------------------------------------------------------------------------
 */
import { useEffect, useState } from "react";
import type { Result } from "../types/models";
import {
  getCityAreas,
  getCityMemoryEvents,
  getDataSources,
  getDiscoveries,
  getEvidence,
  getHistoricalPeriods,
  getObservations,
  getWarningSignals,
} from "../api/dataClient";

function useResult<T>(loader: () => Promise<Result<T>>): Result<T> {
  const [result, setResult] = useState<Result<T>>({
    state: "loading",
    data: null,
    isLive: false,
  });

  useEffect(() => {
    let cancelled = false;
    setResult({ state: "loading", data: null, isLive: false });
    loader().then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}

export const useCityAreas = () => useResult(getCityAreas);
export const useObservations = () => useResult(getObservations);
export const useDiscoveries = () => useResult(getDiscoveries);
export const useEvidence = () => useResult(getEvidence);
export const useWarningSignals = () => useResult(getWarningSignals);
export const useHistoricalPeriods = () => useResult(getHistoricalPeriods);
export const useCityMemoryEvents = () => useResult(getCityMemoryEvents);
export const useDataSources = () => useResult(getDataSources);
