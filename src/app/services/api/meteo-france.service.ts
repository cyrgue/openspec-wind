import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { MeteoFranceWeatherResponse, MeteoFranceRequestParams } from './meteo-france.types';

/**
 * Service for interacting with the Météo France API (open-meteo.com).
 * Provides methods to fetch current weather, hourly forecasts, and daily forecasts.
 */
@Injectable({ providedIn: 'root' })
export class MeteoFranceService {
  private httpClient = inject(HttpClientService);

  private readonly API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

  constructor() {}

  /**
   * Fetches weather data for a given location.
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @param params - Optional request parameters
   * @returns Observable of weather response
   */
  getWeather(
    latitude: number,
    longitude: number,
    params?: Partial<MeteoFranceRequestParams>
  ): Observable<MeteoFranceWeatherResponse> {
    const queryParams = this.buildQueryParams(latitude, longitude, params);
    const url = `${this.API_BASE_URL}?${queryParams}`;
    return this.httpClient.get<MeteoFranceWeatherResponse>(url);
  }

  /**
   * Fetches current weather for a given location.
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @returns Observable of weather response with current data only
   */
  getCurrentWeather(latitude: number, longitude: number): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, {
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m'
    });
  }

  /**
   * Fetches hourly forecast for a given location.
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @param forecastDays - Number of days to forecast (default: 7)
   * @returns Observable of weather response with hourly data
   */
  getHourlyForecast(
    latitude: number,
    longitude: number,
    forecastDays: number = 7
  ): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, {
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
      hourly: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
      forecast_days: forecastDays
    });
  }

  /**
   * Fetches daily forecast for a given location.
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @param forecastDays - Number of days to forecast (default: 7)
   * @returns Observable of weather response with daily data
   */
  getDailyForecast(
    latitude: number,
    longitude: number,
    forecastDays: number = 7
  ): Observable<MeteoFranceWeatherResponse> {
    return this.getWeather(latitude, longitude, {
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max',
      forecast_days: forecastDays
    });
  }

  /**
   * Builds query string from parameters.
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @param params - Optional request parameters
   * @returns Query string for the API request
   */
  private buildQueryParams(
    latitude: number,
    longitude: number,
    params?: Partial<MeteoFranceRequestParams>
  ): string {
    const queryParams = new URLSearchParams();

    queryParams.append('latitude', latitude.toString());
    queryParams.append('longitude', longitude.toString());

    if (params?.current) {
      queryParams.append('current', params.current);
    }

    if (params?.hourly) {
      queryParams.append('hourly', params.hourly);
    }

    if (params?.daily) {
      queryParams.append('daily', params.daily);
    }

    if (params?.timezone) {
      queryParams.append('timezone', params.timezone);
    } else {
      queryParams.append('timezone', 'auto');
    }

    if (params?.forecast_days) {
      queryParams.append('forecast_days', params.forecast_days.toString());
    }

    return queryParams.toString();
  }
}
