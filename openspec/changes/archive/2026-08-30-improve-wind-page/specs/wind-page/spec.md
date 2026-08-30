## MODIFIED Requirements

### Requirement: Wind Page Display
The system SHALL provide a page that displays weather and tide widgets for a set of default coastal locations when navigated to.

#### Scenario: User navigates to the wind page
- **WHEN** a user navigates to the wind page route
- **THEN** the page renders a widget for each default location
- **AND** each widget shows current weather conditions for that location

## ADDED Requirements

### Requirement: Default Coastal Locations
The system SHALL default the wind page to three fixed coastal locations: Jullouville, Annoville, and Agon-Coutainville, at the following coordinates:
- Jullouville: 48.76863564997057, -1.5704452578882506
- Annoville: 48.95882238071765, -1.5608089149874422
- Agon-Coutainville: 49.030767224625286, -1.5963532940619958

#### Scenario: Page loads with default locations
- **WHEN** a user navigates to the wind page without selecting other locations
- **THEN** the page shows exactly three widgets, one per default location
- **AND** each widget is labeled with its location name

### Requirement: Wind Speed in Knots
The system SHALL display wind speed and gusts in knots in each location widget.

#### Scenario: Widget displays wind speed
- **WHEN** a location widget shows current wind conditions
- **THEN** the wind speed and gust values are displayed in knots (kn)

### Requirement: Tide Schedule per Location
The system SHALL display the day's high and low tide times in each location widget.

#### Scenario: Widget displays tide times
- **WHEN** a location widget loads for a coordinate
- **THEN** it shows the day's tide extremes (high and low tide times) for that location
- **AND** each extreme is labeled as high or low tide with its time

#### Scenario: Tide data unavailable
- **WHEN** the tide API call fails or returns no data
- **THEN** the widget still shows the weather conditions
- **AND** displays a non-blocking notice that tide times are unavailable
