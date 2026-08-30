## Context

The wind page (`WindPage`) renders a `WeatherWidget` per location from a hardcoded
list; the widget calls `MeteoFranceService`, which calls `HttpClientService`
(see `openspec/specs/http-services/spec.md`). Open-Meteo has no tide data —
only wave/marine forecasts — so tide times require a new external API. See
proposal.md for the "why" and the delta specs for the exact requirements.

## Goals / Non-Goals

**Goals:**
- Swap the default location list for the three named coastal spots.
- Get wind speed/gusts in knots with minimal client-side logic.
- Add a tide extremes lookup and surface it per widget, degrading gracefully
  if it fails.

**Non-Goals:**
- Location search/selection UI — the three locations stay hardcoded for now.
- Multi-day tide forecasts — only the current day's extremes are shown.
- A backend/proxy layer for API keys — out of scope for this change.

## Decisions

**Wind speed unit: request `wind_speed_unit=kn` from Open-Meteo, don't convert
client-side.**
Open-Meteo's `/v1/forecast` endpoint accepts a `wind_speed_unit` param
(`kmh` | `ms` | `mph` | `kn`). Add it to `MeteoFranceRequestParams` and default
it to `'kn'` in `MeteoFranceService`'s `buildParams`. The API already returns
matching `current_units` labels, so `WeatherWidget`'s existing
`unit(...)` display logic needs no change. Alternative considered: keep km/h
and convert in the component — rejected, it's more code for the same result
and risks unit-label mismatches.

**New `WorldTidesService` + `world-tides.types.ts`, parallel to
`MeteoFranceService`.**
Same pattern as the existing météo service: a thin typed wrapper over
`HttpClientService.get(...)`. One method,
`getTideExtremes(latitude, longitude): Observable<TideExtreme[]>`, calling
`https://www.worldtides.info/api/v3?extremes&lat=...&lon=...&key=...`. Kept
as a separate service (not folded into `MeteoFranceService`) because it's an
unrelated provider with its own auth and response shape — mirrors how
`HttpClientService` is already shared across independent API services.

**API key via a new `src/environments/environment.ts`, gitignored, with a
committed `.example` template.**
The project has no environment file yet. Add
`src/environments/environment.ts` (gitignored, holds the real key) and
`src/environments/environment.example.ts` (committed, placeholder value) so
`git status` doesn't show an untracked-but-needed file trap. Import
`environment.ts` directly in `WorldTidesService` — no `fileReplacements`
build-time swapping is needed since this app has no separate prod API key.
Alternative considered: pass the key via a build-time environment variable —
rejected as unnecessary complexity for a single-developer project with one
key.

**Tide fetch failure never blocks the rest of the widget.**
`WeatherWidget` fetches weather and tides independently (two separate
subscriptions, two separate loading/error signals for the tide portion), so a
World Tides outage or rate-limit only hides the tide section, not the whole
card. Mirrors the existing `error()`/`loading()` pattern already in
`WeatherWidget`.

## Risks / Trade-offs

- [The World Tides API key ships in the client-side JS bundle, since this
  project has no backend] → Accepted for this project's scope (personal use,
  free-tier key); documented here so it isn't rediscovered as a surprise
  later. A backend proxy would be the fix if this ever needs to scale beyond
  personal use.
- [World Tides free tier has a daily request quota] → Each widget only fetches
  tide extremes once per page load per location (3 requests per visit), and
  failures degrade to "tide times unavailable" rather than breaking the page.
- [`wind_speed_unit=kn` changes the shape of existing recorded API responses/tests, if any assume km/h] → No existing automated tests cover the météo service's output values (tests are still a tracked open task from FT-002), so no test updates are expected, but this should be verified in tasks.

## Migration Plan

No data migration. This only changes default component inputs and adds a new
service; existing callers of `MeteoFranceService`/`WeatherWidget` with
explicit lat/long inputs are unaffected by the location list change. Rollback
is a plain revert of the branch.
