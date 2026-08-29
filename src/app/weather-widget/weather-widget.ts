import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { MeteoFranceService } from '../services/api/meteo-france.service';
import { MeteoFranceWeatherResponse } from '../services/api/meteo-france.types';

/**
 * Weather widget component that displays current weather using Météo France API.
 * Can be integrated into any page to show weather information.
 */
@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card weather-widget p-4">
      <h5 class="card-title mb-4">
        <i class="bi bi-cloud-sun"></i>
        Météo Actuelle
      </h5>

      @if (loading()) {
        <div class="text-center">
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>
      }

      @if (error()) {
        <div class="alert alert-warning mb-0" role="alert">
          {{ error() }}
        </div>
      }

      @if (weather()) {
        <div class="weather-info">
          <div class="row mb-3">
            <div class="col-6">
              <span class="text-muted">Température</span>
              <p class="h4 mb-0">{{ weather()?.current.temperature }}°C</p>
            </div>
            <div class="col-6">
              <span class="text-muted">Humidité</span>
              <p class="h4 mb-0">{{ weather()?.current.relative_humidity }}%</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-6">
              <span class="text-muted">Vitesse du vent</span>
              <p class="h4 mb-0">{{ weather()?.current.wind_speed }} km/h</p>
            </div>
            <div class="col-6">
              <span class="text-muted">Précipitations</span>
              <p class="h4 mb-0">{{ weather()?.current.precipitation }} mm</p>
            </div>
          </div>

          <div class="text-muted small">
            <i class="bi bi-geo-alt"></i>
            Lat: {{ weather()?.latitude }}, Lon: {{ weather()?.longitude }}
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .weather-widget {
      border-radius: 8px;
      background-color: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
    }

    .weather-info h4 {
      color: var(--bs-body-color);
      margin-bottom: 0.5rem;
    }

    .weather-info .text-muted {
      font-size: 0.875rem;
    }
  `
})
export class WeatherWidgetComponent {
  private meteoService = inject(MeteoFranceService);

  // Inputs for location
  latitude = input<number>(48.8566); // Paris latitude by default
  longitude = input<number>(2.3522); // Paris longitude by default

  // State signals
  weather = signal<MeteoFranceWeatherResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    // Effect to fetch weather when location changes
    effect(() => {
      this.fetchWeather(this.latitude(), this.longitude());
    });
  }

  /**
   * Fetches current weather for the specified location.
   */
  private fetchWeather(latitude: number, longitude: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.meteoService.getCurrentWeather(latitude, longitude).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger la météo. Veuillez réessayer.');
        this.loading.set(false);
        console.error('Erreur lors du chargement de la météo:', err);
      }
    });
  }
}
