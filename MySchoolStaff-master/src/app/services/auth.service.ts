import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credential, JWTToken } from '@myschool/interfaces/authentication';
import { interval, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, takeUntil, tap } from 'rxjs/operators'
import { Router } from '@angular/router';


//TODO: Implement a sliding JWT Token
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cancelVerifyTokenEventSubject$: Subject<boolean> = new Subject<boolean>();
  private apiUrl: string = environment.elavatekoAPI.url;
  private loginAPI: string;
  private verifyTokenAPI: string;

  redirectUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.login}`;
    this.verifyTokenAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.verifyToken}`;
  }

  login(credential: Credential, errorCallback?: (e: any) => void): void {
    this.http.post<JWTToken>(this.loginAPI, credential).pipe(
      tap((token: JWTToken) => {
        sessionStorage.setItem('accessToken', token.access);
        sessionStorage.setItem('refreshToken', token.refresh);
      }, (error: HttpErrorResponse) => {
        if (errorCallback) errorCallback(error);
      }),
      (catchError(this.errorHandler))
    ).subscribe(() => {
      const lastUrl: string | null = sessionStorage.getItem('lastUrl');
      this.router.navigate([lastUrl ? lastUrl : this.redirectUrl]);
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    const valid = this.isAccessTokenValid();
    return valid;
  }

  private isAccessTokenValid(): boolean {
    const accessToken: string | null = sessionStorage.getItem('accessToken');

    return accessToken ? true : false;
  }

  pollTokenVerification(enable: boolean = true): void {
    if (!environment.enableTokenVerificationPolling) return;

    if (!enable) {
      this.cancelVerifyTokenEventSubject$.next(true);
      return;
    }

    const token: string | null = sessionStorage.getItem('accessToken');
    if (!token) return;

    interval(environment.verifyTokenInterval)
      .pipe(takeUntil(this.cancelVerifyTokenEventSubject$.asObservable()))
      .subscribe(() => {
        this.http.post<unknown>(this.verifyTokenAPI, { token }, { observe: 'response' }).pipe(
          tap(() => {
          }, (response: HttpErrorResponse) => {
            this.invalidTokenEvent(response);
          }),
          (catchError(this.errorHandler))
        ).subscribe();
      });
  }

  private errorHandler(response: HttpErrorResponse): Observable<any> {
    return throwError(response.statusText);
  }

  invalidTokenEvent(response: HttpErrorResponse): void {
    if (response.status === 401) {
      this.snapshotLastUrl();
      this.cancelVerifyTokenEventSubject$.next(true);
      sessionStorage.removeItem('accessToken');

      //Comment this if auto redirection to login upon token expiry is disabled
      this.router.navigate(['/login']);
    }
  }

  private snapshotLastUrl(): void {
    sessionStorage.setItem('lastUrl', this.redirectUrl);
  }

  getAuthHeaders(): HttpHeaders {
    return (new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    }));
  }
}
