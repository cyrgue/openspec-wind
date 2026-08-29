## ADDED Requirements

### Requirement: Responsive Navigation Collapse
On viewports narrower than a defined breakpoint, the navigation bar SHALL collapse its primary and secondary links behind a toggle control. Activating the toggle SHALL expand or collapse the links.

#### Scenario: Links collapsed on a narrow viewport
- **WHEN** the viewport width is below the navigation's responsive breakpoint
- **THEN** the "Home", "Wind", and "Login" links are hidden and a toggle control is displayed

#### Scenario: Expanding the collapsed navigation
- **WHEN** a user activates the toggle control while the links are collapsed
- **THEN** the "Home", "Wind", and "Login" links become visible

#### Scenario: Links always visible on a wide viewport
- **WHEN** the viewport width is at or above the navigation's responsive breakpoint
- **THEN** the "Home", "Wind", and "Login" links are displayed without needing the toggle control
