from __future__ import annotations

from typing import Any

from ..schemas import ScientificObservation
from .observations import (
    _observation,
    lst_from_thermal,
    ndvi_from_payload,
    unavailable_observation,
    urban_surface_from_payload,
    weather_from_payload,
)


def adapt_lst(thermal_data: dict[str, Any]) -> ScientificObservation | None:
    """Adapt HybridThermal output without presenting it as measured LST."""
    if "value" in thermal_data or "lst_c" in thermal_data:
        return _observation(
            thermal_data.get("value", thermal_data.get("lst_c")),
            unit=thermal_data.get("unit", "degC"),
            timestamp=thermal_data.get("timestamp") or thermal_data.get("observation_time"),
            source=thermal_data.get("source", "LST provider"),
            status=thermal_data.get("status", "measured"),
            quality=thermal_data.get("quality"),
            spatial_resolution_m=thermal_data.get("spatial_resolution_m"),
            coverage_score=thermal_data.get("coverage_score"),
        )
    return lst_from_thermal(thermal_data)


def adapt_ndvi_proxy(payload: dict[str, Any] | None) -> ScientificObservation | None:
    return ndvi_from_payload(payload)


def adapt_ndvi(payload: dict[str, Any] | None) -> ScientificObservation | None:
    if payload and ("value" in payload or "ndvi" in payload):
        return _observation(
            payload.get("value", payload.get("ndvi")),
            unit=payload.get("unit", "index"),
            timestamp=payload.get("timestamp") or payload.get("observation_time"),
            source=payload.get("source", "NDVI provider"),
            status=payload.get("status", "measured"),
            quality=payload.get("quality"),
            spatial_resolution_m=payload.get("spatial_resolution_m"),
            coverage_score=payload.get("coverage_score"),
        )
    return ndvi_from_payload(payload)


def adapt_ndwi(payload: dict[str, Any] | None) -> ScientificObservation:
    if payload and ("value" in payload or "ndwi" in payload):
        return _observation(
            payload.get("value", payload.get("ndwi")),
            unit=payload.get("unit", "index"),
            timestamp=payload.get("timestamp") or payload.get("observation_time"),
            source=payload.get("source", "NDWI provider"),
            status=payload.get("status", "measured"),
            quality=payload.get("quality"),
            spatial_resolution_m=payload.get("spatial_resolution_m"),
            coverage_score=payload.get("coverage_score"),
        )
    return unavailable_ndwi()


def adapt_weather(payload: dict[str, Any] | None) -> ScientificObservation | None:
    return weather_from_payload(payload)


def adapt_urban_surface(payload: dict[str, Any] | None) -> ScientificObservation | None:
    return urban_surface_from_payload(payload)


def unavailable_ndwi() -> ScientificObservation:
    """Return an explicit placeholder until an NDWI source is available."""
    return unavailable_observation("NDWI provider not configured", unit="index")


def fetch_weather(lat: float, lng: float) -> ScientificObservation | None:
    """Reuse the existing Open-Meteo tool without importing it at startup."""
    from ..agent.tools import get_weather_current

    return adapt_weather(get_weather_current(lat, lng))


def fetch_ndvi_proxy(lat: float, lng: float) -> ScientificObservation | None:
    """Reuse the existing explicitly proxy NDVI tool."""
    from ..agent.tools import get_ndvi_estimate

    return adapt_ndvi_proxy(get_ndvi_estimate(lat, lng))


def fetch_urban_surface(lat: float, lng: float) -> ScientificObservation | None:
    """Reuse the existing OSM surface-context tool."""
    from ..agent.tools import get_land_use

    return adapt_urban_surface(get_land_use(lat, lng))
