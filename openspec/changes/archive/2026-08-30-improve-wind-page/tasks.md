## 1. Environment configuration

- [x] 1.1 Add `src/environments/environment.ts` (gitignored) and a committed `src/environments/environment.example.ts` placeholder exposing `worldTidesApiKey`, and verify `.gitignore` excludes the real file
- [x] 1.2 Document in `src/app/services/api/README.md` how to obtain a World Tides API key and populate `environment.ts` locally

## 2. Wind speed in knots

- [x] 2.1 Add `wind_speed_unit` to `MeteoFranceRequestParams` (`meteo-france.types.ts`) and default it to `'kn'` in `MeteoFranceService.buildParams`, and verify a manual request against the Open-Meteo API returns `current_units.wind_speed_10m` as `"kn"`

## 3. World Tides integration

- [x] 3.1 Create `src/app/services/api/world-tides.types.ts` with a `TideExtreme` type (`{ type: 'High' | 'Low'; time: string }`) and the raw API response shape
- [x] 3.2 Create `src/app/services/api/world-tides.service.ts` with `getTideExtremes(latitude, longitude): Observable<TideExtreme[]>`, calling the World Tides `extremes` endpoint via `HttpClientService` and reading the key from `environment.ts`, and verify a manual call against the real API returns extremes for a known coordinate
- [x] 3.3 Export the new service/types from `src/app/services/api/index.ts`

## 4. Wind page default locations

- [x] 4.1 Replace the `villes` list in `src/app/wind-page/wind-page.ts` with Jullouville, Annoville, and Agon-Coutainville at the coordinates from proposal.md, and verify the page renders exactly 3 widgets labeled with those names

## 5. Weather widget: tides + knots display

- [x] 5.1 Inject `WorldTidesService` into `WeatherWidget` and fetch tide extremes alongside the existing weather fetch, using a separate loading/error signal pair so a tide failure doesn't affect the weather display
- [x] 5.2 Add a tide section to the widget template showing each extreme's type (high/low) and time, and a non-blocking notice when tide data is unavailable
- [x] 5.3 Verify the wind speed/gust values rendered in the widget already show "kn" via the existing `unit(...)` binding (no template change needed beyond the tide section)

## 6. Verification

- [x] 6.1 Run `npm test` and confirm no regressions in existing specs
- [x] 6.2 Manually load the wind page and confirm all 3 widgets show weather in knots and today's tide times for Jullouville, Annoville, and Agon-Coutainville
- [x] 6.3 Run an accessibility check (AXE) on the updated wind page to confirm the new tide content has no violations
