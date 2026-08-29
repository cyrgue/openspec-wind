## Why

The app currently has no feature routes or pages. We need an initial "Wind" page as the starting point for the wind-related functionality this app will grow into.

## What Changes

- Add a lazy-loaded standalone route/page that displays the word "Wind".
- Register the new route in the app's routing configuration.

## Capabilities

### New Capabilities
- `wind-page`: A page, reachable via routing, that displays the word "Wind".

### Modified Capabilities
- None.

## Impact

- Affected code: `src/app/app.routes.ts` (new lazy route), new standalone component under `src/app/` (e.g. `src/app/wind-page/`).
- No API, dependency, or breaking changes.
