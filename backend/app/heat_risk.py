from __future__ import annotations

from .schemas import ObservationStatus, ScientificObservations, HotspotType


def _numeric_value(observation: object) -> float | None:
    value = getattr(observation, "value", None)
    return value if isinstance(value, (int, float)) else None


def analyze_heat_risk(
    hotspot_type: HotspotType,
    surface_temperature_c: float | None,
    coverage_score: float | None,
    observations: ScientificObservations | None = None,
) -> dict:
    base_score_map = {
        HotspotType.roof: 0.82,
        HotspotType.parking_lot: 0.74,
        HotspotType.hvac_mechanical: 0.69,
        HotspotType.road_pavement: 0.43,
        HotspotType.vegetation_loss: 0.61,
        HotspotType.other: 0.5,
    }
    factors_map = {
        HotspotType.roof: ["large exposed roof area", "dark surface cues", "low nearby shade"],
        HotspotType.parking_lot: ["large paved surface", "limited shade", "high sun exposure"],
        HotspotType.hvac_mechanical: ["concentrated rooftop equipment", "localized heat release"],
        HotspotType.road_pavement: ["expected paved-surface heat", "open sun exposure"],
        HotspotType.vegetation_loss: ["missing canopy cover", "exposed ground surface"],
        HotspotType.other: ["visible surface exposure"],
    }

    base_score = base_score_map.get(hotspot_type, 0.5)
    if surface_temperature_c is not None and surface_temperature_c >= 56:
        base_score += 0.05
    if coverage_score is not None and coverage_score < 0.65:
        base_score -= 0.04

    factors = list(factors_map.get(hotspot_type, ["visible surface exposure"]))
    score = base_score
    observation_status = ObservationStatus.model_derived

    if observations is not None:
        lst = _numeric_value(observations.lst)
        ndvi = _numeric_value(observations.ndvi)
        ndwi = _numeric_value(observations.ndwi)
        weather = observations.weather.value if observations.weather else None

        if lst is not None:
            score += max(min((lst - 35.0) / 100.0, 0.10), -0.05)
            factors.append("model-derived land surface temperature")
        if ndvi is not None and ndvi < 0.4:
            score += min((0.4 - ndvi) * 0.2, 0.08)
            factors.append("low vegetation index")
        if ndwi is not None and ndwi < 0.2:
            score += min((0.2 - ndwi) * 0.15, 0.04)
            factors.append("low surface moisture index")
        if isinstance(weather, dict):
            feels_like = weather.get("feels_like_f")
            if isinstance(feels_like, (int, float)) and feels_like >= 90:
                score += min((feels_like - 90.0) / 100.0, 0.06)
                factors.append("high apparent air temperature")

        statuses = [
            observation.status
            for observation in (observations.lst, observations.ndvi, observations.ndwi, observations.weather)
            if observation is not None
        ]
        if ObservationStatus.measured in statuses:
            observation_status = ObservationStatus.measured
        elif ObservationStatus.proxy in statuses:
            observation_status = ObservationStatus.proxy

    return {
        "heat_risk_score": round(min(max(score, 0.0), 0.99), 2),
        "factors": factors,
        "confidence": coverage_score,
        "observation_status": observation_status,
        "summary": (
            "Visible environmental cues suggest elevated retained heat risk"
            if hotspot_type != HotspotType.road_pavement
            else "Visible cues suggest mostly expected paved-surface heat"
        ),
    }
