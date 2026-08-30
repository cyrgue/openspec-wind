## MODIFIED Requirements

### Requirement: Météo France API Integration
The system SHALL integrate with the Météo France API (open-meteo.com) to retrieve weather data, with wind speed and gust values expressed in knots.

#### Scenario: User requests weather data
- **WHEN** a component requests weather forecast
- **THEN** the météo service calls the Météo France API
- **AND** returns weather data in a typed format
- **AND** handles errors gracefully

#### Scenario: Wind speed requested in knots
- **WHEN** the météo service requests current conditions
- **THEN** it requests wind speed and gusts in knots (`wind_speed_unit=kn`)
- **AND** the returned wind speed and gust values are already in knots, with no client-side unit conversion needed

## ADDED Requirements

### Requirement: World Tides API Integration
The system SHALL integrate with the World Tides API (worldtides.info) to retrieve tide extremes (high/low tide times) for a given coordinate.

#### Scenario: Component requests tide times
- **WHEN** a component requests tide extremes for a latitude/longitude
- **THEN** the tide service calls the World Tides API with that coordinate
- **AND** returns a typed list of tide extremes (type and time) covering the current day
- **AND** handles errors gracefully without breaking the rest of the widget

### Requirement: Tide API Key Configuration
The system SHALL read the World Tides API key from application configuration rather than hardcoding it in source.

#### Scenario: Tide service initializes
- **WHEN** the application starts
- **THEN** the tide service reads its API key from the environment configuration
- **AND** the key is not committed to version control in plain form
