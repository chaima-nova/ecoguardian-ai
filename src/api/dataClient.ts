/**
 * ---------------------------------------------------------------------------
 * EcoGuardian AI — Data Access Layer
 * ---------------------------------------------------------------------------
 * This is the ONLY place in the application that should know how to fetch
 * data. UI components never talk to a network/database directly — they call
 * hooks in `src/state/`, which call functions exported from this file.
 *
 * Today, no backend is connected, so every function returns an explicit
 * empty `Result<T>`. When a real backend (e.g. the GitHub-hosted EcoGuardian
 * repository / API) is available, replace the body of these functions with
 * real `fetch(...)` calls. The rest of the application does not need to
 * change, because it only ever depends on the `Result<T>` contract.
 *
 * Configure `API_BASE_URL` via Vite env (VITE_ECOGUARDIAN_API_URL) once a
 * backend exists.
 * ---------------------------------------------------------------------------
 */

import type {
  CityArea,
  CityMemoryEvent,
  CityObservation,
  DataSource,
  Discovery,
  EvidenceItem,
  HistoricalPeriod,
  Result,
  WarningSignal,
} from "../types/models";

const API_BASE_URL = import.meta.env.VITE_ECOGUARDIAN_API_URL as string | undefined;

/** Whether the application currently has any real backend configured at all. */
export const isBackendConfigured = Boolean(API_BASE_URL);

function emptyResult<T>(message: string): Result<T> {
  return { state: "empty", data: null, message, isLive: false };
}

/**
 * Generic fetch helper reserved for future use. If `API_BASE_URL` is not
 * configured, immediately resolves to an empty result rather than throwing,
 * so the UI degrades gracefully into honest empty states.
 */
async function request<T>(path: string, emptyMessage: string): Promise<Result<T>> {
  if (!API_BASE_URL) {
    // Simulate a brief lookup so loading states are exercised honestly.
    await new Promise((r) => setTimeout(r, 220));
    return emptyResult<T>(emptyMessage);
  }
  try {
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!res.ok) {
      return { state: "error", data: null, message: `Request failed (${res.status})`, isLive: false };
    }
    const json = (await res.json()) as T;
    const isEmpty = Array.isArray(json) ? json.length === 0 : json == null;
    return { state: isEmpty ? "empty" : "ok", data: json, isLive: true };
  } catch (err) {
    return {
      state: "error",
      data: null,
      message: err instanceof Error ? err.message : "Unknown network error",
      isLive: false,
    };
  }
}

export async function getCityAreas(): Promise<Result<CityArea[]>> {
  return request<CityArea[]>("/city-areas", "No city areas connected yet.");
}

export async function getObservations(): Promise<Result<CityObservation[]>> {
  return request<CityObservation[]>("/observations", "No observations connected yet.");
}

export async function getDiscoveries(): Promise<Result<Discovery[]>> {
  return request<Discovery[]>("/discoveries", "No candidate discoveries yet.");
}

export async function getEvidence(): Promise<Result<EvidenceItem[]>> {
  return request<EvidenceItem[]>("/evidence", "No evidence available yet.");
}

export async function getWarningSignals(): Promise<Result<WarningSignal[]>> {
  return request<WarningSignal[]>("/warnings", "No validated early-warning signals.");
}

export async function getHistoricalPeriods(): Promise<Result<HistoricalPeriod[]>> {
  return request<HistoricalPeriod[]>("/city-memory/periods", "City memory not connected.");
}

export async function getCityMemoryEvents(): Promise<Result<CityMemoryEvent[]>> {
  return request<CityMemoryEvent[]>("/city-memory/events", "City memory not connected.");
}

export async function getDataSources(): Promise<Result<DataSource[]>> {
  return request<DataSource[]>("/data-sources", "No data sources connected.");
}
