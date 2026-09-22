from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Protocol

from ..schemas import LatLng
from .assembly import ObservationProviderPayloads

PayloadProvider = Callable[[float, float], dict[str, Any]]


class ProviderAcquisition(Protocol):
    def get_lst(self, thermal_data: dict[str, Any]) -> dict[str, Any] | None: ...

    def get_ndvi(self, center: LatLng) -> dict[str, Any] | None: ...

    def get_ndwi(self, center: LatLng) -> dict[str, Any] | None: ...

    def get_weather(self, center: LatLng) -> dict[str, Any] | None: ...

    def get_urban_context(self, center: LatLng) -> dict[str, Any] | None: ...


@dataclass
class DefaultProviderAcquisition:
    """Default adapters for existing tools; all callables remain injectable."""

    ndvi_provider: PayloadProvider | None = None
    weather_provider: PayloadProvider | None = None
    urban_context_provider: PayloadProvider | None = None

    def get_lst(self, thermal_data: dict[str, Any]) -> dict[str, Any] | None:
        return dict(thermal_data) if thermal_data else None

    def get_ndvi(self, center: LatLng) -> dict[str, Any] | None:
        provider = self.ndvi_provider or self._default_ndvi_provider
        return provider(center.lat, center.lng)

    def get_ndwi(self, center: LatLng) -> dict[str, Any] | None:
        del center
        return None

    def get_weather(self, center: LatLng) -> dict[str, Any] | None:
        provider = self.weather_provider or self._default_weather_provider
        return provider(center.lat, center.lng)

    def get_urban_context(self, center: LatLng) -> dict[str, Any] | None:
        provider = self.urban_context_provider or self._default_urban_context_provider
        return provider(center.lat, center.lng)

    @staticmethod
    def _default_ndvi_provider(lat: float, lng: float) -> dict[str, Any]:
        from ..agent.tools import get_ndvi_estimate

        return get_ndvi_estimate(lat, lng)

    @staticmethod
    def _default_weather_provider(lat: float, lng: float) -> dict[str, Any]:
        from ..agent.tools import get_weather_current

        return get_weather_current(lat, lng)

    @staticmethod
    def _default_urban_context_provider(lat: float, lng: float) -> dict[str, Any]:
        from ..agent.tools import get_land_use

        return get_land_use(lat, lng)


def _safe_call(call: Callable[[], dict[str, Any] | None]) -> dict[str, Any] | None:
    try:
        return call()
    except Exception:
        return None


def acquire_observation_payloads(
    provider: ProviderAcquisition,
    *,
    center: LatLng,
    thermal_data: dict[str, Any],
) -> ObservationProviderPayloads:
    """Acquire provider payloads without allowing provider failure to fabricate data."""
    lst = _safe_call(lambda: provider.get_lst(thermal_data))
    return ObservationProviderPayloads(
        thermal_data=thermal_data,
        lst=lst,
        ndvi=_safe_call(lambda: provider.get_ndvi(center)),
        ndwi=_safe_call(lambda: provider.get_ndwi(center)),
        weather=_safe_call(lambda: provider.get_weather(center)),
        urban_surface=_safe_call(lambda: provider.get_urban_context(center)),
    )
