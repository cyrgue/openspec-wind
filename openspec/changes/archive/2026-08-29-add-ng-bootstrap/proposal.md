## Why

The app's current styling is hand-rolled, ad-hoc CSS per component. Adopting a UI framework gives consistent, accessible components (nav, buttons, forms) to build on as more pages are added, instead of re-solving layout and interaction patterns from scratch each time.

## What Changes

- Add `@ng-bootstrap/ng-bootstrap` (Angular-native Bootstrap components) and the Bootstrap CSS package as dependencies.
- Load Bootstrap's CSS globally.
- Restyle the existing top navigation, Home page, Wind page, and Login page to use Bootstrap/ng-bootstrap components and utility classes instead of the current custom CSS.
- Switch the top navigation to ng-bootstrap's responsive navbar pattern, which introduces a collapsible menu (hamburger toggle) on narrow viewports — a new behavior not present in the current always-expanded nav.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `top-nav`: Adds responsive collapse behavior — on narrow viewports, the primary links collapse behind a toggle button; existing links, routes, and active-link indication behavior are unchanged.

## Impact

- Affected code: `package.json` (new dependencies), `angular.json` and/or `src/styles.scss` (global Bootstrap CSS), `src/app/top-nav/top-nav.ts`, `src/app/home-page/home-page.ts`, `src/app/wind-page/wind-page.ts`, `src/app/login-page/login-page.ts` (restyled templates).
- New dependency: `bootstrap` and `@ng-bootstrap/ng-bootstrap`.
- No breaking changes to routes, navigation destinations, or page content — only visual presentation and the new nav collapse behavior change.
