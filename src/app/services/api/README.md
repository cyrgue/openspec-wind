# Couche services HTTP

Centralise les appels réseau de l'application. Les composants n'injectent jamais
`HttpClient` directement : ils passent par un service d'API métier, qui lui-même
passe par `HttpClientService`.

```
Composant → MeteoFranceService → HttpClientService → HttpClient → API
```

## HttpClientService

Socle commun : `get` / `post` / `put` / `delete`, typés génériquement, avec
normalisation des erreurs en `Error` porteur d'un message exploitable.

```ts
this.http.get<MonType>(url, { params: { latitude: 48.85, timezone: 'auto' } });
```

## MeteoFranceService

API Météo France via open-meteo.com. Aucune authentification.

| Méthode | Blocs renvoyés |
| --- | --- |
| `getWeather(lat, lon, params)` | au choix via `params` |
| `getCurrentWeather(lat, lon)` | `current` |
| `getHourlyForecast(lat, lon, days?)` | `current` + `hourly` |
| `getDailyForecast(lat, lon, days?)` | `current` + `daily` |

```ts
export class MaPage {
  private readonly meteo = inject(MeteoFranceService);
  protected readonly temperature = signal<number | null>(null);

  constructor() {
    this.meteo.getCurrentWeather(48.8566, 2.3522).subscribe({
      next: (data) => this.temperature.set(data.current?.temperature_2m ?? null),
      error: (err) => console.error(err.message)
    });
  }
}
```

## ⚠️ Nommage des champs de réponse

open-meteo renvoie les clés **avec le nom exact de la variable demandée**.
Demander `current=temperature_2m` produit `current.temperature_2m` — il n'existe
pas de `current.temperature`. Même logique pour `relative_humidity_2m`,
`wind_speed_10m`, `wind_gusts_10m`, `wind_direction_10m`.

Les unités correspondantes arrivent dans `current_units`, indexé par les mêmes
clés (`current_units.wind_speed_10m` → `"km/h"`). Préférer ces unités à des
suffixes écrits en dur dans les templates.

Les blocs `current`, `hourly` et `daily` sont optionnels dans la réponse : ils
n'existent que si on les a demandés. Les types les déclarent donc en optionnel.

## Ajouter un service d'API

1. `mon-api.types.ts` — interfaces de réponse, calquées sur la réponse réelle
   (vérifier avec un appel réel, pas seulement la doc).
2. `mon-api.service.ts` — `@Injectable({ providedIn: 'root' })`, injecte
   `HttpClientService`, expose des méthodes métier.
3. Exporter les deux depuis `index.ts`.

## Configuration

`provideHttpClient()` est déclaré dans `src/app/app.config.ts`. Sans lui,
l'injection de `HttpClient` échoue au démarrage.
