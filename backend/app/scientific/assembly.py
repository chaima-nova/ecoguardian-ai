from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from ..schemas import ScientificObservation, ScientificObservations
from .observations import unavailable_observation
from .providers import (
    adapt_lst,
    adapt_ndvi,
    adapt_ndwi,
    adapt_urban_surface,
    adapt_weather,
)


@dataclass(frozen=True)
class ObservationProviderPayloads:
    """Provider results supplied to assembly; no provider calls happen here."""

    thermal_data: dict[str, Any] = field(default_factory=dict)
    lst: dict[str, Any] | None = None
    ndvi: dict[str, Any] | None = None
    ndwi: dict[str, Any] | None = None
    weather: dict[str, Any] | None = None
    urban_surface: dict[str, Any] | None = None


def _or_unavailable(
    observation: ScientificObservation | None,
    *,
    source: str,
    unit: str | None = None,
) -> ScientificObservation:
    return observation or unavailable_observation(source, unit=unit)


def assemble_observations(
    payloads: ObservationProviderPayloads | None = None,
) -> ScientificObservations:
    """Assemble a deterministic observation set from already-fetched payloads."""
    payloads = payloads or ObservationProviderPayloads()
    return ScientificObservations(
        lst=_or_unavailable(
            adapt_lst(payloads.lst or payloads.thermal_data),
            source="LST provider not configured",
            unit="degC",
        ),
        ndvi=_or_unavailable(
            adapt_ndvi(payloads.ndvi),
            source="NDVI provider not configured",
            unit="index",
        ),
        ndwi=adapt_ndwi(payloads.ndwi),
        weather=_or_unavailable(
            adapt_weather(payloads.weather),
            source="Weather provider not configured",
            unit="mixed",
        ),
        urban_surface=_or_unavailable(
            adapt_urban_surface(payloads.urban_surface),
            source="Urban surface provider not configured",
            unit="mixed",
        ),
    )
