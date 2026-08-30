/**
 * Types pour l'API Météo France (open-meteo.com).
 *
 * IMPORTANT : l'API renvoie les clés de réponse avec EXACTEMENT le nom des
 * variables demandées. Si on demande `current=temperature_2m`, la réponse
 * contient `current.temperature_2m` — pas `current.temperature`.
 * https://open-meteo.com/en/docs/meteofrance-api
 */

/** Variables disponibles pour le bloc `current`. */
export type CurrentVariable =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'apparent_temperature'
  | 'precipitation'
  | 'weather_code'
  | 'wind_speed_10m'
  | 'wind_direction_10m'
  | 'wind_gusts_10m';

/** Variables disponibles pour le bloc `hourly`. */
export type HourlyVariable =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'precipitation'
  | 'weather_code'
  | 'wind_speed_10m'
  | 'wind_direction_10m'
  | 'wind_gusts_10m';

/** Variables disponibles pour le bloc `daily`. */
export type DailyVariable =
  | 'temperature_2m_max'
  | 'temperature_2m_min'
  | 'precipitation_sum'
  | 'weather_code'
  | 'wind_speed_10m_max'
  | 'wind_gusts_10m_max';

/** Conditions courantes (15-minutely model data). */
export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

/** Unités correspondantes au bloc `current`. */
export type CurrentWeatherUnits = Record<keyof CurrentWeather, string>;

/** Prévisions horaires : chaque variable est un tableau parallèle à `time`. */
export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
}

/** Prévisions quotidiennes : chaque variable est un tableau parallèle à `time`. */
export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weather_code: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
}

/** Réponse complète de l'endpoint /v1/forecast. */
export interface MeteoFranceWeatherResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current?: CurrentWeather;
  current_units?: CurrentWeatherUnits;
  hourly?: HourlyWeather;
  hourly_units?: Partial<Record<keyof HourlyWeather, string>>;
  daily?: DailyWeather;
  daily_units?: Partial<Record<keyof DailyWeather, string>>;
}

/** Paramètres de requête acceptés par le service. */
export interface MeteoFranceRequestParams {
  current?: readonly CurrentVariable[];
  hourly?: readonly HourlyVariable[];
  daily?: readonly DailyVariable[];
  /** Fuseau horaire IANA, ou 'auto' pour le déduire des coordonnées. */
  timezone?: string;
  forecast_days?: number;
  /** Unité de vitesse du vent. Par défaut : nœuds (`'kn'`). */
  wind_speed_unit?: 'kmh' | 'ms' | 'mph' | 'kn';
}
