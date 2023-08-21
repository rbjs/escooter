import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  BehaviorSubject,
  tap,
  catchError,
  delay,
  retry,
  from,
  EMPTY,
  mergeMap,
} from 'rxjs';

import { Scooter } from '../models/scooter';
import { Brands } from '../shared/brands';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScootersService {
  public data$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private brands = Object.entries(Brands);
  private delay = 5 * 1000;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getScooters(): Observable<Scooter[]> {
    return from(this.brands)
      .pipe(
        tap(() => this.sharedService.loading$.next(true)),
        mergeMap((brand) => this.makeHttpRequest(brand))
      )
      .pipe(
        tap(() =>
          this.sharedService.lastupdated$.next(
            new Date(Date.now()).toLocaleTimeString('uk-UA').toString()
          )
        )
      );
  }

  makeHttpRequest([key, brand]) {
    return this.http
      .post<Scooter[]>(
        `${environment.url}${key}.js`,
        {},
        {
          headers: { brand: brand.name },
        }
      )
      .pipe(
        // retry({ count: 5, delay: 2000 }),
        catchError(() => EMPTY)
      );
  }
}
