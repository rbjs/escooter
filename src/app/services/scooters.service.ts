import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  forkJoin,
  BehaviorSubject,
  tap,
  of,
  catchError,
  map,
  retryWhen,
} from 'rxjs';

import { Scooter } from '../models/scooter';
import { Brands } from '../shared/brands';
import { SharedService } from './shared.service';
import { genericRetryStrategy } from './rxjs-utils';

@Injectable({
  providedIn: 'root',
})
export class ScootersService {
  constructor(private http: HttpClient, private sharedService: SharedService) {}

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getScooters(): Observable<Scooter[]> {
    return forkJoin(
      Object.entries(Brands).map((brand) => {
        return this.http
          .post<Scooter>(brand[0], {
            headers: { brand: brand[1].name },
          })
          .pipe(
            retryWhen(genericRetryStrategy()),
            catchError(error => of(error))
          )
      })
    ).pipe(
      tap((val) =>
        this.sharedService.lastupdated$.next(
          new Date(Date.now()).toLocaleTimeString('uk-UA').toString()
        )
      )
    );
    //
  }
}
