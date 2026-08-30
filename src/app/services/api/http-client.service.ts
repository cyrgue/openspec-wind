import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Valeurs acceptées comme paramètres de query string. */
export type QueryParams = Record<
  string,
  string | number | boolean | readonly (string | number | boolean)[]
>;

/** Options communes à toutes les requêtes. */
export interface RequestOptions {
  params?: QueryParams;
}

/**
 * Service HTTP de base : point d'entrée unique pour tous les appels réseau.
 * Les services d'API métier (MeteoFranceService, etc.) s'appuient dessus
 * plutôt que d'injecter HttpClient directement.
 */
@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private readonly http = inject(HttpClient);

  get<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(catchError(this.handleError));
  }

  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }

  /** Normalise les erreurs HTTP en Error avec un message exploitable. */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.status === 0
        ? `Réseau injoignable : ${error.message}`
        : `HTTP ${error.status} sur ${error.url} : ${error.message}`;

    console.error('[HttpClientService]', message, error.error);
    return throwError(() => new Error(message));
  }
}
