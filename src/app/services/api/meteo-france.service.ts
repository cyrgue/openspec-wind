import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService, QueryParams } from './http-client.service';
import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  MeteoFranceRequestParams,
  MeteoFranceWeatherResponse
} from './meteo-france.types';

/** Jeu de variables `current` utilisé par défaut. */
const DEFAULT_CURRENT: readonly CurrentVariable[] = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'precipitation',
  'weather_code',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m'
];

const DEFAULT_HOURLY: readonly HourlyVariable[] = [
  'temperature_2m',
  'relative_humidity_2m',
  'precipitation',
  'weather_code',
  'wind_speed_10m'
];

const DEFAULT_DAILY: readonly DailyVariable[] = [
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'weather_code',
  'wind_speed_10m_max'
];

/**
 * Accès à l'API Météo France exposée par open-meteo.com.
 * Aucune authentification requise.
 */
@Injectable({ providedIn: 'root' })
export class MeteoFranceService {
  private readonly http = inject(HttpClientService);

  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  /** Appel générique : on choisit soi-même les blocs et variables. */
  getWeather(
    latitude: number,
    longitude: number,
    params: MeteoFranceRequestParams = {}
  ): Observable<MeteoFranceWeatherResponse> {
    return this.http.get<MeteoFranceWeatherResponse>(this.baseUrl, {
      params: this.buildParams(latitude, longitude, params)
    });
  }

  /** Conditions courantes uniquement. */
  getCurrentWeather(
    latitude: number,
    longitude: number
  ): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, { current: DEFAULT_CURRENT });
  }

  /** Conditions courantes + prévisions horaires. */
  getHourlyForecast(
    latitude: number,
    longitude: number,
    forecastDays = 7
  ): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, {
      current: DEFAULT_CURRENT,
      hourly: DEFAULT_HOURLY,
      forecast_days: forecastDays
    });
  }

  /** Conditions courantes + prévisions quotidiennes. */
  getDailyForecast(
    latitude: number,
    longitude: number,
    forecastDays = 7
  ): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, {
      current: DEFAULT_CURRENT,
      daily: DEFAULT_DAILY,
      forecast_days: forecastDays
    });
  }

  /**
   * Construit les paramètres de query string.
   * Les listes de variables sont jointes par des virgules, comme attendu par l'API.
   */
  private buildParams(
    latitude: number,
    longitude: number,
    params: MeteoFranceRequestParams
  ): QueryParams {
    const query: QueryParams = {
      latitude,
      longitude,
      timezone: params.timezone ?? 'auto',
      wind_speed_unit: params.wind_speed_unit ?? 'kn'
    };

    if (params.current?.length) {
      query['current'] = params.current.join(',');
    }
    if (params.hourly?.length) {
      query['hourly'] = params.hourly.join(',');
    }
    if (params.daily?.length) {
      query['daily'] = params.daily.join(',');
    }
    if (params.forecast_days !== undefined) {
      query['forecast_days'] = params.forecast_days;
    }

    return query;
  }
}
