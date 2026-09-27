/**
 * ---------------------------------------------------------------------------
 * EcoGuardian AI — Core Domain Models
 * ---------------------------------------------------------------------------
 * These types describe the shape of data EcoGuardian works with. They are
 * intentionally decoupled from any specific backend/API implementation so
 * that the UI layer can be wired to a real GitHub-hosted backend, a REST
 * API, or a local database later without changing components.
 *
 * NOTHING in this file contains actual data. It only defines shape.
 * ---------------------------------------------------------------------------
 */

/** Epistemic status — the single most important concept in the product.
 * EcoGuardian must never conflate these categories in the UI. */
export type EpistemicState =
  | "OBSERVED"
  | "DISCOVERED"
  | "INFERRED"
  | "HYPOTHESIZED"
  | "VALIDATED";

/** Overall connectivity / lifecycle status of the system or a resource. */
export type SystemStatus =
  | "RESEARCH_PROTOTYPE"
  | "DATA_NOT_CONNECTED"
  | "DATA_CONNECTED"
  | "PROCESSING"
  | "VALIDATION_REQUIRED";

/** Generic wrapper every data-access call resolves to. Forces every screen
 * to explicitly handle loading / empty / error / ok — never assume data. */
export type DataState =  "loading" | "empty" | "error" | "ok";

export interface Result<T> {
  state: DataState;
  data: T | null;
  message?: string;
  /** true only when this payload originates from a connected, real source */
  isLive: boolean;
}

/** ------------------------------------------------------------------ */
/** Geography                                                          */
/** ------------------------------------------------------------------ */

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface CityArea {
  id: string;
  name: string;
  /** simple polygon boundary, GeoJSON-compatible ring of points */
  boundary?: GeoPoint[];
  centroid?: GeoPoint;
}

/** ------------------------------------------------------------------ */
/** Observations                                                       */
/** ------------------------------------------------------------------ */

export type ObservationCategory =
  | "environment"
  | "infrastructure"
  | "mobility"
  | "events"
  | "satellite"
  | "weather"
  | "other";

export interface CityObservation {
  id: string;
  category: ObservationCategory;
  label: string;
  sourceId: string;
  areaId?: string;
  location?: GeoPoint;
  timestamp: string; // ISO-8601
  value?: number;
  unit?: string;
  epistemicState: EpistemicState; // typically "OBSERVED"
  dataQuality?: "high" | "medium" | "low" | "unknown";
}

/** ------------------------------------------------------------------ */
/** Discovery Engine                                                   */
/** ------------------------------------------------------------------ */

export type DiscoveryStatus =
  | "AWAITING_DATA"
  | "CANDIDATE"
  | "UNDER_REVIEW"
  | "VALIDATED"
  | "REJECTED";

export interface DiscoveryVariable {
  id: string;
  role: "Variable A" | "Variable B" | "Variable C" | string;
  label: string; // e.g. "Observed variable"
  observationCategory?: ObservationCategory;
}

export interface RelationshipEvidence {
  kind: "SPATIAL" | "TEMPORAL" | "HISTORICAL";
  state: DataState;
  description?: string;
}

export interface Discovery {
  id: string;
  title: string;
  status: DiscoveryStatus;
  epistemicState: EpistemicState;
  variables: DiscoveryVariable[];
  relationships: RelationshipEvidence[];
  evidenceIds: string[];
  createdAt?: string;
}

/** ------------------------------------------------------------------ */
/** Evidence                                                           */
/** ------------------------------------------------------------------ */

export interface EvidenceItem {
  id: string;
  observation: string;
  source: string;
  time?: string;
  location?: string;
  relationship?: string;
  historicalComparison?: string;
  uncertainty?: string;
  dataQuality?: "high" | "medium" | "low" | "unknown";
  epistemicState: EpistemicState;
}

/** ------------------------------------------------------------------ */
/** Early Warning                                                      */
/** ------------------------------------------------------------------ */

export type WarningStatus =
  | "NO_SIGNAL"
  | "EMERGING_SIGNAL"
  | "UNDER_VALIDATION"
  | "VALIDATED"
  | "DISMISSED";

export interface WarningSignal {
  id: string;
  status: WarningStatus;
  epistemicState: EpistemicState;
  affectedAreaId?: string;
  detectionTime?: string;
  contributingObservationIds: string[];
  historicalComparisonIds: string[];
  potentialLeadTime?: string; // only if truly computed
  uncertaintyNotes: string[];
  missingData: string[];
  humanValidation: "not_reviewed" | "in_review" | "confirmed" | "rejected";
}

/** ------------------------------------------------------------------ */
/** City Memory                                                        */
/** ------------------------------------------------------------------ */

export type MemoryLayer =
  | "Environment"
  | "Infrastructure"
  | "Mobility"
  | "Events"
  | "Observations";

export interface HistoricalPeriod {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

export interface CityMemoryEvent {
  id: string;
  layer: MemoryLayer;
  timestamp: string;
  description: string;
  epistemicState: EpistemicState;
  evidenceIds: string[];
  areaId?: string;
}

/** ------------------------------------------------------------------ */
/** Data Sources                                                       */
/** ------------------------------------------------------------------ */

export type DataSourceCategory =
  | "satellite"
  | "environmental"
  | "infrastructure"
  | "mobility"
  | "weather"
  | "city_events"
  | "geospatial"
  | "user_provided";

export type DataSourceStatus = "connected" | "not_connected" | "error" | "pending";

export interface DataSource {
  id: string;
  name: string;
  category: DataSourceCategory;
  status: DataSourceStatus;
  description?: string;
  lastIngestion?: string;
  coverage?: string;
}
