from __future__ import annotations

from datetime import datetime
from typing import Any

from ..schemas import ObservationStatus, ScientificObservation, ScientificObservations


def _status(value: str | ObservationStatus | None) -> ObservationStatus:
    if isinstance(value, ObservationStatus):
        return value
    try:
        return ObservationStatus(value or ObservationStatus.unavailable.value)
    except ValueError:
        return ObservationStatus.unavailable


def _observation(
    value: float | dict[str, Any] | None,
    *,
    unit: str | None = None,
    timestamp: datetime | None = None,
    source: str | None = None,
    status: str | ObservationStatus | None = None,
    quality: float | None = None,
    spatial_resolution_m: float | None = None,
    coverage_score: float | None = None,
) -> ScientificObservation:
    return ScientificObservation(
        value=value,
        unit=unit,
        timestamp=timestamp,
        source=source,
        status=_status(status),
        quality=quality,
        spatial_resolution_m=spatial_resolution_m,
        coverage_score=coverage_score,
    )


def lst_from_thermal(thermal_data: dict[str, Any]) -> ScientificObservation | None:
    mean_temp = thermal_data.get("mean_temp_c")
    if mean_temp is None:
        return None
    return _observation(
        float(mean_temp),
        unit="degC",
        timestamp=thermal_data.get("timestamp") or thermal_data.get("observation_time"),
        source=thermal_data.get("source", "HybridThermal"),
        status=ObservationStatus.model_derived,
        quality=thermal_data.get("quality"),
        spatial_resolution_m=thermal_data.get("spatial_resolution_m"),
    )


def ndvi_from_payload(payload: dict[str, Any] | None) -> ScientificObservation | None:
    if not payload or payload.get("ndvi_estimate") is None:
        return None
    return _observation(
        float(payload["ndvi_estimate"]),
        unit="index",
        timestamp=payload.get("timestamp"),
        source=payload.get("source", "NDVI proxy"),
        status=ObservationStatus.proxy,
        quality=payload.get("quality"),
        spatial_resolution_m=payload.get("spatial_resolution_m"),
        coverage_score=payload.get("coverage_score"),
    )


def unavailable_observation(source: str, unit: str | None = None) -> ScientificObservation:
    return _observation(
        None,
        unit=unit,
        source=source,
        status=ObservationStatus.unavailable,
    )


def weather_from_payload(payload: dict[str, Any] | None) -> ScientificObservation | None:
    if not payload or "error" in payload:
        return None
    values = {
        key: value
        for key, value in payload.items()
        if key not in {"lat", "lng", "source", "timestamp", "status", "quality"}
    }
    return _observation(
        values,
        unit="mixed",
        timestamp=payload.get("timestamp") or payload.get("time"),
        source=payload.get("source", "weather provider"),
        status=payload.get("status", ObservationStatus.model_derived),
        quality=payload.get("quality"),
    )


def urban_surface_from_payload(payload: dict[str, Any] | None) -> ScientificObservation | None:
    if not payload or "error" in payload:
        return None
    return _observation(
        payload,
        unit="mixed",
        timestamp=payload.get("timestamp"),
        source=payload.get("source", "urban surface context"),
        status=payload.get("status", ObservationStatus.proxy),
        quality=payload.get("quality"),
        coverage_score=payload.get("coverage_score"),
    )


def build_observations(
    *,
    thermal_data: dict[str, Any] | None = None,
    ndvi_payload: dict[str, Any] | None = None,
    weather_payload: dict[str, Any] | None = None,
    urban_surface_payload: dict[str, Any] | None = None,
) -> ScientificObservations:
    """Normalize available inputs without implying unavailable measurements."""
    return ScientificObservations(
        lst=lst_from_thermal(thermal_data or {}),
        ndvi=ndvi_from_payload(ndvi_payload),
        ndwi=None,
        weather=weather_from_payload(weather_payload),
        urban_surface=urban_surface_from_payload(urban_surface_payload),
    )
