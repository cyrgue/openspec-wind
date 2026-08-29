/**
 * Types for Météo France API responses
 * Based on open-meteo.com API documentation
 */

export interface MeteoFranceWeatherResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  current: CurrentWeather;
  current_units: CurrentWeatherUnits;
  hourly?: HourlyWeather;
  hourly_units?: HourlyWeatherUnits;
  daily?: DailyWeather;
  daily_units?: DailyWeatherUnits;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  relative_humidity: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed: number;
  wind_direction: number;
  wind_gusts: number;
}

export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  relative_humidity: string;
  apparent_temperature: string;
  precipitation: string;
  weather_code: string;
  wind_speed: string;
  wind_direction: string;
  wind_gusts: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

export interface HourlyWeatherUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation: string;
  weather_code: string;
  wind_speed_10m: string;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weather_code: number[];
  wind_speed_10m_max: number[];
}

export interface DailyWeatherUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  weather_code: string;
  wind_speed_10m_max: string;
}

export interface MeteoFranceRequestParams {
  latitude: number;
  longitude: number;
  current?: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m';
  hourly?: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m';
  daily?: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max';
  timezone?: string;
  forecast_days?: number;
}
