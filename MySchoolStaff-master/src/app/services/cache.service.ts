import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private _cache: any = {};
  private _cache$: any = {};

  constructor() { }

  cache<T>(name: string, observable: Observable<T>): Observable<T> {
    let _observable: any = new Observable<T>();

    if (this._cache[name]) {
      _observable = of(this._cache[name]);
    } else if (this._cache$[name]) {
      _observable = this._cache$[name];
    } else {
      this._cache$[name] = observable.pipe(
        tap(res => this._cache[name] = res),
        share(),
        finalize(() => delete this._cache$[name])
      );
      _observable = this._cache$[name];
    }

    return _observable;
  }
}
