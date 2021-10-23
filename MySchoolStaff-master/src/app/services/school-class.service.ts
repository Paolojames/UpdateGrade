import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {
  private apiUrl: string = environment.elavatekoAPI.url;
  private classAPI: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cacheService: CacheService,
  ) {
    this.classAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.schoolClass}`;
  }

  listClasses<T>(): Observable<T> {
    const observable = this.http.get<T>(this.classAPI, {
      headers: this.authService.getAuthHeaders(),
    });

    return this.cacheService.cache<T>('staffClasses', observable)
      .pipe(
        tap(() => { }, (error: HttpErrorResponse) => {
          this.authService.invalidTokenEvent(error);
        }),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(response: HttpErrorResponse): Observable<any> {
    return throwError(response.statusText);
  }
}
