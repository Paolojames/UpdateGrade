import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordRequest, StaffRequest} from '@myschool/interfaces/school.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl: string = environment.elavatekoAPI.url;
  private staffAPI: string;
  private profileAPI: string;
  private changePasswordAPI: string;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private authService: AuthService,
  ) {
    this.staffAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.staff}`;
    this.profileAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.staffProfile}`;
    this.changePasswordAPI = `${this.apiUrl}/${environment.elavatekoAPI.endpoints.chagePassword}`;
  }

  getStaffProfile<T>(): Observable<T> {
    //Profile won't change often so it can be persistently cached.
    const observable = this.http.get<T>(this.profileAPI, {
      headers: this.authService.getAuthHeaders(),
    });

    return this.cacheService.cache<T>('staffProfile', observable)
      .pipe(
        tap(() => { }, (error: HttpErrorResponse) => {
          this.authService.invalidTokenEvent(error);
        }),
        catchError(this.errorHandler)
      );
  }

  formUpdateProfile<T>(id: number, profile: Partial<StaffRequest>): Observable<T> {
    const formData = new FormData();
    formData.append('image', profile.image!);

    return this.http.patch<T>(`${this.staffAPI}/${id}`, formData, {
      headers: this.authService.getAuthHeaders(),
    }).pipe(
      tap(() => { }, (error: HttpErrorResponse) => {
        this.authService.invalidTokenEvent(error);
      }),
      catchError(this.errorHandler)
    );
  }

  changePassword<T>(password: ChangePasswordRequest, errorCallback?: (e: any) => void): Observable<T> {
    return this.http.put<T>(this.changePasswordAPI, password, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      tap(() => { }, (error: HttpErrorResponse) => {
        if (errorCallback) errorCallback(error);
        this.authService.invalidTokenEvent(error);
      }),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(response: HttpErrorResponse): Observable<any> {
    return throwError(response.statusText);
  }
}
