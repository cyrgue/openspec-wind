## Why

The app has no way to navigate between pages — the Wind page is only reachable by typing its URL, and there's no Home page at all. A persistent top navigation gives users a consistent way to move around the app as more pages are added.

## What Changes

- Add a sticky top navigation bar, always visible at the top of the viewport (including while scrolling), that wraps every route.
- Left side: "Home" and "Wind" links, routing to `/` and `/wind` respectively. The link matching the current route is visually marked as active (`aria-current="page"` plus a style cue).
- Right side: a "Login" link routing to a new `/login` stub route (a minimal placeholder page; no authentication logic yet).
- Add a new minimal Home page, reachable at `/`.
- Remove the default Angular starter placeholder content from `app.html`, replaced by the nav bar and routed pages.

## Capabilities

### New Capabilities
- `top-nav`: A persistent, sticky top navigation bar present on every route, with Home/Wind links on the left, active-link indication, and a Login link (to a stub route) on the right.
- `home-page`: A minimal Home page reachable at the root route.

### Modified Capabilities
- None. (`wind-page` behavior is unchanged — it becomes reachable via the nav in addition to direct navigation, which is not a requirement change.)

## Impact

- Affected code: `src/app/app.html` / `src/app/app.ts` (remove starter placeholder, add nav + router-outlet layout), `src/app/app.routes.ts` (add `/` and `/login` routes), new components under `src/app/top-nav/`, `src/app/home-page/`, `src/app/login-page/` (or similar).
- No API, dependency, or breaking changes.
