import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MeteoFranceService } from '../services/api/meteo-france.service';
import { MeteoFranceWeatherResponse } from '../services/api/meteo-france.types';
import { WorldTidesService } from '../services/api/world-tides.service';
import { TideExtreme } from '../services/api/world-tides.types';

const CARDINAUX = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'] as const;

/**
 * Affiche les conditions météo courantes d'un point géographique
 * via l'API Météo France (open-meteo.com).
 */
@Component({
  selector: 'app-weather-widget',
  imports: [DatePipe],
  template: `
    <div class="card h-100">
      <div class="card-body">
        <h3 class="card-title h6 text-uppercase text-body-secondary mb-3">
          Conditions actuelles
        </h3>

        <div aria-live="polite" aria-busy="{{ loading() }}">
          @if (loading()) {
            <div class="d-flex align-items-center gap-2 text-body-secondary">
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span>Chargement de la météo…</span>
            </div>
          } @else if (error()) {
            <div class="alert alert-warning mb-0" role="alert">{{ error() }}</div>
          } @else if (current(); as c) {
            <dl class="row row-cols-2 g-3 mb-0">
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Température</dt>
                <dd class="h4 mb-0">{{ c.temperature_2m }}{{ unit('temperature_2m') }}</dd>
              </div>
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Ressenti</dt>
                <dd class="h4 mb-0">
                  {{ c.apparent_temperature }}{{ unit('apparent_temperature') }}
                </dd>
              </div>
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Vent</dt>
                <dd class="h4 mb-0">
                  {{ c.wind_speed_10m }} {{ unit('wind_speed_10m') }}
                  <span class="fs-6 text-body-secondary">{{ direction() }}</span>
                </dd>
              </div>
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Rafales</dt>
                <dd class="h4 mb-0">{{ c.wind_gusts_10m }} {{ unit('wind_gusts_10m') }}</dd>
              </div>
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Humidité</dt>
                <dd class="h4 mb-0">
                  {{ c.relative_humidity_2m }}{{ unit('relative_humidity_2m') }}
                </dd>
              </div>
              <div class="col">
                <dt class="small fw-normal text-body-secondary">Précipitations</dt>
                <dd class="h4 mb-0">{{ c.precipitation }} {{ unit('precipitation') }}</dd>
              </div>
            </dl>
          }
        </div>

        <div class="mt-3" aria-live="polite" aria-busy="{{ tideLoading() }}">
          <h3 class="card-title h6 text-uppercase text-body-secondary mb-2">Marées</h3>
          @if (tideLoading()) {
            <div class="d-flex align-items-center gap-2 text-body-secondary">
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span>Chargement des marées…</span>
            </div>
          } @else if (tideError()) {
            <p class="text-body-secondary small mb-0">{{ tideError() }}</p>
          } @else if (tideExtremes(); as extremes) {
            <ul class="list-inline mb-0">
              @for (extreme of extremes; track extreme.time) {
                <li class="list-inline-item">
                  <span class="badge text-bg-light border">
                    {{ extreme.type === 'High' ? 'PM' : 'BM' }}
                    {{ extreme.time | date: 'HH:mm' }}
                  </span>
                </li>
              }
            </ul>
          }
        </div>
      </div>
    </div>
  `
})
export class WeatherWidget {
  private readonly meteo = inject(MeteoFranceService);
  private readonly tides = inject(WorldTidesService);

  readonly latitude = input.required<number>();
  readonly longitude = input.required<number>();

  private readonly response = signal<MeteoFranceWeatherResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly tideExtremes = signal<TideExtreme[] | null>(null);
  readonly tideLoading = signal(true);
  readonly tideError = signal<string | null>(null);

  readonly current = computed(() => this.response()?.current ?? null);

  /** Direction du vent en point cardinal, ex. « SO ». */
  readonly direction = computed(() => {
    const deg = this.current()?.wind_direction_10m;
    if (deg === undefined) {
      return '';
    }
    return CARDINAUX[Math.round(deg / 45) % 8];
  });

  constructor() {
    // effect() exige un contexte d'injection : le constructeur en est un.
    // Il relit latitude()/longitude() et relance l'appel si elles changent.
    effect(() => this.fetch(this.latitude(), this.longitude()));
    effect(() => this.fetchTides(this.latitude(), this.longitude()));
  }

  /** Unité renvoyée par l'API pour une variable donnée. */
  unit(key: keyof NonNullable<MeteoFranceWeatherResponse['current']>): string {
    return this.response()?.current_units?.[key] ?? '';
  }

  private fetch(latitude: number, longitude: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.meteo.getCurrentWeather(latitude, longitude).subscribe({
      next: (data) => {
        this.response.set(data);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set('Météo indisponible pour le moment.');
        this.loading.set(false);
        console.error('[WeatherWidget]', err.message);
      }
    });
  }

  private fetchTides(latitude: number, longitude: number): void {
    this.tideLoading.set(true);
    this.tideError.set(null);

    this.tides.getTideExtremes(latitude, longitude).subscribe({
      next: (extremes) => {
        this.tideExtremes.set(extremes);
        this.tideLoading.set(false);
      },
      error: (err: Error) => {
        this.tideError.set('Horaires de marée indisponibles pour le moment.');
        this.tideLoading.set(false);
        console.error('[WeatherWidget]', err.message);
      }
    });
  }
}
