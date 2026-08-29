## 1. Home and Login Pages

- [x] 1.1 Create a standalone `HomeComponent` under `src/app/home-page/` with minimal placeholder content and verify it compiles with `ng build`
- [x] 1.2 Create a standalone login placeholder component under `src/app/login-page/` displaying "coming soon" content and verify it compiles with `ng build`

## 2. Top Navigation Bar

- [x] 2.1 Create a standalone `TopNav` component under `src/app/top-nav/` with "Home" and "Wind" links on the left and a "Login" link on the right, using `routerLink` and `routerLinkActive`/`aria-current` for active-link indication, and verify it compiles with `ng build`
- [x] 2.2 Style the nav bar as sticky/fixed to the top of the viewport and verify visually that it stays in place while scrolling a page with content taller than the viewport

## 3. Routing and App Shell

- [x] 3.1 Add `/` (Home) and `/login` lazy-loaded routes to `src/app/app.routes.ts`, alongside the existing `/wind` route, and verify all three routes resolve with `ng build`
- [x] 3.2 Replace the default Angular starter placeholder content in `src/app/app.html` with the `TopNav` component and `<router-outlet>`, and verify the starter content (logo, "Hello, openspec-wind", pill links) no longer appears

## 4. Verification

- [x] 4.1 Manually verify in the browser: navigating to `/`, `/wind`, and `/login` each render the correct page, the nav bar remains visible while scrolling, and the active link is visually and programmatically (`aria-current`) marked for the current route
- [x] 4.2 Run the project's test suite (`ng test`) and confirm it passes with no regressions
