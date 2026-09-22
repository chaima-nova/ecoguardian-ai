from __future__ import annotations

import unittest

from app.heat_risk import analyze_heat_risk
from app.schemas import (
    BoundingBox,
    HotspotType,
    LatLng,
    ObservationStatus,
    ScientificObservation,
    ScientificObservations,
)
from app.orchestrator import build_analysis_from_candidates
from app.scientific.acquisition import acquire_observation_payloads
from app.scientific.assembly import ObservationProviderPayloads, assemble_observations


class MockProviderAcquisition:
    def get_lst(self, thermal_data):
        return thermal_data

    def get_ndvi(self, center):
        del center
        return {
            "ndvi_estimate": 0.31,
            "source": "mock NDVI proxy",
            "timestamp": "2026-09-19T11:00:00Z",
        }

    def get_ndwi(self, center):
        del center
        return None

    def get_weather(self, center):
        del center
        return {
            "temperature_f": 94.0,
            "feels_like_f": 96.0,
            "source": "mock weather",
            "status": "model_derived",
            "time": "2026-09-19T12:00:00Z",
        }

    def get_urban_context(self, center):
        del center
        return {
            "estimated_green_cover_pct": 22,
            "source": "mock urban context",
        }


class FailingProviderAcquisition(MockProviderAcquisition):
    def get_ndvi(self, center):
        raise RuntimeError("NDVI unavailable")

    def get_weather(self, center):
        raise RuntimeError("weather unavailable")

    def get_urban_context(self, center):
        raise RuntimeError("urban context unavailable")


class ScientificObservationTests(unittest.TestCase):
    def test_mocked_complete_provider_acquisition(self) -> None:
        payloads = acquire_observation_payloads(
            MockProviderAcquisition(),
            center=LatLng(lat=38.627, lng=-90.1994),
            thermal_data={
                "mean_temp_c": 41.5,
                "source": "HybridThermal",
                "observation_time": "2026-09-19T12:00:00Z",
            },
        )
        observations = assemble_observations(payloads)

        self.assertEqual(observations.weather.value["temperature_f"], 94.0)
        self.assertEqual(observations.ndvi.status, ObservationStatus.proxy)
        self.assertEqual(observations.lst.status, ObservationStatus.model_derived)
        self.assertEqual(observations.ndwi.status, ObservationStatus.unavailable)
        self.assertEqual(observations.weather.source, "mock weather")
        self.assertEqual(observations.ndvi.timestamp.isoformat(), "2026-09-19T11:00:00+00:00")

    def test_provider_failure_becomes_unavailable(self) -> None:
        payloads = acquire_observation_payloads(
            FailingProviderAcquisition(),
            center=LatLng(lat=38.627, lng=-90.1994),
            thermal_data={"mean_temp_c": 41.5, "source": "HybridThermal"},
        )
        observations = assemble_observations(payloads)

        self.assertEqual(observations.weather.status, ObservationStatus.unavailable)
        self.assertEqual(observations.ndvi.status, ObservationStatus.unavailable)
        self.assertEqual(observations.urban_surface.status, ObservationStatus.unavailable)
        self.assertIsNone(observations.weather.value)

    def test_complete_observation_assembly_preserves_provenance(self) -> None:
        observations = assemble_observations(
            ObservationProviderPayloads(
                thermal_data={
                    "mean_temp_c": 41.5,
                    "source": "HybridThermal",
                    "observation_time": "2026-09-19T12:00:00Z",
                },
                ndvi={
                    "value": 0.31,
                    "source": "Sentinel-2 NDVI",
                    "status": "measured",
                    "timestamp": "2026-09-19T11:00:00Z",
                },
                ndwi={
                    "value": 0.18,
                    "source": "Sentinel-2 NDWI",
                    "status": "measured",
                    "timestamp": "2026-09-19T11:00:00Z",
                },
                weather={
                    "temperature_f": 94.0,
                    "source": "Open-Meteo API",
                    "status": "model_derived",
                    "time": "2026-09-19T12:00:00Z",
                },
                urban_surface={
                    "estimated_green_cover_pct": 22,
                    "source": "OpenStreetMap Overpass API",
                },
            )
        )

        self.assertEqual(observations.lst.value, 41.5)
        self.assertEqual(observations.lst.source, "HybridThermal")
        self.assertEqual(observations.lst.status, ObservationStatus.model_derived)
        self.assertEqual(observations.ndvi.status, ObservationStatus.measured)
        self.assertEqual(observations.ndwi.source, "Sentinel-2 NDWI")
        self.assertEqual(observations.weather.timestamp.isoformat(), "2026-09-19T12:00:00+00:00")
        self.assertEqual(observations.urban_surface.source, "OpenStreetMap Overpass API")

    def test_model_derived_thermal_value_is_not_measured_lst(self) -> None:
        observations = assemble_observations(
            ObservationProviderPayloads(
                thermal_data={"mean_temp_c": 41.5, "source": "HybridThermal"}
            )
        )

        self.assertEqual(observations.lst.status, ObservationStatus.model_derived)
        self.assertNotEqual(observations.lst.status, ObservationStatus.measured)

    def test_ndvi_proxy_preserves_proxy_status(self) -> None:
        observations = assemble_observations(
            ObservationProviderPayloads(
                ndvi={
                    "ndvi_estimate": 0.31,
                    "source": "Open-Meteo + OpenStreetMap data",
                }
            )
        )

        self.assertEqual(observations.ndvi.value, 0.31)
        self.assertEqual(observations.ndvi.status, ObservationStatus.proxy)

    def test_missing_ndwi_is_explicitly_unavailable(self) -> None:
        observations = assemble_observations()

        self.assertEqual(observations.ndwi.status, ObservationStatus.unavailable)
        self.assertIsNone(observations.ndwi.value)

    def test_missing_weather_is_explicitly_unavailable(self) -> None:
        observations = assemble_observations()

        self.assertEqual(observations.weather.status, ObservationStatus.unavailable)
        self.assertEqual(observations.weather.source, "Weather provider not configured")

    def test_assembly_is_deterministic(self) -> None:
        payloads = ObservationProviderPayloads(
            thermal_data={"mean_temp_c": 41.5, "source": "HybridThermal"},
            ndvi={"value": 0.3, "source": "test", "status": "measured"},
        )

        self.assertEqual(assemble_observations(payloads), assemble_observations(payloads))

    def test_orchestrator_receives_injected_observations(self) -> None:
        analysis, _events = build_analysis_from_candidates(
            candidates=[
                {
                    "bbox": BoundingBox(x=0, y=0, w=32, h=32),
                    "centroid": LatLng(lat=38.627, lng=-90.1994),
                    "hotspot_type": HotspotType.roof,
                    "intensity": 0.8,
                }
            ],
            thermal_data={"mean_temp_c": 40.0, "min_temp_c": 30.0, "max_temp_c": 50.0},
            center=LatLng(lat=38.627, lng=-90.1994),
            radius_m=120,
            region_id="region_scientific_test",
            observation_payloads=ObservationProviderPayloads(
                thermal_data={"mean_temp_c": 40.0, "source": "HybridThermal"},
                ndwi={"value": 0.1, "source": "test-ndwi", "status": "measured"},
            ),
        )

        self.assertEqual(analysis.region.scientific_observations.ndwi.source, "test-ndwi")
        self.assertEqual(analysis.result.heat_analysis.observations.ndwi.value, 0.1)
        self.assertTrue(analysis.result.heat_analysis.deterministic)

    def test_heat_risk_is_deterministic_with_structured_observations(self) -> None:
        observations = ScientificObservations(
            lst=ScientificObservation(
                value=45.0,
                unit="degC",
                status=ObservationStatus.measured,
                source="test-lst",
            ),
            ndvi=ScientificObservation(
                value=0.2,
                unit="index",
                status=ObservationStatus.proxy,
                source="test-ndvi",
            ),
            weather=ScientificObservation(
                value={"feels_like_f": 96.0},
                unit="mixed",
                status=ObservationStatus.model_derived,
                source="test-weather",
            ),
        )

        first = analyze_heat_risk(HotspotType.roof, 45.0, 0.8, observations)
        second = analyze_heat_risk(HotspotType.roof, 45.0, 0.8, observations)

        self.assertEqual(first, second)
        self.assertTrue(first["heat_risk_score"] > 0.82)
        self.assertEqual(first["observation_status"], ObservationStatus.measured)
        self.assertIn("low vegetation index", first["factors"])


if __name__ == "__main__":
    unittest.main()
