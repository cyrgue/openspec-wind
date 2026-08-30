# FT-002 — Couche services HTTP

Voir la documentation de référence : [`src/app/services/api/README.md`](src/app/services/api/README.md)

Artefacts openspec : `openspec/specs/http-services/spec.md` et
`openspec/changes/archive/2026-08-30-FT-002-http-services/`.

## En bref

- `HttpClientService` — socle commun des appels réseau.
- `MeteoFranceService` — API Météo France (open-meteo.com), sans authentification.
- `WeatherWidget` — composant d'exemple, utilisé sur la page Vent.

Point d'attention : open-meteo renvoie les clés de réponse avec le nom exact de
la variable demandée (`current.temperature_2m`, pas `current.temperature`).
