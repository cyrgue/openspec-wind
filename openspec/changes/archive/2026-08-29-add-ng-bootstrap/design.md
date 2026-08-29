## Context

The app is Angular 22 with standalone components only (no NgModules), inline templates preferred for small components, and `class`/`style` bindings instead of `ngClass`/`ngStyle`. Four components exist today (`TopNav`, `HomePage`, `WindPage`, `LoginPage`), each with its own hand-written inline `styles`. See proposal.md - Why for the motivation to move to a UI framework, and specs/top-nav/spec.md for the new responsive-collapse requirement.

## Goals / Non-Goals

**Goals:**
- Make Bootstrap's CSS available globally and `@ng-bootstrap/ng-bootstrap`'s standalone directives/components available per-component.
- Restyle the four existing components using Bootstrap markup/utility classes and ng-bootstrap directives, preserving their current behavior (routes, content, active-link indication) except for the newly specified nav collapse.
- Keep the standalone-component architecture — no NgModules introduced.

**Non-Goals:**
- No new pages or features beyond what add-top-nav already established.
- No design system / theming customization (custom Sass variables, brand colors) — default Bootstrap theme only.
- No use of ng-bootstrap's modal/toast/datepicker/etc. components — only what the navbar collapse requires.

## Decisions

**Library: `@ng-bootstrap/ng-bootstrap` + `bootstrap` (CSS only), not `ngx-bootstrap` or Bootstrap's own JS bundle.**
Chosen per user direction. Rationale: ng-bootstrap components/directives are native Angular (no jQuery, no Bootstrap JS runtime), which fits better with Angular's change detection and standalone-component model than ngx-bootstrap or wiring up Bootstrap's vanilla JS bundle. Alternative considered: plain Bootstrap CSS/JS (rejected — mixing Bootstrap's imperative JS with Angular's rendering is a common source of bugs, e.g. DOM nodes Angular doesn't know were toggled).

**Do not load `bootstrap.bundle.js`.**
ng-bootstrap reimplements Bootstrap's interactive behaviors (collapse, dropdown, etc.) as Angular directives/components. Only Bootstrap's CSS is needed; loading its JS bundle alongside ng-bootstrap would risk two systems fighting over the same DOM/classes for the same interaction.

**Load Bootstrap CSS via `angular.json`'s `styles` array, not an `@import` in `styles.scss`.**
Matches how `src/styles.scss` is already registered there. Keeps global stylesheet wiring in one place (`angular.json`) rather than splitting it between the build config and a Sass import.

**No shared Angular module / `forRoot()` call.**
Since components are standalone, each component imports only the specific ng-bootstrap directives it needs (e.g., `NgbCollapse` in `TopNav`) via its own `imports` array — consistent with the project's no-NgModules convention. No app-wide ng-bootstrap module is introduced.

**Navbar markup: Bootstrap's `navbar`/`navbar-expand-*` classes + ng-bootstrap's `NgbCollapse` directive for the toggle, rather than a bespoke component.**
Bootstrap defines the navbar's visual/responsive CSS; `NgbCollapse` supplies the expand/collapse behavior in an Angular-native way (binding a boolean signal/property instead of relying on Bootstrap's JS). Breakpoint: `navbar-expand-md` (collapses below 768px), Bootstrap's common default — no product requirement calls for a different breakpoint.

**Home/Wind/Login pages: Bootstrap utility classes only (`container`, spacing/typography utilities), no additional ng-bootstrap components.**
These pages are simple text content; Bootstrap's grid/utility classes are sufficient without pulling in additional ng-bootstrap components.

## Risks / Trade-offs

- [Bootstrap's default CSS resets/utility classes could visually clash with any styling added later] → Mitigation: keep component-level custom CSS minimal and scoped (`:host`), let Bootstrap own global resets.
- [Bundle size increases from adding Bootstrap CSS + ng-bootstrap] → Mitigation: CSS-only Bootstrap (no JS bundle) and per-component ng-bootstrap imports (only `NgbCollapse` for now) keep the addition to what's actually used; acceptable for this app's size.
- [`NgbCollapse`'s default animation/ARIA behavior differs slightly from a hand-rolled toggle] → Mitigation: rely on ng-bootstrap's built-in accessibility handling (it manages `aria-expanded`) rather than re-implementing it, since it's already WCAG-conscious.
