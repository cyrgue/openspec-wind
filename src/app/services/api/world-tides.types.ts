/**
 * Types pour l'API World Tides (worldtides.info).
 * https://www.worldtides.info/apidocs
 */

/** Un extremum de marée tel que renvoyé par l'API. */
export interface WorldTidesExtremeRaw {
  dt: number;
  /** Horodatage ISO 8601 avec fuseau. */
  date: string;
  height: number;
  type: 'High' | 'Low';
}

/** Réponse brute de l'endpoint `extremes`. */
export interface WorldTidesExtremesResponse {
  status: number;
  error?: string;
  extremes?: WorldTidesExtremeRaw[];
}

/** Extremum de marée simplifié, utilisé par les composants. */
export interface TideExtreme {
  type: 'High' | 'Low';
  time: string;
}
