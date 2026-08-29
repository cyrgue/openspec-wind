## 1. Dependencies and Global Styles

- [x] 1.1 Add `bootstrap` and `@ng-bootstrap/ng-bootstrap` as dependencies in `package.json` and verify `npm install` succeeds
- [x] 1.2 Register Bootstrap's CSS in `angular.json`'s build `styles` array (CSS only, no JS bundle) and verify `ng build` includes Bootstrap's rules in the output CSS

## 2. Top Navigation Restyle

- [x] 2.1 Restyle `TopNav`'s template with Bootstrap `navbar`/`navbar-expand-md` markup, importing `NgbCollapse` directly in the component, and verify it compiles with `ng build`
- [x] 2.2 Wire the collapse toggle so links are hidden behind a toggle button below the `md` breakpoint and visible without it at/above `md`, and verify visually in the browser at narrow and wide viewport widths
- [x] 2.3 Verify existing nav behavior still works: Home/Wind/Login links navigate correctly and the active link is still marked (visually and via `aria-current`)

## 3. Page Restyles

- [x] 3.1 Restyle `HomePage` using Bootstrap utility/layout classes, preserving its content, and verify it compiles with `ng build`
- [x] 3.2 Restyle `WindPage` using Bootstrap utility/layout classes, preserving the "Wind" text, and verify it compiles with `ng build`
- [x] 3.3 Restyle `LoginPage` using Bootstrap utility/layout classes, preserving its placeholder content, and verify it compiles with `ng build`

## 4. Verification

- [x] 4.1 Manually verify in the browser: `/`, `/wind`, and `/login` render with Bootstrap styling applied, the nav collapses/expands correctly across viewport widths, and no console errors appear
- [x] 4.2 Run the project's test suite (`ng test`) and confirm it passes with no regressions
