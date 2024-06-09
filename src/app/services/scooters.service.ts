import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  BehaviorSubject,
  tap,
  catchError,
  from,
  EMPTY,
  mergeMap,
  switchMap,
  exhaustMap,
  map,
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

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getScooters() {
    const brand = this.brands[0][1];
    return this.http.get<Scooter[]>(brand.url).pipe(
      map((body) => {
        const data = brand
          .parseFn(this.brands[0][0], body)
          .filter((item: Scooter) => item?.latitude && item?.longitude);
        // console.log('!>', data);
        return data;
      }),
      tap(() => {
        this.sharedService.lastupdated$.next(
          new Date(Date.now()).toLocaleTimeString('uk-UA').toString()
        );
      })
    );
  }
}
