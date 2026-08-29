# HTTP Services Layer

## Vue d'ensemble

La couche `services/api` centralise toutes les communications HTTP de l'application. Elle fournit une architecture type-safe et réutilisable pour appeler les API externes.

## Architecture

### HttpClientService (Base)
Service de base qui encapsule `HttpClient` d'Angular et fournit des méthodes génériques pour GET, POST, PUT, DELETE.

**Utilisation:**
```typescript
private httpClient = inject(HttpClientService);

this.httpClient.get<MyType>(url).subscribe(...);
```

### Services spécifiques
Chaque API externe a son propre service héritant de `HttpClientService`.

## Services disponibles

### MeteoFranceService
Service pour l'API Météo France (open-meteo.com).

**Méthodes:**
- `getWeather(lat, lon, params?)` - Récupère les données météo complètes
- `getCurrentWeather(lat, lon)` - Récupère uniquement la météo actuelle
- `getHourlyForecast(lat, lon, days?)` - Récupère les prévisions horaires
- `getDailyForecast(lat, lon, days?)` - Récupère les prévisions quotidiennes

**Exemple:**
```typescript
import { MeteoFranceService } from '@app/services/api';

export class MyComponent {
  private meteo = inject(MeteoFranceService);

  getWeather() {
    // Récupère la météo à Paris
    this.meteo.getCurrentWeather(48.8566, 2.3522).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error(err)
    });
  }
}
```

## Types

Les types TypeScript pour les réponses d'API sont définis dans `meteo-france.types.ts`.

## Ajout d'un nouveau service

1. Créer un fichier `mon-api.types.ts` avec les interfaces TypeScript
2. Créer un fichier `mon-api.service.ts` avec `@Injectable({ providedIn: 'root' })`
3. Injecter `HttpClientService` et utiliser ses méthodes génériques
4. Exporter les types et service dans `index.ts`

## Configuration

L'application doit avoir `HttpClientModule` fourni. Vérifiez que `app.config.ts` inclut:

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ... autres providers
  ]
};
```
