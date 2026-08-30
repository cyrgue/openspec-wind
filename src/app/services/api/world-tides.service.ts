import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClientService } from './http-client.service';
import { TideExtreme, WorldTidesExtremesResponse } from './world-tides.types';

/**
 * Accès à l'API World Tides (worldtides.info) pour les horaires de marée.
 * Nécessite une clé d'API, voir `environment.ts` et le README du dossier.
 */
@Injectable({ providedIn: 'root' })
export class WorldTidesService {
  private readonly http = inject(HttpClientService);

  private readonly baseUrl = 'https://www.worldtides.info/api/v3';

  /** Horaires de marée haute/basse du jour pour une coordonnée donnée. */
  getTideExtremes(latitude: number, longitude: number): Observable<TideExtreme[]> {
    return this.http
      .get<WorldTidesExtremesResponse>(this.baseUrl, {
        params: {
          extremes: true,
          lat: latitude,
          lon: longitude,
          key: environment.worldTidesApiKey
        }
      })
      .pipe(
        map((response) =>
          (response.extremes ?? []).map((extreme) => ({
            type: extreme.type,
            time: extreme.date
          }))
        )
      );
  }
}
