import { Component } from '@angular/core';
import { WeatherWidget } from '../weather-widget/weather-widget';

interface Ville {
  readonly nom: string;
  readonly latitude: number;
  readonly longitude: number;
}

@Component({
  selector: 'app-wind-page',
  imports: [WeatherWidget],
  template: `
    <div class="container py-5">
      <h1 class="h2 mb-4">Vent et météo</h1>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        @for (ville of villes; track ville.nom) {
          <div class="col">
            <h2 class="h6 text-body-secondary mb-2">{{ ville.nom }}</h2>
            <app-weather-widget
              [latitude]="ville.latitude"
              [longitude]="ville.longitude"
            />
          </div>
        }
      </div>
    </div>
  `
})
export class WindPage {
  protected readonly villes: readonly Ville[] = [
    { nom: 'Jullouville', latitude: 48.76863564997057, longitude: -1.5704452578882506 },
    { nom: 'Annoville', latitude: 48.95882238071765, longitude: -1.5608089149874422 },
    { nom: 'Agon-Coutainville', latitude: 49.030767224625286, longitude: -1.5963532940619958 }
  ];
}
