## Purpose

Provides a persistent top navigation bar, present on every page, so users can move between the app's pages and access the future login area.

## ADDED Requirements

### Requirement: Persistent Top Navigation
The system SHALL display a top navigation bar on every route. The navigation bar SHALL remain visible at the top of the viewport while the page content is scrolled.

#### Scenario: Navigation visible on any route
- **WHEN** a user is on any route in the app
- **THEN** the top navigation bar is displayed

#### Scenario: Navigation stays visible while scrolling
- **WHEN** a user scrolls down a page with content taller than the viewport
- **THEN** the top navigation bar remains visible at the top of the viewport

### Requirement: Primary Navigation Links
The navigation bar SHALL display "Home" and "Wind" links on the left side, routing to the Home page and the Wind page respectively.

#### Scenario: Navigate to Home
- **WHEN** a user activates the "Home" link
- **THEN** the system navigates to the Home page

#### Scenario: Navigate to Wind
- **WHEN** a user activates the "Wind" link
- **THEN** the system navigates to the Wind page

### Requirement: Active Link Indication
The navigation bar SHALL visually and programmatically indicate which link corresponds to the current route.

#### Scenario: Current route marked active
- **WHEN** a user is on the Home page or the Wind page
- **THEN** the corresponding navigation link is marked as the current page (including an `aria-current="page"` attribute) and is visually distinguished from the other links

### Requirement: Login Navigation Link
The navigation bar SHALL display a "Login" link on the right side, routing to a login page.

#### Scenario: Navigate to Login
- **WHEN** a user activates the "Login" link
- **THEN** the system navigates to the login page

### Requirement: Login Placeholder Page
The system SHALL provide a login page reachable at its own route. The page SHALL display placeholder content indicating login is not yet available, since no authentication behavior exists yet.

#### Scenario: Viewing the login placeholder
- **WHEN** a user navigates to the login page
- **THEN** the page renders placeholder content indicating login is coming soon, with no functional login form
