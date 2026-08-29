import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Base HTTP service providing common functionality for API services.
 * Handles error management, response transformations, and request configuration.
 */
@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private http = inject(HttpClient);

  constructor() {}

  /**
   * Performs a GET request to the specified URL.
   * @param url - The API endpoint URL
   * @returns Observable of the response
   */
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  /**
   * Performs a POST request to the specified URL.
   * @param url - The API endpoint URL
   * @param body - The request body
   * @returns Observable of the response
   */
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body).pipe(catchError(this.handleError));
  }

  /**
   * Performs a PUT request to the specified URL.
   * @param url - The API endpoint URL
   * @param body - The request body
   * @returns Observable of the response
   */
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body).pipe(catchError(this.handleError));
  }

  /**
   * Performs a DELETE request to the specified URL.
   * @param url - The API endpoint URL
   * @returns Observable of the response
   */
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url).pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors and returns a user-friendly error message.
   * @param error - The HTTP error
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching data';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
