## Why

The wind page currently shows generic cities (Paris, Lyon, Marseille) with metric
wind speed and no tide information, which isn't useful for the actual use case:
checking wind and tide conditions at three Normandy coastal spots before going
out on the water.

## What Changes

- Replace the default city list on the wind page with three fixed coastal
  locations: Jullouville, Annoville, and Agon-Coutainville (coordinates
  supplied by the user).
- Display wind speed and gusts in knots instead of km/h.
- Add high/low tide times to each of the three location widgets, sourced from
  the World Tides API (worldtides.info), which requires a new API key.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `http-services`: add a World Tides API integration (new service) that
  retrieves tide extremes (high/low times) for a given coordinate, and switch
  the Météo France wind speed requests to knots.
- `wind-page`: replace the default location list with the three named coastal
  spots, and require each location's widget to show wind speed in knots and
  the day's tide times.

## Impact

- `src/app/wind-page/wind-page.ts`: new default `villes` list (3 coastal
  locations, fixed coordinates).
- `src/app/services/api/meteo-france.service.ts` /
  `meteo-france.types.ts`: request wind speed in knots (`wind_speed_unit=kn`)
  from Open-Meteo.
- `src/app/services/api/` : new `world-tides.service.ts` +
  `world-tides.types.ts` for the tide API integration.
- `src/app/weather-widget/weather-widget.ts`: display tide times alongside
  existing weather data.
- New project-level configuration for the World Tides API key (no backend
  exists in this project, so the key is bundled client-side like any other
  Angular environment value; see design.md for the accepted tradeoff).
